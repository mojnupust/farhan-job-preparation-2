import type { PrismaClient } from '@prisma/client';
import type { AwilixContainer } from 'awilix';
import type { Queue } from 'bullmq';
import { Router } from 'express';
import rateLimit, { ipKeyGenerator } from 'express-rate-limit';
import type { Client as MinioClient } from 'minio';

import { minioConfig } from '../../../../config/minio.js';
import {
  authenticate,
  authorize,
  optionalAuthenticate,
} from '../../../../infrastructure/middleware/authenticate.js';
import { validate } from '../../../../infrastructure/middleware/validate.js';
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
    asyncHandler((req, res) => controller.generate(req, res)),
  );

  router.get(
    '/jobs/:jobId',
    validate({ params: jobIdParamsSchema }),
    asyncHandler((req, res) => controller.getJobStatus(req, res)),
  );

  router.get(
    '/exports/:documentId/download',
    validate({ params: documentIdParamsSchema }),
    asyncHandler((req, res) => controller.download(req, res)),
  );

  router.get(
    '/exports/:documentId',
    validate({ params: documentIdParamsSchema }),
    asyncHandler((req, res) => controller.getExport(req, res)),
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
