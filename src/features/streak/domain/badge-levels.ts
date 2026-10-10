/** Pure badge-level lookup — not DB-configurable in this PR (streak rate/caps are; levels are cosmetic). */
export function badgeLevelForDay(day: number): string {
  if (day >= 60) return 'Legend';
  if (day >= 30) return 'Earner';
  if (day >= 10) return 'Hustler';
  return 'Rookie';
}
