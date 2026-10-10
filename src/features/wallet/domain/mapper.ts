import type { WalletAccount, WalletLedgerEntry } from '@prisma/client';

import type { WalletAccountDto, WalletLedgerEntryDto } from './types.js';

export const walletAccountMapper = {
  toDto(entity: WalletAccount): WalletAccountDto {
    return {
      id: entity.id,
      userId: entity.userId,
      balanceMinorUnits: entity.balanceMinorUnits,
      lockedMinorUnits: entity.lockedMinorUnits,
      availableMinorUnits: entity.balanceMinorUnits - entity.lockedMinorUnits,
      version: entity.version,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  },
};

export const walletLedgerEntryMapper = {
  toDto(entity: WalletLedgerEntry): WalletLedgerEntryDto {
    return {
      id: entity.id,
      walletAccountId: entity.walletAccountId,
      userId: entity.userId,
      type: entity.type,
      direction: entity.direction,
      amountMinorUnits: entity.amountMinorUnits,
      balanceAfterMinorUnits: entity.balanceAfterMinorUnits,
      referenceType: entity.referenceType,
      referenceId: entity.referenceId,
      idempotencyKey: entity.idempotencyKey,
      note: entity.note,
      createdBy: entity.createdBy,
      createdAt: entity.createdAt,
    };
  },
};
