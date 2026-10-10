import type { DailyStreak, StreakCheckIn } from '@prisma/client';

import type { DailyStreakDto, StreakCheckInDto } from './types.js';

function dateToDateString(d: Date | null): string | null {
  return d ? d.toISOString().slice(0, 10) : null;
}

export const dailyStreakMapper = {
  toDto(entity: DailyStreak): DailyStreakDto {
    return {
      id: entity.id,
      userId: entity.userId,
      currentDay: entity.currentDay,
      longestStreak: entity.longestStreak,
      cycleStartDate: dateToDateString(entity.cycleStartDate),
      lastCheckInDate: dateToDateString(entity.lastCheckInDate),
      freezesUsedThisMonth: entity.freezesUsedThisMonth,
      freezesMonth: entity.freezesMonth,
      status: entity.status,
      completedCycles: entity.completedCycles,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  },
};

export const streakCheckInMapper = {
  toDto(entity: StreakCheckIn): StreakCheckInDto {
    return {
      id: entity.id,
      userId: entity.userId,
      dhakaDate: dateToDateString(entity.dhakaDate)!,
      dayNumber: entity.dayNumber,
      rewardMinorUnits: entity.rewardMinorUnits,
      rewardStatus: entity.rewardStatus,
      activityGatePassed: entity.activityGatePassed,
      usedFreeze: entity.usedFreeze,
      ledgerEntryId: entity.ledgerEntryId,
      createdAt: entity.createdAt,
    };
  },
};
