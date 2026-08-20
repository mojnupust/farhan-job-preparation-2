/**
 * System 1 — Export question sets from the real DB, one JSON file per sub-exam category.
 *
 * IDs from the source database are stored as metadata only (`source.subExamCategoryId`,
 * `sets[].sourceId`). When you seed a new DB you pass the *new* sub-exam-category id.
 *
 *   npx tsx --env-file=.env scripts/export-question-sets.ts
 *   npx tsx --env-file=.env scripts/export-question-sets.ts --sub-exam-category-id=clxxxx
 *
 * Output: seeds/question-sets/<slug>.json  (+ _manifest.json)
 */

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { argValue, safeFileStem, toDateOnly } from './lib/cli.ts';
import { createExportPrisma } from './lib/prisma-export.ts';
import type { QuestionSetDumpFile } from './lib/seed-export.types.ts';

const prisma = createExportPrisma();
const OUT_DIR = path.resolve(process.cwd(), 'seeds', 'question-sets');

async function main() {
  const onlyId = argValue('sub-exam-category-id');

  const subs = await prisma.subExamCategory.findMany({
    where: onlyId ? { id: onlyId } : undefined,
    include: {
      examCategory: { select: { name: true, slug: true } },
      questionSets: { orderBy: [{ date: 'asc' }, { createdAt: 'asc' }] },
    },
    orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
  });

  if (onlyId && subs.length === 0) {
    throw new Error(`Sub exam category not found: ${onlyId}`);
  }

  await mkdir(OUT_DIR, { recursive: true });

  const manifest: Array<{
    file: string;
    subExamCategoryId: string;
    slug: string;
    name: string;
    examCategorySlug: string | null;
    setCount: number;
  }> = [];

  for (const sub of subs) {
    const dump: QuestionSetDumpFile = {
      kind: 'question-sets',
      exportedAt: new Date().toISOString(),
      source: {
        subExamCategoryId: sub.id,
        name: sub.name,
        slug: sub.slug,
        examCategoryName: sub.examCategory.name,
        examCategorySlug: sub.examCategory.slug,
      },
      sets: sub.questionSets.map((set) => ({
        sourceId: set.id,
        title: set.title,
        date: toDateOnly(set.date),
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
    };

    const fileName = `${safeFileStem(sub.slug, sub.id)}.json`;
    await writeFile(path.join(OUT_DIR, fileName), `${JSON.stringify(dump, null, 2)}\n`, 'utf8');

    manifest.push({
      file: fileName,
      subExamCategoryId: sub.id,
      slug: sub.slug,
      name: sub.name,
      examCategorySlug: sub.examCategory.slug,
      setCount: dump.sets.length,
    });

    console.log(`  ✓ ${fileName}  (${dump.sets.length} sets)  [${sub.name}]`);
  }

  await writeFile(
    path.join(OUT_DIR, '_manifest.json'),
    `${JSON.stringify({ exportedAt: new Date().toISOString(), files: manifest }, null, 2)}\n`,
    'utf8',
  );

  const totalSets = manifest.reduce((n, m) => n + m.setCount, 0);
  console.log(`\nExported ${manifest.length} sub-categories, ${totalSets} question sets → ${OUT_DIR}`);
}

main()
  .catch((err) => {
    console.error('Export failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
