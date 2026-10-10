import type { PaginatedResponse } from '../../../shared/types/pagination.types.js';

import type {
  AppendLedgerEntryResult,
  WalletAccountDto,
  WalletLedgerEntryDto,
  WalletLedgerFilter,
  WriteLedgerEntryInput,
} from './types.js';

export interface WalletRepository {
  /** Creates the wallet account on first access — every user gets one lazily. */
  findOrCreateWalletAccount(userId: string): Promise<WalletAccountDto>;
  findLedgerEntryByIdempotencyKey(idempotencyKey: string): Promise<WalletLedgerEntryDto | null>;
  listLedgerEntries(filter: WalletLedgerFilter): Promise<PaginatedResponse<WalletLedgerEntryDto>>;

  /**
   * Atomically applies the balance delta and inserts the ledger row in one DB
   * transaction, guarded by optimistic concurrency on `expectedVersion`.
   * Returns null if another writer won the race — the caller must re-fetch
   * the account and retry. Returns `replayed: true` if `idempotencyKey` was
   * already used (no new write happened; the existing entry is returned).
   */
  appendLedgerEntry(
    input: WriteLedgerEntryInput,
    expectedVersion: number,
  ): Promise<AppendLedgerEntryResult | null>;
}
