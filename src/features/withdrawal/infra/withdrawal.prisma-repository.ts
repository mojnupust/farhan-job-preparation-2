import type { Prisma, PrismaClient, WithdrawalStatus as PrismaWithdrawalStatus } from '@prisma/client';

import { ConflictError, NotFoundError } from '../../../shared/errors/http-errors.js';
import type { PaginatedResponse } from '../../../shared/types/pagination.types.js';
import {
  lockFundsInTx,
  unlockFundsInTx,
  writeLedgerEntryInTx,
} from '../../wallet/index.js';
import type { WriteLedgerEntryInput } from '../../wallet/domain/types.js';
import { toWithdrawalDto } from '../domain/mapper.js';
import type {
  CreateWithdrawalRecordInput,
  UserContact,
  WithdrawalListFilter,
  WithdrawalRepository,
} from '../domain/repository.contract.js';
import { assertTransition } from '../domain/transitions.js';
import type { WithdrawalRequestDto, WithdrawalStatus } from '../domain/types.js';

const MAX_RETRIES = 5;
const USER_SELECT = { name: true, mobile: true } as const;

export class WithdrawalPrismaRepository implements WithdrawalRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<WithdrawalRequestDto | null> {
    const row = await this.prisma.withdrawalRequest.findUnique({
      where: { id },
      include: { user: { select: USER_SELECT } },
    });
    return row ? toWithdrawalDto(row) : null;
  }

  async findByIdempotencyKey(key: string): Promise<WithdrawalRequestDto | null> {
    const row = await this.prisma.withdrawalRequest.findUnique({
      where: { idempotencyKey: key },
      include: { user: { select: USER_SELECT } },
    });
    return row ? toWithdrawalDto(row) : null;
  }

  async findPendingByUserId(userId: string): Promise<WithdrawalRequestDto | null> {
    const row = await this.prisma.withdrawalRequest.findFirst({
      where: { userId, status: { in: ['REQUESTED', 'APPROVED'] } },
      include: { user: { select: USER_SELECT } },
      orderBy: { createdAt: 'desc' },
    });
    return row ? toWithdrawalDto(row) : null;
  }

  async findUserContact(userId: string): Promise<UserContact | null> {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, mobile: true },
    });
  }

  async getWalletSnapshot(userId: string): Promise<{
    availableMinorUnits: number;
    lockedMinorUnits: number;
    version: number;
  }> {
    const account = await this.prisma.walletAccount.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });
    return {
      availableMinorUnits: account.balanceMinorUnits - account.lockedMinorUnits,
      lockedMinorUnits: account.lockedMinorUnits,
      version: account.version,
    };
  }

  async list(filter: WithdrawalListFilter): Promise<PaginatedResponse<WithdrawalRequestDto>> {
    const page = Math.max(1, filter.page ?? 1);
    const pageSize = Math.min(100, Math.max(1, filter.pageSize ?? 20));
    const skip = (page - 1) * pageSize;
    const where = {
      ...(filter.userId ? { userId: filter.userId } : {}),
      ...(filter.status ? { status: filter.status } : {}),
    };

    const [total, rows] = await Promise.all([
      this.prisma.withdrawalRequest.count({ where }),
      this.prisma.withdrawalRequest.findMany({
        where,
        include: { user: { select: USER_SELECT } },
        orderBy: { createdAt: 'desc' },
        skip,
        take: pageSize,
      }),
    ]);

    return {
      data: rows.map(toWithdrawalDto),
      page,
      pageSize,
      total,
    };
  }

  async createAndLock(input: CreateWithdrawalRecordInput): Promise<WithdrawalRequestDto> {
    const existing = await this.findByIdempotencyKey(input.idempotencyKey);
    if (existing) return existing;

    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      const snapshot = await this.getWalletSnapshot(input.userId);
      try {
        return await this.prisma.$transaction(async (tx) => {
          const locked = await lockFundsInTx(
            tx,
            input.userId,
            input.amountMinorUnits,
            snapshot.version,
          );
          if (!locked) {
            throw new ConflictError('WALLET_VERSION');
          }
          const row = await tx.withdrawalRequest.create({
            data: {
              userId: input.userId,
              amountMinorUnits: input.amountMinorUnits,
              method: input.method,
              destinationNumber: input.destinationNumber,
              status: 'REQUESTED',
              fraudFlag: input.fraudFlag,
              fraudReason: input.fraudReason,
              idempotencyKey: input.idempotencyKey,
            },
            include: { user: { select: USER_SELECT } },
          });
          await tx.withdrawalAuditLog.create({
            data: {
              withdrawalRequestId: row.id,
              actorUserId: input.userId,
              action: 'CREATED',
            },
          });
          return toWithdrawalDto(row);
        });
      } catch (err) {
        if (err instanceof ConflictError && err.message === 'WALLET_VERSION') {
          continue;
        }
        const replay = await this.findByIdempotencyKey(input.idempotencyKey);
        if (replay) return replay;
        throw err;
      }
    }
    throw new ConflictError('Wallet is under heavy contention, please retry');
  }

  async approve(
    id: string,
    adminId: string,
    adminNote: string | null,
  ): Promise<WithdrawalRequestDto> {
    return this.transitionStatus(id, 'APPROVED', adminId, adminNote, 'APPROVED');
  }

  async reject(
    id: string,
    adminId: string,
    adminNote: string | null,
  ): Promise<WithdrawalRequestDto> {
    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      const current = await this.requireById(id);
      assertTransition(current.status, 'REJECTED');
      const snapshot = await this.getWalletSnapshot(current.userId);
      try {
        return await this.prisma.$transaction(async (tx) => {
          const unlocked = await unlockFundsInTx(
            tx,
            current.userId,
            current.amountMinorUnits,
            snapshot.version,
          );
          if (!unlocked) {
            throw new ConflictError('WALLET_VERSION');
          }
          const updated = await this.updateIfStatus(
            tx,
            id,
            current.status,
            {
              status: 'REJECTED',
              adminNote,
              reviewedBy: adminId,
              reviewedAt: new Date(),
            },
          );
          await tx.withdrawalAuditLog.create({
            data: {
              withdrawalRequestId: id,
              actorUserId: adminId,
              action: 'REJECTED',
              note: adminNote,
            },
          });
          return updated;
        });
      } catch (err) {
        if (err instanceof ConflictError && err.message === 'WALLET_VERSION') {
          continue;
        }
        throw err;
      }
    }
    throw new ConflictError('Wallet is under heavy contention, please retry');
  }

  async pay(
    id: string,
    adminId: string,
    paidTrxId: string,
    adminNote: string | null,
    ledgerInput: WriteLedgerEntryInput,
  ): Promise<WithdrawalRequestDto> {
    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      const current = await this.requireById(id);
      if (current.status === 'PAID') return current;
      assertTransition(current.status, 'PAID');
      const snapshot = await this.getWalletSnapshot(current.userId);
      try {
        return await this.prisma.$transaction(async (tx) => {
          const unlocked = await unlockFundsInTx(
            tx,
            current.userId,
            current.amountMinorUnits,
            snapshot.version,
          );
          if (!unlocked) {
            throw new ConflictError('WALLET_VERSION');
          }
          const ledger = await writeLedgerEntryInTx(tx, ledgerInput, unlocked.version);
          if (!ledger) {
            throw new ConflictError('WALLET_VERSION');
          }
          const updated = await this.updateIfStatus(tx, id, current.status, {
            status: 'PAID',
            paidTrxId,
            adminNote: adminNote ?? current.adminNote,
            reviewedBy: adminId,
            reviewedAt: new Date(),
          });
          await tx.withdrawalAuditLog.create({
            data: {
              withdrawalRequestId: id,
              actorUserId: adminId,
              action: 'MARKED_PAID',
              note: adminNote,
            },
          });
          return updated;
        });
      } catch (err) {
        if (err instanceof ConflictError && err.message === 'WALLET_VERSION') {
          continue;
        }
        throw err;
      }
    }
    throw new ConflictError('Wallet is under heavy contention, please retry');
  }

  private async transitionStatus(
    id: string,
    to: WithdrawalStatus,
    adminId: string,
    adminNote: string | null,
    auditAction: string,
  ): Promise<WithdrawalRequestDto> {
    const current = await this.requireById(id);
    assertTransition(current.status, to);
    const updated = await this.prisma.$transaction(async (tx) => {
      const row = await this.updateIfStatus(tx, id, current.status, {
        status: to,
        adminNote,
        reviewedBy: adminId,
        reviewedAt: new Date(),
      });
      await tx.withdrawalAuditLog.create({
        data: {
          withdrawalRequestId: id,
          actorUserId: adminId,
          action: auditAction,
          note: adminNote,
        },
      });
      return row;
    });
    return updated;
  }

  private async requireById(id: string): Promise<WithdrawalRequestDto> {
    const row = await this.findById(id);
    if (!row) throw new NotFoundError('Withdrawal request not found');
    return row;
  }

  private async updateIfStatus(
    tx: Prisma.TransactionClient,
    id: string,
    expectedStatus: WithdrawalStatus,
    data: {
      status: PrismaWithdrawalStatus;
      adminNote?: string | null;
      reviewedBy: string;
      reviewedAt: Date;
      paidTrxId?: string;
    },
  ): Promise<WithdrawalRequestDto> {
    const result = await tx.withdrawalRequest.updateMany({
      where: { id, status: expectedStatus },
      data,
    });
    if (result.count !== 1) {
      throw new ConflictError('Withdrawal already processed');
    }
    const row = await tx.withdrawalRequest.findUniqueOrThrow({
      where: { id },
      include: { user: { select: USER_SELECT } },
    });
    return toWithdrawalDto(row);
  }
}
