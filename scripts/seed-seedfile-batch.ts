/**
 * Batch-seed question sets + questions from `seedFile/*.ts`.
 *
 * 1. Parse each filename → create a minimal QuestionSet under a sub exam category
 *    (identity stored in topics as `source_file:<filename>` so re-runs are idempotent).
 * 2. Evaluate the seed file's `data: [...]` array and insert questions with that set id.
 *
 *   npx tsx --env-file=.env scripts/seed-seedfile-batch.ts
 *   npx tsx --env-file=.env scripts/seed-seedfile-batch.ts --limit=20 --offset=0
 *   npx tsx --env-file=.env scripts/seed-seedfile-batch.ts --sets-only
 *   npx tsx --env-file=.env scripts/seed-seedfile-batch.ts --file=seed-proshn-dekhun.ts
 *   npx tsx --env-file=.env scripts/seed-seedfile-batch.ts --dry-run
 *
 * Later: point --dir at another folder of the same seed pattern (5000+ files) and
 * page through with --offset / --limit.
 */

import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

import { PrismaClient } from '@prisma/client';

import {
  evalQuestionRows,
  extractDataArrayLiteral,
  parseSeedFilename,
  slugPrefixFromFilename,
  sourceFileTopic,
  toQuestionCreateInput,
} from './lib/seedfile-pipeline.ts';

// General Knowledge: cmtpxo8t70039ah01plpk3oqt

// Bangla: cmtpivtcj0033ah01c64b2rcn

// English: cmubbgkak00qzah01zcsrtxxp

// Recent Job Solution: cmtcom9r10001h301fq1h2q0j

const DEFAULT_SUB_EXAM_CATEGORY_ID = 'cmubbgkak00qzah01zcsrtxxp';
const DEFAULT_DIR = 'seedFile';
const QUESTION_BATCH = 80;

type Cli = {
  dir: string;
  subExamCategoryId: string;
  limit: number | null;
  offset: number;
  setsOnly: boolean;
  questionsOnly: boolean;
  dryRun: boolean;
  force: boolean;
  file: string | null;
  batchSize: number;
};

function argValue(args: string[], name: string): string | undefined {
  const prefix = `--${name}=`;
  const hit = args.find((a) => a.startsWith(prefix));
  if (hit) return hit.slice(prefix.length);
  const idx = args.indexOf(`--${name}`);
  if (idx >= 0 && args[idx + 1] && !args[idx + 1]!.startsWith('--')) return args[idx + 1];
  return undefined;
}

function parseCli(argv: string[]): Cli {
  const args = argv.slice(2);
  const limitRaw = argValue(args, 'limit');
  const offsetRaw = argValue(args, 'offset');
  const batchRaw = argValue(args, 'batch-size');
  return {
    dir: argValue(args, 'dir') ?? DEFAULT_DIR,
    subExamCategoryId:
      argValue(args, 'sub-exam-category-id') ??
      process.env.SEEDFILE_SUB_EXAM_CATEGORY_ID ??
      DEFAULT_SUB_EXAM_CATEGORY_ID,
    limit: limitRaw ? Number(limitRaw) : null,
    offset: offsetRaw ? Number(offsetRaw) : 0,
    setsOnly: args.includes('--sets-only'),
    questionsOnly: args.includes('--questions-only'),
    dryRun: args.includes('--dry-run'),
    force: args.includes('--force'),
    file: argValue(args, 'file') ?? null,
    batchSize: batchRaw ? Number(batchRaw) : QUESTION_BATCH,
  };
}

function listSeedFiles(names: string[], only?: string | null): string[] {
  const ts = names.filter((n) => /\.tsx?$/i.test(n) && !n.endsWith('.d.ts')).sort();
  if (!only) return ts;
  const needle = only.endsWith('.ts') || only.endsWith('.tsx') ? only : `${only}.ts`;
  const found = ts.filter((n) => n === needle || n === path.basename(needle));
  if (found.length === 0) {
    throw new Error(`No seed file matching --file=${only}`);
  }
  return found;
}

