import { describe, it, expect } from 'vitest';

import {
  dateStringDiffDays,
  dhakaDateRangeUtc,
  dhakaDateString,
  dhakaYearMonth,
} from '../dhaka-date.js';

describe('dhakaDateString', () => {
  it('rolls over to the next Dhaka day at 18:00 UTC (00:00 Dhaka)', () => {
    // 2026-10-10T17:59:59Z is still 2026-10-10T23:59:59 in Dhaka (UTC+6)
    expect(dhakaDateString(new Date('2026-10-10T17:59:59.000Z'))).toBe('2026-10-10');
    // 2026-10-10T18:00:00Z is 2026-10-11T00:00:00 in Dhaka — the day has rolled over
    expect(dhakaDateString(new Date('2026-10-10T18:00:00.000Z'))).toBe('2026-10-11');
  });

  it('handles a UTC date that is already the next day but still the previous Dhaka day', () => {
    // 2026-10-11T00:00:00Z is 2026-10-11T06:00:00 Dhaka — same Dhaka day as above
    expect(dhakaDateString(new Date('2026-10-11T00:00:00.000Z'))).toBe('2026-10-11');
  });
});

describe('dhakaYearMonth', () => {
  it('returns the YYYY-MM prefix', () => {
    expect(dhakaYearMonth(new Date('2026-10-10T12:00:00.000Z'))).toBe('2026-10');
  });

  it('rolls the month over at the Dhaka day boundary near month end', () => {
    // 2026-10-31T18:00:00Z = 2026-11-01T00:00:00 Dhaka
    expect(dhakaYearMonth(new Date('2026-10-31T18:00:00.000Z'))).toBe('2026-11');
  });
});

describe('dhakaDateRangeUtc', () => {
  it('maps a Dhaka calendar date to its UTC instant range', () => {
    const { startUtc, endUtc } = dhakaDateRangeUtc('2026-10-10');
    expect(startUtc.toISOString()).toBe('2026-10-09T18:00:00.000Z');
    expect(endUtc.toISOString()).toBe('2026-10-10T18:00:00.000Z');
  });

  it('round-trips with dhakaDateString at the range boundaries', () => {
    const { startUtc, endUtc } = dhakaDateRangeUtc('2026-10-10');
    expect(dhakaDateString(startUtc)).toBe('2026-10-10');
    // endUtc is exclusive — it belongs to the next Dhaka day
    expect(dhakaDateString(endUtc)).toBe('2026-10-11');
  });
});

describe('dateStringDiffDays', () => {
  it('returns 0 for the same date', () => {
    expect(dateStringDiffDays('2026-10-10', '2026-10-10')).toBe(0);
  });

  it('returns 1 for consecutive days', () => {
    expect(dateStringDiffDays('2026-10-10', '2026-10-11')).toBe(1);
  });

  it('returns a positive count for a missed day', () => {
    expect(dateStringDiffDays('2026-10-10', '2026-10-13')).toBe(3);
  });

  it('handles month/year rollover', () => {
    expect(dateStringDiffDays('2026-10-31', '2026-11-01')).toBe(1);
    expect(dateStringDiffDays('2026-12-31', '2027-01-01')).toBe(1);
  });
});
