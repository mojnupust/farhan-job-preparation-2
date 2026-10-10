import type { RewardConfig } from '@prisma/client';

import type { RewardConfigDto } from './types.js';

export const rewardConfigMapper = {
  toDto(entity: RewardConfig): RewardConfigDto {
    return {
      id: entity.id,
      streakRateMinorUnitsPerDay: entity.streakRateMinorUnitsPerDay,
      streakFreeDays: entity.streakFreeDays,
      streakPremiumDays: entity.streakPremiumDays,
      streakActivityGateFromDay: entity.streakActivityGateFromDay,
      streakGateMinQuestions: entity.streakGateMinQuestions,
      streakGateMinSeconds: entity.streakGateMinSeconds,
      streakFreezesFreePerMonth: entity.streakFreezesFreePerMonth,
      streakFreezesPremiumPerMonth: entity.streakFreezesPremiumPerMonth,
      withdrawalMinMinorUnits: entity.withdrawalMinMinorUnits,
      withdrawalRequiresVerifiedPhone: entity.withdrawalRequiresVerifiedPhone,
      monthlyBudgetMinorUnits: entity.monthlyBudgetMinorUnits,
      updatedBy: entity.updatedBy,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  },
};
