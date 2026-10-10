import { describe, it, expect, vi, beforeEach } from 'vitest';

import { BadRequestError, ConflictError } from '../../../../shared/errors/http-errors.js';
import type { WalletRepository } from '../repository.contract.js';
import type { WalletAccountDto, WalletLedgerEntryDto } from '../types.js';
import { WalletService } from '../wallet.service.js';

function makeAccount(overrides: Partial<WalletAccountDto> = {}): WalletAccountDto {
  return {
    id: 'wallet-1',
    userId: 'user-1',
    balanceMinorUnits: 0,
    lockedMinorUnits: 0,
    availableMinorUnits: 0,
    version: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
}

function makeEntry(overrides: Partial<WalletLedgerEntryDto> = {}): WalletLedgerEntryDto {
  return {
    id: 'entry-1',
    walletAccountId: 'wallet-1',
    userId: 'user-1',
    type: 'ADMIN_ADJUSTMENT',
    direction: 'CREDIT',
    amountMinorUnits: 100,
    balanceAfterMinorUnits: 100,
    referenceType: 'ADMIN',
    referenceId: 'admin-1',
    idempotencyKey: 'key-1',
    note: null,
    createdBy: null,
    createdAt: new Date(),
    ...overrides,
  };
}

describe('WalletService', () => {
  let repository: {
    findOrCreateWalletAccount: ReturnType<typeof vi.fn>;
    findLedgerEntryByIdempotencyKey: ReturnType<typeof vi.fn>;
    listLedgerEntries: ReturnType<typeof vi.fn>;
    appendLedgerEntry: ReturnType<typeof vi.fn>;
  };
  let service: WalletService;

  beforeEach(() => {
    repository = {
      findOrCreateWalletAccount: vi.fn(),
      findLedgerEntryByIdempotencyKey: vi.fn(),
      listLedgerEntries: vi.fn(),
      appendLedgerEntry: vi.fn(),
    };
    service = new WalletService(repository as unknown as WalletRepository);
  });

  describe('credit', () => {
    it('rejects non-positive amounts', async () => {
      await expect(
        service.credit({
          userId: 'user-1',
          type: 'STREAK_REWARD',
          amountMinorUnits: 0,
          referenceType: 'STREAK_CHECKIN',
          referenceId: 'checkin-1',
          idempotencyKey: 'k1',
        }),
      ).rejects.toBeInstanceOf(BadRequestError);
      expect(repository.findOrCreateWalletAccount).not.toHaveBeenCalled();
    });

    it('rejects non-integer amounts', async () => {
      await expect(
        service.credit({
          userId: 'user-1',
          type: 'STREAK_REWARD',
          amountMinorUnits: 10.5,
          referenceType: 'STREAK_CHECKIN',
          referenceId: 'checkin-1',
          idempotencyKey: 'k1',
        }),
      ).rejects.toBeInstanceOf(BadRequestError);
    });

    it('writes a ledger entry against the current account version', async () => {
      repository.findLedgerEntryByIdempotencyKey.mockResolvedValue(null);
      repository.findOrCreateWalletAccount.mockResolvedValue(makeAccount({ version: 3 }));
      const entry = makeEntry({ amountMinorUnits: 600 });
      repository.appendLedgerEntry.mockResolvedValue({ entry, account: makeAccount(), replayed: false });

      const result = await service.credit({
        userId: 'user-1',
        type: 'STREAK_REWARD',
        amountMinorUnits: 600,
        referenceType: 'STREAK_CHECKIN',
        referenceId: 'checkin-60',
        idempotencyKey: 'streak:user-1:2026-10-10',
      });

      expect(result).toBe(entry);
      expect(repository.appendLedgerEntry).toHaveBeenCalledWith(
        expect.objectContaining({ direction: 'CREDIT', amountMinorUnits: 600 }),
        3,
      );
    });

    it('is idempotent — a known idempotencyKey short-circuits without touching the account', async () => {
      const existing = makeEntry({ idempotencyKey: 'dup-key' });
      repository.findLedgerEntryByIdempotencyKey.mockResolvedValue(existing);

      const result = await service.credit({
        userId: 'user-1',
        type: 'STREAK_REWARD',
        amountMinorUnits: 10,
        referenceType: 'STREAK_CHECKIN',
        referenceId: 'checkin-1',
        idempotencyKey: 'dup-key',
      });

      expect(result).toBe(existing);
      expect(repository.findOrCreateWalletAccount).not.toHaveBeenCalled();
      expect(repository.appendLedgerEntry).not.toHaveBeenCalled();
    });

    it('retries on version conflict and eventually succeeds', async () => {
      repository.findLedgerEntryByIdempotencyKey.mockResolvedValue(null);
      repository.findOrCreateWalletAccount
        .mockResolvedValueOnce(makeAccount({ version: 0 }))
        .mockResolvedValueOnce(makeAccount({ version: 1 }));
      const entry = makeEntry();
      repository.appendLedgerEntry
        .mockResolvedValueOnce(null) // lost the race on first attempt
        .mockResolvedValueOnce({ entry, account: makeAccount(), replayed: false });

      const result = await service.credit({
        userId: 'user-1',
        type: 'ADMIN_ADJUSTMENT',
        amountMinorUnits: 100,
        referenceType: 'ADMIN',
        referenceId: 'admin-1',
        idempotencyKey: 'k1',
      });

      expect(result).toBe(entry);
      expect(repository.appendLedgerEntry).toHaveBeenCalledTimes(2);
      expect(repository.findOrCreateWalletAccount).toHaveBeenCalledTimes(2);
    });

    it('gives up after repeated version conflicts', async () => {
      repository.findLedgerEntryByIdempotencyKey.mockResolvedValue(null);
      repository.findOrCreateWalletAccount.mockResolvedValue(makeAccount());
      repository.appendLedgerEntry.mockResolvedValue(null);

      await expect(
        service.credit({
          userId: 'user-1',
          type: 'ADMIN_ADJUSTMENT',
          amountMinorUnits: 100,
          referenceType: 'ADMIN',
          referenceId: 'admin-1',
          idempotencyKey: 'k1',
        }),
      ).rejects.toBeInstanceOf(ConflictError);
    });
  });

  describe('debit', () => {
    it('passes direction DEBIT through to the repository', async () => {
      repository.findLedgerEntryByIdempotencyKey.mockResolvedValue(null);
      repository.findOrCreateWalletAccount.mockResolvedValue(makeAccount({ version: 0 }));
      const entry = makeEntry({ direction: 'DEBIT' });
      repository.appendLedgerEntry.mockResolvedValue({ entry, account: makeAccount(), replayed: false });

      await service.debit({
        userId: 'user-1',
        type: 'WITHDRAWAL_PAID',
        amountMinorUnits: 10_000,
        referenceType: 'WITHDRAWAL',
        referenceId: 'wd-1',
        idempotencyKey: 'k-debit',
      });

      expect(repository.appendLedgerEntry).toHaveBeenCalledWith(
        expect.objectContaining({ direction: 'DEBIT' }),
        0,
      );
    });
  });

  describe('adjustByAdmin', () => {
    it('builds an ADMIN_ADJUSTMENT entry with the admin as creator and reference', async () => {
      repository.findLedgerEntryByIdempotencyKey.mockResolvedValue(null);
      repository.findOrCreateWalletAccount.mockResolvedValue(makeAccount({ version: 0 }));
      const entry = makeEntry();
      repository.appendLedgerEntry.mockResolvedValue({ entry, account: makeAccount(), replayed: false });

      await service.adjustByAdmin({
        userId: 'user-1',
        direction: 'CREDIT',
        amountMinorUnits: 500,
        note: 'manual correction',
        idempotencyKey: 'admin-key-1',
        adminId: 'admin-99',
      });

      expect(repository.appendLedgerEntry).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'ADMIN_ADJUSTMENT',
          referenceType: 'ADMIN',
          referenceId: 'admin-99',
          createdBy: 'admin-99',
          note: 'manual correction',
        }),
        0,
      );
    });
  });
});
