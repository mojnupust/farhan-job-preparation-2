import type { ActivityGateProgress } from './types.js';

export function evaluateActivityGate(
  raw: { answeredCount: number; secondsSpent: number },
  minQuestions: number,
  minSeconds: number,
): { passed: boolean; progress: ActivityGateProgress } {
  const passed = raw.answeredCount >= minQuestions && raw.secondsSpent >= minSeconds;
  return {
    passed,
    progress: {
      answeredCount: raw.answeredCount,
      minQuestions,
      secondsSpent: raw.secondsSpent,
      minSeconds,
    },
  };
}
