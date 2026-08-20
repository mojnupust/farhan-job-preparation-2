/** Minimal CLI helpers for export/seed scripts (no extra deps). */

export function argValue(name: string): string | undefined {
  const prefix = `--${name}=`;
  const eq = process.argv.find((a) => a.startsWith(prefix));
  if (eq) return eq.slice(prefix.length);
  const idx = process.argv.indexOf(`--${name}`);
  if (idx >= 0) {
    const next = process.argv[idx + 1];
    if (next && !next.startsWith('--')) return next;
  }
  return undefined;
}

export function hasFlag(name: string): boolean {
  return process.argv.includes(`--${name}`);
}

export function toDateOnly(value: Date | string): string {
  const d = value instanceof Date ? value : new Date(value);
  return d.toISOString().slice(0, 10);
}

export function safeFileStem(input: string, fallback: string): string {
  const stem = input
    .normalize('NFKD')
    .replace(/[^\w.-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
  return stem.length > 0 ? stem : fallback;
}
