import type { PrismaClient } from '@prisma/client';
import type { AwilixContainer } from 'awilix';
import { Router } from 'express';

import { authenticate, authorize } from '../../../../infrastructure/middleware/authenticate.js';
import { validate } from '../../../../infrastructure/middleware/validate.js';
import { asyncHandler } from '../../../../shared/utils/async-handler.js';
import { WalletService } from '../../domain/wallet.service.js';
import { WalletPrismaRepository } from '../../infra/wallet.prisma-repository.js';
import { adminAdjustWalletSchema, listLedgerQuerySchema } from '../validation.js';

import { WalletController } from './wallet.controller.js';

export function createWalletRoutes(container: AwilixContainer): Router {
  const router = Router();

  const prisma = container.resolve<PrismaClient>('prismaClient');
  const repository = new WalletPrismaRepository(prisma);
  const service = new WalletService(repository);
  const controller = new WalletController(service);

  // --- Member: own wallet ---
  router.get(
    '/me',
    authenticate,
    asyncHandler((req, res) => controller.getMyWallet(req, res)),
  );

  router.get(
    '/me/ledger',
    authenticate,
    validate({ query: listLedgerQuerySchema }),
    asyncHandler((req, res) => controller.getMyLedger(req, res)),
  );

  // --- Admin: any user's wallet + manual adjustment ---
  router.get(
    '/admin/:userId',
    authenticate,
    authorize('ADMIN'),
    asyncHandler((req, res) => controller.adminGetWallet(req, res)),
  );

  router.post(
    '/admin/:userId/adjust',
    authenticate,
    authorize('ADMIN'),
    validate({ body: adminAdjustWalletSchema }),
    asyncHandler((req, res) => controller.adminAdjustWallet(req, res)),
  );

  return router;
}
