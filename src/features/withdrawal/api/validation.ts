import { z } from 'zod';

import { BD_MOBILE_RE } from '../domain/validate-request.js';

export const createWithdrawalSchema = z.object({
  amountMinorUnits: z.number().int().positive().max(100_000_000),
  method: z.enum(['BKASH', 'NAGAD', 'ROCKET']),
  destinationNumber: z
    .string()
    .transform((value) => value.replace(/\D/g, '').slice(-11))
    .pipe(z.string().regex(BD_MOBILE_RE, 'সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন')),
  idempotencyKey: z.string().min(8).max(100).optional(),
});

export const listWithdrawalsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional(),
  pageSize: z.coerce.number().int().min(1).max(100).optional(),
  status: z.enum(['REQUESTED', 'APPROVED', 'PAID', 'REJECTED']).optional(),
});

export const withdrawalIdParamSchema = z.object({
  id: z.string().min(1),
});

export const adminReviewSchema = z.object({
  adminNote: z.string().max(500).optional(),
});

export const adminPaySchema = z.object({
  paidTrxId: z.string().min(4).max(50),
  adminNote: z.string().max(500).optional(),
});
