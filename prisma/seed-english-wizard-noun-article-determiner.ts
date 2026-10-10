import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
// TODO: replace with the actual QuestionSet id for this exam before running
const questionSetId = 'cmtkeo7rc001qah01sx6zcuht';

async function main() {
  await prisma.question.createMany({
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Live MCQ — English Wizrd Book Series
    // Class-2: Noun, Article & Determiner (Part 1)
    // Class-3: Noun, Article & Determiner (Part 2)
    // মোট প্রশ্ন: ৩০টি — সরকারি চাকরির প্রতিযোগিতামূলক পরীক্ষার (BCS/NTRCA/
    // Bank/Primary) উপযোগী মানসম্মত MCQ, উভয় বই থেকে সম্পূর্ণ সিলেবাস কভার করে
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    data: [
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // বিষয়: Noun — Classification (Proper/Common/Collective/Material/Abstract) — প্রশ্ন ০১–১০
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

      {
        questionSetId,
        slug: 'wisdom-kon-dhoroner-noun',
        questionText: "'Wisdom' is what kind of noun?",
        optionA: 'Common',
        optionB: 'Abstract',
        optionC: 'Material',
        optionD: 'Collective',
        correctAnswer: 'B',
        explanation: `সঠিক উত্তর: (খ) Abstract

Wisdom (জ্ঞান/প্রজ্ঞা) একটি গুণ বা অবস্থার নাম, যা দেখা যায় না বা ছোঁয়া যায় না — তাই এটি Abstract Noun। কোনো নাম দৃশ্যমান/স্পর্শযোগ্য না হলে এবং গণনা করা না গেলে তা Abstract Noun হয়।

মনে রাখুন:
— দেখা যায় না, গোনা যায় না → Abstract Noun
— Honesty, Kindness, Bravery, Wisdom — সবই একই শ্রেণির উদাহরণ`,
        subject: 'English',
        topic: 'Noun',
        subTopic: 'Abstract Noun',
        sortOrder: 1,
      },

      {
        questionSetId,
        slug: 'iron-kon-dhoroner-noun',
        questionText: "'Iron' is a/an ___ noun.",
        optionA: 'Material',
        optionB: 'Abstract',
        optionC: 'Collective',
        optionD: 'Common',
        correctAnswer: 'A',
        explanation: `সঠিক উত্তর: (ক) Material

Iron (লোহা) একটি পদার্থ, যা সাধারণত গণনা না করে পরিমাণে (ওজনে) মাপা হয়। যে পদার্থকে গণনা না করে পরিমাণে মাপা হয়, তাকে Material Noun বলে — যেমন water, gold, rice, brick-এর মতোই iron।

মনে রাখুন:
— দেখা যায়, গোনা যায় না → Material Noun`,
        subject: 'English',
        topic: 'Noun',
        subTopic: 'Material Noun',
        sortOrder: 2,
      },

      {
        questionSetId,
        slug: 'crowd-kon-dhoroner-noun',
        questionText: "'Crowd' is an example of which type of noun?",
        optionA: 'Common',
        optionB: 'Material',
        optionC: 'Abstract',
        optionD: 'Collective',
        correctAnswer: 'D',
        explanation: `সঠিক উত্তর: (ঘ) Collective

Crowd (জনতা/ভিড়) একটি সমষ্টির নাম — অনেক মানুষকে একসাথে একটি নাম দিয়ে বোঝানো হচ্ছে। সমষ্টির একটি নাম হলে তাকে Collective Noun বলে, যেমন group, flock, herd, crowd।`,
        subject: 'English',
        topic: 'Noun',
        subTopic: 'Collective Noun',
        sortOrder: 3,
      },

      {
        questionSetId,
        slug: 'jealousy-kon-dhoroner-noun',
        questionText: "What kind of noun is 'jealousy'?",
        optionA: 'Material',
        optionB: 'Collective',
        optionC: 'Abstract',
        optionD: 'Common',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) Abstract

Jealousy (ঈর্ষা) একটি মানসিক অবস্থা বা গুণ, যা দেখা যায় না — তাই এটি Abstract Noun। Adjective 'jealous'-এর নামকে Abstract Noun বলা যায়, ঠিক যেভাবে Verb বা Adjective-এর নামকে Abstract Noun বলা হয়।`,
        subject: 'English',
        topic: 'Noun',
        subTopic: 'Abstract Noun',
        sortOrder: 4,
      },

      {
        questionSetId,
        slug: 'wheat-kon-dhoroner-noun',
        questionText: "'Wheat' is what kind of noun?",
        optionA: 'Material',
        optionB: 'Abstract',
        optionC: 'Collective',
        optionD: 'Common',
        correctAnswer: 'A',
        explanation: `সঠিক উত্তর: (ক) Material

Wheat (গম) একটি পদার্থ, সাধারণত সংখ্যায় না গুনে ওজনে বা পরিমাণে মাপা হয় — তাই এটি Material Noun। এই একই যুক্তিতে rice, gold, water, brick-ও Material Noun।`,
        subject: 'English',
        topic: 'Noun',
        subTopic: 'Material Noun',
        sortOrder: 5,
      },

      {
        questionSetId,
        slug: 'padma-nodir-nam-kon-dhoroner-noun',
        questionText: "'Padma' (name of a river) is what kind of noun?",
        optionA: 'Common',
        optionB: 'Material',
        optionC: 'Proper',
        optionD: 'Collective',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) Proper

Padma একটি নির্দিষ্ট নদীর যথাযথ ও সুনির্দিষ্ট নাম — কোনো ব্যক্তি বা বস্তুর নির্দিষ্ট নাম হলে তা Proper Noun হয়, ঠিক যেমন Kamal, Jamal, Dhaka।`,
        subject: 'English',
        topic: 'Noun',
        subTopic: 'Proper Noun',
        sortOrder: 6,
      },

      {
        questionSetId,
        slug: 'audience-kon-dhoroner-noun',
        questionText: "'Audience' is an example of which noun type?",
        optionA: 'Abstract',
        optionB: 'Collective',
        optionC: 'Material',
        optionD: 'Common',
        correctAnswer: 'B',
        explanation: `সঠিক উত্তর: (খ) Collective

Audience (দর্শক-শ্রোতৃমণ্ডলী) একসাথে অনেক ব্যক্তির সমষ্টিকে একটি একক নাম দিয়ে বোঝায় — তাই এটি Collective Noun। তবে audience সাধারণত Singular Verb নেয়, যতক্ষণ না তা বিভক্ত/বিভিন্নমুখী আচরণ বোঝায় (তখন Noun of Multitude হিসেবে Plural Verb নেয়)।`,
        subject: 'English',
        topic: 'Noun',
        subTopic: 'Collective Noun',
        sortOrder: 7,
      },

      {
        questionSetId,
        slug: 'childhood-kon-dhoroner-noun',
        questionText: "'Childhood' is what kind of noun?",
        optionA: 'Collective',
        optionB: 'Material',
        optionC: 'Common',
        optionD: 'Abstract',
        correctAnswer: 'D',
        explanation: `সঠিক উত্তর: (ঘ) Abstract

Child + hood = Childhood (শৈশব) — একটি অবস্থা বা সময়কালের নাম, যা দেখা যায় না। -hood প্রত্যয় যোগে গঠিত এই ধরনের শব্দ সবসময় Abstract Noun হয়, যেমন Neighbourhood, Adulthood।`,
        subject: 'English',
        topic: 'Noun',
        subTopic: 'Abstract Noun',
        sortOrder: 8,
      },

      {
        questionSetId,
        slug: 'team-kon-dhoroner-noun',
        questionText: "'Team' is what kind of noun?",
        optionA: 'Common',
        optionB: 'Abstract',
        optionC: 'Collective',
        optionD: 'Material',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) Collective

Team (দল) একাধিক ব্যক্তির সমষ্টিকে একটি একক নামে প্রকাশ করে — তাই এটি Collective Noun, ঠিক যেমন jury, band, committee।`,
        subject: 'English',
        topic: 'Noun',
        subTopic: 'Collective Noun',
        sortOrder: 9,
      },

      {
        questionSetId,
        slug: 'nicher-konti-abstract-noun-kindness',
        questionText: 'Which one is an Abstract Noun?',
        optionA: 'Kind',
        optionB: 'Kindly',
        optionC: 'Kindness',
        optionD: 'Kinder',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) Kindness

Adjective + ness/ity = Abstract Noun নিয়মে Kind (Adjective) থেকে Kindness (Abstract Noun) গঠিত হয়েছে। Kind নিজেই Adjective, Kindly Adverb এবং Kinder Adjective-এর Comparative রূপ — এগুলো Noun নয়।`,
        subject: 'English',
        topic: 'Noun',
        subTopic: 'Abstract Noun Suffix',
        sortOrder: 10,
      },

      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // বিষয়: Abstract Noun গঠন (Suffix), Noun of Multitude, Countable/Uncountable — প্রশ্ন ১১–২০
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

      {
        questionSetId,
        slug: 'cy-suffix-e-gothito-abstract-noun-konti',
        questionText: "Which word is formed with the '-cy' suffix to make an Abstract Noun?",
        optionA: 'Honesty',
        optionB: 'Democracy',
        optionC: 'Kindness',
        optionD: 'Friendship',
        correctAnswer: 'B',
        explanation: `সঠিক উত্তর: (খ) Democracy

'-cy' প্রত্যয় State বা Condition বোঝাতে ব্যবহৃত হয় — যেমন Accuracy, Democracy, Privacy। Honesty গঠিত হয় '-ty' দিয়ে, Kindness '-ness' দিয়ে, আর Friendship '-ship' দিয়ে — তাই এগুলো ভিন্ন প্রত্যয়ের উদাহরণ।`,
        subject: 'English',
        topic: 'Noun',
        subTopic: 'Abstract Noun Suffix',
        sortOrder: 11,
      },

      {
        questionSetId,
        slug: 'pollute-verb-theke-abstract-noun',
        questionText: "The Abstract Noun formed from the verb 'Pollute' is —",
        optionA: 'Polluting',
        optionB: 'Pollutee',
        optionC: 'Pollution',
        optionD: 'Pollutedness',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) Pollution

Verb থেকে Noun তৈরি হলে "করা/হওয়া" বাদ পড়ে এবং "-করণ" (ইংরেজিতে সাধারণত -tion/-sion) যোগ হয় — Pollute (দূষিত করা) → Pollution (দূষণ)। Polluting একটি Gerund/Participle রূপ, Noun হলেও এখানে প্রশ্নের প্রাসঙ্গিক Abstract Noun নয়; Pollutee ও Pollutedness প্রচলিত শব্দ নয়।`,
        subject: 'English',
        topic: 'Noun',
        subTopic: 'Verb to Abstract Noun',
        sortOrder: 12,
      },

      {
        questionSetId,
        slug: 'poor-adjective-theke-abstract-noun',
        questionText: "The Abstract Noun formed from the adjective 'Poor' is —",
        optionA: 'Poorness',
        optionB: 'Poority',
        optionC: 'Poorship',
        optionD: 'Poverty',
        correctAnswer: 'D',
        explanation: `সঠিক উত্তর: (ঘ) Poverty

Adjective থেকে Noun তৈরি হলে শেষে "-তা" বা "-ত্ব" (ইংরেজিতে প্রায়ই অনিয়মিত রূপে) যোগ হয় — Poor → Poverty। এভাবেই Honest → Honesty, Cruel → Cruelty গঠিত হয়। Poorness, Poority, Poorship প্রচলিত ইংরেজি শব্দ নয়।`,
        subject: 'English',
        topic: 'Noun',
        subTopic: 'Adjective to Abstract Noun',
        sortOrder: 13,
      },

      {
        questionSetId,
        slug: 'ship-suffix-diye-gothito-noy-emon-shobdo',
        questionText: "Which of the following is NOT formed with the '-ship' suffix?",
        optionA: 'Friendship',
        optionB: 'Leadership',
        optionC: 'Citizenship',
        optionD: 'Childhood',
        correctAnswer: 'D',
        explanation: `সঠিক উত্তর: (ঘ) Childhood

Friendship, Leadership, Citizenship — এই তিনটি শব্দই '-ship' প্রত্যয় যোগে গঠিত (State/Quality/Skill বোঝাতে)। কিন্তু Childhood গঠিত হয়েছে '-hood' প্রত্যয় যোগে (State/Condition/Time বোঝাতে) — তাই এটি ব্যতিক্রম।`,
        subject: 'English',
        topic: 'Noun',
        subTopic: 'Abstract Noun Suffix',
        sortOrder: 14,
      },

      {
        questionSetId,
        slug: 'ism-prottoy-ki-bojhay',
        questionText: "An Abstract Noun formed with the '-ism' suffix generally indicates —",
        optionA: 'Specialist or practitioner',
        optionB: 'Belief or ideology',
        optionC: 'Study of something',
        optionD: 'Result or process',
        correctAnswer: 'B',
        explanation: `সঠিক উত্তর: (খ) Belief or ideology

'-ism' প্রত্যয় সাধারণত কোনো মতবাদ বা বিশ্বাস বোঝাতে ব্যবহৃত হয় — যেমন Optimism, Realism, Criticism। Specialist বোঝাতে '-ist'/'-ian' এবং Study বোঝাতে '-ology' প্রত্যয় ব্যবহৃত হয়।`,
        subject: 'English',
        topic: 'Noun',
        subTopic: 'Abstract Noun Suffix',
        sortOrder: 15,
      },

      {
        questionSetId,
        slug: 'noun-of-multitude-kake-bole',
        questionText: 'A Noun of Multitude is —',
        optionA: 'Another name for Proper Noun',
        optionB: 'A Collective Noun that has split into different parts or groups',
        optionC: 'A sub-type of Material Noun',
        optionD: 'A type of Abstract Noun',
        correctAnswer: 'B',
        explanation: `সঠিক উত্তর: (খ) A Collective Noun that has split into different parts or groups

Collective Noun বিভিন্ন ভাগে বিভক্ত হয়ে গেলে বা বিভক্তভাবে কাজ করলে তাকে Noun of Multitude বলে। যেমন: "The jury were divided in the verdict" — এখানে jury বিভিন্ন মতে বিভক্ত হওয়ায় Noun of Multitude হিসেবে ব্যবহৃত হয়েছে।`,
        subject: 'English',
        topic: 'Noun',
        subTopic: 'Noun of Multitude',
        sortOrder: 16,
      },

      {
        questionSetId,
        slug: 'noun-of-multitude-e-kon-verb-bose',
        questionText: 'A Noun of Multitude usually takes —',
        optionA: 'Singular Verb',
        optionB: 'Plural Verb',
        optionC: 'No Verb at all',
        optionD: 'Either is correct',
        correctAnswer: 'B',
        explanation: `সঠিক উত্তর: (খ) Plural Verb

Collective Noun-কে সাধারণত Singular হিসেবে বিবেচনা করা হলেও, Noun of Multitude-কে Plural ধরা হয় এবং এর পর Plural Verb বসে — যেমন: "The jury were divided in the verdict."`,
        subject: 'English',
        topic: 'Noun',
        subTopic: 'Noun of Multitude',
        sortOrder: 17,
      },

      {
        questionSetId,
        slug: 'nicher-konti-uncountable-noun',
        questionText: 'Which one is an Uncountable Noun?',
        optionA: 'Book',
        optionB: 'Chair',
        optionC: 'Pen',
        optionD: 'Rice',
        correctAnswer: 'D',
        explanation: `সঠিক উত্তর: (ঘ) Rice

Rice (চাল) সাধারণত সংখ্যায় গণনা করা যায় না, বরং পরিমাণে মাপা হয় — তাই এটি Uncountable Noun (Material Noun)। Book, Chair, Pen — এই তিনটিই আলাদাভাবে গণনা করা যায়, তাই এগুলো Countable Noun।`,
        subject: 'English',
        topic: 'Noun',
        subTopic: 'Countable vs Uncountable',
        sortOrder: 18,
      },

      {
        questionSetId,
        slug: 'common-o-collective-noun-kon-shrenir-ontorgoto',
        questionText: 'Common Noun and Collective Noun generally belong to which category?',
        optionA: 'Uncountable',
        optionB: 'Material',
        optionC: 'Countable',
        optionD: 'Abstract',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) Countable

সাধারণত Common Noun ও Collective Noun হচ্ছে Countable Noun, আর Material ও Abstract Noun হচ্ছে Uncountable Noun। এই নিয়মেই Noun-এর গণনাযোগ্যতা নির্ধারণ করা হয়।`,
        subject: 'English',
        topic: 'Noun',
        subTopic: 'Countable vs Uncountable',
        sortOrder: 19,
      },

      {
        questionSetId,
        slug: 'proper-noun-kokhon-countable-hoy',
        questionText: 'A Proper Noun is generally treated as Countable when —',
        optionA: 'It is used as a Common Noun',
        optionB: 'It is used as a Material Noun',
        optionC: 'It is never countable',
        optionD: 'It is always countable',
        correctAnswer: 'A',
        explanation: `সঠিক উত্তর: (ক) It is used as a Common Noun

Proper Noun সাধারণত Countable বা Uncountable হিসেবে শ্রেণিবদ্ধ করা হয় না। তবে যখন কোনো Proper Noun Common Noun-এর অর্থে ব্যবহৃত হয় (যেমন: "You are a Nazrul"), তখন তা Countable হয়ে যায়।`,
        subject: 'English',
        topic: 'Noun',
        subTopic: 'Countable vs Uncountable',
        sortOrder: 20,
      },

      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // বিষয়: Article-এর ব্যবহার (a/an/the, Zero Article) — প্রশ্ন ২১–২৫
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

      {
        questionSetId,
        slug: 'proper-noun-common-hisebe-byabohrito-hole-article-niyom',
        questionText:
          'When a Proper Noun is used in the sense of a Common Noun, which rule applies for Article?',
        optionA: 'No Article is used',
        optionB: 'The is always used',
        optionC: "It follows the Common Noun's own rule for a/an/the",
        optionD: 'a/an is always used',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) It follows the Common Noun's own rule for a/an/the

Proper Noun যখন Common Noun-এর অর্থে ব্যবহৃত হয়, তখন Common Noun-এর নিয়ম অনুযায়ী a/an/the বসে। যেমন: "You are a Nazrul." — এখানে Nazrul বলতে কবি নজরুলকে নয়, বরং নজরুলের মতো কোনো ব্যক্তিকে বোঝানো হয়েছে, তাই এটি Common Noun হিসেবে গণ্য এবং তার আগে 'a' বসেছে।`,
        subject: 'English',
        topic: 'Article',
        subTopic: 'Article before Proper Noun',
        sortOrder: 21,
      },

      {
        questionSetId,
        slug: 'helen-was-a-beauty-beauty-kon-noun',
        questionText: "'Helen was a beauty.' — Here, 'beauty' is used as —",
        optionA: 'Abstract Noun',
        optionB: 'Material Noun',
        optionC: 'Proper Noun',
        optionD: 'Common Noun',
        correctAnswer: 'D',
        explanation: `সঠিক উত্তর: (ঘ) Common Noun

সাধারণত Abstract Noun হলেও beauty এখানে "a beautiful woman" অর্থে ব্যবহৃত হয়েছে, অর্থাৎ Abstract Noun পুরোপুরি Common Noun-এ রূপান্তরিত হয়েছে। তাই এর আগে Article 'a' বসেছে এবং এটিকে এখানে Common Noun বলতে হবে।`,
        subject: 'English',
        topic: 'Article',
        subTopic: 'Article before Abstract Noun',
        sortOrder: 22,
      },

      {
        questionSetId,
        slug: 'material-noun-er-purbe-article-kokhon-bose',
        questionText: 'Article is used before a Material Noun when —',
        optionA: 'It is always used',
        optionB: 'It is never used',
        optionC: 'It is made specific or particularized',
        optionD: 'It is plural',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) It is made specific or particularized

Material Noun সাধারণত Uncountable এবং তার আগে Article বসে না, কিন্তু যখন তা নির্দিষ্ট বা বিশেষায়িত হয়, তখন Article বসে। যেমন: "The water of this pond is pure." — এখানে water নির্দিষ্ট পুকুরের পানি বোঝানোয় 'The' বসেছে।`,
        subject: 'English',
        topic: 'Article',
        subTopic: 'Article before Material Noun',
        sortOrder: 23,
      },

      {
        questionSetId,
        slug: 'the-rich-are-not-always-happy-rich-kon-noun',
        questionText: "'The rich are not always happy.' — Here, 'rich' functions as —",
        optionA: 'Singular Common Noun',
        optionB: 'Plural Common Noun',
        optionC: 'Proper Noun',
        optionD: 'Material Noun',
        correctAnswer: 'B',
        explanation: `সঠিক উত্তর: (খ) Plural Common Noun

Positive Degree-এর Adjective-এর আগে The যোগ হয়ে যখন সেই গুণসম্পন্ন সবাইকে সাধারণভাবে বোঝায়, তখন তা Plural Common Noun হয়। এখানে 'the rich' অর্থ "ধনী ব্যক্তিরা" — অর্থাৎ Plural।`,
        subject: 'English',
        topic: 'Article',
        subTopic: 'Article with Adjective as Noun',
        sortOrder: 24,
      },

      {
        questionSetId,
        slug: 'kon-khetre-article-bose-na',
        questionText: 'In which of the following cases is NO Article used?',
        optionA: 'To indicate race, religion, or language',
        optionB: 'Before a Singular Countable Noun',
        optionC: 'Before the Superlative Degree',
        optionD: 'Before a Unique Noun',
        correctAnswer: 'A',
        explanation: `সঠিক উত্তর: (ক) To indicate race, religion, or language

জাতি, ধর্ম বা ভাষা বোঝাতে Article বসে না — যেমন: "Bengalis are brave.", "English is an international language.", "Islam is a religion of peace."। অন্যদিকে, Singular Countable Noun (a book/the book), Unique Noun (the sun) এবং Superlative Degree (the best boy)-এর আগে Article অবশ্যই বসে।`,
        subject: 'English',
        topic: 'Article',
        subTopic: 'Zero Article',
        sortOrder: 25,
      },

      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // বিষয়: Determiner — সংজ্ঞা, প্রকারভেদ ও ব্যবহার — প্রশ্ন ২৬–৩০
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

      {
        questionSetId,
        slug: 'determiner-kake-bole',
        questionText: 'Which of the following is the correct definition of a Determiner?',
        optionA: 'A word placed after a Noun that identifies a Verb',
        optionB:
          'A word placed before a Noun that makes it definite/indefinite and indicates number, quantity, or relation',
        optionC: 'A word that modifies a Verb',
        optionD: 'A word placed before an Adjective',
        correctAnswer: 'B',
        explanation: `সঠিক উত্তর: (খ) A word placed before a Noun that makes it definite/indefinite and indicates number, quantity, or relation

যে Word Noun-এর পূর্বে বসে Noun-কে নির্দিষ্ট বা অনির্দিষ্ট করে, তার সংখ্যা, পরিমাণ বা সম্পর্ক নির্দেশ করে, তাকে Determiner বলে। Article (a, an, the)-ও এক ধরনের Determiner।`,
        subject: 'English',
        topic: 'Determiner',
        subTopic: 'Determiner Definition',
        sortOrder: 26,
      },

      {
        questionSetId,
        slug: 'some-kon-dhoroner-sentence-e-byabohrito-hoy',
        questionText: "'Some' is generally used in —",
        optionA: 'Negative Sentence',
        optionB: 'Interrogative Sentence',
        optionC: 'Affirmative Sentence',
        optionD: 'Imperative Sentence',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) Affirmative Sentence

