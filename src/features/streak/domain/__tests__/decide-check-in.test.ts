import { describe, it, expect } from 'vitest';

import { decideCheckIn, detectLapse, type DecideCheckInStreakState } from '../decide-check-in.js';

const freeConfig = {
  streakRateMinorUnitsPerDay: 10,
  streakFreeDays: 30,
  streakPremiumDays: 60,
  streakFreezesFreePerMonth: 0,
  streakFreezesPremiumPerMonth: 1,
  streakActivityGateFromDay: 5,
};

function freshState(overrides: Partial<DecideCheckInStreakState> = {}): DecideCheckInStreakState {
  return {
    currentDay: 0,
    longestStreak: 0,
    status: 'ACTIVE',
    lastCheckInDate: null,
    completedCycles: 0,
    freezesUsedThisMonth: 0,
    freezesMonth: null,
    ...overrides,
  };
}

describe('decideCheckIn', () => {
  it('starts Day 1 for a brand-new user', () => {
    const decision = decideCheckIn({
      today: '2026-10-10',
      streak: freshState(),
      isPremium: false,
      config: freeConfig,
    });
    expect(decision.nextDay).toBe(1);
    expect(decision.cycleReset).toBe(true);
    expect(decision.rewardMinorUnits).toBe(10); // 10 * day 1
  });

  it('advances to the next day when checking in the day after', () => {
    const decision = decideCheckIn({
      today: '2026-10-11',
      streak: freshState({ currentDay: 1, lastCheckInDate: '2026-10-10' }),
      isPremium: false,
      config: freeConfig,
    });
    expect(decision.nextDay).toBe(2);
    expect(decision.cycleReset).toBe(false);
    expect(decision.rewardMinorUnits).toBe(20); // 10 * day 2
  });

  it('resets to Day 1 after a missed day with no freeze available', () => {
    const decision = decideCheckIn({
      today: '2026-10-13', // last check-in was 3 days ago
      streak: freshState({ currentDay: 5, lastCheckInDate: '2026-10-10' }),
      isPremium: false,
      config: freeConfig,
    });
    expect(decision.nextDay).toBe(1);
    expect(decision.cycleReset).toBe(true);
    expect(decision.usedFreeze).toBe(false);
  });

  it('uses a freeze to bridge exactly one missed day when available (premium)', () => {
    const decision = decideCheckIn({
      today: '2026-10-12', // missed 2026-10-11
      streak: freshState({ currentDay: 5, lastCheckInDate: '2026-10-10' }),
      isPremium: true,
      config: freeConfig,
    });
    expect(decision.nextDay).toBe(6);
    expect(decision.cycleReset).toBe(false);
    expect(decision.usedFreeze).toBe(true);
    expect(decision.newFreezesUsedThisMonth).toBe(1);
  });

  it('does not use a freeze for a free-tier user (0 freezes configured)', () => {
    const decision = decideCheckIn({
      today: '2026-10-12',
      streak: freshState({ currentDay: 5, lastCheckInDate: '2026-10-10' }),
      isPremium: false,
      config: freeConfig,
    });
    expect(decision.usedFreeze).toBe(false);
    expect(decision.cycleReset).toBe(true);
    expect(decision.nextDay).toBe(1);
  });

  it('does not grant a second freeze once the monthly limit is used', () => {
    const decision = decideCheckIn({
      today: '2026-10-20',
      streak: freshState({
        currentDay: 10,
        lastCheckInDate: '2026-10-18', // missed one day
        freezesUsedThisMonth: 1,
        freezesMonth: '2026-10',
      }),
      isPremium: true,
      config: freeConfig,
    });
    expect(decision.usedFreeze).toBe(false);
    expect(decision.cycleReset).toBe(true);
  });

  it('resets the freeze counter when the Dhaka month has rolled over', () => {
    const decision = decideCheckIn({
      today: '2026-11-02',
      streak: freshState({
        currentDay: 10,
        lastCheckInDate: '2026-10-31',
        freezesUsedThisMonth: 1, // used in October
        freezesMonth: '2026-10',
      }),
      isPremium: true,
      config: freeConfig,
    });
    // one missed day (Nov 1st), but the October freeze usage shouldn't carry over
    expect(decision.usedFreeze).toBe(true);
    expect(decision.newFreezesMonth).toBe('2026-11');
    expect(decision.newFreezesUsedThisMonth).toBe(1);
  });

  it('completes the cycle exactly at the cap (free tier, Day 30)', () => {
    const decision = decideCheckIn({
      today: '2026-10-30',
      streak: freshState({ currentDay: 29, lastCheckInDate: '2026-10-29' }),
      isPremium: false,
      config: freeConfig,
    });
    expect(decision.nextDay).toBe(30);
    expect(decision.cycleCompleted).toBe(true);
    expect(decision.rewardMinorUnits).toBe(300); // 10 * 30
  });

  it('completes the cycle exactly at the cap (premium, Day 60 = 600 poisha)', () => {
    const decision = decideCheckIn({
      today: '2026-10-30',
      streak: freshState({ currentDay: 59, lastCheckInDate: '2026-10-29' }),
      isPremium: true,
      config: freeConfig,
    });
    expect(decision.nextDay).toBe(60);
    expect(decision.cycleCompleted).toBe(true);
    expect(decision.rewardMinorUnits).toBe(600);
  });

  it('starts a fresh cycle the check-in after completion', () => {
    const decision = decideCheckIn({
      today: '2026-11-01',
      streak: freshState({
        currentDay: 30,
        lastCheckInDate: '2026-10-30',
        status: 'COMPLETED',
        completedCycles: 1,
      }),
      isPremium: false,
      config: freeConfig,
    });
    expect(decision.nextDay).toBe(1);
    expect(decision.cycleReset).toBe(true);
    expect(decision.newCompletedCycles).toBe(1); // not incremented again until the new cycle completes
  });

  it('flags the activity gate as required once the configured day is reached', () => {
    const below = decideCheckIn({
      today: '2026-10-14',
      streak: freshState({ currentDay: 3, lastCheckInDate: '2026-10-13' }),
      isPremium: false,
      config: freeConfig,
    });
    expect(below.gateRequired).toBe(false); // day 4

    const at = decideCheckIn({
      today: '2026-10-15',
      streak: freshState({ currentDay: 4, lastCheckInDate: '2026-10-14' }),
      isPremium: false,
      config: freeConfig,
    });
    expect(at.gateRequired).toBe(true); // day 5
  });
});

