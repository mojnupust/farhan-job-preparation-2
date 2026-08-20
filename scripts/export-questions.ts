/**
 * System 2 — Export questions from the real DB, one JSON file per question set.
 *
 * Includes subject / topic / subTopic (category fields). Source question-set id is
 * metadata only. When you seed a new DB you pass the *new* question-set id.
 *
 *   npx tsx --env-file=.env scripts/export-questions.ts
 *   npx tsx --env-file=.env scripts/export-questions.ts --question-set-id=clxxxx
 *
 * Output: seeds/questions/<source-set-id>.json  (+ _manifest.json)
 */

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { argValue, toDateOnly } from './lib/cli.ts';
import { createExportPrisma } from './lib/prisma-export.ts';
import type { QuestionDumpFile } from './lib/seed-export.types.ts';

const prisma = createExportPrisma();
const OUT_DIR = path.resolve(process.cwd(), 'seeds', 'questions');

async function main() {
  const onlyId = argValue('question-set-id');

  const sets = await prisma.questionSet.findMany({
    where: onlyId ? { id: onlyId } : undefined,
    select: {
      id: true,
      title: true,
      date: true,
      subject: true,
      subExamCategory: {
        select: {
          id: true,
          name: true,
          slug: true,
          examCategory: { select: { id: true, name: true, slug: true } },
        },
      },
    },
    orderBy: [{ date: 'asc' }, { createdAt: 'asc' }],
  });

  if (onlyId && sets.length === 0) {
    throw new Error(`Question set not found: ${onlyId}`);
  }

  await mkdir(OUT_DIR, { recursive: true });

  const manifest: Array<{
    file: string;
    questionSetId: string;
    title: string;
    subExamCategorySlug: string;
    questionCount: number;
  }> = [];

  for (const set of sets) {
    const questions = await prisma.question.findMany({
      where: { questionSetId: set.id },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    });

    const dump: QuestionDumpFile = {
      kind: 'questions',
      exportedAt: new Date().toISOString(),
      source: {
        questionSetId: set.id,
        title: set.title,
        date: toDateOnly(set.date),
        subject: set.subject,
        subExamCategory: {
          id: set.subExamCategory.id,
          name: set.subExamCategory.name,
          slug: set.subExamCategory.slug,
        },
        examCategory: {
          id: set.subExamCategory.examCategory.id,
          name: set.subExamCategory.examCategory.name,
          slug: set.subExamCategory.examCategory.slug,
        },
      },
      questions: questions.map((q) => ({
        sourceId: q.id,
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
    };

    const fileName = `${set.id}.json`;
    await writeFile(path.join(OUT_DIR, fileName), `${JSON.stringify(dump, null, 2)}\n`, 'utf8');

    manifest.push({
      file: fileName,
      questionSetId: set.id,
      title: set.title,
      subExamCategorySlug: set.subExamCategory.slug,
      questionCount: dump.questions.length,
    });

    console.log(`  ✓ ${fileName}  (${dump.questions.length} questions)  [${set.title}]`);
  }

  await writeFile(
    path.join(OUT_DIR, '_manifest.json'),
    `${JSON.stringify({ exportedAt: new Date().toISOString(), files: manifest }, null, 2)}\n`,
    'utf8',
  );

  const totalQs = manifest.reduce((n, m) => n + m.questionCount, 0);
  console.log(`\nExported ${manifest.length} question sets, ${totalQs} questions → ${OUT_DIR}`);
}

main()
  .catch((err) => {
    console.error('Export failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
