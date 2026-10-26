import type { PrismaClient } from '@prisma/client';
import type { AwilixContainer } from 'awilix';
import type { Queue } from 'bullmq';
import { Router, type Request } from 'express';
import rateLimit, { ipKeyGenerator } from 'express-rate-limit';
import type { Client as MinioClient } from 'minio';

import { minioConfig } from '../../../../config/minio.js';
import {
  authenticate,
  authorize,
  optionalAuthenticate,
} from '../../../../infrastructure/middleware/authenticate.js';
import { validate } from '../../../../infrastructure/middleware/validate.js';
import { assertDocxSetsAllowed } from '../../../../shared/utils/admin-only.js';
import { asyncHandler } from '../../../../shared/utils/async-handler.js';
import { DocxService } from '../../domain/docx.service.js';
import type { DocxGenerationJobData } from '../../infra/docx-queue.js';
import { DocxStorageService } from '../../infra/docx-storage.service.js';
import { DocxPrismaRepository } from '../../infra/docx.prisma-repository.js';
import { documentIdParamsSchema, generateDocxSchema, jobIdParamsSchema } from '../validation.js';

import { DocxController } from './docx.controller.js';

// This feature is public: anyone can generate a branded docx for free. Limit
// generation attempts per IP to protect the worker/storage from abuse.
const generateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => ipKeyGenerator(req.ip),
  message: { error: 'Too many docx generation requests. Please try again later.' },
});

export function createDocxRoutes(container: AwilixContainer): Router {
  const router = Router();

  const prisma = container.resolve<PrismaClient>('prismaClient');
  const minioClient = container.resolve<MinioClient>('minioClient');
  const docxQueue = container.resolve<Queue<DocxGenerationJobData>>('docxQueue');

  const repository = new DocxPrismaRepository(prisma);
  const storage = new DocxStorageService(minioClient, minioConfig.bucket);
  const service = new DocxService(repository, docxQueue, storage);
  const controller = new DocxController(service);

  // Feature is public — attach the user when a token is present, but don't require one.
  router.use(optionalAuthenticate);

  router.post(
    '/generate',
    generateLimiter,
    validate({ body: generateDocxSchema }),
    asyncHandler(async (req, res) => {
      // admin-only category-র set হলে শুধু ADMIN docx বানাতে পারবে
      await assertDocxSetsAllowed(prisma, req, req.body.questionSetIds as string[]);
      return controller.generate(req, res);
    }),
  );

  // আগে বানানো job/file-ও যেন documentId/jobId জানলে non-admin নামাতে না পারে
  async function guardDocument(req: Request, documentId: string) {
    const doc = await prisma.docxDocument.findUnique({
      where: { id: documentId },
      select: { questionSetIds: true },
    });
    if (doc) await assertDocxSetsAllowed(prisma, req, doc.questionSetIds);
  }

  router.get(
    '/jobs/:jobId',
    validate({ params: jobIdParamsSchema }),
    asyncHandler(async (req, res) => {
      const job = await prisma.docxGenerationJob.findUnique({
        where: { id: req.params.jobId! },
        select: { questionSetIds: true },
      });
      if (job) await assertDocxSetsAllowed(prisma, req, job.questionSetIds);
      return controller.getJobStatus(req, res);
    }),
  );

  router.get(
    '/exports/:documentId/download',
    validate({ params: documentIdParamsSchema }),
    asyncHandler(async (req, res) => {
      await guardDocument(req, req.params.documentId!);
      return controller.download(req, res);
    }),
  );

  router.get(
    '/exports/:documentId',
    validate({ params: documentIdParamsSchema }),
    asyncHandler(async (req, res) => {
      await guardDocument(req, req.params.documentId!);
      return controller.getExport(req, res);
    }),
  );

  router.delete(
    '/exports/:documentId',
    authenticate,
    authorize('ADMIN'),
    validate({ params: documentIdParamsSchema }),
    asyncHandler((req, res) => controller.deleteExport(req, res)),
  );

  return router;
}
