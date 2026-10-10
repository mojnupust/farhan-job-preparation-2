/**
 * Idempotent seed of BCS + NTRCA question sets and their questions
 * into the *current* DATABASE_URL database.
 *
 * - Creates missing question sets (NTRCA if BCS already exists)
 * - Matches dump sourceId → new set id by title / source_file topic
 * - Skips question insert for sets that already have questions,
 *   plus the two IDs the user already filled
 *
 *   npx tsx --env-file=.env scripts/seed-bcs-ntrca-to-new-db.ts
 */

import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

import { createExportPrisma } from './lib/prisma-export.ts';
import type { QuestionDumpFile, QuestionSetDumpFile } from './lib/seed-export.types.ts';

const prisma = createExportPrisma();
const BATCH = 80;

const SKIP_QUESTION_SET_IDS = new Set([
  'cmt12bums0011uxhgk6is1j59', // ৪৯তম — already has questions
  'cmt12bums0010uxhg9hxesg0r', // ৫০তম — already has questions
]);

const SET_FILES = [
  { file: 'seeds/question-sets/bcs-job-solution.json', slug: 'bcs-job-solution' },
  { file: 'seeds/question-sets/ntrca-job-solution.json', slug: 'ntrca-job-solution' },
] as const;

function normTitle(title: string): string {
  return title.replace(/\s+/g, ' ').trim();
}

function sourceFileKey(topics: string | null | undefined): string | null {
  if (!topics) return null;
  const m = topics.match(/source_file:([^\s|]+)/i);
  return m?.[1] ?? null;
}

async function main() {
  const sourceToNew = new Map<string, string>();

  for (const entry of SET_FILES) {
    const sub = await prisma.subExamCategory.findUnique({
      where: { slug: entry.slug },
      select: { id: true, name: true, slug: true },
    });
    if (!sub) {
      throw new Error(`Sub exam category slug not found: ${entry.slug}`);
    }

    const dump = JSON.parse(
      await readFile(path.resolve(process.cwd(), entry.file), 'utf8'),
    ) as QuestionSetDumpFile;

    const existing = await prisma.questionSet.findMany({
      where: { subExamCategoryId: sub.id },
      select: { id: true, title: true, topics: true, date: true },
    });

    const byTitle = new Map(existing.map((s) => [normTitle(s.title), s]));
    const bySourceFile = new Map(
      existing
        .map((s) => [sourceFileKey(s.topics), s] as const)
        .filter((pair): pair is [string, (typeof existing)[number]] => pair[0] !== null),
    );

    let createdSets = 0;
    let matchedSets = 0;

    for (const set of dump.sets) {
      const title = normTitle(set.title);
      const key = sourceFileKey(set.topics);
      let found =
        byTitle.get(title) ??
        (key ? bySourceFile.get(key) : undefined) ??
        existing.find((s) => {
          const a = normTitle(s.title).toLowerCase();
          const b = title.toLowerCase();
          return a.includes(b) || b.includes(a);
        });

      if (!found) {
        found = await prisma.questionSet.create({
          data: {
            subExamCategoryId: sub.id,
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
          },
          select: { id: true, title: true, topics: true, date: true },
        });
        existing.push(found);
        byTitle.set(normTitle(found.title), found);
        const fk = sourceFileKey(found.topics);
        if (fk) bySourceFile.set(fk, found);
        createdSets += 1;
        console.log(`  + set  [${sub.slug}] ${found.title} → ${found.id}`);
      } else {
        matchedSets += 1;
      }

      sourceToNew.set(set.sourceId, found.id);
    }

    console.log(
      `Question sets [${sub.slug}]: matched ${matchedSets}, created ${createdSets}, mapped ${dump.sets.length}`,
    );
  }

  const questionsDir = path.resolve(process.cwd(), 'seeds', 'questions');
  const files = (await readdir(questionsDir)).filter((f) => f.endsWith('.json') && f !== '_manifest.json');

  let seededQuestions = 0;
  let skippedAlready = 0;
  let skippedNoSet = 0;
  let skippedEmpty = 0;

  for (const file of files) {
    const dump = JSON.parse(
      await readFile(path.join(questionsDir, file), 'utf8'),
    ) as QuestionDumpFile;
    if (dump.kind !== 'questions') continue;

    const newSetId = sourceToNew.get(dump.source.questionSetId);
    if (!newSetId) {
      skippedNoSet += 1;
      continue;
    }

    if (SKIP_QUESTION_SET_IDS.has(newSetId)) {
      skippedAlready += 1;
      console.log(`  skip questions (user already seeded) ${file} → ${newSetId}`);
      continue;
    }

    if (dump.questions.length === 0) {
      skippedEmpty += 1;
      continue;
    }

    const existingCount = await prisma.question.count({ where: { questionSetId: newSetId } });
    if (existingCount > 0) {
      skippedAlready += 1;
      console.log(`  skip questions (already ${existingCount}) ${file} → ${newSetId}`);
      continue;
    }

    let created = 0;
    for (let i = 0; i < dump.questions.length; i += BATCH) {
      const slice = dump.questions.slice(i, i + BATCH);
      const result = await prisma.question.createMany({
        data: slice.map((q) => ({
          questionSetId: newSetId,
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

    seededQuestions += created;
    console.log(`  ✓ ${created} questions  ${file} → ${newSetId}  [${dump.source.title}]`);
  }

  console.log('\nDone');
  console.log(`  questions inserted: ${seededQuestions}`);
  console.log(`  question files skipped (already filled / user skip): ${skippedAlready}`);
  console.log(`  question files skipped (no matching BCS/NTRCA set): ${skippedNoSet}`);
  console.log(`  question files empty: ${skippedEmpty}`);
}

main()
  .catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
