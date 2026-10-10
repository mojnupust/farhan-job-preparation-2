/** Filename + TS seed-file helpers for the batch question-set seeder. */

export const SOURCE_FILE_PREFIX = 'source_file:';

export type ParsedSeedFilename = {
  filename: string;
  sourceKey: string;
  title: string;
  date: Date;
  series: string;
  extra: string;
};

function humanizeKebab(value: string): string {
  return value
    .split('-')
    .filter(Boolean)
    .map((part) => {
      if (/^\d+$/.test(part)) return part;
      if (/^\d+(st|nd|rd|th)$/i.test(part)) return part.toLowerCase();
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(' ');
}

function expandYear(raw: string): number {
  if (raw.length === 4) return Number(raw);
  const yy = Number(raw);
  return yy >= 50 ? 1900 + yy : 2000 + yy;
}

/**
 * `seed-primary-job-solution-09-01-2026.ts`
 * `seed-primary-job-solution-08-01-2010-4.ts`
 * `seed-primary-job-solution-02-02-2024-2nd-dhap.ts`
 * `seed-primary-job-solution-21-06-2019-3rd-stage-set-2594.ts`
 * `seed-primary-job-solution-28-06-19-set-4021.ts`
 * `seed-proshn-dekhun.ts`
 */
export function parseSeedFilename(filename: string): ParsedSeedFilename {
  const base = filename.replace(/\.tsx?$/i, '');
  const withoutSeed = base.replace(/^seed-/i, '');
  const dateRe = /(\d{2})-(\d{2})-(\d{2,4})(?!\d)/;
  const dateMatch = withoutSeed.match(dateRe);

  if (!dateMatch || dateMatch.index === undefined) {
    return {
      filename,
      sourceKey: filename,
      title: humanizeKebab(withoutSeed) || filename,
      date: new Date(Date.UTC(2000, 0, 1)),
      series: withoutSeed,
      extra: '',
    };
  }

  const dd = Number(dateMatch[1]);
  const mm = Number(dateMatch[2]);
  const year = expandYear(dateMatch[3]!);
  const date = new Date(Date.UTC(year, mm - 1, dd));

  const series = withoutSeed.slice(0, dateMatch.index).replace(/-$/, '');
  const extra = withoutSeed.slice(dateMatch.index + dateMatch[0].length).replace(/^-/, '');
  const titleParts = [
    humanizeKebab(series) || 'Question Set',
    dateMatch[0],
    extra ? humanizeKebab(extra) : '',
  ].filter(Boolean);

  return {
    filename,
    sourceKey: filename,
    title: titleParts.join(' — ').slice(0, 500),
    date,
    series,
    extra,
  };
}

export function sourceFileTopic(filename: string): string {
  return `${SOURCE_FILE_PREFIX}${filename}`;
}

export function slugPrefixFromFilename(filename: string): string {
  return filename.replace(/\.tsx?$/i, '').replace(/^seed-/i, '').slice(0, 80);
}

type ScanState = 'code' | 'squote' | 'dquote' | 'template' | 'line' | 'block';

/** Index of the `]` that closes the `[` at `openIndex`. */
export function findMatchingBracket(source: string, openIndex: number): number {
  let state: ScanState = 'code';
  let depth = 0;
  let templateExpr = 0;
  let i = openIndex;

  while (i < source.length) {
    const ch = source[i]!;
    const next = source[i + 1];

    if (state === 'line') {
      if (ch === '\n') state = 'code';
      i += 1;
      continue;
    }
    if (state === 'block') {
      if (ch === '*' && next === '/') {
        state = 'code';
        i += 2;
        continue;
      }
      i += 1;
      continue;
    }
    if (state === 'squote') {
      if (ch === '\\') {
        i += 2;
        continue;
      }
      if (ch === "'") state = 'code';
      i += 1;
      continue;
    }
    if (state === 'dquote') {
      if (ch === '\\') {
        i += 2;
        continue;
      }
      if (ch === '"') state = 'code';
      i += 1;
      continue;
    }
    if (state === 'template') {
      if (ch === '\\') {
        i += 2;
        continue;
      }
      if (ch === '`') {
        state = 'code';
        i += 1;
        continue;
      }
      if (ch === '$' && next === '{') {
        templateExpr += 1;
        state = 'code';
        i += 2;
        continue;
      }
      i += 1;
      continue;
    }

    if (ch === '/' && next === '/') {
      state = 'line';
      i += 2;
      continue;
    }
    if (ch === '/' && next === '*') {
      state = 'block';
      i += 2;
      continue;
    }
    if (ch === "'") {
      state = 'squote';
      i += 1;
      continue;
    }
    if (ch === '"') {
      state = 'dquote';
      i += 1;
      continue;
    }
    if (ch === '`') {
      state = 'template';
      i += 1;
      continue;
    }

    if (ch === '{' && templateExpr > 0) {
      templateExpr += 1;
      i += 1;
      continue;
    }
    if (ch === '}' && templateExpr > 0) {
      templateExpr -= 1;
      if (templateExpr === 0) state = 'template';
      i += 1;
      continue;
    }

    if (ch === '[') depth += 1;
    if (ch === ']') {
      depth -= 1;
      if (depth === 0) return i;
    }
    i += 1;
  }

  throw new Error('Unclosed data array');
}

export function extractDataArrayLiteral(source: string): string {
  const marker = /\bdata\s*:\s*\[/;
  const match = marker.exec(source);
  if (!match) {
    throw new Error('Could not find `data: [` in seed file');
  }
  const openIndex = match.index + match[0].length - 1;
  const closeIndex = findMatchingBracket(source, openIndex);
  return source.slice(openIndex, closeIndex + 1);
}

export type SeedQuestionRow = {
  questionSetId?: string;
  slug?: string | null;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
  explanation?: string | null;
  examName?: string | null;
  subject?: string | null;
  topic?: string | null;
  subTopic?: string | null;
  frequencyTag?: string | null;
  sortOrder?: number;
};

export function evalQuestionRows(arrayLiteral: string, questionSetId: string): SeedQuestionRow[] {
  const fn = new Function(
    'questionSetId',
    `"use strict"; return (${arrayLiteral});`,
  ) as (id: string) => unknown;
  const rows = fn(questionSetId);
  if (!Array.isArray(rows)) {
    throw new Error('Seed data did not evaluate to an array');
  }
  return rows as SeedQuestionRow[];
}

export function toQuestionCreateInput(
  rows: SeedQuestionRow[],
  questionSetId: string,
  slugPrefix: string,
): Array<{
  questionSetId: string;
  slug: string;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
  explanation: string | null;
  examName: string | null;
  subject: string | null;
  topic: string | null;
  subTopic: string | null;
  frequencyTag: string | null;
  sortOrder: number;
}> {
  const used = new Set<string>();

  return rows.map((row, index) => {
    const sortOrder = Number.isFinite(row.sortOrder) ? Number(row.sortOrder) : index + 1;
    const baseSlug = (row.slug && String(row.slug).trim()) || `q-${sortOrder}`;
    let slug = `${slugPrefix}--${baseSlug}`.slice(0, 600);
    if (used.has(slug)) slug = `${slug}-${sortOrder}`.slice(0, 600);
    used.add(slug);

    const answer = String(row.correctAnswer ?? '').trim().slice(0, 1);

    return {
      questionSetId,
      slug,
      questionText: String(row.questionText ?? ''),
      optionA: String(row.optionA ?? ''),
      optionB: String(row.optionB ?? ''),
      optionC: String(row.optionC ?? ''),
      optionD: String(row.optionD ?? ''),
      correctAnswer: answer,
      explanation: row.explanation ? String(row.explanation) : null,
      examName: row.examName ? String(row.examName) : null,
      subject: row.subject ? String(row.subject) : null,
      topic: row.topic ? String(row.topic) : null,
      subTopic: row.subTopic ? String(row.subTopic) : null,
      frequencyTag: row.frequencyTag ? String(row.frequencyTag) : null,
      sortOrder,
    };
  });
}
