import { describe, expect, it, vi } from 'vitest';

import { StreakService } from '../streak.service.js';
import type { StreakRepository } from '../repository.contract.js';
import type { DailyStreakDto } from '../types.js';

function streakDto(overrides: Partial<DailyStreakDto> = {}): DailyStreakDto {
  return {
    id: 's1',
    userId: 'u1',
    currentDay: 0,
    longestStreak: 0,
    cycleStartDate: null,
    lastCheckInDate: null,
    freezesUsedThisMonth: 0,
    freezesMonth: null,
    status: 'ACTIVE',
    completedCycles: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
}

const config = {
  id: 'c1',
  streakRateMinorUnitsPerDay: 10,
  streakFreeDays: 30,
  streakPremiumDays: 60,
  streakActivityGateFromDay: 5,
  streakGateMinQuestions: 10,
  streakGateMinSeconds: 60,
  streakFreezesFreePerMonth: 0,
  streakFreezesPremiumPerMonth: 1,
  withdrawalMinMinorUnits: 10000,
  withdrawalRequiresVerifiedPhone: true,
  monthlyBudgetMinorUnits: 500000,
  updatedBy: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('StreakService.checkIn', () => {
  it('returns alreadyDone when a check-in already exists today', async () => {
    const existing = {
      id: 'ci1',
      userId: 'u1',
      dhakaDate: '2026-10-10',
      dayNumber: 1,
      rewardMinorUnits: 10,
      rewardStatus: 'CREDITED' as const,
      activityGatePassed: true,
      usedFreeze: false,
      ledgerEntryId: 'l1',
      createdAt: new Date(),
    };
    const repository = {
      findCheckIn: vi.fn().mockResolvedValue(existing),
      findOrCreateDailyStreak: vi.fn().mockResolvedValue(streakDto({ currentDay: 1 })),
    } as unknown as StreakRepository;

    const service = new StreakService(repository, {
      getConfig: vi.fn(),
    } as never);

    const outcome = await service.checkIn('u1');
    expect(outcome.kind).toBe('done');
    if (outcome.kind === 'done') {
      expect(outcome.result.alreadyDone).toBe(true);
      expect(outcome.result.checkIn.id).toBe('ci1');
    }
  });

  it('returns activity_required when the gate is not met', async () => {
    const repository = {
      findCheckIn: vi.fn().mockResolvedValue(null),
      findOrCreateDailyStreak: vi
        .fn()
        .mockResolvedValue(streakDto({ currentDay: 4, lastCheckInDate: '2099-01-01' })),
      isPremiumUser: vi.fn().mockResolvedValue(false),
      getTodaysActivity: vi.fn().mockResolvedValue({ answeredCount: 2, secondsSpent: 10 }),
      performCheckIn: vi.fn(),
    } as unknown as StreakRepository;

    const service = new StreakService(repository, {
      getConfig: vi.fn().mockResolvedValue(config),
    } as never);

    // Force decideCheckIn onto a day >= gate by using lastCheckInDate = yesterday.
    // We cannot freeze "today" easily, so stub decide via a day-4 streak whose
    // last check-in is yesterday in Dhaka by using a date 1 day before today.
    const { dhakaDateString } = await import('../dhaka-date.js');
    const today = dhakaDateString();
    const yesterday = new Date(`${today}T00:00:00.000Z`);
    yesterday.setUTCDate(yesterday.getUTCDate() - 1);
    const ymd = yesterday.toISOString().slice(0, 10);

    (repository.findOrCreateDailyStreak as ReturnType<typeof vi.fn>).mockResolvedValue(
      streakDto({ currentDay: 4, lastCheckInDate: ymd }),
    );

    const outcome = await service.checkIn('u1');
    expect(outcome.kind).toBe('activity_required');
    if (outcome.kind === 'activity_required') {
      expect(outcome.progress.answeredCount).toBe(2);
      expect(outcome.progress.minQuestions).toBe(10);
    }
    expect(repository.performCheckIn).not.toHaveBeenCalled();
  });
});
