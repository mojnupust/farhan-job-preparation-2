import type {
  CheckInResult,
  CreateCheckInInput,
  DailyStreakDto,
  StreakCheckInDto,
  UpdateDailyStreakInput,
} from './types.js';

export interface ActivityGateProgressRaw {
  answeredCount: number;
  secondsSpent: number;
}

export interface StreakRepository {
  findOrCreateDailyStreak(userId: string): Promise<DailyStreakDto>;
  findCheckIn(userId: string, dhakaDate: string): Promise<StreakCheckInDto | null>;
  isPremiumUser(userId: string): Promise<boolean>;

  /** Best-effort stats across the user's completed exam attempts today (Dhaka day). */
  getTodaysActivity(userId: string, dhakaDate: string): Promise<ActivityGateProgressRaw>;

  /**
   * Performs the entire check-in atomically: creates the StreakCheckIn row
   * first (so the unique (userId, dhakaDate) constraint fails fast for a
   * concurrent duplicate), credits the wallet via the PR1 ledger core when
   * the budget allows it, and updates the DailyStreak + budget period rows —
   * all in one DB transaction. Throws if a concurrent request already won
   * for this (userId, dhakaDate); the service re-queries and returns that
   * instead of erroring.
   */
  performCheckIn(input: {
    userId: string;
    dhakaDate: string;
    checkIn: CreateCheckInInput;
    streakUpdate: UpdateDailyStreakInput & { freezesMonth: string };
    shouldCredit: boolean;
      ledgerInput: {
        userId: string;
        type: 'STREAK_REWARD';
        direction: 'CREDIT';
        amountMinorUnits: number;
        referenceType: 'STREAK_CHECKIN';
        referenceId: string;
        idempotencyKey: string;
      };
    yearMonth: string;
    configuredMonthlyBudgetMinorUnits: number;
  }): Promise<CheckInResult>;

  /** Persists a read-time lapse transition (ACTIVE -> LOST) detected by GET /status. */
  markLapsed(userId: string): Promise<DailyStreakDto>;
}
