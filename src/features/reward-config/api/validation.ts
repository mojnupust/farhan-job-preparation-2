import { z } from 'zod';

export const updateRewardConfigSchema = z.object({
  streakRateMinorUnitsPerDay: z.number().int().positive().max(100_000).optional(),
  streakFreeDays: z.number().int().positive().max(365).optional(),
  streakPremiumDays: z.number().int().positive().max(365).optional(),
  streakActivityGateFromDay: z.number().int().positive().max(365).optional(),
  streakGateMinQuestions: z.number().int().positive().max(1000).optional(),
  streakGateMinSeconds: z.number().int().positive().max(86_400).optional(),
  streakFreezesFreePerMonth: z.number().int().min(0).max(31).optional(),
  streakFreezesPremiumPerMonth: z.number().int().min(0).max(31).optional(),
  withdrawalMinMinorUnits: z.number().int().positive().max(100_000_000).optional(),
  withdrawalRequiresVerifiedPhone: z.boolean().optional(),
  monthlyBudgetMinorUnits: z.number().int().positive().max(1_000_000_000).optional(),
});