describe('detectLapse', () => {
  it('reports no lapse for an on-time streak', () => {
    const result = detectLapse(
      '2026-10-11',
      freshState({ currentDay: 1, lastCheckInDate: '2026-10-10' }),
      false,
      freeConfig,
    );
    expect(result.lost).toBe(false);
  });

  it('reports a lapse when a day was missed with no freeze available', () => {
    const result = detectLapse(
      '2026-10-13',
      freshState({ currentDay: 5, lastCheckInDate: '2026-10-10' }),
      false,
      freeConfig,
    );
    expect(result.lost).toBe(true);
  });

  it('does not report a lapse yet if a freeze would still cover the single missed day', () => {
    const result = detectLapse(
      '2026-10-12',
      freshState({ currentDay: 5, lastCheckInDate: '2026-10-10' }),
      true,
      freeConfig,
    );
    expect(result.lost).toBe(false);
  });

  it('never reports a lapse for an already-LOST or COMPLETED streak', () => {
    expect(
      detectLapse('2026-10-20', freshState({ status: 'LOST', lastCheckInDate: '2026-10-10' }), false, freeConfig)
        .lost,
    ).toBe(false);
    expect(
      detectLapse(
        '2026-10-20',
        freshState({ status: 'COMPLETED', lastCheckInDate: '2026-10-10' }),
        false,
        freeConfig,
      ).lost,
    ).toBe(false);
  });
});
