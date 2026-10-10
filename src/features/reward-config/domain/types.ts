export interface RewardConfigDto {
  id: string;
  streakRateMinorUnitsPerDay: number;
  streakFreeDays: number;
  streakPremiumDays: number;
  streakActivityGateFromDay: number;
  streakGateMinQuestions: number;
  streakGateMinSeconds: number;
  streakFreezesFreePerMonth: number;
  streakFreezesPremiumPerMonth: number;
  withdrawalMinMinorUnits: number;
  withdrawalRequiresVerifiedPhone: boolean;
  monthlyBudgetMinorUnits: number;
  updatedBy: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateRewardConfigInput {
  streakRateMinorUnitsPerDay?: number;
  streakFreeDays?: number;
  streakPremiumDays?: number;
  streakActivityGateFromDay?: number;
  streakGateMinQuestions?: number;
  streakGateMinSeconds?: number;
  streakFreezesFreePerMonth?: number;
  streakFreezesPremiumPerMonth?: number;
  withdrawalMinMinorUnits?: number;
  withdrawalRequiresVerifiedPhone?: boolean;
  monthlyBudgetMinorUnits?: number;
}
