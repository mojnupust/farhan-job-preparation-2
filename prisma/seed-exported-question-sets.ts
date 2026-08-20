/**
 * Seed question sets from an exported JSON file into a *new* database.
 *
 * You supply the destination sub-exam-category id (it will differ after a DB reset).
 *
 *   npx tsx --env-file=.env prisma/seed-exported-question-sets.ts \
 *     --file=seeds/question-sets/bcs-previous-year-questions.json \
 *     --sub-exam-category-id=NEW_SUB_ID
 */

import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { PrismaClient } from '@prisma/client';

import { argValue } from '../scripts/lib/cli.ts';
import { createExportPrisma } from '../scripts/lib/prisma-export.ts';
import type { QuestionSetDumpFile } from '../scripts/lib/seed-export.types.ts';

const prisma: PrismaClient = createExportPrisma();
const BATCH = 50;

async function main() {
  const fileArg = argValue('file');
  const subExamCategoryId = argValue('sub-exam-category-id');

  if (!fileArg || !subExamCategoryId) {
    throw new Error(
      'Required: --file=<path-to-json> --sub-exam-category-id=<id in the target DB>',
    );
  }

  const sub = await prisma.subExamCategory.findUnique({
    where: { id: subExamCategoryId },
    select: { id: true, name: true, slug: true },
  });
  if (!sub) {
    throw new Error(`Target sub exam category not found: ${subExamCategoryId}`);
  }

  const raw = await readFile(path.resolve(process.cwd(), fileArg), 'utf8');
  const dump = JSON.parse(raw) as QuestionSetDumpFile;
  if (dump.kind !== 'question-sets') {
    throw new Error(`Expected kind "question-sets", got ${String(dump.kind)}`);
  }

  console.log(`Seeding ${dump.sets.length} sets into [${sub.name}] (${sub.slug})`);
  console.log(`  source dump: ${dump.source.slug} (${dump.source.subExamCategoryId})`);

  let created = 0;
  for (let i = 0; i < dump.sets.length; i += BATCH) {
    const slice = dump.sets.slice(i, i + BATCH);
    const result = await prisma.questionSet.createMany({
      data: slice.map((set) => ({
        subExamCategoryId,
        title: set.title,
        date: new Date(set.date),
        totalMarks: set.totalMarks,
        duration: set.duration,
        subject: set.subject,
        topics: set.topics,
        sourceMaterial: set.sourceMaterial,
        markPerQuestion: set.markPerQuestion,
        negativeMark: set.negativeMark,
        isFree: set.isFree,
        isLive: set.isLive,
        isActive: set.isActive,
      })),
    });
    created += result.count;
  }

  console.log(`  ✓ ${created} question sets created`);
}

main()
  .catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
