import type { Prisma, PrismaClient } from '@prisma/client';

import { ConflictError } from '../../../shared/errors/http-errors.js';
import type { PaginatedResponse } from '../../../shared/types/pagination.types.js';
import { walletAccountMapper, walletLedgerEntryMapper } from '../domain/mapper.js';
import type { WalletRepository } from '../domain/repository.contract.js';
import type {
  AppendLedgerEntryResult,
  WalletAccountDto,
  WalletLedgerEntryDto,
  WalletLedgerFilter,
  WriteLedgerEntryInput,
} from '../domain/types.js';

type TransactionClient = Prisma.TransactionClient;

/** Internal control-flow signal only — never thrown past this file. */
class IdempotencyReplayError extends Error {
  constructor(public readonly idempotencyKey: string) {
    super(`ledger entry for key ${idempotencyKey} already written by a concurrent request`);
  }
}

/**
 * Core transactional ledger write, exported so other features (e.g. the
 * streak check-in flow) can compose it inside their OWN `prisma.$transaction`
 * when a credit must be atomic with other writes (e.g. the check-in row).
 * Standalone callers should use `WalletPrismaRepository.appendLedgerEntry`
 * instead, which wraps this in its own transaction and handles the
 * idempotent-replay case for them.
 *
 * Throws `IdempotencyReplayError` if a concurrent writer already inserted the
 * same idempotencyKey — the caller's transaction aborts; whoever owns the
 * outer transaction boundary must re-query by idempotencyKey afterwards.
 */
export async function writeLedgerEntryInTx(
  tx: TransactionClient,
  input: WriteLedgerEntryInput,
  expectedVersion: number,
): Promise<AppendLedgerEntryResult | null> {
  const existing = await tx.walletLedgerEntry.findUnique({
    where: { idempotencyKey: input.idempotencyKey },
  });
  if (existing) {
    const account = await tx.walletAccount.findUniqueOrThrow({
      where: { id: existing.walletAccountId },
    });
    return {
      entry: walletLedgerEntryMapper.toDto(existing),
      account: walletAccountMapper.toDto(account),
      replayed: true,
    };
  }

  const account = await tx.walletAccount.findUnique({ where: { userId: input.userId } });
  if (!account) {
    throw new Error(`Wallet account for user ${input.userId} does not exist`);
  }
  if (account.version !== expectedVersion) return null; // lost the race — caller retries

  const delta = input.direction === 'CREDIT' ? input.amountMinorUnits : -input.amountMinorUnits;
  const newBalance = account.balanceMinorUnits + delta;
  if (newBalance < 0) {
    throw new ConflictError('Insufficient wallet balance');
  }

  const updateResult = await tx.walletAccount.updateMany({
    where: { id: account.id, version: expectedVersion },
    data: { balanceMinorUnits: newBalance, version: { increment: 1 } },
  });
  if (updateResult.count === 0) return null; // another writer won the race

  const updatedAccount = await tx.walletAccount.findUniqueOrThrow({ where: { id: account.id } });

  try {
    const entry = await tx.walletLedgerEntry.create({
      data: {
        walletAccountId: account.id,
        userId: input.userId,
        type: input.type,
        direction: input.direction,
        amountMinorUnits: input.amountMinorUnits,
        balanceAfterMinorUnits: newBalance,
        referenceType: input.referenceType,
        referenceId: input.referenceId,
        idempotencyKey: input.idempotencyKey,
        note: input.note ?? null,
        createdBy: input.createdBy ?? null,
      },
    });
    return {
      entry: walletLedgerEntryMapper.toDto(entry),
      account: walletAccountMapper.toDto(updatedAccount),
      replayed: false,
    };
  } catch {
    // Unique-constraint race on idempotencyKey — abort so the balance update
    // (and anything else in the caller's transaction) rolls back too.
    throw new IdempotencyReplayError(input.idempotencyKey);
  }
}

