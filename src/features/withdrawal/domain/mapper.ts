import type { User, WithdrawalRequest } from '@prisma/client';

import type { WithdrawalRequestDto } from './types.js';

export function toWithdrawalDto(
  entity: WithdrawalRequest & { user?: Pick<User, 'name' | 'mobile'> | null },
): WithdrawalRequestDto {
  return {
    id: entity.id,
    userId: entity.userId,
    amountMinorUnits: entity.amountMinorUnits,
    method: entity.method,
    destinationNumber: entity.destinationNumber,
    status: entity.status,
    fraudFlag: entity.fraudFlag,
    fraudReason: entity.fraudReason,
    paidTrxId: entity.paidTrxId,
    adminNote: entity.adminNote,
    reviewedBy: entity.reviewedBy,
    reviewedAt: entity.reviewedAt,
    idempotencyKey: entity.idempotencyKey,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
    ...(entity.user
      ? { user: { name: entity.user.name, mobile: entity.user.mobile } }
      : {}),
  };
}
