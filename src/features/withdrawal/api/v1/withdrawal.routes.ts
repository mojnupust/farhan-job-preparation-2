import type { PrismaClient } from '@prisma/client';
import type { AwilixContainer } from 'awilix';
import { Router } from 'express';
import rateLimit, { ipKeyGenerator } from 'express-rate-limit';

import { authenticate, authorize } from '../../../../infrastructure/middleware/authenticate.js';
import { validate } from '../../../../infrastructure/middleware/validate.js';
import { asyncHandler } from '../../../../shared/utils/async-handler.js';
import { RewardConfigPrismaRepository, RewardConfigService } from '../../../reward-config/index.js';
import { WithdrawalService } from '../../domain/withdrawal.service.js';
import { WithdrawalPrismaRepository } from '../../infra/withdrawal.prisma-repository.js';
import {
  adminPaySchema,
  adminReviewSchema,
  createWithdrawalSchema,
  listWithdrawalsQuerySchema,
  withdrawalIdParamSchema,
} from '../validation.js';

import { WithdrawalController } from './withdrawal.controller.js';

const requestLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 8,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.userId ?? ipKeyGenerator(req.ip ?? '127.0.0.1'),
  message: { error: 'Too many withdrawal requests. Please try again shortly.' },
});

export function createWithdrawalRoutes(container: AwilixContainer): Router {
  const router = Router();

  const prisma = container.resolve<PrismaClient>('prismaClient');
  const service = new WithdrawalService(
    new WithdrawalPrismaRepository(prisma),
    new RewardConfigService(new RewardConfigPrismaRepository(prisma)),
  );
  const controller = new WithdrawalController(service);

  router.get(
    '/eligibility',
    authenticate,
    asyncHandler((req, res) => controller.eligibility(req, res)),
  );
  router.get(
    '/me',
    authenticate,
    validate({ query: listWithdrawalsQuerySchema }),
    asyncHandler((req, res) => controller.listMine(req, res)),
  );
  router.post(
    '/',
    authenticate,
    requestLimiter,
    validate({ body: createWithdrawalSchema }),
    asyncHandler((req, res) => controller.request(req, res)),
  );

  router.get(
    '/',
    authenticate,
    authorize('ADMIN'),
    validate({ query: listWithdrawalsQuerySchema }),
    asyncHandler((req, res) => controller.listAdmin(req, res)),
  );
  router.get(
    '/:id',
    authenticate,
    authorize('ADMIN'),
    validate({ params: withdrawalIdParamSchema }),
    asyncHandler((req, res) => controller.getAdmin(req, res)),
  );
  router.post(
    '/:id/approve',
    authenticate,
    authorize('ADMIN'),
    validate({ params: withdrawalIdParamSchema, body: adminReviewSchema }),
    asyncHandler((req, res) => controller.approve(req, res)),
  );
  router.post(
    '/:id/reject',
    authenticate,
    authorize('ADMIN'),
    validate({ params: withdrawalIdParamSchema, body: adminReviewSchema }),
    asyncHandler((req, res) => controller.reject(req, res)),
  );
  router.post(
    '/:id/pay',
    authenticate,
    authorize('ADMIN'),
    validate({ params: withdrawalIdParamSchema, body: adminPaySchema }),
    asyncHandler((req, res) => controller.pay(req, res)),
  );

  return router;
}
