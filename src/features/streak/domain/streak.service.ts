import type { RewardConfigService } from '../../reward-config/domain/reward-config.service.js';

import { evaluateActivityGate } from './activity-gate.js';
import { badgeLevelForDay } from './badge-levels.js';
import { decideCheckIn, detectLapse } from './decide-check-in.js';
import { dhakaDateString, dhakaYearMonth } from './dhaka-date.js';
import type { StreakRepository } from './repository.contract.js';
import type { ActivityGateProgress, CheckInOutcome, DayCell, StreakStatusResult } from './types.js';

export class StreakService {
  constructor(
    private readonly repository: StreakRepository,
    private readonly rewardConfig: RewardConfigService,
  ) {}

  async checkIn(userId: string): Promise<CheckInOutcome> {
    const today = dhakaDateString();

    const existing = await this.repository.findCheckIn(userId, today);
    if (existing) {
      const streak = await this.repository.findOrCreateDailyStreak(userId);
      return {
        kind: 'done',
        result: { streak, checkIn: existing, alreadyDone: true, cycleCompleted: false },
      };
    }

    const [config, streak, isPremium] = await Promise.all([
      this.rewardConfig.getConfig(),
      this.repository.findOrCreateDailyStreak(userId),
      this.repository.isPremiumUser(userId),
    ]);

    const decideConfig = {
      streakRateMinorUnitsPerDay: config.streakRateMinorUnitsPerDay,
      streakFreeDays: config.streakFreeDays,
      streakPremiumDays: config.streakPremiumDays,
      streakFreezesFreePerMonth: config.streakFreezesFreePerMonth,
      streakFreezesPremiumPerMonth: config.streakFreezesPremiumPerMonth,
      streakActivityGateFromDay: config.streakActivityGateFromDay,
    };

    const decision = decideCheckIn({
      today,
      streak: {
        currentDay: streak.currentDay,
        longestStreak: streak.longestStreak,
        status: streak.status,
        lastCheckInDate: streak.lastCheckInDate,
        completedCycles: streak.completedCycles,
        freezesUsedThisMonth: streak.freezesUsedThisMonth,
        freezesMonth: streak.freezesMonth,
      },
      isPremium,
      config: decideConfig,
    });

    let activityGatePassed = true;
    if (decision.gateRequired) {
      const raw = await this.repository.getTodaysActivity(userId, today);
      const gate = evaluateActivityGate(raw, config.streakGateMinQuestions, config.streakGateMinSeconds);
      activityGatePassed = gate.passed;
      if (!gate.passed) {
        return { kind: 'activity_required', progress: gate.progress };
      }
    }

    const idempotencyKey = `checkin:${userId}:${today}`;
    const yearMonth = dhakaYearMonth();

    const result = await this.repository.performCheckIn({
      userId,
      dhakaDate: today,
      checkIn: {
        userId,
        dhakaDate: today,
        dayNumber: decision.nextDay,
        rewardMinorUnits: decision.rewardMinorUnits,
        rewardStatus: 'QUEUED', // repository flips to CREDITED once the budget/ledger write succeeds
        activityGatePassed,
        usedFreeze: decision.usedFreeze,
        ledgerEntryId: null,
      },
      streakUpdate: {
        currentDay: decision.nextDay,
        longestStreak: decision.newLongestStreak,
        cycleStartDate: decision.cycleReset ? today : (streak.cycleStartDate ?? today),
        lastCheckInDate: today,
        freezesUsedThisMonth: decision.newFreezesUsedThisMonth,
        status: decision.cycleCompleted ? 'COMPLETED' : 'ACTIVE',
        completedCycles: decision.newCompletedCycles,
        freezesMonth: decision.newFreezesMonth,
      },
      shouldCredit: true, // repository re-validates against the budget atomically
      ledgerInput: {
        userId,
        type: 'STREAK_REWARD',
        direction: 'CREDIT',
        amountMinorUnits: decision.rewardMinorUnits,
        referenceType: 'STREAK_CHECKIN',
        referenceId: idempotencyKey,
        idempotencyKey,
      },
      yearMonth,
      configuredMonthlyBudgetMinorUnits: config.monthlyBudgetMinorUnits,
    });

    return {
      kind: 'done',
      result: { ...result, cycleCompleted: decision.cycleCompleted },
    };
  }

  async getStatus(userId: string): Promise<StreakStatusResult> {
    const today = dhakaDateString();
    const [config, streakBefore, isPremium] = await Promise.all([
      this.rewardConfig.getConfig(),
      this.repository.findOrCreateDailyStreak(userId),
      this.repository.isPremiumUser(userId),
    ]);

    const decideConfig = {
      streakRateMinorUnitsPerDay: config.streakRateMinorUnitsPerDay,
      streakFreeDays: config.streakFreeDays,
      streakPremiumDays: config.streakPremiumDays,
      streakFreezesFreePerMonth: config.streakFreezesFreePerMonth,
      streakFreezesPremiumPerMonth: config.streakFreezesPremiumPerMonth,
      streakActivityGateFromDay: config.streakActivityGateFromDay,
    };

    const streakState = {
      currentDay: streakBefore.currentDay,
      longestStreak: streakBefore.longestStreak,
      status: streakBefore.status,
      lastCheckInDate: streakBefore.lastCheckInDate,
      completedCycles: streakBefore.completedCycles,
      freezesUsedThisMonth: streakBefore.freezesUsedThisMonth,
      freezesMonth: streakBefore.freezesMonth,
    };

    const lapse = detectLapse(today, streakState, isPremium, decideConfig);
    const streak = lapse.lost ? await this.repository.markLapsed(userId) : streakBefore;

    const cap = isPremium ? config.streakPremiumDays : config.streakFreeDays;
    const todayDone = streak.lastCheckInDate === today;
    const displayDay = streak.status === 'LOST' ? 0 : streak.currentDay;
    const todayCellDay = Math.min(todayDone ? displayDay : displayDay + 1, cap);
    const nextRewardMinorUnits = config.streakRateMinorUnitsPerDay * Math.min(displayDay + 1, cap);

    let gateRequired = false;
    let gatePassed = true;
    let progress: ActivityGateProgress = {
      answeredCount: 0,
      minQuestions: config.streakGateMinQuestions,
      secondsSpent: 0,
      minSeconds: config.streakGateMinSeconds,
    };
    if (!todayDone) {
      gateRequired = todayCellDay >= config.streakActivityGateFromDay;
      if (gateRequired) {
        const raw = await this.repository.getTodaysActivity(userId, today);
        const gate = evaluateActivityGate(raw, config.streakGateMinQuestions, config.streakGateMinSeconds);
        gatePassed = gate.passed;
        progress = gate.progress;
      }
    }

    const grid: DayCell[] = Array.from({ length: cap }, (_, i) => {
      const day = i + 1;
      const state: DayCell['state'] = day < todayCellDay ? 'done' : day === todayCellDay ? 'today' : 'locked';
      return { day, state, amountMinorUnits: config.streakRateMinorUnitsPerDay * day };
    });

    return {
      currentDay: displayDay,
      cap,
      isPremium,
      status: streak.status,
      longestStreak: streak.longestStreak,
      completedCycles: streak.completedCycles,
      todayDone,
      nextRewardMinorUnits,
      streakLostNotice: lapse.lost,
      badgeLevel: badgeLevelForDay(displayDay),
      gate: { required: gateRequired, passed: gatePassed, progress },
      grid,
    };
  }
}