async function main() {
  const cli = parseCli(process.argv);
  const prisma = new PrismaClient();
  const dirAbs = path.resolve(process.cwd(), cli.dir);

  try {
    const sub = await prisma.subExamCategory.findUnique({
      where: { id: cli.subExamCategoryId },
      select: { id: true, name: true, slug: true },
    });
    if (!sub) {
      throw new Error(`Sub exam category not found: ${cli.subExamCategoryId}`);
    }

    const allNames = await readdir(dirAbs);
    let files = listSeedFiles(allNames, cli.file);
    files = files.slice(cli.offset, cli.limit == null ? undefined : cli.offset + cli.limit);

    console.log(`Sub exam category: ${sub.name} (${sub.slug}) [${sub.id}]`);
    console.log(`Directory: ${dirAbs}`);
    console.log(`Files: ${files.length} (offset=${cli.offset}, limit=${cli.limit ?? 'all'})`);
    if (cli.dryRun) console.log('Mode: dry-run (no writes)\n');

    const existing = await prisma.questionSet.findMany({
      where: { subExamCategoryId: sub.id },
      select: { id: true, title: true, topics: true },
    });
    const bySource = new Map<string, (typeof existing)[number]>();
    for (const set of existing) {
      const m = set.topics?.match(/source_file:([^\s|]+)/i);
      if (m?.[1]) bySource.set(m[1], set);
    }

    let createdSets = 0;
    let reusedSets = 0;
    let seededQuestions = 0;
    let skippedQuestions = 0;
    let failed = 0;

    for (const filename of files) {
      const parsed = parseSeedFilename(filename);
      const topics = sourceFileTopic(filename);
      let set = bySource.get(filename);

      if (!set && !cli.questionsOnly) {
        if (cli.dryRun) {
          console.log(`  [dry] would create set  ${parsed.title}`);
          createdSets += 1;
          continue;
        }
        set = await prisma.questionSet.create({
          data: {
            subExamCategoryId: sub.id,
            title: parsed.title,
            date: parsed.date,
            totalMarks: 100,
            duration: 60,
            subject: 'সাধারণ',
            topics,
            sourceMaterial: filename,
            markPerQuestion: 1,
            negativeMark: 0.25,
            isFree: false,
            isLive: false,
            isActive: true,
          },
          select: { id: true, title: true, topics: true },
        });
        bySource.set(filename, set);
        createdSets += 1;
        console.log(`  + set  ${parsed.title} → ${set.id}`);
      } else if (set) {
        reusedSets += 1;
        if (cli.setsOnly) {
          console.log(`  = set  ${parsed.title} → ${set.id}`);
        }
      } else {
        console.warn(`  ! no set for ${filename} (--questions-only and none matched)`);
        failed += 1;
        continue;
      }

      if (cli.setsOnly || !set) continue;

      const existingCount = await prisma.question.count({ where: { questionSetId: set.id } });
      if (existingCount > 0 && !cli.force) {
        skippedQuestions += 1;
        console.log(`  skip questions (already ${existingCount}) ${filename} → ${set.id}`);
        continue;
      }

      const source = await readFile(path.join(dirAbs, filename), 'utf8');
      let rows;
      try {
        const literal = extractDataArrayLiteral(source);
        rows = evalQuestionRows(literal, set.id);
      } catch (err) {
        failed += 1;
        console.error(`  ✗ parse ${filename}:`, err instanceof Error ? err.message : err);
        continue;
      }

      const payload = toQuestionCreateInput(rows, set.id, slugPrefixFromFilename(filename));
      if (cli.dryRun) {
        console.log(`  [dry] ${payload.length} questions  ${filename} → ${set.id}`);
        seededQuestions += payload.length;
        continue;
      }

      if (cli.force && existingCount > 0) {
        await prisma.question.deleteMany({ where: { questionSetId: set.id } });
      }

      let created = 0;
      for (let i = 0; i < payload.length; i += cli.batchSize) {
        const slice = payload.slice(i, i + cli.batchSize);
        const result = await prisma.question.createMany({
          data: slice,
          skipDuplicates: true,
        });
        created += result.count;
      }
      seededQuestions += created;
      console.log(`  ✓ ${created} questions  ${filename} → ${set.id}`);
    }

    console.log('\nDone');
    console.log(`  question sets created: ${createdSets}`);
    console.log(`  question sets reused:  ${reusedSets}`);
    console.log(`  questions inserted:    ${seededQuestions}`);
    console.log(`  files skipped (already had questions): ${skippedQuestions}`);
    console.log(`  files failed:          ${failed}`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
