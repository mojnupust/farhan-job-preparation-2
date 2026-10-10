import type { PrismaClient } from '@prisma/client';
import type { AwilixContainer } from 'awilix';
import { Router } from 'express';

import { authenticate, authorize } from '../../../../infrastructure/middleware/authenticate.js';
import { validate } from '../../../../infrastructure/middleware/validate.js';
import { asyncHandler } from '../../../../shared/utils/async-handler.js';
import { RewardConfigService } from '../../domain/reward-config.service.js';
import { RewardConfigPrismaRepository } from '../../infra/reward-config.prisma-repository.js';
import { updateRewardConfigSchema } from '../validation.js';

import { RewardConfigController } from './reward-config.controller.js';

export function createRewardConfigRoutes(container: AwilixContainer): Router {
  const router = Router();

  const prisma = container.resolve<PrismaClient>('prismaClient');
  const repository = new RewardConfigPrismaRepository(prisma);
  const service = new RewardConfigService(repository);
  const controller = new RewardConfigController(service);

  router.get(
    '/',
    authenticate,
    authorize('ADMIN'),
    asyncHandler((req, res) => controller.getConfig(req, res)),
  );

  router.patch(
    '/',
    authenticate,
    authorize('ADMIN'),
    validate({ body: updateRewardConfigSchema }),
    asyncHandler((req, res) => controller.updateConfig(req, res)),
  );

  return router;
}
