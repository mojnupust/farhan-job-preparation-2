/**
 * Asia/Dhaka has a fixed UTC+6 offset year-round (no DST), which is what
 * makes this safe to compute with plain arithmetic instead of a timezone
 * library: shift the UTC instant by +6h, then read its UTC calendar fields.
 */
const DHAKA_OFFSET_MS = 6 * 60 * 60 * 1000;

/** Returns the Asia/Dhaka calendar date (YYYY-MM-DD) for the given instant. */
export function dhakaDateString(instant: Date = new Date()): string {
  const shifted = new Date(instant.getTime() + DHAKA_OFFSET_MS);
  return shifted.toISOString().slice(0, 10);
}

/** The current Asia/Dhaka year-month, e.g. "2026-10" — used for budget periods. */
export function dhakaYearMonth(instant: Date = new Date()): string {
  return dhakaDateString(instant).slice(0, 7);
}

/** UTC instant range [start, end) that corresponds to one Asia/Dhaka calendar day. */
export function dhakaDateRangeUtc(dhakaDate: string): { startUtc: Date; endUtc: Date } {
  const startUtc = new Date(`${dhakaDate}T00:00:00.000Z`);
  startUtc.setTime(startUtc.getTime() - DHAKA_OFFSET_MS);
  const endUtc = new Date(startUtc.getTime() + 24 * 60 * 60 * 1000);
  return { startUtc, endUtc };
}

/** Number of calendar days between two YYYY-MM-DD date strings (b - a). */
export function dateStringDiffDays(a: string, b: string): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  const da = new Date(`${a}T00:00:00.000Z`).getTime();
  const db = new Date(`${b}T00:00:00.000Z`).getTime();
  return Math.round((db - da) / msPerDay);
}

/** Converts a YYYY-MM-DD string to a UTC-midnight Date — the shape Prisma's @db.Date columns store. */
export function dateStringToUtcMidnight(dateStr: string): Date {
  return new Date(`${dateStr}T00:00:00.000Z`);
}
