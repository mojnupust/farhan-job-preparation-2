import { z } from 'zod';

export const adminAdjustWalletSchema = z.object({
  direction: z.enum(['CREDIT', 'DEBIT']),
  amountMinorUnits: z.number().int().positive().max(100_000_000), // 1,000,000 BDT sanity cap
  note: z.string().min(3).max(500),
  idempotencyKey: z.string().min(8).max(100),
});

export const listLedgerQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional(),
  pageSize: z.coerce.number().int().min(1).max(100).optional(),
});
