import type { PrismaClient } from '@prisma/client';

import { writeLedgerEntryInTx } from '../../wallet/index.js';
import { dateStringToUtcMidnight, dhakaDateRangeUtc } from '../domain/dhaka-date.js';
import { dailyStreakMapper, streakCheckInMapper } from '../domain/mapper.js';
import type { ActivityGateProgressRaw, StreakRepository } from '../domain/repository.contract.js';
import type { CheckInResult, DailyStreakDto, StreakCheckInDto } from '../domain/types.js';

const MAX_RETRIES = 5;

export class StreakPrismaRepository implements StreakRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findOrCreateDailyStreak(userId: string): Promise<DailyStreakDto> {
    const row = await this.prisma.dailyStreak.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });
    return dailyStreakMapper.toDto(row);
  }

  async findCheckIn(userId: string, dhakaDate: string): Promise<StreakCheckInDto | null> {
    const row = await this.prisma.streakCheckIn.findUnique({
      where: { userId_dhakaDate: { userId, dhakaDate: dateStringToUtcMidnight(dhakaDate) } },
    });
    return row ? streakCheckInMapper.toDto(row) : null;
  }

  async isPremiumUser(userId: string): Promise<boolean> {
    const pkg = await this.prisma.userPackage.findFirst({
      where: { userId, isActive: true, endDate: { gte: new Date() } },
      select: { id: true },
    });
    return pkg !== null;
  }

  async getTodaysActivity(userId: string, dhakaDate: string): Promise<ActivityGateProgressRaw> {
    const { startUtc, endUtc } = dhakaDateRangeUtc(dhakaDate);
    const attempts = await this.prisma.examAttempt.findMany({
      where: { userId, isCompleted: true, submittedAt: { gte: startUtc, lt: endUtc } },
      select: { startedAt: true, submittedAt: true, totalCorrect: true, totalWrong: true },
    });

    let best: ActivityGateProgressRaw = { answeredCount: 0, secondsSpent: 0 };
    for (const attempt of attempts) {
      const answeredCount = attempt.totalCorrect + attempt.totalWrong;
      const secondsSpent = attempt.submittedAt
        ? Math.max(0, (attempt.submittedAt.getTime() - attempt.startedAt.getTime()) / 1000)
        : 0;
      if (answeredCount > best.answeredCount) {
        best = { answeredCount, secondsSpent };
      }
    }
    return best;
  }

  async markLapsed(userId: string): Promise<DailyStreakDto> {
    const row = await this.prisma.dailyStreak.update({
      where: { userId },
      data: { status: 'LOST', currentDay: 0 },
    });
    return dailyStreakMapper.toDto(row);
  }

  async performCheckIn(
    input: Parameters<StreakRepository['performCheckIn']>[0],
  ): Promise<CheckInResult> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        // Create the check-in row FIRST — the unique (userId, dhakaDate)
        // constraint fails fast here for a concurrent duplicate, before any
        // budget/wallet writes happen.
        const checkInRow = await tx.streakCheckIn.create({
          data: {
            userId: input.userId,
            dhakaDate: dateStringToUtcMidnight(input.dhakaDate),
            dayNumber: input.checkIn.dayNumber,
            rewardMinorUnits: input.checkIn.rewardMinorUnits,
            rewardStatus: 'QUEUED',
            activityGatePassed: input.checkIn.activityGatePassed,
            usedFreeze: input.checkIn.usedFreeze,
            ledgerEntryId: null,
          },
        });

        let credited = false;
        let ledgerEntryId: string | null = null;

        if (input.shouldCredit) {
          const period = await tx.rewardsBudgetPeriod.upsert({
            where: { yearMonth: input.yearMonth },
            create: {
              yearMonth: input.yearMonth,
              budgetMinorUnits: input.configuredMonthlyBudgetMinorUnits,
            },
            update: {},
          });

          let currentPeriod = period;
          let reserved = false;
          for (let attempt = 0; attempt < MAX_RETRIES && !reserved; attempt++) {
            const wouldSpend = currentPeriod.spentMinorUnits + input.ledgerInput.amountMinorUnits;
            if (wouldSpend > currentPeriod.budgetMinorUnits) {
              if (!currentPeriod.isExhausted) {
                await tx.rewardsBudgetPeriod.update({
                  where: { id: currentPeriod.id },
                  data: { isExhausted: true },
                });
              }
              break; // genuinely not enough budget left this month — stays QUEUED
            }
            const updateResult = await tx.rewardsBudgetPeriod.updateMany({
              where: { id: currentPeriod.id, spentMinorUnits: currentPeriod.spentMinorUnits },
              data: { spentMinorUnits: wouldSpend },
            });
            if (updateResult.count === 1) {
              reserved = true;
            } else {
              currentPeriod = await tx.rewardsBudgetPeriod.findUniqueOrThrow({
                where: { id: currentPeriod.id },
              });
            }
          }

          if (reserved) {
            let account = await tx.walletAccount.upsert({
              where: { userId: input.userId },
              create: { userId: input.userId },
              update: {},
            });
            let ledgerResult: Awaited<ReturnType<typeof writeLedgerEntryInTx>> = null;
            for (let attempt = 0; attempt < MAX_RETRIES && !ledgerResult; attempt++) {
              ledgerResult = await writeLedgerEntryInTx(tx, input.ledgerInput, account.version);
              if (!ledgerResult) {
                account = await tx.walletAccount.findUniqueOrThrow({ where: { id: account.id } });
              }
            }
            if (!ledgerResult) {
              throw new Error('Wallet is under heavy contention, please retry');
            }
            credited = true;
            ledgerEntryId = ledgerResult.entry.id;
          }
        }

        const finalCheckIn = await tx.streakCheckIn.update({
          where: { id: checkInRow.id },
          data: { rewardStatus: credited ? 'CREDITED' : 'QUEUED', ledgerEntryId },
        });

        const updatedStreak = await tx.dailyStreak.update({
          where: { userId: input.userId },
          data: {
            currentDay: input.streakUpdate.currentDay,
            longestStreak: input.streakUpdate.longestStreak,
            cycleStartDate: dateStringToUtcMidnight(input.streakUpdate.cycleStartDate),
            lastCheckInDate: dateStringToUtcMidnight(input.streakUpdate.lastCheckInDate),
            freezesUsedThisMonth: input.streakUpdate.freezesUsedThisMonth,
            freezesMonth: input.streakUpdate.freezesMonth,
            status: input.streakUpdate.status,
            completedCycles: input.streakUpdate.completedCycles,
          },
        });

        return {
          streak: dailyStreakMapper.toDto(updatedStreak),
          checkIn: streakCheckInMapper.toDto(finalCheckIn),
          alreadyDone: false,
          cycleCompleted: false, // the service overwrites this with the already-known decision
        };
      });
    } catch (err) {
      // Re-query rather than inspect the Prisma error shape — if a check-in
      // row now exists for this (userId, dhakaDate), a concurrent request won
      // the race; treat this call as an idempotent replay instead of a failure.
      const winner = await this.prisma.streakCheckIn.findUnique({
        where: {
          userId_dhakaDate: { userId: input.userId, dhakaDate: dateStringToUtcMidnight(input.dhakaDate) },
        },
      });
      if (winner) {
        const streak = await this.findOrCreateDailyStreak(input.userId);
        return {
          streak,
          checkIn: streakCheckInMapper.toDto(winner),
          alreadyDone: true,
          cycleCompleted: false,
        };
      }
      throw err;
    }
  }
}