/** Locks `amountMinorUnits` so it cannot be spent twice. Returns null on version conflict. */
export async function lockFundsInTx(
  tx: TransactionClient,
  userId: string,
  amountMinorUnits: number,
  expectedVersion: number,
): Promise<WalletAccountDto | null> {
  const account = await tx.walletAccount.findUnique({ where: { userId } });
  if (!account) {
    throw new Error(`Wallet account for user ${userId} does not exist`);
  }
  if (account.version !== expectedVersion) return null;
  const available = account.balanceMinorUnits - account.lockedMinorUnits;
  if (available < amountMinorUnits) {
    throw new ConflictError('Insufficient available balance');
  }
  const updateResult = await tx.walletAccount.updateMany({
    where: { id: account.id, version: expectedVersion },
    data: { lockedMinorUnits: { increment: amountMinorUnits }, version: { increment: 1 } },
  });
  if (updateResult.count === 0) return null;
  const updated = await tx.walletAccount.findUniqueOrThrow({ where: { id: account.id } });
  return walletAccountMapper.toDto(updated);
}

/** Releases a previously locked amount. Returns null on version conflict. */
export async function unlockFundsInTx(
  tx: TransactionClient,
  userId: string,
  amountMinorUnits: number,
  expectedVersion: number,
): Promise<WalletAccountDto | null> {
  const account = await tx.walletAccount.findUnique({ where: { userId } });
  if (!account) {
    throw new Error(`Wallet account for user ${userId} does not exist`);
  }
  if (account.version !== expectedVersion) return null;
  if (account.lockedMinorUnits < amountMinorUnits) {
    throw new ConflictError('Locked balance is lower than the unlock amount');
  }
  const updateResult = await tx.walletAccount.updateMany({
    where: { id: account.id, version: expectedVersion },
    data: { lockedMinorUnits: { decrement: amountMinorUnits }, version: { increment: 1 } },
  });
  if (updateResult.count === 0) return null;
  const updated = await tx.walletAccount.findUniqueOrThrow({ where: { id: account.id } });
  return walletAccountMapper.toDto(updated);
}

export class WalletPrismaRepository implements WalletRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findOrCreateWalletAccount(userId: string): Promise<WalletAccountDto> {
    const account = await this.prisma.walletAccount.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });
    return walletAccountMapper.toDto(account);
  }

  async findLedgerEntryByIdempotencyKey(idempotencyKey: string): Promise<WalletLedgerEntryDto | null> {
    const entry = await this.prisma.walletLedgerEntry.findUnique({ where: { idempotencyKey } });
    return entry ? walletLedgerEntryMapper.toDto(entry) : null;
  }

  async listLedgerEntries(filter: WalletLedgerFilter): Promise<PaginatedResponse<WalletLedgerEntryDto>> {
    const page = Math.max(1, filter.page ?? 1);
    const pageSize = Math.min(100, Math.max(1, filter.pageSize ?? 20));
    const skip = (page - 1) * pageSize;

    const [total, rows] = await Promise.all([
      this.prisma.walletLedgerEntry.count({ where: { userId: filter.userId } }),
      this.prisma.walletLedgerEntry.findMany({
        where: { userId: filter.userId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: pageSize,
      }),
    ]);

    return {
      data: rows.map(walletLedgerEntryMapper.toDto),
      page,
      pageSize,
      total,
    };
  }

  async appendLedgerEntry(
    input: WriteLedgerEntryInput,
    expectedVersion: number,
  ): Promise<AppendLedgerEntryResult | null> {
    try {
      return await this.prisma.$transaction((tx) => writeLedgerEntryInTx(tx, input, expectedVersion));
    } catch (err) {
      if (err instanceof IdempotencyReplayError) {
        const winner = await this.prisma.walletLedgerEntry.findUnique({
          where: { idempotencyKey: err.idempotencyKey },
        });
        if (winner) {
          const winnerAccount = await this.prisma.walletAccount.findUniqueOrThrow({
            where: { id: winner.walletAccountId },
          });
          return {
            entry: walletLedgerEntryMapper.toDto(winner),
            account: walletAccountMapper.toDto(winnerAccount),
            replayed: true,
          };
        }
      }
      throw err;
    }
  }
}
