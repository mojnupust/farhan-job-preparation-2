import { describe, expect, it } from 'vitest';

import { badgeLevelForDay } from '../badge-levels.js';

describe('badgeLevelForDay', () => {
  it('returns Rookie below day 10', () => {
    expect(badgeLevelForDay(0)).toBe('Rookie');
    expect(badgeLevelForDay(9)).toBe('Rookie');
  });

  it('returns Hustler from day 10', () => {
    expect(badgeLevelForDay(10)).toBe('Hustler');
    expect(badgeLevelForDay(29)).toBe('Hustler');
  });

  it('returns Earner from day 30', () => {
    expect(badgeLevelForDay(30)).toBe('Earner');
    expect(badgeLevelForDay(59)).toBe('Earner');
  });

  it('returns Legend from day 60', () => {
    expect(badgeLevelForDay(60)).toBe('Legend');
  });
});
