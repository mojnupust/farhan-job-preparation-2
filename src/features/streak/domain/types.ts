export type StreakStatus = 'ACTIVE' | 'LOST' | 'COMPLETED';
export type StreakRewardStatus = 'CREDITED' | 'QUEUED';

export interface DailyStreakDto {
  id: string;
  userId: string;
  currentDay: number;
  longestStreak: number;
  cycleStartDate: string | null; // YYYY-MM-DD
  lastCheckInDate: string | null; // YYYY-MM-DD
  freezesUsedThisMonth: number;
  freezesMonth: string | null; // YYYY-MM
  status: StreakStatus;
  completedCycles: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface StreakCheckInDto {
  id: string;
  userId: string;
  dhakaDate: string; // YYYY-MM-DD
  dayNumber: number;
  rewardMinorUnits: number;
  rewardStatus: StreakRewardStatus;
  activityGatePassed: boolean;
  usedFreeze: boolean;
  ledgerEntryId: string | null;
  createdAt: Date;
}

export interface ActivityGateProgress {
  answeredCount: number;
  minQuestions: number;
  secondsSpent: number;
  minSeconds: number;
}

export interface CheckInResult {
  streak: DailyStreakDto;
  checkIn: StreakCheckInDto;
  /** True when this call returned an already-existing check-in instead of writing a new one. */
  alreadyDone: boolean;
  /** True exactly when this check-in completed a 30/60-day cycle. */
  cycleCompleted: boolean;
}

export type CheckInOutcome =
  | { kind: 'done'; result: CheckInResult }
  | { kind: 'activity_required'; progress: ActivityGateProgress };


export type DayCellState = 'done' | 'today' | 'locked';

export interface DayCell {
  day: number;
  state: DayCellState;
  amountMinorUnits: number;
}

export interface StreakStatusResult {
  currentDay: number;
  cap: number;
  isPremium: boolean;
  status: StreakStatus;
  longestStreak: number;
  completedCycles: number;
  todayDone: boolean;
  nextRewardMinorUnits: number;
  streakLostNotice: boolean;
  badgeLevel: string;
  gate: {
    required: boolean;
    passed: boolean;
    progress: ActivityGateProgress;
  };
  grid: DayCell[];
}

export interface CreateCheckInInput {
  userId: string;
  dhakaDate: string;
  dayNumber: number;
  rewardMinorUnits: number;
  rewardStatus: StreakRewardStatus;
  activityGatePassed: boolean;
  usedFreeze: boolean;
  ledgerEntryId: string | null;
}

export interface UpdateDailyStreakInput {
  currentDay: number;
  longestStreak: number;
  cycleStartDate: string;
  lastCheckInDate: string;
  freezesUsedThisMonth: number;
  status: StreakStatus;
  completedCycles: number;
}
