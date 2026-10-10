import type { PaginatedResponse } from '../../../shared/types/pagination.types.js';
import { BadRequestError, ConflictError } from '../../../shared/errors/http-errors.js';

import type { WalletRepository } from './repository.contract.js';
import type {
  AdminAdjustWalletInput,
  LedgerDirection,
  LedgerEntryType,
  WalletAccountDto,
  WalletLedgerEntryDto,
  WalletLedgerFilter,
} from './types.js';

const MAX_VERSION_CONFLICT_RETRIES = 5;

export interface WriteEntryInput {
  userId: string;
  type: LedgerEntryType;
  direction: LedgerDirection;
  amountMinorUnits: number;
  referenceType: string;
  referenceId: string;
  idempotencyKey: string;
  note?: string;
  createdBy?: string;
}

export class WalletService {
  constructor(private readonly repository: WalletRepository) {}

  async getOrCreateWallet(userId: string): Promise<WalletAccountDto> {
    return this.repository.findOrCreateWalletAccount(userId);
  }

  async listLedger(filter: WalletLedgerFilter): Promise<PaginatedResponse<WalletLedgerEntryDto>> {
    return this.repository.listLedgerEntries(filter);
  }

  /** Always moves the balance up. See `writeEntry` for idempotency/concurrency guarantees. */
  async credit(input: Omit<WriteEntryInput, 'direction'>): Promise<WalletLedgerEntryDto> {
    return this.writeEntry({ ...input, direction: 'CREDIT' });
  }

  /** Always moves the balance down; fails with ConflictError if it would go negative. */
  async debit(input: Omit<WriteEntryInput, 'direction'>): Promise<WalletLedgerEntryDto> {
    return this.writeEntry({ ...input, direction: 'DEBIT' });
  }

  async adjustByAdmin(input: AdminAdjustWalletInput): Promise<WalletLedgerEntryDto> {
    return this.writeEntry({
      userId: input.userId,
      type: 'ADMIN_ADJUSTMENT',
      direction: input.direction,
      amountMinorUnits: input.amountMinorUnits,
      referenceType: 'ADMIN',
      referenceId: input.adminId,
      idempotencyKey: input.idempotencyKey,
      note: input.note,
      createdBy: input.adminId,
    });
  }

  /**
   * Idempotent, concurrency-safe ledger write.
   *  1. A prior entry with the same idempotencyKey is returned as-is (no new write).
   *  2. Otherwise the wallet is fetched (created lazily) and the write is attempted
   *     against its current `version`. A null result means another writer won the
   *     race; we re-fetch and retry up to MAX_VERSION_CONFLICT_RETRIES times.
   */
  private async writeEntry(input: WriteEntryInput): Promise<WalletLedgerEntryDto> {
    if (!Number.isInteger(input.amountMinorUnits) || input.amountMinorUnits <= 0) {
      throw new BadRequestError('amountMinorUnits must be a positive integer (poisha)');
    }

    const existing = await this.repository.findLedgerEntryByIdempotencyKey(input.idempotencyKey);
    if (existing) return existing;

    for (let attempt = 0; attempt < MAX_VERSION_CONFLICT_RETRIES; attempt++) {
      const account = await this.repository.findOrCreateWalletAccount(input.userId);
      const result = await this.repository.appendLedgerEntry(input, account.version);
      if (result) return result.entry;
    }

    throw new ConflictError('Wallet is under heavy contention, please retry');
  }
}
