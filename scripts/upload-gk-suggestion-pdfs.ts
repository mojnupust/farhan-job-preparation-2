/**
 * Converted PDFs from gk-suggestion-somaj-seba-odidoptor/_pdf
 * uploaded as free QUESTION_BANK documents with titles/tags from the DOCX.
 *
 *   npx tsx --env-file=.env scripts/upload-gk-suggestion-pdfs.ts
 */

import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { PrismaClient } from '@prisma/client';

import { minioConfig } from '../src/config/minio.ts';
import { PdfService } from '../src/features/pdf/domain/pdf.service.ts';
import { PdfPrismaRepository } from '../src/features/pdf/infra/pdf.prisma-repository.ts';
import { PdfStorageService } from '../src/features/pdf/infra/pdf-storage.service.ts';
import { createMinioClient } from '../src/infrastructure/storage/minio-client.ts';

const ADMIN_MOBILE = process.env.ADMIN_MOBILE ?? '01788262433';
const DIR = path.resolve('gk-suggestion-somaj-seba-odidoptor/_pdf');

const DOCS = [
  {
    file: '1.pdf',
    title: 'সমাজসেবা অধিদপ্তর সাজেশন: বাংলার প্রাচীন যুগ ও শাসন',
    description:
      'ফ্রি পিডিএফ — সমাজসেবা অধিদপ্তর নিয়োগ পরীক্ষার সাধারণ জ্ঞান সাজেশন। বাংলার প্রাচীন জনপদ, পুণ্ড্র, গৌড়, পাল ও সেন শাসন। SEO: প্রাচীন বাংলা, সমাজসেবা GK, জনপদ।',
    tags: [
      'সমাজসেবা অধিদপ্তর',
      'সাধারণ জ্ঞান',
      'প্রাচীন বাংলা',
      'জনপদ',
      'পাল সেন',
      'সাজেশন',
    ],
    subject: 'সাধারণ জ্ঞান',
  },
  {
    file: '2.pdf',
    title: 'সমাজসেবা অধিদপ্তর সাজেশন: বিশ্বের প্রাচীন সভ্যতা ও ইতিহাস',
    description:
      'ফ্রি পিডিএফ — সমাজসেবা অধিদপ্তর সাধারণ জ্ঞান সাজেশন। মেসোপটেমিয়া, মিশর, সিন্ধু, গ্রিক ও রোমান সভ্যতা। SEO: প্রাচীন সভ্যতা, বিশ্ব ইতিহাস, সমাজসেবা GK।',
    tags: [
      'সমাজসেবা অধিদপ্তর',
      'সাধারণ জ্ঞান',
      'প্রাচীন সভ্যতা',
      'বিশ্ব ইতিহাস',
      'সাজেশন',
    ],
    subject: 'সাধারণ জ্ঞান',
  },
  {
    file: '3.pdf',
    title: 'সমাজসেবা অধিদপ্তর সাজেশন: ১৯৪৭ থেকে ১৯৭১ এর ইতিহাস',
    description:
      'ফ্রি পিডিএফ — দেশভাগ, ভাষা আন্দোলন, ছয় দফা, উনসত্তর ও মুক্তিযুদ্ধ। SEO: ১৯৪৭, ১৯৭১, স্বাধীনতা, সমাজসেবা GK সাজেশন।',
    tags: [
      'সমাজসেবা অধিদপ্তর',
      'সাধারণ জ্ঞান',
      '১৯৪৭',
      'মুক্তিযুদ্ধ',
      'ভাষা আন্দোলন',
      'সাজেশন',
    ],
    subject: 'সাধারণ জ্ঞান',
  },
  {
    file: '4.pdf',
    title: 'সমাজসেবা অধিদপ্তর সাজেশন: বাংলাদেশের ভূ-প্রকৃতি ও জাতীয় বিষয়াবলি',
    description:
      'ফ্রি পিডিএফ — নদ-নদী, ভূগোল, জাতীয় প্রতীক ও জাতীয় বিষয়াবলি। SEO: বাংলাদেশ ভূগোল, জাতীয় ফুল, সমাজসেবা সাজেশন।',
    tags: [
      'সমাজসেবা অধিদপ্তর',
      'সাধারণ জ্ঞান',
      'ভূগোল',
      'জাতীয় প্রতীক',
      'বাংলাদেশ',
      'সাজেশন',
    ],
    subject: 'সাধারণ জ্ঞান',
  },
  {
    file: '5.pdf',
    title: 'সমাজসেবা অধিদপ্তর সাজেশন: বাংলাদেশের সংবিধান',
    description:
      'ফ্রি পিডিএফ — সংবিধান, মৌলিক অধিকার, রাষ্ট্রপরিচালনার মূলনীতি ও সংশোধনী। SEO: বাংলাদেশ সংবিধান, সমাজসেবা GK।',
    tags: [
      'সমাজসেবা অধিদপ্তর',
      'সাধারণ জ্ঞান',
      'সংবিধান',
      'মৌলিক অধিকার',
      'বাংলাদেশ',
      'সাজেশন',
    ],
    subject: 'সাধারণ জ্ঞান',
  },
  {
    file: '6.pdf',
    title: 'সমাজসেবা অধিদপ্তর সাজেশন: বাংলাদেশের শিল্প, অর্থনীতি ও জনমিতি',
    description:
      'ফ্রি পিডিএফ — শিল্প, রপ্তানি, GDP, কৃষি ও জনসংখ্যা। SEO: বাংলাদেশ অর্থনীতি, জনমিতি, সমাজসেবা সাজেশন।',
    tags: [
      'সমাজসেবা অধিদপ্তর',
      'সাধারণ জ্ঞান',
      'অর্থনীতি',
      'শিল্প',
      'জনমিতি',
      'সাজেশন',
    ],
    subject: 'সাধারণ জ্ঞান',
  },
  {
    file: '7.pdf',
    title: 'সমাজসেবা অধিদপ্তর সাজেশন: জাতিসংঘ এবং এর সংগঠন',
    description:
      'ফ্রি পিডিএফ — জাতিসংঘ, UNESCO, UNICEF, WHO, ILO ও নিরাপত্তা পরিষদ। SEO: UN, আন্তর্জাতিক সংস্থা, সমাজসেবা GK।',
    tags: [
      'সমাজসেবা অধিদপ্তর',
      'সাধারণ জ্ঞান',
      'জাতিসংঘ',
      'আন্তর্জাতিক সংস্থা',
      'UNESCO',
      'সাজেশন',
    ],
    subject: 'সাধারণ জ্ঞান',
  },
  {
    file: '8.pdf',
    title: 'সমাজসেবা অধিদপ্তর সাজেশন: বিশ্ব পরিচিতি — মুদ্রা, রাজধানী, ভূগোল',
    description:
      'ফ্রি পিডিএফ — দেশের রাজধানী, মুদ্রা, নদী ও পর্বত। SEO: বিশ্ব পরিচিতি, মুদ্রা, রাজধানী, সমাজসেবা সাজেশন।',
    tags: [
      'সমাজসেবা অধিদপ্তর',
      'সাধারণ জ্ঞান',
      'বিশ্ব পরিচিতি',
      'মুদ্রা',
      'রাজধানী',
      'সাজেশন',
    ],
    subject: 'সাধারণ জ্ঞান',
  },
] as const;

