import { dateStringDiffDays, dhakaYearMonth } from './dhaka-date.js';
import type { StreakStatus } from './types.js';

export interface DecideCheckInStreakState {
  currentDay: number;
  longestStreak: number;
  status: StreakStatus;
  lastCheckInDate: string | null; // YYYY-MM-DD
  completedCycles: number;
  freezesUsedThisMonth: number;
  freezesMonth: string | null; // YYYY-MM
}

export interface DecideCheckInConfig {
  streakRateMinorUnitsPerDay: number;
  streakFreeDays: number;
  streakPremiumDays: number;
  streakFreezesFreePerMonth: number;
  streakFreezesPremiumPerMonth: number;
  streakActivityGateFromDay: number;
}

export interface DecideCheckInParams {
  today: string; // YYYY-MM-DD
  streak: DecideCheckInStreakState;
  isPremium: boolean;
  config: DecideCheckInConfig;
}

export interface CheckInDecision {
  nextDay: number;
  cap: number;
  usedFreeze: boolean;
  cycleReset: boolean;
  cycleCompleted: boolean;
  rewardMinorUnits: number;
  gateRequired: boolean;
  newFreezesUsedThisMonth: number;
  newFreezesMonth: string;
  newLongestStreak: number;
  newCompletedCycles: number;
}

/**
 * Pure decision function for one check-in — no I/O. The repository persists
 * exactly what this returns. Kept side-effect-free so the streak/reset/
 * freeze/completion rules can be unit tested without a database.
 */
export function decideCheckIn(params: DecideCheckInParams): CheckInDecision {
  const { today, streak, isPremium, config } = params;
  const cap = isPremium ? config.streakPremiumDays : config.streakFreeDays;
  const freezesLimit = isPremium
    ? config.streakFreezesPremiumPerMonth
    : config.streakFreezesFreePerMonth;

  const todaysMonth = dhakaYearMonth(new Date(`${today}T00:00:00.000Z`));
  const freezesCarryOver = streak.freezesMonth === todaysMonth;
  const freezesUsedSoFar = freezesCarryOver ? streak.freezesUsedThisMonth : 0;

  let nextDay: number;
  let usedFreeze = false;
  let cycleReset = false;

  if (streak.status === 'COMPLETED' || streak.lastCheckInDate === null) {
    nextDay = 1;
    cycleReset = true;
  } else {
    const diff = dateStringDiffDays(streak.lastCheckInDate, today);
    if (diff <= 1) {
      nextDay = streak.currentDay + 1;
    } else if (diff === 2 && freezesUsedSoFar < freezesLimit) {
      nextDay = streak.currentDay + 1;
      usedFreeze = true;
    } else {
      nextDay = 1;
      cycleReset = true;
    }
  }

  const clampedDay = Math.min(nextDay, cap);
  const cycleCompleted = clampedDay >= cap;

  const rewardMinorUnits = config.streakRateMinorUnitsPerDay * clampedDay;
  const gateRequired = clampedDay >= config.streakActivityGateFromDay;

  return {
    nextDay: clampedDay,
    cap,
    usedFreeze,
    cycleReset,
    cycleCompleted,
    rewardMinorUnits,
    gateRequired,
    newFreezesUsedThisMonth: usedFreeze ? freezesUsedSoFar + 1 : freezesUsedSoFar,
    newFreezesMonth: todaysMonth,
    newLongestStreak: Math.max(streak.longestStreak, clampedDay),
    newCompletedCycles: streak.completedCycles + (cycleCompleted ? 1 : 0),
  };
}

/**
 * Read-only lapse detection used by GET /status (no cron needed). Returns
 * `lost: true` exactly on the call where an ACTIVE streak transitions to
 * LOST because of a missed day with no freeze available — the caller
 * persists this transition and the response IS the one-time notice.
 */
export function detectLapse(
  today: string,
  streak: DecideCheckInStreakState,
  isPremium: boolean,
  config: DecideCheckInConfig,
): { lost: boolean } {
  if (streak.status !== 'ACTIVE' || streak.lastCheckInDate === null) {
    return { lost: false };
  }
  const freezesLimit = isPremium
    ? config.streakFreezesPremiumPerMonth
    : config.streakFreezesFreePerMonth;
  const todaysMonth = dhakaYearMonth(new Date(`${today}T00:00:00.000Z`));
  const freezesUsedSoFar = streak.freezesMonth === todaysMonth ? streak.freezesUsedThisMonth : 0;

  const diff = dateStringDiffDays(streak.lastCheckInDate, today);
  if (diff <= 1) return { lost: false };
  if (diff === 2 && freezesUsedSoFar < freezesLimit) return { lost: false }; // a freeze would still cover this
  return { lost: true };
}
