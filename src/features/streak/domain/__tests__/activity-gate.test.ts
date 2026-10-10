import { describe, expect, it } from 'vitest';

import { evaluateActivityGate } from '../activity-gate.js';

describe('evaluateActivityGate', () => {
  it('passes when both question and time floors are met', () => {
    const result = evaluateActivityGate(
      { answeredCount: 10, secondsSpent: 60 },
      10,
      60,
    );
    expect(result.passed).toBe(true);
  });

  it('fails when too few questions were answered', () => {
    const result = evaluateActivityGate(
      { answeredCount: 9, secondsSpent: 120 },
      10,
      60,
    );
    expect(result.passed).toBe(false);
    expect(result.progress.answeredCount).toBe(9);
  });

  it('fails when not enough time was spent', () => {
    const result = evaluateActivityGate(
      { answeredCount: 20, secondsSpent: 30 },
      10,
      60,
    );
    expect(result.passed).toBe(false);
    expect(result.progress.secondsSpent).toBe(30);
  });
});