'Some' সাধারণত Affirmative Sentence-এ ইতিবাচক অর্থে ব্যবহৃত হয় — যেমন: "I have some money." ব্যতিক্রম হিসেবে কাউকে কিছু প্রস্তাব করার বা আমন্ত্রণের ক্ষেত্রে প্রশ্নবোধক বাক্যেও 'Some' বসে, যেমন: "Would you like some tea?"`,
        subject: 'English',
        topic: 'Determiner',
        subTopic: 'Some vs Any',
        sortOrder: 27,
      },

      {
        questionSetId,
        slug: 'much-kon-noun-er-sathe-byabohrito-hoy',
        questionText: "'Much' is used with —",
        optionA: 'Countable Noun',
        optionB: 'Uncountable Noun',
        optionC: 'Proper Noun',
        optionD: 'Collective Noun',
        correctAnswer: 'B',
        explanation: `সঠিক উত্তর: (খ) Uncountable Noun

'Much' পরিমাণ বোঝাতে Uncountable Noun-এর সাথে ব্যবহৃত হয় (যেমন: Much water) এবং সাধারণত Negative ও Interrogative বাক্যে বেশি ব্যবহৃত হয়। বিপরীতে, 'Many' Countable Noun-এর সাথে সংখ্যা বোঝাতে ব্যবহৃত হয় (যেমন: Many books)।`,
        subject: 'English',
        topic: 'Determiner',
        subTopic: 'Much vs Many',
        sortOrder: 28,
      },

      {
        questionSetId,
        slug: 'each-er-byabohar-sompporke-sothik-kon-ti',
        questionText: 'Which statement about the use of "Each" is correct?',
        optionA: 'It refers to each one among two or more, and takes a Singular Verb',
        optionB: 'It refers to each one among three or more only',
        optionC: 'It always takes a Plural Verb',
        optionD: 'It refers to the group as a whole, collectively',
        correctAnswer: 'A',
        explanation: `সঠিক উত্তর: (ক) It refers to each one among two or more, and takes a Singular Verb

