import { describe, it, expect, vi, beforeEach } from 'vitest';

import { ConflictError } from '../../../../shared/errors/http-errors.js';
import { WalletPrismaRepository } from '../wallet.prisma-repository.js';

function createMockPrisma() {
  const walletAccount = {
    upsert: vi.fn(),
    findUnique: vi.fn(),
    findUniqueOrThrow: vi.fn(),
    updateMany: vi.fn(),
  };
  const walletLedgerEntry = {
    findUnique: vi.fn(),
    create: vi.fn(),
    count: vi.fn(),
    findMany: vi.fn(),
  };
  const prisma = {
    walletAccount,
    walletLedgerEntry,
    // The mock transaction just invokes the callback with the same delegate
    // objects — enough to exercise the repository's control flow.
    $transaction: vi.fn(async (fn: (tx: typeof prisma) => unknown) => fn(prisma)),
  };
  return prisma;
}

const baseAccount = {
  id: 'wallet-1',
  userId: 'user-1',
  balanceMinorUnits: 1000,
  lockedMinorUnits: 0,
  version: 2,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const baseInput = {
  userId: 'user-1',
  type: 'ADMIN_ADJUSTMENT' as const,
  direction: 'CREDIT' as const,
  amountMinorUnits: 100,
  referenceType: 'ADMIN',
  referenceId: 'admin-1',
  idempotencyKey: 'key-1',
};

describe('WalletPrismaRepository', () => {
  let prisma: ReturnType<typeof createMockPrisma>;
  let repository: WalletPrismaRepository;

  beforeEach(() => {
    prisma = createMockPrisma();
    repository = new WalletPrismaRepository(prisma as never);
  });

  it('findOrCreateWalletAccount upserts by userId', async () => {
    prisma.walletAccount.upsert.mockResolvedValue(baseAccount);
    const dto = await repository.findOrCreateWalletAccount('user-1');
    expect(prisma.walletAccount.upsert).toHaveBeenCalledWith({
      where: { userId: 'user-1' },
      create: { userId: 'user-1' },
      update: {},
    });
    expect(dto.availableMinorUnits).toBe(1000);
  });

  it('returns null when the account version no longer matches (lost the race before update)', async () => {
    prisma.walletLedgerEntry.findUnique.mockResolvedValue(null);
    prisma.walletAccount.findUnique.mockResolvedValue({ ...baseAccount, version: 5 });

    const result = await repository.appendLedgerEntry(baseInput, 2);

    expect(result).toBeNull();
    expect(prisma.walletAccount.updateMany).not.toHaveBeenCalled();
  });

  it('returns null when updateMany affects zero rows (lost the race at write time)', async () => {
    prisma.walletLedgerEntry.findUnique.mockResolvedValue(null);
    prisma.walletAccount.findUnique.mockResolvedValue(baseAccount);
    prisma.walletAccount.updateMany.mockResolvedValue({ count: 0 });

    const result = await repository.appendLedgerEntry(baseInput, 2);

    expect(result).toBeNull();
    expect(prisma.walletLedgerEntry.create).not.toHaveBeenCalled();
  });

  it('throws ConflictError when a debit would make the balance negative', async () => {
    prisma.walletLedgerEntry.findUnique.mockResolvedValue(null);
    prisma.walletAccount.findUnique.mockResolvedValue({ ...baseAccount, balanceMinorUnits: 50 });

    await expect(
      repository.appendLedgerEntry({ ...baseInput, direction: 'DEBIT', amountMinorUnits: 100 }, 2),
    ).rejects.toBeInstanceOf(ConflictError);
    expect(prisma.walletAccount.updateMany).not.toHaveBeenCalled();
  });

  it('writes the entry and returns the updated account on success', async () => {
    prisma.walletLedgerEntry.findUnique.mockResolvedValue(null);
    prisma.walletAccount.findUnique.mockResolvedValue(baseAccount);
    prisma.walletAccount.updateMany.mockResolvedValue({ count: 1 });
    const updatedAccount = { ...baseAccount, balanceMinorUnits: 1100, version: 3 };
    prisma.walletAccount.findUniqueOrThrow.mockResolvedValue(updatedAccount);
    const createdEntry = {
      id: 'entry-1',
      walletAccountId: 'wallet-1',
      userId: 'user-1',
      type: 'ADMIN_ADJUSTMENT',
      direction: 'CREDIT',
      amountMinorUnits: 100,
      balanceAfterMinorUnits: 1100,
      referenceType: 'ADMIN',
      referenceId: 'admin-1',
      idempotencyKey: 'key-1',
      note: null,
      createdBy: null,
      createdAt: new Date(),
    };
    prisma.walletLedgerEntry.create.mockResolvedValue(createdEntry);

    const result = await repository.appendLedgerEntry(baseInput, 2);

    expect(result).not.toBeNull();
    expect(result!.replayed).toBe(false);
    expect(result!.entry.balanceAfterMinorUnits).toBe(1100);
    expect(result!.account.balanceMinorUnits).toBe(1100);
    expect(prisma.walletAccount.updateMany).toHaveBeenCalledWith({
      where: { id: 'wallet-1', version: 2 },
      data: { balanceMinorUnits: 1100, version: { increment: 1 } },
    });
  });

  it('returns the existing entry as a replay when the idempotency key is already used', async () => {
    const existingEntry = {
      id: 'entry-existing',
      walletAccountId: 'wallet-1',
      userId: 'user-1',
      type: 'ADMIN_ADJUSTMENT',
      direction: 'CREDIT',
      amountMinorUnits: 100,
      balanceAfterMinorUnits: 900,
      referenceType: 'ADMIN',
      referenceId: 'admin-1',
      idempotencyKey: 'key-1',
      note: null,
      createdBy: null,
      createdAt: new Date(),
    };
    prisma.walletLedgerEntry.findUnique.mockResolvedValue(existingEntry);
    prisma.walletAccount.findUniqueOrThrow.mockResolvedValue(baseAccount);

    const result = await repository.appendLedgerEntry(baseInput, 2);

    expect(result!.replayed).toBe(true);
    expect(result!.entry).toEqual(expect.objectContaining({ id: 'entry-existing' }));
    expect(prisma.walletAccount.updateMany).not.toHaveBeenCalled();
  });

  it('resolves a concurrent duplicate insert as a replay instead of failing', async () => {
    prisma.walletLedgerEntry.findUnique
      .mockResolvedValueOnce(null) // first check inside the tx — not written yet
      .mockResolvedValueOnce({
        // second check, outside the tx, after the concurrent writer won
        id: 'entry-winner',
        walletAccountId: 'wallet-1',
        userId: 'user-1',
        type: 'ADMIN_ADJUSTMENT',
        direction: 'CREDIT',
        amountMinorUnits: 100,
        balanceAfterMinorUnits: 1100,
        referenceType: 'ADMIN',
        referenceId: 'admin-1',
        idempotencyKey: 'key-1',
        note: null,
        createdBy: null,
        createdAt: new Date(),
      });
    prisma.walletAccount.findUnique.mockResolvedValue(baseAccount);
    prisma.walletAccount.updateMany.mockResolvedValue({ count: 1 });
    prisma.walletAccount.findUniqueOrThrow.mockResolvedValue({ ...baseAccount, balanceMinorUnits: 1100 });
    prisma.walletLedgerEntry.create.mockRejectedValue(new Error('Unique constraint failed'));

    const result = await repository.appendLedgerEntry(baseInput, 2);

    expect(result!.replayed).toBe(true);
    expect(result!.entry).toEqual(expect.objectContaining({ id: 'entry-winner' }));
  });
});
