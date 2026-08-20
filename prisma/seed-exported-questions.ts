/**
 * Seed questions from an exported JSON file into a *new* question set.
 *
 * You supply the destination question-set id (it will differ after a DB reset).
 *
 *   npx tsx --env-file=.env prisma/seed-exported-questions.ts \
 *     --file=seeds/questions/cmos0mux200139r01rtb3olz9.json \
 *     --question-set-id=NEW_QUESTION_SET_ID
 */

import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { PrismaClient } from '@prisma/client';

import { argValue } from '../scripts/lib/cli.ts';
import { createExportPrisma } from '../scripts/lib/prisma-export.ts';
import type { QuestionDumpFile } from '../scripts/lib/seed-export.types.ts';

const prisma: PrismaClient = createExportPrisma();
const BATCH = 100;

async function main() {
  const fileArg = argValue('file');
  const questionSetId = argValue('question-set-id');

  if (!fileArg || !questionSetId) {
    throw new Error('Required: --file=<path-to-json> --question-set-id=<id in the target DB>');
  }

  const set = await prisma.questionSet.findUnique({
    where: { id: questionSetId },
    select: { id: true, title: true },
  });
  if (!set) {
    throw new Error(`Target question set not found: ${questionSetId}`);
  }

  const raw = await readFile(path.resolve(process.cwd(), fileArg), 'utf8');
  const dump = JSON.parse(raw) as QuestionDumpFile;
  if (dump.kind !== 'questions') {
    throw new Error(`Expected kind "questions", got ${String(dump.kind)}`);
  }

  console.log(`Seeding ${dump.questions.length} questions into [${set.title}] (${set.id})`);
  console.log(`  source dump: ${dump.source.title} (${dump.source.questionSetId})`);

  let created = 0;
  for (let i = 0; i < dump.questions.length; i += BATCH) {
    const slice = dump.questions.slice(i, i + BATCH);
    const result = await prisma.question.createMany({
      data: slice.map((q) => ({
        questionSetId,
        questionText: q.questionText,
        optionA: q.optionA,
        optionB: q.optionB,
        optionC: q.optionC,
        optionD: q.optionD,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        examName: q.examName,
        subject: q.subject,
        topic: q.topic,
        subTopic: q.subTopic,
        slug: q.slug,
        frequencyTag: q.frequencyTag,
        sortOrder: q.sortOrder,
      })),
      skipDuplicates: true,
    });
    created += result.count;
  }

  console.log(`  ✓ ${created} questions created (duplicates skipped via unique slug)`);
}

main()
  .catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
