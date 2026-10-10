import type { PrismaClient } from '@prisma/client';
import type { AwilixContainer } from 'awilix';
import { Router } from 'express';
import rateLimit, { ipKeyGenerator } from 'express-rate-limit';

import { authenticate } from '../../../../infrastructure/middleware/authenticate.js';
import { asyncHandler } from '../../../../shared/utils/async-handler.js';
import { RewardConfigPrismaRepository, RewardConfigService } from '../../../reward-config/index.js';
import { StreakService } from '../../domain/streak.service.js';
import { StreakPrismaRepository } from '../../infra/streak.prisma-repository.js';

import { StreakController } from './streak.controller.js';

// In-memory (no Redis needed) — one check-in per day is the expected usage,
// this just guards against accidental/abusive rapid-fire retries.
const checkInLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.userId ?? ipKeyGenerator(req.ip ?? '127.0.0.1'),
  message: { error: 'Too many check-in requests. Please try again shortly.' },
});

const statusLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.userId ?? ipKeyGenerator(req.ip ?? '127.0.0.1'),
  message: { error: 'Too many requests. Please try again shortly.' },
});

export function createStreakRoutes(container: AwilixContainer): Router {
  const router = Router();

  const prisma = container.resolve<PrismaClient>('prismaClient');
  const repository = new StreakPrismaRepository(prisma);
  const rewardConfigService = new RewardConfigService(new RewardConfigPrismaRepository(prisma));
  const service = new StreakService(repository, rewardConfigService);
  const controller = new StreakController(service);

  router.post(
    '/check-in',
    authenticate,
    checkInLimiter,
    asyncHandler((req, res) => controller.checkIn(req, res)),
  );

  router.get(
    '/status',
    authenticate,
    statusLimiter,
    asyncHandler((req, res) => controller.getStatus(req, res)),
  );

  return router;
}
