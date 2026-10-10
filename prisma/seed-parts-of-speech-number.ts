import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
// TODO: replace with the actual QuestionSet id for this exam before running
const questionSetId = 'cmtltiqdc002oah01xhjegg4h';

async function main() {
  await prisma.question.createMany({
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Topic: Number (Singular & Plural)
    // Original questions written fresh, focused on the plural patterns
    // most frequently repeated in BCS / Bangladesh government job exams:
    // foreign (Latin/Greek) plurals, irregular plurals, invariable nouns,
    // always-plural nouns, and uncountable nouns.
    // সংগৃহীত প্রশ্ন: 30টি (sortOrder 1–30)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    data: [
      // ---------- Foreign Plural: -us → -i ----------
      {
        questionSetId,
        slug: 'what-is-the-plural-of-fungus',
        questionText: "What is the plural form of the word 'fungus'?",
        optionA: 'Funguses',
        optionB: 'Fungi',
        optionC: 'Fungus',
        optionD: 'Fungied',
        correctAnswer: 'B',
        explanation:
          "'Fungus' ল্যাটিন উৎসের শব্দ। '-us' দিয়ে শেষ হওয়া এ ধরনের শব্দের plural করার সময় '-us'-কে '-i' দ্বারা প্রতিস্থাপন করা হয়, তাই সঠিক plural form 'Fungi'।",
        subject: 'English',
        topic: 'Number',
        subTopic: 'Foreign Plural (-us → -i)',
        sortOrder: 1,
      },

      {
        questionSetId,
        slug: 'the-plural-form-of-focus',
        questionText: "Choose the correct plural form of 'focus'.",
        optionA: 'Focuses',
        optionB: 'Foci',
        optionC: 'Focus',
        optionD: 'Focies',
        correctAnswer: 'B',
        explanation:
          "'Focus'-এর ল্যাটিন plural form হলো 'Foci' ('-us' → '-i')। আধুনিক ব্যবহারে regular plural 'Focuses'-ও গ্রহণযোগ্য, তবে পরীক্ষায় সাধারণত ল্যাটিন plural 'Foci'-কেই সঠিক উত্তর হিসেবে ধরা হয়।",
        subject: 'English',
        topic: 'Number',
        subTopic: 'Foreign Plural (-us → -i)',
        sortOrder: 2,
      },

      // ---------- Foreign Plural: -um → -a ----------
      {
        questionSetId,
        slug: 'curriculum-plural-form',
        questionText: "The plural form of 'curriculum' is —",
        optionA: 'Curriculums',
        optionB: 'Curricula',
        optionC: 'Curriculas',
        optionD: 'Curriculae',
        correctAnswer: 'B',
        explanation:
          "'-um' দিয়ে শেষ হওয়া ল্যাটিন noun-এর plural করার সময় '-um'-কে '-a' দ্বারা প্রতিস্থাপন করা হয়। তাই 'Curriculum'-এর plural 'Curricula'।",
        subject: 'English',
        topic: 'Number',
        subTopic: 'Foreign Plural (-um → -a)',
        sortOrder: 3,
      },

      {
        questionSetId,
        slug: 'what-is-the-plural-of-addendum',
        questionText: "What is the plural of 'addendum'?",
        optionA: 'Addendas',
        optionB: 'Addendums',
        optionC: 'Addenda',
        optionD: 'Addendae',
        correctAnswer: 'C',
        explanation:
          "একই নিয়ম অনুসারে '-um' এর পরিবর্তে '-a' বসে, তাই 'Addendum'-এর সঠিক plural 'Addenda'।",
        subject: 'English',
        topic: 'Number',
        subTopic: 'Foreign Plural (-um → -a)',
        sortOrder: 4,
      },

      {
        questionSetId,
        slug: 'symposium-plural-form',
        questionText: "Identify the correct plural form of 'symposium'.",
        optionA: 'Symposiums',
        optionB: 'Symposia',
        optionC: 'Symposiae',
        optionD: 'Symposius',
        correctAnswer: 'B',
        explanation:
          "'-um' শেষ হওয়া শব্দের নিয়ম অনুযায়ী 'Symposium'-এর plural 'Symposia'; আধুনিক ইংরেজিতে 'Symposiums'-ও প্রচলিত, তবে পরীক্ষায় 'Symposia'-কেই মান্য উত্তর ধরা হয়।",
        subject: 'English',
        topic: 'Number',
        subTopic: 'Foreign Plural (-um → -a)',
        sortOrder: 5,
      },

      {
        questionSetId,
        slug: 'the-plural-of-millennium',
        questionText: "The plural of 'millennium' is —",
        optionA: 'Millenniums',
        optionB: 'Millennia',
        optionC: 'Millennias',
        optionD: 'Millennies',
        correctAnswer: 'B',
        explanation: "'-um' → '-a' নিয়ম অনুসারে 'Millennium'-এর সঠিক plural 'Millennia'।",
        subject: 'English',
        topic: 'Number',
        subTopic: 'Foreign Plural (-um → -a)',
        sortOrder: 6,
      },

      // ---------- Foreign Plural: -on → -a ----------
      {
        questionSetId,
        slug: 'criteria-is-the-plural-of',
        questionText: "'Criteria' is the plural form of —",
        optionA: 'Criterion',
        optionB: 'Criterium',
        optionC: 'Criteriam',
        optionD: 'Criterius',
        correctAnswer: 'A',
        explanation:
          "'-on' দিয়ে শেষ হওয়া গ্রিক উৎসের শব্দের plural করার সময় '-on'-কে '-a' দ্বারা প্রতিস্থাপন করা হয়। তাই 'Criterion'-এর plural 'Criteria'।",
        subject: 'English',
        topic: 'Number',
        subTopic: 'Foreign Plural (-on → -a)',
        sortOrder: 7,
      },

      // ---------- Foreign Plural: -is → -es ----------
      {
        questionSetId,
        slug: 'the-plural-of-diagnosis',
        questionText: "The plural form of 'diagnosis' is —",
        optionA: 'Diagnosises',
        optionB: 'Diagnoses',
        optionC: 'Diagnosis',
        optionD: 'Diagnosies',
        correctAnswer: 'B',
        explanation:
          "গ্রিক উৎসের শব্দ যার শেষে '-is' থাকে, তার plural করার সময় '-is'-কে '-es' দ্বারা প্রতিস্থাপন করা হয়। তাই 'Diagnosis'-এর plural 'Diagnoses'।",
        subject: 'English',
        topic: 'Number',
        subTopic: 'Foreign Plural (-is → -es)',
        sortOrder: 8,
      },

      {
        questionSetId,
        slug: 'synthesis-plural-form',
        questionText: "Choose the correct plural of 'synthesis'.",
        optionA: 'Synthesises',
        optionB: 'Syntheses',
        optionC: 'Synthesis',
        optionD: 'Synthesies',
        correctAnswer: 'B',
        explanation:
          "একই নিয়মে '-is' এর পরিবর্তে '-es' বসে, তাই 'Synthesis'-এর plural 'Syntheses'।",
        subject: 'English',
        topic: 'Number',
        subTopic: 'Foreign Plural (-is → -es)',
        sortOrder: 9,
      },

      {
        questionSetId,
        slug: 'parenthesis-plural-form',
        questionText: "What is the plural of 'parenthesis'?",
        optionA: 'Parenthesises',
        optionB: 'Parenthesis',
        optionC: 'Parentheses',
        optionD: 'Parenthesies',
        correctAnswer: 'C',
        explanation: "'-is' শেষ হওয়া শব্দের নিয়ম অনুযায়ী 'Parenthesis'-এর plural 'Parentheses'।",
        subject: 'English',
        topic: 'Number',
        subTopic: 'Foreign Plural (-is → -es)',
        sortOrder: 10,
      },

      // ---------- Foreign Plural: -ix/-ex → -ices ----------
      {
        questionSetId,
        slug: 'matrix-plural-form',
        questionText: "The plural form of 'matrix' is —",
        optionA: 'Matrixes',
        optionB: 'Matrices',
        optionC: 'Matrixs',
        optionD: 'Matriculae',
        correctAnswer: 'B',
        explanation:
          "'-ix' বা '-ex' দিয়ে শেষ হওয়া শব্দের plural করার সময় সাধারণত '-ices' যুক্ত হয়, তাই 'Matrix'-এর plural 'Matrices'। ('Matrixes'-ও প্রচলিত ব্যবহারে গ্রহণযোগ্য।)",
        subject: 'English',
        topic: 'Number',
        subTopic: 'Foreign Plural (-ix/-ex → -ices)',
        sortOrder: 11,
      },

      {
        questionSetId,
        slug: 'appendix-plural-form',
        questionText: "Identify the correct plural of 'appendix' (in the academic/book sense).",
        optionA: 'Appendixs',
        optionB: 'Appendices',
        optionC: 'Appendixies',
        optionD: 'Appendixous',
        correctAnswer: 'B',
        explanation:
          "'-ix' শেষ হওয়া শব্দের নিয়মে 'Appendix'-এর plural 'Appendices'। (দৈনন্দিন ব্যবহারে 'Appendixes'-ও চলে, তবে আনুষ্ঠানিক/একাডেমিক প্রেক্ষাপটে 'Appendices' অধিক গ্রহণযোগ্য।)",
        subject: 'English',
        topic: 'Number',
        subTopic: 'Foreign Plural (-ix/-ex → -ices)',
        sortOrder: 12,
      },

      // ---------- Foreign Plural: -a → -ae ----------
      {
        questionSetId,
        slug: 'larva-plural-form',
        questionText: "The plural form of 'larva' is —",
        optionA: 'Larvas',
        optionB: 'Larvae',
        optionC: 'Larvaes',
        optionD: 'Larvia',
        correctAnswer: 'B',
        explanation:
          "'-a' দিয়ে শেষ হওয়া ল্যাটিন শব্দের plural করার সময় শেষে '-e' যুক্ত হয়ে '-ae' হয়, তাই 'Larva'-এর plural 'Larvae'।",
        subject: 'English',
        topic: 'Number',
        subTopic: 'Foreign Plural (-a → -ae)',
        sortOrder: 13,
      },

      {
        questionSetId,
        slug: 'antenna-plural-form',
        questionText: "Choose the correct plural of 'antenna' (referring to an insect's feeler).",
        optionA: 'Antennas',
        optionB: 'Antennae',
        optionC: 'Antennaes',
        optionD: 'Antennia',
        correctAnswer: 'B',
        explanation:
          "জীববিজ্ঞানের অর্থে (পোকামাকড়ের স্পর্শকাতর অঙ্গ) 'Antenna'-এর plural হয় 'Antennae'। (রেডিও/টিভি অ্যান্টেনা অর্থে সাধারণত 'Antennas' ব্যবহৃত হয়।)",
        subject: 'English',
        topic: 'Number',
        subTopic: 'Foreign Plural (-a → -ae)',
        sortOrder: 14,
      },

      // ---------- Irregular Plural: -f/-fe → -ves ----------
      {
        questionSetId,
        slug: 'the-plural-of-wife',
        questionText: "The plural form of 'wife' is —",
        optionA: 'Wifes',
        optionB: 'Wives',
        optionC: 'Wifs',
        optionD: 'Wifies',
        correctAnswer: 'B',
        explanation:
          "'-fe' দিয়ে শেষ হওয়া শব্দের plural করার সময় 'f'-কে 'v' দ্বারা প্রতিস্থাপন করে '-es' যুক্ত করা হয়, তাই 'Wife'-এর plural 'Wives'।",
        subject: 'English',
        topic: 'Number',
        subTopic: 'Irregular Plural (-f/-fe → -ves)',
        sortOrder: 15,
      },

      {
        questionSetId,
        slug: 'calf-plural-form',
        questionText: "What is the plural of 'calf'?",
        optionA: 'Calfs',
        optionB: 'Calves',
        optionC: 'Calfes',
        optionD: 'Calvs',
        correctAnswer: 'B',
        explanation: "একই নিয়মে '-f' এর স্থলে '-ves' বসে, তাই 'Calf'-এর plural 'Calves'।",
        subject: 'English',
        topic: 'Number',
        subTopic: 'Irregular Plural (-f/-fe → -ves)',
        sortOrder: 16,
      },

      // ---------- Irregular Plural: vowel change ----------
      {
        questionSetId,
        slug: 'woman-plural-form',
        questionText: "The plural form of 'woman' is —",
        optionA: 'Womans',
        optionB: 'Women',
        optionC: 'Womens',
        optionD: 'Womenes',
        correctAnswer: 'B',
        explanation:
          "কিছু noun-এর plural করার সময় মাঝের vowel পরিবর্তিত হয় (a → e), তাই 'Woman'-এর plural 'Women'। এটি একটি ব্যতিক্রমী (irregular) plural form।",
        subject: 'English',
        topic: 'Number',
        subTopic: 'Irregular Plural (Vowel Change)',
        sortOrder: 17,
      },

      // ---------- Invariable Noun (same in singular & plural) ----------
      {
        questionSetId,
        slug: 'identify-the-correct-plural-of-series',
        questionText: "Identify the correct plural form of 'series'.",
        optionA: 'Serieses',
        optionB: 'Series',
        optionC: 'Seriess',
        optionD: 'Serie',
        correctAnswer: 'B',
        explanation:
          "'Series' একটি Invariable Noun — singular ও plural উভয় রূপেই একই বানান ব্যবহৃত হয়; বাক্যের subject-verb agreement দেখেই বোঝা যায় এটি singular না plural অর্থে ব্যবহৃত হয়েছে।",
        subject: 'English',
        topic: 'Number',
        subTopic: 'Invariable Noun',
        sortOrder: 18,
      },

      {
        questionSetId,
        slug: 'identify-the-correct-plural-of-species',
        questionText: "Identify the correct plural form of 'species'.",
        optionA: 'Specieses',
        optionB: 'Speciess',
        optionC: 'Species',
        optionD: 'Specie',
        correctAnswer: 'C',
        explanation:
          "'Species'-ও একটি Invariable Noun, singular এবং plural উভয় ক্ষেত্রেই একই রূপ ব্যবহৃত হয়।",
        subject: 'English',
        topic: 'Number',
        subTopic: 'Invariable Noun',
        sortOrder: 19,
      },

      {
        questionSetId,
        slug: 'the-plural-form-of-salmon',
        questionText: "The plural form of 'salmon' (the fish) is —",
        optionA: 'Salmons',
        optionB: 'Salmon',
        optionC: 'Salmones',
        optionD: 'Salmen',
        correctAnswer: 'B',
        explanation:
          'কিছু মাছ ও প্রাণীর নাম (salmon, deer, sheep, fish ইত্যাদি) সাধারণত singular ও plural উভয় ক্ষেত্রে একই রূপে ব্যবহৃত হয়, এগুলো Invariable Noun-এর উদাহরণ।',
        subject: 'English',
        topic: 'Number',
        subTopic: 'Invariable Noun',
        sortOrder: 20,
      },

      // ---------- Always Plural (Pluralia Tantum) ----------
      {
        questionSetId,
        slug: 'choose-the-word-that-is-always-plural-binoculars',
        questionText: 'Which of the following words is always used in plural form?',
        optionA: 'Binoculars',
        optionB: 'Camera',
        optionC: 'Telescope',
        optionD: 'Lens',
        correctAnswer: 'A',
        explanation:
          "দুটি অংশ (দুটি lens) নিয়ে গঠিত যন্ত্রের নাম, যেমন 'Binoculars', সবসময় plural রূপে ব্যবহৃত হয় (এই শ্রেণির আরও উদাহরণ — trousers, scissors, glasses); এদের কোনো singular রূপ নেই।",
        subject: 'English',
        topic: 'Number',
        subTopic: 'Always Plural (Pluralia Tantum)',
        sortOrder: 21,
      },

      {
        questionSetId,
        slug: 'choose-the-word-that-is-always-plural-tongs',
        questionText: 'Which of the following nouns is always plural?',
        optionA: 'Tongs',
        optionB: 'Hammer',
        optionC: 'Spoon',
        optionD: 'Knife',
        correctAnswer: 'A',
        explanation:
          "'Tongs' (চিমটা)-এর মতো দুই অংশযুক্ত যন্ত্রের নাম সবসময় plural রূপে ব্যবহৃত হয়, এর singular রূপ নেই।",
        subject: 'English',
        topic: 'Number',
        subTopic: 'Always Plural (Pluralia Tantum)',
        sortOrder: 22,
      },

      // ---------- Uncountable Noun (always singular) ----------
      {
        questionSetId,
        slug: 'which-of-the-following-nouns-is-uncountable-luggage',
        questionText:
          'Which of the following nouns is uncountable and always used in the singular form?',
        optionA: 'Luggage',
        optionB: 'Bags',
        optionC: 'Suitcases',
        optionD: 'Boxes',
        correctAnswer: 'A',
        explanation:
          "'Luggage' একটি Uncountable Noun, তাই এটি সবসময় singular রূপে ব্যবহৃত হয় এবং এর সাথে 's/es' যুক্ত হয় না। নির্দিষ্ট সংখ্যা বোঝাতে 'a piece of luggage' বলা হয়।",
        subject: 'English',
        topic: 'Number',
        subTopic: 'Uncountable Noun',
        sortOrder: 23,
      },

      {
        questionSetId,
        slug: 'which-of-the-following-nouns-is-uncountable-equipment',
        questionText: 'Which of the following nouns is uncountable?',
        optionA: 'Equipments',
        optionB: 'Equipment',
        optionC: 'Tools',
        optionD: 'Machines',
        correctAnswer: 'B',
        explanation:
          "'Equipment' একটি Uncountable Noun, তাই এর plural করতে 's' যুক্ত হয় না; 'Equipments' লেখা একটি সাধারণ ভুল।",
        subject: 'English',
        topic: 'Number',
        subTopic: 'Uncountable Noun',
        sortOrder: 24,
      },

      {
        questionSetId,
        slug: 'which-of-the-following-nouns-is-uncountable-traffic',
        questionText: 'Which of the following nouns is always singular in form?',
        optionA: 'Traffic',
        optionB: 'Cars',
        optionC: 'Vehicles',
        optionD: 'Roads',
        correctAnswer: 'A',
        explanation:
          "'Traffic' একটি Uncountable Noun, তাই এটি সবসময় singular রূপে ব্যবহৃত হয় এবং একে plural করা যায় না।",
        subject: 'English',
        topic: 'Number',
        subTopic: 'Uncountable Noun',
        sortOrder: 25,
      },

      // ---------- Plural of nouns ending in -o ----------
      {
        questionSetId,
        slug: 'the-plural-form-of-mosquito',
        questionText: "The plural form of 'mosquito' is —",
        optionA: 'Mosquitos',
        optionB: 'Mosquitoes',
        optionC: 'Mosquites',
        optionD: 'Mosquitoies',
        correctAnswer: 'B',
        explanation:
          "consonant-এর পর 'o' দিয়ে শেষ হওয়া অধিকাংশ শব্দের plural করার সময় '-es' যুক্ত হয়, তাই 'Mosquito'-এর plural 'Mosquitoes'। ('Mosquitos'-ও প্রচলিত বিকল্প রূপ হিসেবে গ্রহণযোগ্য।)",
        subject: 'English',
        topic: 'Number',
        subTopic: 'Plural of nouns ending in -o',
        sortOrder: 26,
      },

      {
        questionSetId,
        slug: 'the-plural-form-of-volcano',
        questionText: "The plural form of 'volcano' is —",
        optionA: 'Volcanos only',
        optionB: 'Volcanoes or Volcanos, both correct',
        optionC: 'Volcanoe',
        optionD: 'Volcanous',
        correctAnswer: 'B',
        explanation:
          "'Volcano'-এর ক্ষেত্রে ইংরেজিতে দুটি plural form-ই ('Volcanoes' এবং 'Volcanos') প্রচলিত ও গ্রহণযোগ্য।",
        subject: 'English',
        topic: 'Number',
        subTopic: 'Plural of nouns ending in -o',
        sortOrder: 27,
      },

      // ---------- Plural of nouns ending in -y ----------
      {
        questionSetId,
        slug: 'the-plural-form-of-city',
        questionText: "The plural form of 'city' is —",
        optionA: 'Citys',
        optionB: 'Cities',
        optionC: 'Citie',
        optionD: 'Cityes',
        correctAnswer: 'B',
        explanation:
          "consonant-এর পর 'y' দিয়ে শেষ হওয়া শব্দের plural করার সময় 'y'-কে 'i' দ্বারা প্রতিস্থাপন করে '-es' যুক্ত করা হয়, তাই 'City'-এর plural 'Cities'।",
        subject: 'English',
        topic: 'Number',
        subTopic: 'Plural of nouns ending in -y',
        sortOrder: 28,
      },

      // ---------- Compound Noun Plural ----------
      {
        questionSetId,
        slug: 'the-plural-form-of-passer-by',
        questionText: "The plural form of 'passer-by' is —",
        optionA: 'Passer-bys',
        optionB: 'Passers-by',
        optionC: 'Passer-byes',
        optionD: 'Passerbies',
        correctAnswer: 'B',
        explanation:
          "Compound Noun-এর plural সাধারণত এর প্রধান (head) অংশে যুক্ত হয়। 'Passer-by'-এর প্রধান অংশ 'Passer', তাই plural হয় 'Passers-by'।",
        subject: 'English',
        topic: 'Number',
        subTopic: 'Compound Noun Plural',
        sortOrder: 29,
      },

      {
        questionSetId,
        slug: 'the-plural-form-of-attorney-general',
        questionText: "The plural form of 'Attorney-General' is —",
        optionA: 'Attorney-Generals',
        optionB: 'Attorneys-General',
        optionC: 'Attorney-Generalies',
        optionD: 'Attorneys-Generals',
        correctAnswer: 'B',
        explanation:
          "'Attorney-General'-এর প্রধান (head) অংশ 'Attorney', তাই plural হবে 'Attorneys-General', 'Generals' নয়।",
        subject: 'English',
        topic: 'Number',
        subTopic: 'Compound Noun Plural',
        sortOrder: 30,
      },
    ],

    skipDuplicates: true,
  });
  console.log('✓ Seeded 30 questions (parts-of-speech-number)');
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
