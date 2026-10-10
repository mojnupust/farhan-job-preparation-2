import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// TODO: "১৪-২০তম গ্রেড সরকারি চাকরি" সাব-এক্সাম ক্যাটাগরির আসল আইডি বসান
const subExamCategoryId = 'cmubbgkak00qzah01zcsrtxxp';

const TITLE_PREFIX = 'সমাজসেবা অধিদপ্তরের নিয়োগ প্রস্তুতি';

interface RoutineSeed {
  date: string; // ISO date (YYYY-MM-DD)
  topic: string;
  subject: string;
  totalMarks: number;
  duration: number; // minutes
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ৭ দিনের ইংরেজি গ্রামার রুটিন — ১৪তম থেকে ২০তম গ্রেডের
// সরকারি চাকরির পরীক্ষায় সবচেয়ে বেশি আসা টপিকগুলো অনুযায়ী সাজানো
// marks/duration অনুমানভিত্তিক — দরকার হলে বদলে নিন
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const grammarRoutine: RoutineSeed[] = [
  {
    date: '2026-09-22',
    topic: 'Right Form of Verb ও Tense',
    subject: 'ইংরেজি',
    totalMarks: 20,
    duration: 20,
  },
  {
    date: '2026-09-23',
    topic: 'Voice Change (Active–Passive)',
    subject: 'ইংরেজি',
    totalMarks: 20,
    duration: 20,
  },
  {
    date: '2026-09-24',
    topic: 'Narration (Direct–Indirect Speech)',
    subject: 'ইংরেজি',
    totalMarks: 20,
    duration: 20,
  },
  {
    date: '2026-09-25',
    topic: 'Article ও Preposition',
    subject: 'ইংরেজি',
    totalMarks: 20,
    duration: 20,
  },
  {
    date: '2026-09-26',
    topic: 'Subject-Verb Agreement, Number ও Gender',
    subject: 'ইংরেজি',
    totalMarks: 20,
    duration: 20,
  },
  {
    date: '2026-09-27',
    topic: 'Synonym-Antonym ও One Word Substitution',
    subject: 'ইংরেজি',
    totalMarks: 20,
    duration: 20,
  },
  {
    date: '2026-09-28',
    topic: 'Sentence Correction ও Group Verb',
    subject: 'ইংরেজি',
    totalMarks: 20,
    duration: 20,
  },
];

async function main() {
  const routines = grammarRoutine.map((r) => ({
    subExamCategoryId,
    date: new Date(r.date),
    title: `${TITLE_PREFIX} — ${r.topic}`,
    totalMarks: r.totalMarks,
    duration: r.duration,
    subject: r.subject,
    topics: r.topic, // সংক্ষিপ্ত — এক লাইনেই
    sourceMaterial: `${r.topic} — সংশ্লিষ্ট প্রশ্নব্যাংক`,
    description: `${TITLE_PREFIX}: "${r.topic}" বিষয়ে ${r.totalMarks} নম্বরের ${r.duration} মিনিটের পরীক্ষা।`,
  }));

  await prisma.routine.createMany({ data: routines });

  console.log(`✅ ${routines.length}টি রুটিন সফলভাবে তৈরি হয়েছে (১৪-২০তম গ্রেড ইংরেজি গ্রামার)`);
  routines.forEach((r) =>
    console.log(
      `   ${r.date.toISOString().slice(0, 10)} — ${r.title} (${r.totalMarks} নম্বর, ${r.duration} মিনিট)`,
    ),
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