'Each' দুই বা ততোধিকের মধ্যে প্রত্যেককে আলাদা আলাদাভাবে বা ব্যক্তিকেন্দ্রিক জোর দিয়ে বোঝায় এবং সবসময় Singular Verb নেয় — যেমন: "Each of the two boys got a prize." এর বিপরীতে 'Every' তিন বা ততোধিকের মধ্যে প্রত্যেককে সমষ্টিগতভাবে বোঝায়, তবে সেটিও Singular Verb নেয়।`,
        subject: 'English',
        topic: 'Determiner',
        subTopic: 'Each vs Every',
        sortOrder: 29,
      },

      {
        questionSetId,
        slug: 'all-the-noun-gothoner-sothik-udaharon',
        questionText: 'Which is the correct example of the "All + The + Noun" structure?',
        optionA: 'All the students are present.',
        optionB: 'The all students are present.',
        optionC: 'All students the are present.',
        optionD: 'The the all students are present.',
        correctAnswer: 'A',
        explanation: `সঠিক উত্তর: (ক) All the students are present.

'All' একটি Determiner হলেও এর পর Article 'The' নির্দিষ্ট Noun-এর আগে বসতে পারে (All + The + Noun) — এটি Article ও Determiner পাশাপাশি না বসার সাধারণ নিয়মের একটি ব্যতিক্রম। "The all students" — এই রূপ ভুল, কারণ 'The' কখনো 'All'-এর আগে বসে না।`,
        subject: 'English',
        topic: 'Determiner',
        subTopic: 'Article + Determiner',
        sortOrder: 30,
      },
    ],

    /*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
সারসংক্ষেপ:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
মোট প্রশ্ন: ৩০টি

বিষয় অনুযায়ী বিভাজন:
  Noun (Classification, Suffix Formation, Countability): ২০টি (প্রশ্ন ১–২০)
  Article (a/an/the, Zero Article): ৫টি (প্রশ্ন ২১–২৫)
  Determiner (সংজ্ঞা, প্রকারভেদ, ব্যবহার): ৫টি (প্রশ্ন ২৬–৩০)

উৎস: Live MCQ — English Wizrd Book Series
  Class-2 — Noun, Article & Determiner (Part 1)
  Class-3 — Noun, Article & Determiner (Part 2)
  Mentor: তাশফিকাল সামি (সহকারী কমিশনার ও নির্বাহী ম্যাজিস্ট্রেট, সুপারিশপ্রাপ্ত)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/

    skipDuplicates: true,
  });
  console.log('✓ English Wizrd (Noun, Article & Determiner — Class 2 & 3) questions seeded');
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