async function main() {
  const prisma = new PrismaClient();
  const minio = createMinioClient(minioConfig);
  const service = new PdfService(
    new PdfPrismaRepository(prisma),
    new PdfStorageService(minio, minioConfig.bucket),
  );

  try {
    const admin = await prisma.user.findUnique({
      where: { mobile: ADMIN_MOBILE },
      select: { id: true, role: true, name: true },
    });
    if (!admin) throw new Error(`Admin user not found for mobile ${ADMIN_MOBILE}`);
    if (admin.role !== 'ADMIN') {
      throw new Error(`User ${ADMIN_MOBILE} is ${admin.role}, expected ADMIN`);
    }

    const category =
      (await prisma.subExamCategory.findUnique({
        where: { slug: 'general-knowledge' },
        select: { id: true, name: true, slug: true },
      })) ??
      (await prisma.subExamCategory.findFirst({
        where: { name: { contains: 'সাধারণ জ্ঞান' } },
        select: { id: true, name: true, slug: true },
      }));

    console.log(`Admin: ${admin.name ?? ADMIN_MOBILE} [${admin.id}]`);
    console.log(
      category
        ? `Category: ${category.name} (${category.slug}) [${category.id}]`
        : 'Category: none (leaving subExamCategoryId empty)',
    );

    for (const doc of DOCS) {
      const existing = await prisma.pdfDocument.findFirst({
        where: { title: doc.title },
        select: { id: true },
      });
      if (existing) {
        console.log(`  skip (exists) ${doc.title} → ${existing.id}`);
        continue;
      }

      const buffer = await readFile(path.join(DIR, doc.file));
      const pdf = await service.create(
        {
          title: doc.title,
          description: doc.description,
          docType: 'QUESTION_BANK',
          subExamCategoryId: category?.id,
          subject: doc.subject,
          examName: 'সমাজসেবা অধিদপ্তর',
          tags: [...doc.tags],
          isFeatured: false,
          isActive: true,
          isFree: true,
        },
        { buffer, originalName: `${doc.title}.pdf`, sizeBytes: buffer.length },
        admin.id,
      );
      console.log(`  + ${pdf.title} → ${pdf.id} (${pdf.fileName})`);
    }
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  console.error('Upload failed:', err instanceof Error ? err.message : err);
  process.exit(1);
});
