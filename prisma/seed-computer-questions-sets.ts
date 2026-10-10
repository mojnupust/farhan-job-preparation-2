import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
// TODO: replace with the actual QuestionSet id for this exam before running
const questionSetId = 'cmtconqys0003h301jt407nan';

async function main() {
  // Seed mock questions
  await prisma.question.createMany({
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // অগ্রদূত Recent Job Solution — মন্ত্রিপরিষদ বিভাগ
    // পদের নাম: কম্পিউটার অপারেটর
    // পরীক্ষার তারিখ: ২৮.০৮.২০২৬ | সময়: ৬০ মিনিট | পূর্ণমান: ৭০
    // মোট প্রশ্ন: ৭০টি (প্রশ্ন ১৮ উৎস পাতায় অনুপস্থিত থাকায় বাদ)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    data: [
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // বিষয়: বাংলা ভাষা ও সাহিত্য — প্রশ্ন ০১–২০
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

      {
        questionSetId,
        slug: 'shiksha-o-monussotto-probondhe-mullobodh-srishtir-upay',
        questionText: "১. 'শিক্ষা ও মনুষ্যত্ব' প্রবন্ধে মূল্যবোধ সৃষ্টির উপায় কোনটি?",
        optionA: 'শিক্ষা',
        optionB: 'জ্ঞান',
        optionC: 'মুক্তি',
        optionD: 'চিন্তা',
        correctAnswer: 'A',
        explanation: `সঠিক উত্তর: (ক) শিক্ষা

প্রবন্ধকারের মতে মানুষের মধ্যে মূল্যবোধ তথা মনুষ্যত্ব সৃষ্টির মূল হাতিয়ার হলো শিক্ষা। শিক্ষার মাধ্যমেই মানুষ বিবেক, নৈতিকতা ও মূল্যবোধসম্পন্ন হয়ে ওঠে।

মনে রাখার কৌশল:
— শিরোনামেই 'শিক্ষা' শব্দটি আছে — শিক্ষা থেকেই মনুষ্যত্বের বিকাশ শুরু
— জ্ঞান, মুক্তি, চিন্তা — এগুলো শিক্ষারই ফলাফল, উৎস নয়`,
        subject: 'বাংলা ভাষা ও সাহিত্য',
        topic: 'প্রবন্ধ সাহিত্য',
        subTopic: 'শিক্ষা ও মনুষ্যত্ব',
        sortOrder: 1,
      },

      {
        questionSetId,
        slug: 'timir-shobder-ortho-ki',
        questionText: "২. 'তিমির' শব্দের অর্থ কী?",
        optionA: 'শিকল',
        optionB: 'অন্ধকার',
        optionC: 'বৃক্ষ',
        optionD: 'নিঃস্ব',
        correctAnswer: 'B',
        explanation: `সঠিক উত্তর: (খ) অন্ধকার

'তিমির' একটি তৎসম শব্দ, যার আভিধানিক অর্থ অন্ধকার বা আঁধার। সাহিত্যে প্রায়ই 'ঘোর তিমির', 'তিমিরবিনাশী' প্রভৃতি প্রয়োগে অজ্ঞানতা বা অন্ধকারের প্রতীক হিসেবে ব্যবহৃত হয়।

পার্থক্য মনে রাখুন:
— শিকল = বন্ধন/বেড়ি
— বৃক্ষ = গাছ
— নিঃস্ব = সহায়সম্বলহীন`,
        subject: 'বাংলা ভাষা ও সাহিত্য',
        topic: 'শব্দার্থ ও প্রতিশব্দ',
        subTopic: 'তৎসম শব্দ',
        sortOrder: 2,
      },

      {
        questionSetId,
        slug: 'syed-mujtaba-ali-rochona-noy-konti',
        questionText: '৩. কোনটি সৈয়দ মুজতবা আলীর রচনা নয়?',
        optionA: 'চাচা-কাহিনী',
        optionB: 'শবনম',
        optionC: 'শহরতলী',
        optionD: 'দেশে-বিদেশে',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) শহরতলী

সৈয়দ মুজতবা আলীর উল্লেখযোগ্য রচনা: চাচা-কাহিনী, শবনম, দেশে-বিদেশে, ধূপছায়া, পঞ্চতন্ত্র প্রভৃতি। 'শহরতলী' তাঁর রচনা নয় — এটি বিভ্রান্তিকর অপশন হিসেবে দেওয়া হয়েছে।

লেখক পরিচিতি:
— সৈয়দ মুজতবা আলী রম্যরচনা ও ভ্রমণকাহিনীর জন্য বিখ্যাত
— 'দেশে-বিদেশে' তাঁর বিখ্যাত ভ্রমণকাহিনী (আফগানিস্তান ভ্রমণ)
— 'চাচা-কাহিনী' ও 'শবনম' তাঁর উপন্যাস/গল্পগ্রন্থ`,
        subject: 'বাংলা ভাষা ও সাহিত্য',
        topic: 'লেখক পরিচিতি',
        subTopic: 'সৈয়দ মুজতবা আলী',
        sortOrder: 3,
      },

      {
        questionSetId,
        slug: 'foklor-shobdotir-udbhabok-ke',
        questionText: "৪. 'ফোকলোর' শব্দটির উদ্ভাবক কে?",
        optionA: 'উইলিয়াম থমাস',
        optionB: 'মার্টিন কুপার',
        optionC: 'নিকোলাস',
        optionD: 'উইলিয়াম জেমস',
        correctAnswer: 'A',
        explanation: `সঠিক উত্তর: (ক) উইলিয়াম থমাস

'Folklore' শব্দটি ১৮৪৬ সালে ইংরেজ প্রত্নতত্ত্ববিদ উইলিয়াম জন থমস (William John Thoms) প্রথম ব্যবহার করেন, যা লোকজ্ঞান বা লোকঐতিহ্য বোঝাতে প্রচলিত হয়।

ভুল অপশন এড়িয়ে চলুন:
— মার্টিন কুপার মোবাইল ফোনের উদ্ভাবক, ফোকলোরের নয়
— উইলিয়াম জেমস একজন দার্শনিক/মনোবিজ্ঞানী, ভিন্ন ক্ষেত্র`,
        subject: 'বাংলা ভাষা ও সাহিত্য',
        topic: 'লোকসাহিত্য',
        subTopic: 'ফোকলোর পরিভাষা',
        sortOrder: 4,
      },

      {
        questionSetId,
        slug: 'daat-thakte-dater-morjo-nei-kon-dhoroner-sahitto',
        questionText: "৫. 'দাঁত থাকতে দাঁতের মর্ম নেই' - এটি কোন ধরনের সাহিত্য?",
        optionA: 'প্রবাদ সাহিত্য',
        optionB: 'ছড়া',
        optionC: 'খনার বচন',
        optionD: 'উপকথা',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) খনার বচন

'দাঁত থাকতে দাঁতের মর্ম নেই' জাতীয় প্রবাদ-জ্ঞানমূলক উক্তিগুলো খনার বচন হিসেবে পরিচিত — প্রাচীন কৃষি ও জীবনজ্ঞাননির্ভর ছন্দোবদ্ধ বাণী।

পার্থক্য:
— প্রবাদ সাধারণ লৌকিক উক্তি হলেও 'বচন' শব্দটি নির্দিষ্টভাবে খনার বচনকে নির্দেশ করে
— ছড়া মূলত ছন্দোময় শিশুতোষ রচনা
— উপকথা কাল্পনিক নীতিকথামূলক গল্প`,
        subject: 'বাংলা ভাষা ও সাহিত্য',
        topic: 'লোকসাহিত্য',
        subTopic: 'খনার বচন',
        sortOrder: 5,
      },

      {
        questionSetId,
        slug: 'agnibina-o-bisher-bashi-kon-dhoroner-rochona',
        questionText: "৬. 'অগ্নিবীণা' ও 'বিষের বাঁশি' কোন ধরনের রচনা?",
        optionA: 'কাব্যগ্রন্থ',
        optionB: 'নাটক',
        optionC: 'উপন্যাস',
        optionD: 'ছোট গল্প',
        correctAnswer: 'A',
        explanation: `সঠিক উত্তর: (ক) কাব্যগ্রন্থ

'অগ্নিবীণা' (১৯২২) ও 'বিষের বাঁশি' (১৯২৪) কাজী নজরুল ইসলামের বিখ্যাত কাব্যগ্রন্থ। 'অগ্নিবীণা'তে বিদ্রোহী কবিতাটি সংকলিত, আর 'বিষের বাঁশি' প্রকাশের পরপরই ব্রিটিশ সরকার বাজেয়াপ্ত করেছিল।

নজরুলের কাব্যগ্রন্থ মনে রাখুন:
— অগ্নিবীণা, বিষের বাঁশি, সাম্যবাদী, সর্বহারা, ফণিমনসা — সবই কাব্যগ্রন্থ`,
        subject: 'বাংলা ভাষা ও সাহিত্য',
        topic: 'কাজী নজরুল ইসলাম',
        subTopic: 'কাব্যগ্রন্থ',
        sortOrder: 6,
      },

      {
        questionSetId,
        slug: 'kazi-nazrul-islam-lekhapora-koren-kon-schoole',
        questionText: '৭. কাজী নজরুল ইসলাম লেখাপড়া করেন কোন স্কুলে?',
        optionA: 'করাচি হাইস্কুল',
        optionB: 'ত্রিশাল সরকারি হাইস্কুল',
        optionC: 'তালিবাবাদ হাইস্কুল',
        optionD: 'দরিরামপুর হাইস্কুল',
        correctAnswer: 'D',
        explanation: `সঠিক উত্তর: (ঘ) দরিরামপুর হাইস্কুল

কাজী নজরুল ইসলাম তাঁর জন্মস্থান চুরুলিয়ার কাছাকাছি ময়মনসিংহের ত্রিশালে দরিরামপুর হাইস্কুলে (বর্তমানে নজরুল একাডেমী উচ্চ বিদ্যালয়) পড়াশোনা করেন।

জীবনীর সংশ্লিষ্ট তথ্য:
— জন্ম: চুরুলিয়া, বর্ধমান, পশ্চিমবঙ্গ (১৮৯৯)
— পরবর্তীতে সেনাবাহিনীতে যোগ দেন করাচিতে — যা 'করাচি হাইস্কুল' অপশনের সাথে গুলিয়ে ফেলার ফাঁদ`,
        subject: 'বাংলা ভাষা ও সাহিত্য',
        topic: 'কাজী নজরুল ইসলাম',
        subTopic: 'জীবনী',
        sortOrder: 7,
      },

      {
        questionSetId,
        slug: 'totsomo-sondhi-koto-prokar',
        questionText: '৮. তৎসম সন্ধি কত প্রকার?',
        optionA: 'দুই',
        optionB: 'চার',
        optionC: 'তিন',
        optionD: 'পাঁচ',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) তিন

তৎসম (সংস্কৃত) সন্ধি তিন প্রকার:
১. স্বরসন্ধি — যেমন: হিম + আলয় = হিমালয়
২. ব্যঞ্জনসন্ধি — যেমন: জগৎ + নাথ = জগন্নাথ
৩. বিসর্গসন্ধি — যেমন: নিঃ + ছল = নিশ্ছল

মনে রাখার কৌশল: বাংলা সন্ধি স্বরসন্ধি ও ব্যঞ্জনসন্ধি — মাত্র দুই প্রকার, তৎসম সন্ধির সাথে গুলিয়ে ফেলা যাবে না।`,
        subject: 'বাংলা ভাষা ও সাহিত্য',
        topic: 'বাংলা ব্যাকরণ',
        subTopic: 'সন্ধি',
        sortOrder: 8,
      },

      {
        questionSetId,
        slug: 'o-jog-o-samaan-aa-sondhibaddho-shobder-udaharon',
        questionText: '৯. অ+অ = আ-এর সন্ধিবদ্ধ শব্দের উদাহরণ কোনটি?',
        optionA: 'হিয়াতি',
        optionB: 'সিংহাসন',
        optionC: 'হিতাহিত',
        optionD: 'কারাগার',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) হিতাহিত

হিত + অহিত = হিতাহিত — এখানে 'হিত'-এর শেষ স্বর 'অ' এবং 'অহিত'-এর প্রথম স্বর 'অ' মিলে 'আ' হয়েছে (অ+অ=আ)।

অন্যান্য উদাহরণ:
— রত্ন + অকর = রত্নাকর
— হিম + অচল = হিমাচল

অপশন যাচাই: সিংহাসন (সিংহ+আসন, আ+আ=আ) ও কারাগার (কারা+আগার) ভিন্ন স্বরসন্ধির উদাহরণ, তাই বাদ পড়ে।`,
        subject: 'বাংলা ভাষা ও সাহিত্য',
        topic: 'বাংলা ব্যাকরণ',
        subTopic: 'স্বরসন্ধি',
        sortOrder: 9,
      },

      {
        questionSetId,
        slug: 'onneshon-shobdoti-kon-sondhi',
        questionText: "১০. 'অন্বেষণ' শব্দটি কোন সন্ধি?",
        optionA: 'স্বরসন্ধি',
        optionB: 'ব্যঞ্জনসন্ধি',
        optionC: 'বিসর্গ সন্ধি',
        optionD: 'নিপাতনে সিদ্ধ সন্ধি',
        correctAnswer: 'A',
        explanation: `সঠিক উত্তর: (ক) স্বরসন্ধি

অনু + এষণ = অন্বেষণ — এখানে স্বরে স্বরে মিলন ঘটে ব্যঞ্জনধ্বনির উদ্ভব হয়েছে (উ + এ = ব্+এ), যা স্বরসন্ধির অন্তর্গত এক বিশেষ নিয়ম (য়ণ/ব্ আদেশ)।

মনে রাখুন:
— এ ধরনের 'উ/ঊ + স্বর' মিলনে ব্/য় জাত হওয়া স্বরসন্ধিরই একটি রূপ, ব্যঞ্জনসন্ধি নয়`,
        subject: 'বাংলা ভাষা ও সাহিত্য',
        topic: 'বাংলা ব্যাকরণ',
        subTopic: 'স্বরসন্ধি',
        sortOrder: 10,
      },

      {
        questionSetId,
        slug: 'konti-bangla-upasargo',
        questionText: '১১. কোনটি বাংলা উপসর্গ?',
        optionA: 'প্রতি',
        optionB: 'অতি',
        optionC: 'ইতি',
        optionD: 'অধি',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) ইতি

'ইতি' খাঁটি বাংলা উপসর্গ (যেমন: ইতিকথা, ইতিহাস-এ ভিন্ন অর্থে ব্যবহৃত হলেও নিজস্ব বাংলা উপসর্গ হিসেবে গণ্য)। প্রতি, অতি, অধি — এগুলো সবই তৎসম (সংস্কৃত) উপসর্গ।

পার্থক্য মনে রাখুন:
— বাংলা উপসর্গ ২১টি: অ, অজ, অনা, আ, আব, ইতি, উন, ঊন, কদ, কু, নি, নিতি, পাতি, বি, ভর, স, সা, সু, হা প্রভৃতি
— তৎসম উপসর্গ ২০টি: প্র, পরা, অপ, সম, নি, অনু, অব, অধি, অতি প্রভৃতি`,
        subject: 'বাংলা ভাষা ও সাহিত্য',
        topic: 'বাংলা ব্যাকরণ',
        subTopic: 'উপসর্গ',
        sortOrder: 11,
      },

      {
        questionSetId,
        slug: 'akashe-chad-uthechhe-akashe-kon-odhikoron',
        questionText: "১২. 'আকাশে চাঁদ উঠেছে'- আকাশে কোন অধিকরণ?",
        optionA: 'অভিব্যাপক',
        optionB: 'আধারাধিকরণ',
        optionC: 'ঐকদেশিক',
        optionD: 'কালাধিকরণ',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) ঐকদেশিক

'আকাশে চাঁদ উঠেছে' — এখানে আকাশের কোনো একটি নির্দিষ্ট অংশে চাঁদ অবস্থান করছে (সমগ্র আকাশজুড়ে নয়), তাই এটি ঐকদেশিক অধিকরণ।

অধিকরণ কারকের প্রকারভেদ মনে রাখুন:
— আধারাধিকরণ: সামগ্রিকভাবে অবস্থান (যেমন: কলসিতে জল আছে)
— ঐকদেশিক অধিকরণ: আধারের কোনো একদেশে অবস্থান (যেমন: আকাশে চাঁদ, বনে বাঘ থাকে)
— অভিব্যাপক অধিকরণ: সমগ্র আধার জুড়ে ব্যাপ্ত (যেমন: গাছে ফুল ফুটেছে - পুরো গাছজুড়ে)
— কালাধিকরণ: সময় বোঝায় (যেমন: রাতে চাঁদ ওঠে)`,
        subject: 'বাংলা ভাষা ও সাহিত্য',
        topic: 'বাংলা ব্যাকরণ',
        subTopic: 'কারক ও অধিকরণ',
        sortOrder: 12,
      },

      {
        questionSetId,
        slug: 'dr-muhammad-shahidullah-koto-sale-jonmogrohon-koren',
        questionText: '১৩. ড. মুহাম্মদ শহীদুল্লাহ কত সালে জন্মগ্রহণ করেন?',
        optionA: '১৮৮২',
        optionB: '১৮৮৫',
        optionC: '১৮৯২',
        optionD: '১৮৯৫',
        correctAnswer: 'B',
        explanation: `সঠিক উত্তর: (খ) ১৮৮৫

ড. মুহাম্মদ শহীদুল্লাহ (১৮৮৫-১৯৬৯) ছিলেন বাংলাদেশের প্রখ্যাত ভাষাবিজ্ঞানী, শিক্ষাবিদ ও সাহিত্যিক। তিনি জন্মগ্রহণ করেন ১৮৮৫ সালে, পশ্চিমবঙ্গের হুগলি জেলায়।

সংশ্লিষ্ট তথ্য:
— তিনি ঢাকা বিশ্ববিদ্যালয়ের বাংলা বিভাগের প্রথম অধ্যাপক ছিলেন
— বাংলা ভাষার উৎপত্তি বিষয়ে গবেষণার জন্য বিখ্যাত`,
        subject: 'বাংলা ভাষা ও সাহিত্য',
        topic: 'ভাষাবিদ পরিচিতি',
        subTopic: 'ড. মুহাম্মদ শহীদুল্লাহ',
        sortOrder: 13,
      },

      {
        questionSetId,
        slug: 'jugobani-kazi-nazruler-kon-dhoroner-grontho',
        questionText: "১৪. 'যুগবাণী' কাজী নজরুলের কোন ধরনের গ্রন্থ?",
        optionA: 'কাব্য',
        optionB: 'উপন্যাস',
        optionC: 'প্রবন্ধ',
        optionD: 'নাটক',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) প্রবন্ধ

'যুগবাণী' (১৯২২) কাজী নজরুল ইসলামের একটি প্রবন্ধগ্রন্থ, যেখানে সমকালীন রাজনৈতিক ও সামাজিক প্রসঙ্গ নিয়ে লেখা প্রবন্ধ সংকলিত হয়েছে। এই গ্রন্থও ব্রিটিশ সরকার বাজেয়াপ্ত করেছিল।

নজরুলের প্রবন্ধগ্রন্থ মনে রাখুন:
— যুগবাণী, রুদ্রমঙ্গল, দুর্দিনের যাত্রী — এগুলো প্রবন্ধগ্রন্থ
— এর বিপরীতে অগ্নিবীণা, বিষের বাঁশি — কাব্যগ্রন্থ`,
        subject: 'বাংলা ভাষা ও সাহিত্য',
        topic: 'কাজী নজরুল ইসলাম',
        subTopic: 'প্রবন্ধগ্রন্থ',
        sortOrder: 14,
      },

      {
        questionSetId,
        slug: 'shobdotottwo-er-arek-nam-ki',
        questionText: "১৫. 'শব্দতত্ত্ব'-এর আরেক নাম কি?",
        optionA: 'ধ্বনিতত্ত্ব',
        optionB: 'বাক্যতত্ত্ব',
        optionC: 'অর্থতত্ত্ব',
        optionD: 'রূপতত্ত্ব',
        correctAnswer: 'D',
        explanation: `সঠিক উত্তর: (ঘ) রূপতত্ত্ব

ব্যাকরণের যে শাখায় শব্দের গঠন, রূপ পরিবর্তন, প্রকৃতি-প্রত্যয় যোগে শব্দ গঠন প্রক্রিয়া আলোচিত হয়, তাকে শব্দতত্ত্ব বা রূপতত্ত্ব (Morphology) বলে।

ব্যাকরণের চারটি শাখা মনে রাখুন:
— ধ্বনিতত্ত্ব: ধ্বনি নিয়ে আলোচনা
— শব্দতত্ত্ব/রূপতত্ত্ব: শব্দ গঠন নিয়ে আলোচনা
— বাক্যতত্ত্ব: বাক্য গঠন নিয়ে আলোচনা
— অর্থতত্ত্ব: অর্থ নিয়ে আলোচনা`,
        subject: 'বাংলা ভাষা ও সাহিত্য',
        topic: 'বাংলা ব্যাকরণ',
        subTopic: 'রূপতত্ত্ব',
        sortOrder: 15,
      },

      {
        questionSetId,
        slug: 'shobder-khudrotomo-ekok-konti',
        questionText: '১৬. শব্দের ক্ষুদ্রতম একক কোনটি?',
        optionA: 'অক্ষর',
        optionB: 'ধ্বনি',
        optionC: 'ধাতু',
        optionD: 'প্রকৃতি',
        correctAnswer: 'B',
        explanation: `সঠিক উত্তর: (খ) ধ্বনি

ভাষার ক্ষুদ্রতম একক হলো ধ্বনি (phoneme) — যা দিয়ে শব্দ গঠিত হয়। একাধিক ধ্বনি মিলে শব্দ গঠিত হয়, আর একাধিক শব্দ মিলে বাক্য গঠিত হয়।

স্তরবিন্যাস মনে রাখুন:
ধ্বনি → শব্দাংশ/অক্ষর → শব্দ → পদ → বাক্য`,
        subject: 'বাংলা ভাষা ও সাহিত্য',
        topic: 'বাংলা ব্যাকরণ',
        subTopic: 'ধ্বনিতত্ত্ব',
        sortOrder: 16,
      },

      {
        questionSetId,
        slug: 'shobdomul-konti',
        questionText: '১৭. শব্দমূল কোনটি?',
        optionA: 'নাম প্রকৃতি',
        optionB: 'প্রত্যয়',
        optionC: 'বিভক্তি',
        optionD: 'ক্রিয়া বিভক্তি',
        correctAnswer: 'A',
        explanation: `সঠিক উত্তর: (ক) নাম প্রকৃতি

শব্দমূল বলতে বোঝায় শব্দ গঠনের মূল অংশ, যাকে ব্যাকরণে নাম প্রকৃতি বলা হয়। এর সাথে প্রত্যয় যুক্ত হয়ে নতুন শব্দ গঠিত হয়।

পার্থক্য মনে রাখুন:
— ধাতু = ক্রিয়ামূল (ক্রিয়াপদের মূল অংশ)
— নাম প্রকৃতি = শব্দমূল (বিশেষ্য/বিশেষণ পদের মূল অংশ)
— প্রত্যয় ও বিভক্তি — এগুলো মূলের সাথে যুক্ত হওয়া অংশ, মূল নয়`,
        subject: 'বাংলা ভাষা ও সাহিত্য',
        topic: 'বাংলা ব্যাকরণ',
        subTopic: 'প্রকৃতি ও প্রত্যয়',
        sortOrder: 17,
      },

      // প্রশ্ন ১৮ উৎস পাতায় (ছবিতে) অনুপস্থিত — বাদ দেওয়া হয়েছে

      {
        questionSetId,
        slug: 'konti-ordho-totsomo-shobdo',
        questionText: '১৯. কোনটি অর্ধ-তৎসম শব্দ?',
        optionA: 'সূর্য',
        optionB: 'সুনাম',
        optionC: 'জবান',
        optionD: 'জোছনা',
        correctAnswer: 'D',
        explanation: `সঠিক উত্তর: (ঘ) জোছনা

'জোছনা' শব্দটি সংস্কৃত 'জ্যোৎস্না' থেকে সামান্য রূপ পরিবর্তনসহ এসেছে বলে এটি অর্ধ-তৎসম শব্দ। সম্পূর্ণ অপরিবর্তিত রূপে সংস্কৃত থেকে না এসে সামান্য বিকৃত রূপে বাংলায় প্রবেশ করাই অর্ধ-তৎসম শব্দের বৈশিষ্ট্য।

পার্থক্য মনে রাখুন:
— সূর্য: অবিকৃত তৎসম শব্দ
— জবান: ফারসি শব্দ (বিদেশী)
— সুনাম: তৎসম উপসর্গযুক্ত শব্দ`,
        subject: 'বাংলা ভাষা ও সাহিত্য',
        topic: 'বাংলা ব্যাকরণ',
        subTopic: 'শব্দের উৎসগত শ্রেণিবিভাগ',
        sortOrder: 18,
      },

      {
        questionSetId,
        slug: 'amdani-kon-vashar-shobdo',
        questionText: "২০. 'আমদানি' কোন ভাষার শব্দ?",
        optionA: 'বাংলা',
        optionB: 'আরবি',
        optionC: 'ফারসি',
        optionD: 'পর্তুগিজ',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) ফারসি

'আমদানি' একটি ফারসি শব্দ, যার অর্থ আমদানি/আয়াত করা। বাণিজ্য-সংশ্লিষ্ট বহু ফারসি শব্দ বাংলায় প্রচলিত — যেমন: রপ্তানি (আংশিক), দোকান, বাজার প্রভৃতি।

বিদেশী শব্দের উৎস মনে রাখুন:
— ফারসি শব্দ: আমদানি, দরবার, রোজনামচা, বেগম, দস্তখত
— পর্তুগিজ শব্দ: আলমারি, চাবি, বালতি, আনারস`,
        subject: 'বাংলা ভাষা ও সাহিত্য',
        topic: 'বাংলা ব্যাকরণ',
        subTopic: 'বিদেশী শব্দ',
        sortOrder: 19,
      },

      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // বিষয়: বাংলাদেশ ও আন্তর্জাতিক বিষয়াবলি, সাধারণ বিজ্ঞান,
      //        কম্পিউটার ও ধর্মীয় সাধারণ জ্ঞান — প্রশ্ন ২১–৪০
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

      {
        questionSetId,
        slug: 'dhakar-oitihashik-ahsan-monjil-nirmito-hoy-koto-sale',
        questionText: '২১. ঢাকার ঐতিহাসিক আহসান মঞ্জিল নির্মিত হয় কত সালে?',
        optionA: '১৯৭২',
        optionB: '১৯০৫',
        optionC: '১৮৭২',
        optionD: '১২১৭',
        correctAnswer: 'B',
        explanation: `সঠিক উত্তর: (খ) ১৯০৫

আহসান মঞ্জিল ঢাকার নবাব পরিবারের ঐতিহাসিক আবাসিক প্রাসাদ, যা বুড়িগঙ্গা নদীর তীরে অবস্থিত। এর নির্মাণ শুরু হয় ১৮৫৯ সালে এবং সম্পূর্ণ নির্মাণ শেষ হয় ১৯০৫ সালে।

সংশ্লিষ্ট তথ্য:
— বর্তমানে এটি জাদুঘর হিসেবে সংরক্ষিত
— নবাব আবদুল গনি এই প্রাসাদ নির্মাণ করেন`,
        subject: 'বাংলাদেশ বিষয়াবলি',
        topic: 'ইতিহাস ও ঐতিহ্য',
        subTopic: 'আহসান মঞ্জিল',
        sortOrder: 20,
      },

      {
        questionSetId,
        slug: 'sundorbaner-purbe-kon-nodi-obosthito',
        questionText: '২২. সুন্দরবনের পূর্বে কোন নদী অবস্থিত?',
        optionA: 'রূপসা',
        optionB: 'মাতামুহুরী',
        optionC: 'মেঘনা',
        optionD: 'বলেশ্বর',
        correctAnswer: 'D',
        explanation: `সঠিক উত্তর: (ঘ) বলেশ্বর

সুন্দরবনের পূর্ব দিকের সীমানা নির্ধারণ করেছে বলেশ্বর নদী, যা বাগেরহাট ও পিরোজপুর জেলার মধ্য দিয়ে প্রবাহিত হয়ে বঙ্গোপসাগরে পড়েছে।

সুন্দরবনের ভৌগোলিক সীমানা মনে রাখুন:
— পূর্বে: বলেশ্বর নদী
— পশ্চিমে: হুগলি/রায়মঙ্গল নদী (ভারত সীমান্ত)
— দক্ষিণে: বঙ্গোপসাগর`,
        subject: 'বাংলাদেশ বিষয়াবলি',
        topic: 'ভূগোল',
        subTopic: 'সুন্দরবন',
        sortOrder: 21,
      },

      {
        questionSetId,
        slug: 'jonoshonkhar-dik-theke-prithibite-bangladesher-obosthan-kototomo',
        questionText: '২৩. জনসংখ্যার দিক থেকে পৃথিবীতে বাংলাদেশের অবস্থান কততম?',
        optionA: 'পঞ্চম',
        optionB: 'সপ্তম',
        optionC: 'অষ্টম',
        optionD: 'এগারোতম',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) অষ্টম

জনসংখ্যার দিক থেকে বাংলাদেশ বিশ্বে অষ্টম স্থানে অবস্থিত। এর আগে যথাক্রমে চীন, ভারত, যুক্তরাষ্ট্র, ইন্দোনেশিয়া, পাকিস্তান, নাইজেরিয়া, ব্রাজিল রয়েছে।

মনে রাখার কৌশল:
— আয়তনে ছোট হলেও ঘনবসতির কারণে বাংলাদেশ জনসংখ্যায় শীর্ষ দশে অবস্থান করে`,
        subject: 'বাংলাদেশ বিষয়াবলি',
        topic: 'জনসংখ্যা',
        subTopic: 'বৈশ্বিক অবস্থান',
        sortOrder: 22,
      },

      {
        questionSetId,
        slug: 'sangbidhanikbhabe-eshiar-ekmatro-bouddho-rashtro-konti',
        questionText: '২৪. সাংবিধানিকভাবে এশিয়ার একমাত্র বৌদ্ধ রাষ্ট্র কোনটি?',
        optionA: 'চীন',
        optionB: 'জাপান',
        optionC: 'শ্রীলঙ্কা',
        optionD: 'নেপাল',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) শ্রীলঙ্কা

শ্রীলঙ্কার সংবিধানে বৌদ্ধ ধর্মকে বিশেষ মর্যাদা দিয়ে রাষ্ট্রধর্ম হিসেবে স্বীকৃতি দেওয়া হয়েছে, যা এশিয়ার মধ্যে ব্যতিক্রম।

পার্থক্য মনে রাখুন:
— চীন সাংবিধানিকভাবে নাস্তিক/ধর্মনিরপেক্ষ রাষ্ট্র হলেও বৌদ্ধ জনগোষ্ঠী রয়েছে
— জাপানে বৌদ্ধ ধর্ম প্রধান হলেও সংবিধানে রাষ্ট্রধর্ম ঘোষিত নয়
— নেপাল বর্তমানে ধর্মনিরপেক্ষ রাষ্ট্র (২০০৮ থেকে হিন্দু রাষ্ট্র নয়)`,
        subject: 'আন্তর্জাতিক বিষয়াবলি',
        topic: 'রাষ্ট্র পরিচিতি',
        subTopic: 'রাষ্ট্রধর্ম',
        sortOrder: 23,
      },

      {
        questionSetId,
        slug: 'eshiar-dirghotomo-nodi-konti',
        questionText: '২৫. এশিয়ার দীর্ঘতম নদী কোনটি?',
        optionA: 'হোয়াংহো',
        optionB: 'যমুনা',
        optionC: 'ইয়াংসিকিয়াং',
        optionD: 'সিন্ধু',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) ইয়াংসিকিয়াং

ইয়াংসিকিয়াং (Yangtze) নদী চীনের মধ্য দিয়ে প্রবাহিত এশিয়ার দীর্ঘতম এবং বিশ্বের তৃতীয় দীর্ঘতম নদী (প্রায় ৬,৩০০ কিমি)।

তুলনামূলক দৈর্ঘ্য মনে রাখুন:
— হোয়াংহো (হলুদ নদী): চীনের দ্বিতীয় দীর্ঘতম নদী
— সিন্ধু: পাকিস্তানের প্রধান নদী, তুলনামূলক ছোট`,
        subject: 'আন্তর্জাতিক বিষয়াবলি',
        topic: 'ভূগোল',
        subTopic: 'নদী',
        sortOrder: 24,
      },

      {
        questionSetId,
        slug: 'cholesterol-er-provabe-sharire-ki-provab-pore',
        questionText: '২৬. কোলেস্টেরল এর প্রভাবে শরীরে কী প্রভাব পড়ে?',
        optionA: 'মস্তিষ্কে রক্তক্ষরণ হয়',
        optionB: 'কিডনি অকেজো হয়',
        optionC: 'অন্ধত্বরণ করে',
        optionD: 'হৃদরোগের আশঙ্কা বাড়ে',
        correctAnswer: 'D',
        explanation: `সঠিক উত্তর: (ঘ) হৃদরোগের আশঙ্কা বাড়ে

রক্তে উচ্চমাত্রার (বিশেষত এলডিএল) কোলেস্টেরল ধমনীর গায়ে জমে ধমনী সরু করে দেয় (এথেরোস্ক্লেরোসিস), যার ফলে হৃদরোগ ও স্ট্রোকের ঝুঁকি বহুগুণে বেড়ে যায়।

মনে রাখুন:
— এইচডিএল (HDL) কে 'ভালো কোলেস্টেরল' বলা হয়, এলডিএল (LDL) কে 'খারাপ কোলেস্টেরল'`,
        subject: 'সাধারণ বিজ্ঞান',
        topic: 'জীববিজ্ঞান',
        subTopic: 'কোলেস্টেরল ও হৃদরোগ',
        sortOrder: 25,
      },

      {
        questionSetId,
        slug: 'bayumondole-kon-gasher-ghonotto-sobcheye-beshi',
        questionText: '২৭. বায়ুমণ্ডলে কোন গ্যাসের ঘনত্ব সবচেয়ে বেশি?',
        optionA: 'হাইড্রোজেন',
        optionB: 'নাইট্রোজেন',
        optionC: 'অক্সিজেন',
        optionD: 'কার্বন-ডাই-অক্সাইড',
        correctAnswer: 'B',
        explanation: `সঠিক উত্তর: (খ) নাইট্রোজেন

বায়ুমণ্ডলের প্রায় ৭৮% নাইট্রোজেন গ্যাস, যা সবচেয়ে বেশি ঘনত্বের গ্যাস। এরপর অক্সিজেন (প্রায় ২১%), আর্গন (প্রায় ০.৯%) এবং সামান্য পরিমাণ কার্বন-ডাই-অক্সাইডসহ অন্যান্য গ্যাস রয়েছে।

শতকরা হার মনে রাখুন:
নাইট্রোজেন (৭৮%) > অক্সিজেন (২১%) > আর্গন (০.৯%) > কার্বন-ডাই-অক্সাইড (০.০৪%)`,
        subject: 'সাধারণ বিজ্ঞান',
        topic: 'পরিবেশ বিজ্ঞান',
        subTopic: 'বায়ুমণ্ডলের উপাদান',
        sortOrder: 26,
      },

      {
        questionSetId,
        slug: 'chatgpt-er-protishthata-company-konti',
        questionText: '২৮. ChatGPT এর প্রতিষ্ঠাতা কোম্পানি কোনটি?',
        optionA: 'Microsoft',
        optionB: 'OpenAI',
        optionC: 'Google',
        optionD: 'SpaceX',
        correctAnswer: 'B',
        explanation: `সঠিক উত্তর: (খ) OpenAI

ChatGPT তৈরি করেছে OpenAI নামের একটি আমেরিকান কৃত্রিম বুদ্ধিমত্তা (AI) গবেষণা প্রতিষ্ঠান, যা ২০১৫ সালে প্রতিষ্ঠিত হয়। Microsoft OpenAI-এর একটি প্রধান বিনিয়োগকারী প্রতিষ্ঠান, কিন্তু প্রতিষ্ঠাতা নয়।

সতর্কতা:
— Microsoft বিনিয়োগকারী, নির্মাতা নয় — এই বিভ্রান্তি এড়িয়ে চলুন
— Google-এর নিজস্ব AI মডেল Gemini/Bard, ChatGPT নয়`,
        subject: 'কম্পিউটার ও তথ্যপ্রযুক্তি',
        topic: 'সাম্প্রতিক প্রযুক্তি',
        subTopic: 'কৃত্রিম বুদ্ধিমত্তা (AI)',
        sortOrder: 27,
      },

      {
        questionSetId,
        slug: 'holud-bihar-bangladesher-kon-jelay-obosthito',
        questionText: '২৯. হলুদ বিহার বাংলাদেশের কোন জেলায় অবস্থিত?',
        optionA: 'কুমিল্লা',
        optionB: 'নওগাঁ',
        optionC: 'বগুড়া',
        optionD: 'দিনাজপুর',
        correctAnswer: 'B',
        explanation: `সঠিক উত্তর: (খ) নওগাঁ

হলুদ বিহার (হলুদ বিহার/নালন্দা বিহার নামেও পরিচিত অংশবিশেষ) নওগাঁ জেলায় অবস্থিত একটি প্রাচীন বৌদ্ধ প্রত্নতাত্ত্বিক নিদর্শন, যা পাল আমলের স্থাপত্যশৈলীর সাক্ষ্য বহন করে।

সংশ্লিষ্ট প্রত্নস্থান মনে রাখুন:
— নওগাঁ জেলায়: পাহাড়পুর বৌদ্ধ বিহার, হলুদ বিহার
— বগুড়া জেলায়: মহাস্থানগড়`,
        subject: 'বাংলাদেশ বিষয়াবলি',
        topic: 'প্রত্নতাত্ত্বিক নিদর্শন',
        subTopic: 'হলুদ বিহার',
        sortOrder: 28,
      },

      {
        questionSetId,
        slug: 'narir-spandon-mapa-hoy-kothay',
        questionText: '৩০. নাড়ীর স্পন্দন মাপা হয় কোথায়?',
        optionA: 'শিরায়',
        optionB: 'রক্তনালীতে',
        optionC: 'মাংসপেশীতে',
        optionD: 'ধমনীতে',
        correctAnswer: 'D',
        explanation: `সঠিক উত্তর: (ঘ) ধমনীতে

হৃৎপিণ্ডের সংকোচন-প্রসারণের ফলে সৃষ্ট রক্তচাপের তরঙ্গ ধমনীতে অনুভূত হয়, একেই নাড়ীর স্পন্দন (Pulse) বলে। সাধারণত কব্জির রেডিয়াল ধমনীতে এটি পরীক্ষা করা হয়।

পার্থক্য মনে রাখুন:
— ধমনী (Artery): হৃৎপিণ্ড থেকে রক্ত দেহের বিভিন্ন অংশে বহন করে — উচ্চচাপযুক্ত, তাই স্পন্দন অনুভূত হয়
— শিরা (Vein): দেহ থেকে রক্ত হৃৎপিণ্ডে ফেরত আনে — নিম্নচাপযুক্ত`,
        subject: 'সাধারণ বিজ্ঞান',
        topic: 'জীববিজ্ঞান',
        subTopic: 'সংবহনতন্ত্র',
        sortOrder: 29,
      },

      {
        questionSetId,
        slug: 'computer-system-e-key-board-kon-dhoroner-device',
        questionText: '৩১. কম্পিউটার সিস্টেমে কী বোর্ড কোন ধরনের ডিভাইস?',
        optionA: 'সফটওয়্যার',
        optionB: 'আউটপুট',
        optionC: 'ইনপুট',
        optionD: 'মাদারবোর্ড',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) ইনপুট

কী-বোর্ড হলো একটি ইনপুট ডিভাইস, যার মাধ্যমে ব্যবহারকারী কম্পিউটারে টেক্সট বা কমান্ড প্রবেশ করান।

ডিভাইস শ্রেণিবিভাগ মনে রাখুন:
— ইনপুট ডিভাইস: কী-বোর্ড, মাউস, স্ক্যানার, মাইক্রোফোন
— আউটপুট ডিভাইস: মনিটর, প্রিন্টার, স্পিকার
— মাদারবোর্ড হলো হার্ডওয়্যারের মূল সার্কিট বোর্ড, ইনপুট/আউটপুট ডিভাইস নয়`,
        subject: 'কম্পিউটার ও তথ্যপ্রযুক্তি',
        topic: 'কম্পিউটার হার্ডওয়্যার',
        subTopic: 'ইনপুট/আউটপুট ডিভাইস',
        sortOrder: 30,
      },

      {
        questionSetId,
        slug: 'hijri-soner-provortoncoren-ke',
        questionText: '৩২. হিজরি সনের প্রবর্তন করেন কে?',
        optionA: 'হযরত আলী (রা.)',
        optionB: 'হযরত ওমর (রা.)',
        optionC: 'হযরত আবু বকর (রা.)',
        optionD: 'হযরত ওসমান (রা.)',
        correctAnswer: 'B',
        explanation: `সঠিক উত্তর: (খ) হযরত ওমর (রা.)

হিজরি সনের প্রবর্তন করেন দ্বিতীয় খলিফা হযরত ওমর ইবনুল খাত্তাব (রা.)। তিনি মহানবী (সা.)-এর মক্কা থেকে মদিনায় হিজরতের বছরকে (৬২২ খ্রিস্টাব্দ) ভিত্তি ধরে চান্দ্র বছরের হিসাবে হিজরি সন গণনা শুরু করেন।

সংশ্লিষ্ট তথ্য:
— হিজরি সন চান্দ্র মাসের ওপর ভিত্তি করে গণনা করা হয়
— এটি ইসলামি ক্যালেন্ডার হিসেবে ব্যবহৃত হয়`,
        subject: 'সাধারণ জ্ঞান',
        topic: 'ইসলামি ইতিহাস',
        subTopic: 'হিজরি সন',
        sortOrder: 31,
      },

      {
        questionSetId,
        slug: 'rokter-torol-ongsher-nam-ki',
        questionText: '৩৩. রক্তের তরল অংশের নাম কি?',
        optionA: 'নায়াসিন',
        optionB: 'প্লাজমা',
        optionC: 'হিমোগ্লোবিন',
        optionD: 'প্লাটিলেট',
        correctAnswer: 'B',
        explanation: `সঠিক উত্তর: (খ) প্লাজমা

রক্তের তরল অংশকে প্লাজমা বলে, যা মানুষের রক্তের প্রায় ৫৫% গঠন করে। এতে পানি, প্রোটিন, লবণ, হরমোন ও পুষ্টি উপাদান দ্রবীভূত থাকে।

রক্তের উপাদান মনে রাখুন:
— তরল অংশ: প্লাজমা (৫৫%)
— কণিকা অংশ: লোহিত রক্তকণিকা, শ্বেত রক্তকণিকা, অণুচক্রিকা/প্লাটিলেট (৪৫%)
— হিমোগ্লোবিন লোহিত রক্তকণিকার মধ্যে থাকা অক্সিজেনবাহী রঞ্জক পদার্থ, তরল অংশ নয়`,
        subject: 'সাধারণ বিজ্ঞান',
        topic: 'জীববিজ্ঞান',
        subTopic: 'রক্ত ও সংবহনতন্ত্র',
        sortOrder: 32,
      },

      {
        questionSetId,
        slug: 'ayotone-sorbobrihot-muslim-desh-konti',
        questionText: '৩৪. আয়তনে সর্ববৃহৎ মুসলিম দেশ কোনটি?',
        optionA: 'ইন্দোনেশিয়া',
        optionB: 'পাকিস্তান',
        optionC: 'কাজাখস্তান',
        optionD: 'ইরান',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) কাজাখস্তান

আয়তনের দিক থেকে সর্ববৃহৎ মুসলিম-প্রধান দেশ কাজাখস্তান (প্রায় ২৭ লক্ষ বর্গকিলোমিটার)। তবে জনসংখ্যার দিক থেকে সর্ববৃহৎ মুসলিম দেশ ইন্দোনেশিয়া — এই দুটির পার্থক্য মনে রাখা গুরুত্বপূর্ণ।

গুরুত্বপূর্ণ পার্থক্য:
— আয়তনে বৃহত্তম মুসলিম দেশ: কাজাখস্তান
— জনসংখ্যায় বৃহত্তম মুসলিম দেশ: ইন্দোনেশিয়া`,
        subject: 'আন্তর্জাতিক বিষয়াবলি',
        topic: 'রাষ্ট্র পরিচিতি',
        subTopic: 'মুসলিম দেশসমূহ',
        sortOrder: 33,
      },

      {
        questionSetId,
        slug: 'podda-o-jomuna-nodi-kothay-milito-hoy',
        questionText: '৩৫. পদ্মা ও যমুনা নদী কোথায় মিলিত হয়?',
        optionA: 'চাঁদপুরে',
        optionB: 'গোয়ালন্দে',
        optionC: 'মুন্সিগঞ্জে',
        optionD: 'বঙ্গোপসাগরে',
        correctAnswer: 'B',
        explanation: `সঠিক উত্তর: (খ) গোয়ালন্দে

পদ্মা ও যমুনা নদী রাজবাড়ী জেলার গোয়ালন্দ ঘাটের কাছে মিলিত হয়ে অভিন্ন ধারায় প্রবাহিত হয়। এরপর এটি চাঁদপুরে গিয়ে মেঘনার সাথে মিলিত হয়।

নদীর মিলনস্থল মনে রাখুন:
— পদ্মা + যমুনা → গোয়ালন্দ (রাজবাড়ী)
— পদ্মা + মেঘনা → চাঁদপুর
— এরপর একত্রে মেঘনা নাম নিয়ে বঙ্গোপসাগরে পতিত হয়`,
        subject: 'বাংলাদেশ বিষয়াবলি',
        topic: 'ভূগোল',
        subTopic: 'নদ-নদী',
        sortOrder: 34,
      },

      {
        questionSetId,
        slug: 'bangladesher-mot-thanar-songkha-kototi',
        questionText: '৩৬. বাংলাদেশের মোট থানার সংখ্যা কতটি?',
        optionA: '৬৩৯',
        optionB: '৫৩৫',
        optionC: '৪৯৩',
        optionD: '৫২০',
        correctAnswer: 'A',
        explanation: `সঠিক উত্তর: (ক) ৬৩৯

বইয়ের তথ্যমতে বাংলাদেশের মোট থানার সংখ্যা ৬৩৯টি ধরা হয়েছে। তবে বইয়ে সংযুক্ত ব্যাখ্যা অনুযায়ী প্রশাসনিক পুনর্বিন্যাসের ফলে বর্তমানে থানার সংখ্যা ৬৫৮টি — অর্থাৎ এই সংখ্যাটি হালনাগাদযোগ্য, পরীক্ষার আগে সাম্প্রতিক তথ্য যাচাই করে নেওয়া ভালো।

গুরুত্বপূর্ণ নোট:
— প্রশাসনিক এককের সংখ্যা (জেলা, উপজেলা, থানা) সময়ে সময়ে পরিবর্তিত হয়
— পরীক্ষায় সাম্প্রতিক সরকারি তথ্য অনুসরণ করা উচিত`,
        subject: 'বাংলাদেশ বিষয়াবলি',
        topic: 'প্রশাসনিক কাঠামো',
        subTopic: 'থানা',
        sortOrder: 35,
      },

      {
        questionSetId,
        slug: 'pitritantrik-poribar-noy-je-gosthi',
        questionText: '৩৭. পিতৃতান্ত্রিক পরিবার নয় যে গোষ্ঠী?',
        optionA: 'চাকমা',
        optionB: 'মারমা',
        optionC: 'রাখাইন',
        optionD: 'খাসিয়া',
        correctAnswer: 'D',
        explanation: `সঠিক উত্তর: (ঘ) খাসিয়া

খাসিয়া জনগোষ্ঠী মাতৃতান্ত্রিক সমাজব্যবস্থা অনুসরণ করে — অর্থাৎ বংশপরিচয় ও সম্পত্তি মায়ের দিক থেকে নির্ধারিত হয়। বাংলাদেশের অন্যান্য অধিকাংশ ক্ষুদ্র নৃগোষ্ঠী (চাকমা, মারমা, রাখাইন) পিতৃতান্ত্রিক পরিবারব্যবস্থা অনুসরণ করে।

মাতৃতান্ত্রিক জনগোষ্ঠী মনে রাখুন:
— খাসিয়া ও গারো জনগোষ্ঠী বাংলাদেশে মাতৃতান্ত্রিক সমাজব্যবস্থার জন্য পরিচিত`,
        subject: 'বাংলাদেশ বিষয়াবলি',
        topic: 'নৃতত্ত্ব ও আদিবাসী সমাজ',
        subTopic: 'পারিবারিক কাঠামো',
        sortOrder: 36,
      },

      {
        questionSetId,
        slug: 'dashiar-chora-kon-jelay-obosthito',
        questionText: "৩৮. 'দাসিয়ার ছড়া' কোন জেলায় অবস্থিত?",
        optionA: 'কুড়িগ্রাম',
        optionB: 'লালমনিরহাট',
        optionC: 'দিনাজপুর',
        optionD: 'নওগাঁ',
        correctAnswer: 'A',
        explanation: `সঠিক উত্তর: (ক) কুড়িগ্রাম

দাসিয়ার ছড়া কুড়িগ্রাম জেলার ফুলবাড়ী উপজেলায় অবস্থিত সাবেক ছিটমহল অঞ্চল, যা ২০১৫ সালের ছিটমহল বিনিময়ের আগে বিচ্ছিন্ন বাংলাদেশী ভূখণ্ড হিসেবে ভারতীয় ভূখণ্ডের ভেতরে ছিল।

সংশ্লিষ্ট তথ্য:
— ২০১৫ সালে বাংলাদেশ-ভারত ছিটমহল বিনিময় চুক্তির মাধ্যমে এই এলাকা বাংলাদেশের মূল ভূখণ্ডের সাথে যুক্ত হয়`,
        subject: 'বাংলাদেশ বিষয়াবলি',
        topic: 'ভূগোল',
        subTopic: 'ছিটমহল',
        sortOrder: 37,
      },

      {
        questionSetId,
        slug: 'adb-er-purnorup-konti',
        questionText: '৩৯. ADB এর পূর্ণরূপ কোনটি?',
        optionA: 'Asian Development Programme',
        optionB: 'Annual Development Programme',
        optionC: 'Asean Development Programme',
        optionD: 'Australian Development Programme',
        correctAnswer: 'B',
        explanation: `সঠিক উত্তর: (খ) Annual Development Programme

এখানে ADB বলতে বার্ষিক উন্নয়ন কর্মসূচি (Annual Development Programme)-কে বোঝানো হয়েছে, যা বাংলাদেশ সরকারের বার্ষিক উন্নয়ন প্রকল্পসমূহের সমষ্টিগত পরিকল্পনা।

সতর্কতা — সংক্ষিপ্তরূপ গুলিয়ে ফেলবেন না:
— ADB (Asian Development Bank) = এশীয় উন্নয়ন ব্যাংক — একটি আন্তর্জাতিক আর্থিক প্রতিষ্ঠান
— ADP (Annual Development Programme) = বার্ষিক উন্নয়ন কর্মসূচি — বাংলাদেশ সরকারের বাজেট পরিকল্পনা
— প্রশ্নে প্রেক্ষাপট অনুযায়ী সঠিক পূর্ণরূপ বেছে নিতে হবে`,
        subject: 'বাংলাদেশ বিষয়াবলি',
        topic: 'অর্থনীতি ও পরিকল্পনা',
        subTopic: 'সংক্ষিপ্তরূপ',
        sortOrder: 38,
      },

      {
        questionSetId,
        slug: 'bangladeshe-vat-chalu-hoy-koto-sale',
        questionText: '৪০. বাংলাদেশে ভ্যাট চালু হয় কত সালে?',
        optionA: '১৯৯১',
        optionB: '২০০১',
        optionC: '২০১১',
        optionD: '২০২১',
        correctAnswer: 'A',
        explanation: `সঠিক উত্তর: (ক) ১৯৯১

বাংলাদেশে মূল্য সংযোজন কর (Value Added Tax - VAT) চালু হয় ১৯৯১ সালের ১ জুলাই, যা তৎকালীন বিক্রয় কর ব্যবস্থাকে প্রতিস্থাপন করে।

সংশ্লিষ্ট তথ্য:
— এটি জাতীয় রাজস্ব বোর্ড (NBR) দ্বারা পরিচালিত হয়
— ২০১২ সালে নতুন ভ্যাট আইন প্রণয়ন হয়, যা কার্যকর হয় ২০১৯ সালে`,
        subject: 'বাংলাদেশ বিষয়াবলি',
        topic: 'অর্থনীতি',
        subTopic: 'ভ্যাট',
        sortOrder: 39,
      },

      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // বিষয়: ইংরেজি — প্রশ্ন ৪১–৫৫
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

      {
        questionSetId,
        slug: 'what-does-the-word-essential-refer-to',
        questionText: "৪১. What does the word 'essential' refer to?",
        optionA: 'Aspect',
        optionB: 'Suggest',
        optionC: 'Vital',
        optionD: 'Forget',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) Vital

'Essential' শব্দের অর্থ অত্যাবশ্যকীয় বা অপরিহার্য — যার নিকটতম প্রতিশব্দ 'Vital' (গুরুত্বপূর্ণ/অপরিহার্য)।

শব্দার্থ মনে রাখুন:
— Essential = Vital = Crucial = Necessary (সমার্থক শব্দগুচ্ছ)
— Aspect (দিক), Suggest (পরামর্শ দেওয়া), Forget (ভুলে যাওয়া) — এগুলো ভিন্ন অর্থবহ শব্দ`,
        subject: 'ইংরেজি',
        topic: 'Vocabulary',
        subTopic: 'Synonym',
        sortOrder: 40,
      },

      {
        questionSetId,
        slug: 'the-word-worsen-means',
        questionText: "৪২. The word 'worsen' means-",
        optionA: 'Improve',
        optionB: 'Aspiration',
        optionC: 'Deteriorate',
        optionD: 'Aginate',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) Deteriorate

'Worsen' মানে অবস্থার অবনতি ঘটা, যার সমার্থক শব্দ 'Deteriorate' (খারাপ হওয়া/অবনতি ঘটা)।

শব্দার্থ মনে রাখুন:
— Worsen = Deteriorate = Decline (নেতিবাচক অর্থ)
— Improve মানে উন্নতি হওয়া — এটি Worsen-এর বিপরীতার্থক শব্দ, তাই বিভ্রান্তিকর অপশন`,
        subject: 'ইংরেজি',
        topic: 'Vocabulary',
        subTopic: 'Synonym',
        sortOrder: 41,
      },

      {
        questionSetId,
        slug: 'one-third-of-the-students-present-in-the-class',
        questionText: '৪৩. One third of the students ... present in the class.',
        optionA: 'remains',
        optionB: 'is',
        optionC: 'are',
        optionD: 'had',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) are

ভগ্নাংশ (fraction) + of + বহুবচন বিশেষ্য (students) হলে ক্রিয়াপদ বহুবচন হয়। এখানে 'students' বহুবচন বিশেষ্য বলে ক্রিয়াপদ 'are' হবে।

নিয়ম মনে রাখুন:
— Fraction/percentage + of + plural noun → plural verb (are, were)
— Fraction/percentage + of + singular/uncountable noun → singular verb (is, was)
— উদাহরণ: "One third of the work is done." (uncountable, তাই singular)`,
        subject: 'ইংরেজি',
        topic: 'Grammar',
        subTopic: 'Subject-Verb Agreement',
        sortOrder: 42,
      },

      {
        questionSetId,
        slug: 'choose-the-correct-spelling-embarrass',
        questionText: '৪৪. Choose the correct spelling.',
        optionA: 'Embarras',
        optionB: 'Emberras',
        optionC: 'Embarrass',
        optionD: 'Embarass',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) Embarrass

সঠিক বানান 'Embarrass' — এখানে দুটি 'r' এবং দুটি 's' রয়েছে (em-bar-rass)। এটি ইংরেজির অন্যতম কমন ভুল বানানের শব্দ।

মনে রাখার কৌশল:
— Two 'r's, two 's's — "Really Silly" মনে রাখলে বানানটি মনে থাকবে
— Embarras, Emberras, Embarass — সবগুলোই ভুল বানান`,
        subject: 'ইংরেজি',
        topic: 'Spelling',
        subTopic: 'Correct Spelling',
        sortOrder: 43,
      },

      {
        questionSetId,
        slug: 'translation-of-bolt-from-the-blue-means',
        questionText: "৪৫. The translation of 'Bolt from the blue' means-",
        optionA: 'আকাশ থেকে পাওয়া',
        optionB: 'বিনা মেঘে বজ্রপাত',
        optionC: 'হাতে চাঁদ পাওয়া',
        optionD: 'অনায়াসে পাওয়া',
        correctAnswer: 'B',
        explanation: `সঠিক উত্তর: (খ) বিনা মেঘে বজ্রপাত

ইংরেজি Idiom 'Bolt from the blue' অর্থ সম্পূর্ণ অপ্রত্যাশিত ও আকস্মিক কোনো ঘটনা — বাংলায় এর প্রতিশব্দ 'বিনা মেঘে বজ্রপাত'।

মনে রাখার কৌশল:
— আকাশ (blue sky) পরিষ্কার থাকা সত্ত্বেও হঠাৎ বজ্রপাত (bolt) হওয়া মানেই সম্পূর্ণ আকস্মিক ঘটনা
— 'হাতে চাঁদ পাওয়া' অর্থ সহজে বড় কিছু পাওয়া — সম্পূর্ণ ভিন্ন অর্থ`,
        subject: 'ইংরেজি',
        topic: 'Idioms and Phrases',
        subTopic: 'Bolt from the blue',
        sortOrder: 44,
      },

      {
        questionSetId,
        slug: 'one-should-be-careful-about-duty',
        questionText: '৪৬. One should be careful about ... duty.',
        optionA: 'their',
        optionB: 'one',
        optionC: "one's",
        optionD: 'the',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) one's

Indefinite pronoun 'One' ব্যবহারের পর সঙ্গতিপূর্ণ possessive form হলো "one's" — অর্থাৎ subject 'One' হলে সম্পর্কিত possessive-ও 'one's' হতে হয়, 'their' নয়।

নিয়ম মনে রাখুন:
— One ... one's (সঠিক ধারাবাহিকতা)
— One ... their (ভুল — subject-possessive সঙ্গতি নষ্ট হয়)
— উদাহরণ: "One must do one's duty carefully."`,
        subject: 'ইংরেজি',
        topic: 'Grammar',
        subTopic: 'Pronoun',
        sortOrder: 45,
      },

      {
        questionSetId,
        slug: 'milk-is-a',
        questionText: "৪৭. 'Milk' is a -",
        optionA: 'Collective noun',
        optionB: 'Common noun',
        optionC: 'Proper noun',
        optionD: 'Material noun',
        correctAnswer: 'D',
        explanation: `সঠিক উত্তর: (ঘ) Material noun

'Milk' একটি পদার্থবাচক বিশেষ্য (Material Noun) — যা গণনাযোগ্য নয়, বরং পরিমাপযোগ্য পদার্থ বোঝায়।

Noun-এর প্রকারভেদ মনে রাখুন:
— Material Noun: milk, water, gold, iron (পদার্থবাচক)
— Common Noun: boy, city, book (জাতিবাচক)
— Collective Noun: army, class, team (সমষ্টিবাচক)
— Proper Noun: নির্দিষ্ট নাম (Dhaka, Karim)`,
        subject: 'ইংরেজি',
        topic: 'Grammar',
        subTopic: 'Noun',
        sortOrder: 46,
      },

      {
        questionSetId,
        slug: 'plural-of-baby-is',
        questionText: "৪৮. Plural of 'Baby' is-",
        optionA: 'Babe',
        optionB: 'Babyes',
        optionC: 'Babies',
        optionD: 'Girl',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) Babies

Consonant + 'y' দিয়ে শেষ হওয়া শব্দের plural গঠনে 'y' কে 'i' তে পরিবর্তন করে 'es' যোগ করতে হয়। তাই Baby → Babies।

নিয়ম মনে রাখুন:
— Consonant + y → i + es (Baby→Babies, City→Cities, Lady→Ladies)
— Vowel + y → শুধু s যোগ হয় (Boy→Boys, Day→Days)`,
        subject: 'ইংরেজি',
        topic: 'Grammar',
        subTopic: 'Number (Plural Formation)',
        sortOrder: 47,
      },

      {
        questionSetId,
        slug: 'the-size-of-the-shoes-be-short',
        questionText: '৪৯. The size of the shoes (be) short.',
        optionA: 'are',
        optionB: 'is',
        optionC: 'will',
        optionD: 'to be',
        correctAnswer: 'B',
        explanation: `সঠিক উত্তর: (খ) is

বাক্যের মূল Subject 'The size' (একবচন), 'of the shoes' একটি prepositional phrase মাত্র — যা verb নির্ধারণ করে না। তাই singular verb 'is' বসবে।

নিয়ম মনে রাখুন:
— Subject + of + noun গঠনে মূল subject-ই verb নির্ধারণ করে, 'of'-এর পরের noun নয়
— উদাহরণ: "The quality of the products is good." (quality singular, তাই is)`,
        subject: 'ইংরেজি',
        topic: 'Grammar',
        subTopic: 'Subject-Verb Agreement',
        sortOrder: 48,
      },

      {
        questionSetId,
        slug: 'opposite-word-of-love-is',
        questionText: "৫০. Opposite word of 'love' is-",
        optionA: 'hate',
        optionB: 'disagree',
        optionC: 'pain',
        optionD: 'deny',
        correctAnswer: 'A',
        explanation: `সঠিক উত্তর: (ক) hate

'Love' (ভালোবাসা)-এর বিপরীতার্থক শব্দ 'Hate' (ঘৃণা করা)। এটি সবচেয়ে সরাসরি ও প্রচলিত বিপরীতার্থক শব্দ।

শব্দার্থ মনে রাখুন:
— Love ↔ Hate (সরাসরি বিপরীতার্থক জোড়া)
— Disagree, Pain, Deny — এগুলো ভিন্ন প্রসঙ্গের শব্দ, love-এর সরাসরি বিপরীত নয়`,
        subject: 'ইংরেজি',
        topic: 'Vocabulary',
        subTopic: 'Antonym',
        sortOrder: 49,
      },

      {
        questionSetId,
        slug: 'we-need-to-buy-some-new-furniture',
        questionText: '৫১. We need to buy some new-',
        optionA: 'furnishers',
        optionB: 'furniture',
        optionC: 'furnisher',
        optionD: 'furnitures',
        correctAnswer: 'B',
        explanation: `সঠিক উত্তর: (খ) furniture

'Furniture' একটি অগণনীয় বিশেষ্য (Uncountable Noun) — এর কোনো plural form (furnitures) হয় না, এবং 'furnisher/furnishers' সম্পূর্ণ ভিন্ন শব্দ (যিনি সরবরাহ করেন)।

মনে রাখার কৌশল:
— Uncountable Noun-এর plural হয় না: furniture, information, advice, luggage, news
— এগুলোর আগে 'some/much/a piece of' বসে, কিন্তু 's' যোগ হয় না`,
        subject: 'ইংরেজি',
        topic: 'Vocabulary',
        subTopic: 'Uncountable Noun',
        sortOrder: 50,
      },

      {
        questionSetId,
        slug: 'he-died-over-eating',
        questionText: '৫২. He died ... over eating.',
        optionA: 'from',
        optionB: 'by',
        optionC: 'in',
        optionD: 'to',
        correctAnswer: 'A',
        explanation: `সঠিক উত্তর: (ক) from

'Die from' ব্যবহৃত হয় যখন মৃত্যুর কারণ পরোক্ষ/বাহ্যিক কোনো অভ্যাস বা পরিস্থিতি হয় (যেমন: over eating, overwork, an accident)। 'Die of' ব্যবহৃত হয় সরাসরি রোগ বা অভাবের ক্ষেত্রে (যেমন: die of cancer, die of hunger)।

নিয়ম মনে রাখুন:
— Die of + disease/direct cause (die of fever, die of cancer)
— Die from + external/indirect cause (die from a wound, die from overeating)
— Die by + method/means (die by drowning, die by the sword)`,
        subject: 'ইংরেজি',
        topic: 'Grammar',
        subTopic: 'Preposition',
        sortOrder: 51,
      },

      {
        questionSetId,
        slug: 'he-has-been-ill-since-friday-last',
        questionText: '৫৩. He has been ill ... Friday last.',
        optionA: 'from',
        optionB: 'is',
        optionC: 'since',
        optionD: 'with',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) since

Present Perfect Continuous/Perfect Tense-এর সাথে নির্দিষ্ট সময়বিন্দু (point of time) বোঝাতে 'since' ব্যবহৃত হয়, আর সময়ের ব্যাপ্তি (duration) বোঝাতে 'for' ব্যবহৃত হয়। এখানে 'Friday last' একটি নির্দিষ্ট সময়বিন্দু, তাই 'since' হবে।

নিয়ম মনে রাখুন:
— Since + point of time (since Friday, since 2020, since morning)
— For + duration (for two days, for a week)`,
        subject: 'ইংরেজি',
        topic: 'Grammar',
        subTopic: 'Preposition (Since/For)',
        sortOrder: 52,
      },

      {
        questionSetId,
        slug: 'a-burning-question-means',
        questionText: "৫৪. 'A burning question' means-",
        optionA: 'An important question',
        optionB: 'A hard question',
        optionC: 'A uncommon question',
        optionD: 'A false question',
        correctAnswer: 'A',
        explanation: `সঠিক উত্তর: (ক) An important question

Idiom 'A burning question' অর্থ এমন একটি গুরুত্বপূর্ণ ও জরুরি বিষয়/প্রশ্ন, যা নিয়ে ব্যাপক আলোচনা বা বিতর্ক চলছে — কঠিন বা মিথ্যা প্রশ্ন বোঝায় না।

মনে রাখার কৌশল:
— 'Burning' এখানে আক্ষরিক অর্থে জ্বলন্ত নয়, বরং তীব্র গুরুত্ব বা তাৎপর্য বোঝায়
— উদাহরণ: "Climate change is a burning question of our time."`,
        subject: 'ইংরেজি',
        topic: 'Idioms and Phrases',
        subTopic: 'A burning question',
        sortOrder: 53,
      },

      {
        questionSetId,
        slug: 'choose-the-correct-sentence-i-wish-i-were-you',
        questionText: '৫৫. Choose the correct sentence-',
        optionA: 'I wish I were you.',
        optionB: 'I wish I was you.',
        optionC: 'I wish I am you.',
        optionD: 'I wish you are I.',
        correctAnswer: 'A',
        explanation: `সঠিক উত্তর: (ক) I wish I were you.

'Wish' দিয়ে বর্তমান বাস্তবতার বিপরীত (unreal/hypothetical) কামনা প্রকাশ করতে Subjunctive Mood ব্যবহৃত হয়, যেখানে be verb-এর ক্ষেত্রে সব person/number-এর জন্য 'were' বসে (was নয়)।

নিয়ম মনে রাখুন:
— I wish + Subject + were (Subjunctive Mood — সব subject-এর জন্য 'were')
— উদাহরণ: "I wish I were rich." / "I wish he were here."
— এটি Real fact নয় বলেই 'was' এর বদলে 'were' ব্যবহৃত হয়`,
        subject: 'ইংরেজি',
        topic: 'Grammar',
        subTopic: 'Subjunctive Mood',
        sortOrder: 54,
      },

      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // বিষয়: গণিত (Basic Math) — প্রশ্ন ৫৬–৭০
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

      {
        questionSetId,
        slug: 'britter-je-kono-byash-britke-samman-dui-onshe-vibokto-kore-take-ki-bole',
        questionText:
          '৫৬. বৃত্তের যে কোনো ব্যাস বৃত্তকে যে সমান দুইটি অংশে বিভক্ত করে তাদের প্রত্যেকটিকে কী বলে?',
        optionA: 'পরিসীমা',
        optionB: 'পরিবৃত্ত',
        optionC: 'অর্ধবৃত্ত',
        optionD: 'বৃত্ত',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) অর্ধবৃত্ত

বৃত্তের যেকোনো ব্যাস (diameter) বৃত্তটিকে দুইটি সমান অংশে ভাগ করে, আর প্রতিটি ভাগকে বলা হয় অর্ধবৃত্ত (Semicircle)।

সংজ্ঞা মনে রাখুন:
— পরিসীমা: বৃত্তের চারদিকের দৈর্ঘ্য (পরিধি)
— পরিবৃত্ত: কোনো বহুভুজের সকল শীর্ষবিন্দু দিয়ে অঙ্কিত বৃত্ত`,
        subject: 'গণিত',
        topic: 'জ্যামিতি',
        subTopic: 'বৃত্ত',
        sortOrder: 55,
      },

      {
        questionSetId,
        slug: '01-kilometer-koto-mailer-somman',
        questionText: '৫৭. ০১ কিলোমিটার কত মাইলের সমান?',
        optionA: '০.৫০',
        optionB: '০.৭১',
        optionC: '০.৬২',
        optionD: '০১',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) ০.৬২

১ কিলোমিটার = ০.৬২১৪ মাইল (প্রায়) — যা নিকটতম মানে ০.৬২ মাইল।

পরিমাপের রূপান্তর মনে রাখুন:
— ১ মাইল = ১.৬০৯ কিলোমিটার (প্রায় ১.৬ কিমি)
— ১ কিলোমিটার = ০.৬২ মাইল (প্রায়)
— সহজে মনে রাখতে: "১.৬ দিয়ে ভাগ করলে মাইল, ১.৬ দিয়ে গুণ করলে কিলোমিটার"`,
        subject: 'গণিত',
        topic: 'পরিমাপ ও একক রূপান্তর',
        subTopic: 'দূরত্বের একক',
        sortOrder: 56,
      },

      {
        questionSetId,
        slug: 'a-3-b-5-hole-a-plus-b-power-4-er-man-koto',
        questionText: '৫৮. a = 3, b = 5 হলে (a + b)⁴ এর মান কত?',
        optionA: '64',
        optionB: '512',
        optionC: '32,728',
        optionD: '4096',
        correctAnswer: 'D',
        explanation: `সঠিক উত্তর: (ঘ) 4096

সমাধান:
a + b = 3 + 5 = 8
(a + b)⁴ = 8⁴ = 8 × 8 × 8 × 8 = 4096

ধাপে ধাপে গণনা:
8² = 64
8⁴ = 64² = 4096`,
        subject: 'গণিত',
        topic: 'বীজগণিত',
        subTopic: 'সূচক ও ঘাত',
        sortOrder: 57,
      },

      {
        questionSetId,
        slug: 'ek-bhag-ekk-bhag-shunno-er-man-koto',
        questionText: '৫৯. ১/০ এর মান কত?',
        optionA: '∞',
        optionB: '0',
        optionC: '1',
        optionD: '0.5',
        correctAnswer: 'A',
        explanation: `সঠিক উত্তর: (ক) ∞

গাণিতিকভাবে যেকোনো সংখ্যাকে শূন্য দিয়ে ভাগ করলে তার মান অসীম (Infinity, ∞) ধরা হয়, কারণ শূন্যের কাছাকাছি হর যত ছোট হতে থাকে, ভাগফল তত বড় হতে থাকে — সীমাহীনভাবে।

গুরুত্বপূর্ণ নোট:
— বিশুদ্ধ গণিতে ১/০ প্রকৃতপক্ষে 'অসংজ্ঞায়িত' (undefined), তবে প্রতিযোগিতামূলক পরীক্ষায় প্রচলিতভাবে এর মান অসীম (∞) ধরা হয়`,
        subject: 'গণিত',
        topic: 'পাটিগণিত',
        subTopic: 'ভগ্নাংশ ও শূন্য দ্বারা ভাগ',
        sortOrder: 58,
      },

      {
        questionSetId,
        slug: 'dui-purok-koner-onupat-3-7-hole-choto-konti-man-koto',
        questionText: '৬০. দুইটি পূরক কোণের অনুপাত ৩ : ৭ হলে ছোট কোণটির মান কত?',
        optionA: '২৭°',
        optionB: '২১°',
        optionC: '৬৩°',
        optionD: '১০°',
        correctAnswer: 'A',
        explanation: `সঠিক উত্তর: (ক) ২৭°

সমাধান:
পূরক কোণদ্বয়ের সমষ্টি = ৯০°
অনুপাত ৩:৭ হলে মোট ভাগ = ৩+৭ = ১০ ভাগ
প্রতি ভাগ = ৯০° ÷ ১০ = ৯°
ছোট কোণ = ৩ × ৯° = ২৭°
বড় কোণ = ৭ × ৯° = ৬৩° (যাচাই: ২৭+৬৩=৯০ ✓)

মনে রাখুন: পূরক কোণ (Complementary angle) দুটির সমষ্টি সর্বদা ৯০°, আর সম্পূরক কোণ (Supplementary angle) দুটির সমষ্টি ১৮০°।`,
        subject: 'গণিত',
        topic: 'জ্যামিতি',
        subTopic: 'কোণ',
        sortOrder: 59,
      },

      {
        questionSetId,
        slug: 'britter-poridhi-o-byasarddher-onupat-koto',
        questionText: '৬১. বৃত্তের পরিধি ও ব্যাসার্ধের অনুপাত কত?',
        optionA: '১',
        optionB: 'π',
        optionC: '২π : ১',
        optionD: '২πr',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) ২π : ১

বৃত্তের পরিধি = ২πr (যেখানে r = ব্যাসার্ধ)
সুতরাং, পরিধি : ব্যাসার্ধ = ২πr : r = ২π : ১

মনে রাখুন:
— পরিধি ও ব্যাসের অনুপাত = π : ১ (কারণ পরিধি = πd)
— পরিধি ও ব্যাসার্ধের অনুপাত = ২π : ১`,
        subject: 'গণিত',
        topic: 'জ্যামিতি',
        subTopic: 'বৃত্ত',
        sortOrder: 60,
      },

      {
        questionSetId,
        slug: '10x-ebong-10y-er-gosagu-koto',
        questionText: '৬২. 10x এবং 10y এর গ.সা.গু কত?',
        optionA: 'x',
        optionB: 'y',
        optionC: '100xy',
        optionD: '10',
        correctAnswer: 'D',
        explanation: `সঠিক উত্তর: (ঘ) 10

10x = 10 × x এবং 10y = 10 × y — উভয়ের মধ্যে সাধারণ (common) গুণনীয়ক হলো 10, যেখানে x ও y সহমৌলিক (co-prime) ধরে নেওয়া হয়েছে। তাই গরিষ্ঠ সাধারণ গুণনীয়ক (গ.সা.গু) = 10।

গ.সা.গু নির্ণয়ের ধারণা:
— গ.সা.গু = দুই বা ততোধিক রাশির সাধারণ গুণনীয়কগুলোর মধ্যে বৃহত্তমটি
— এখানে যেহেতু x, y নির্দিষ্ট সম্পর্কযুক্ত নয়, শুধু সংখ্যাগত গুণিতক ১০-ই সাধারণ অংশ`,
        subject: 'গণিত',
        topic: 'পাটিগণিত',
        subTopic: 'গ.সা.গু ও ল.সা.গু',
        sortOrder: 61,
      },

      {
        questionSetId,
        slug: 'teler-purbomullo-o-bortoman-mulloer-onupat-4-3',
        questionText:
          '৬৩. তেলের পূর্বমূল্য ও বর্তমান মূল্যের অনুপাত ৪ : ৩। পূর্বের তুলনায় মূল্য কত ভাগ হ্রাস বা বৃদ্ধি হয়েছে?',
        optionA: '২৫% হ্রাস',
        optionB: '২৫% বৃদ্ধি',
        optionC: '১২% বৃদ্ধি',
        optionD: '৭% হ্রাস',
        correctAnswer: 'A',
        explanation: `সঠিক উত্তর: (ক) ২৫% হ্রাস

সমাধান:
পূর্বমূল্য : বর্তমান মূল্য = ৪ : ৩
ধরি, পূর্বমূল্য = ৪ একক, বর্তমান মূল্য = ৩ একক
হ্রাস = (৪-৩) = ১ একক
শতকরা হ্রাস = (১/৪) × ১০০% = ২৫%

যেহেতু বর্তমান মূল্য পূর্বমূল্যের চেয়ে কম, তাই এটি মূল্য হ্রাস — বৃদ্ধি নয়।`,
        subject: 'গণিত',
        topic: 'পাটিগণিত',
        subTopic: 'শতকরা',
        sortOrder: 62,
      },

      {
        questionSetId,
        slug: 'ekti-borger-bahur-doirgho-tin-gun-hole-khetrofol-koto-gun-hobe',
        questionText: '৬৪. একটি বর্গের বাহুর দৈর্ঘ্য তিনগুণ হলে ক্ষেত্রফল কত গুণ হবে?',
        optionA: '০৬ গুণ',
        optionB: '০৯ গুণ',
        optionC: '০২ গুণ',
        optionD: '১২ গুণ',
        correctAnswer: 'B',
        explanation: `সঠিক উত্তর: (খ) ০৯ গুণ

সমাধান:
ধরি, বর্গের বাহু = a, তাহলে ক্ষেত্রফল = a²
বাহু তিনগুণ হলে নতুন বাহু = 3a
নতুন ক্ষেত্রফল = (3a)² = 9a²
অর্থাৎ ক্ষেত্রফল পূর্বের তুলনায় ৯ গুণ হবে।

মনে রাখুন: বর্গক্ষেত্রের বাহু n গুণ হলে ক্ষেত্রফল n² গুণ হয় (এটি দ্বিমাত্রিক রাশি বলে)।`,
        subject: 'গণিত',
        topic: 'জ্যামিতি',
        subTopic: 'বর্গক্ষেত্র',
        sortOrder: 63,
      },

      {
        questionSetId,
        slug: 'duiti-songkhar-jogfol-5-biyogfol-3-hole-gunfol-koto',
        questionText: '৬৫. দুইটি সংখ্যার যোগফল ৫ বিয়োগফল ৩ হলে, গুণফল কত?',
        optionA: '৮০',
        optionB: '৪',
        optionC: '১৫',
        optionD: '৮',
        correctAnswer: 'B',
        explanation: `সঠিক উত্তর: (খ) ৪

সমাধান:
ধরি, সংখ্যা দুটি x ও y
x + y = ৫ ... (i)
x - y = ৩ ... (ii)
(i) ও (ii) যোগ করে: 2x = ৮ → x = ৪
তাহলে y = ৫ - ৪ = ১
গুণফল = x × y = ৪ × ১ = ৪`,
        subject: 'গণিত',
        topic: 'বীজগণিত',
        subTopic: 'দুই চলকবিশিষ্ট সমীকরণ',
        sortOrder: 64,
      },

      {
        questionSetId,
        slug: 'a-3-5-7-b-3-8-9-hole-a-intersection-b',
        questionText: '৬৬. A = {3, 5, 7}, B = {3, 8, 9} হলে A∩B = ?',
        optionA: '∅',
        optionB: '{3, 5, 7, 8, 9}',
        optionC: '{3}',
        optionD: '{5, 7, 8, 9}',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) {3}

A∩B (ইন্টারসেকশন/ছেদ) বলতে বোঝায় দুটি সেটে সাধারণভাবে (common) থাকা উপাদানগুলো।
A = {3, 5, 7}, B = {3, 8, 9}
উভয় সেটে সাধারণ উপাদান শুধু ৩, তাই A∩B = {3}।

পার্থক্য মনে রাখুন:
— ছেদ (∩): শুধু সাধারণ উপাদান
— সংযোগ/ইউনিয়ন (∪): উভয় সেটের সব উপাদান (পুনরাবৃত্তি ছাড়া) — এখানে {3,5,7,8,9}`,
        subject: 'গণিত',
        topic: 'সেট তত্ত্ব',
        subTopic: 'ছেদ (Intersection)',
        sortOrder: 65,
      },

      {
        questionSetId,
        slug: '2-power-2x-plus-1-equals-128-hole-x-er-man-koto',
        questionText: '৬৭. 2^(2x + 1) = 128 হলে x এর মান কত?',
        optionA: '3',
        optionB: '4',
        optionC: '5',
        optionD: '7',
        correctAnswer: 'A',
        explanation: `সঠিক উত্তর: (ক) 3

সমাধান:
২^(2x+1) = 128
128 = 2⁷ (কারণ ২×২×২×২×২×২×২ = ১২৮)
সুতরাং, 2x + 1 = 7
2x = 6
x = 3

মনে রাখুন: সমান ভিত্তিবিশিষ্ট সূচকীয় সমীকরণে ভিত্তি সমান হলে সূচকদ্বয়ও সমান হবে।`,
        subject: 'গণিত',
        topic: 'বীজগণিত',
        subTopic: 'সূচকীয় সমীকরণ',
        sortOrder: 66,
      },

      {
        questionSetId,
        slug: 'nicher-kon-songkha-lob-o-hor-theke-5-biyog-korle-vognangshoti-1-2-hobe',
        questionText: '৬৮. নিচের কোন সংখ্যা লব ও হর থেকে ৫ বিয়োগ করলে ভগ্নাংশটি ১/২ হবে?',
        optionA: '৭/৯',
        optionB: '৯/৭',
        optionC: '৩/৫',
        optionD: '৫/৩',
        correctAnswer: 'A',
        explanation: `সঠিক উত্তর: (ক) ৭/৯

যাচাই:
৭/৯ থেকে লব ও হর উভয় থেকে ৫ বিয়োগ করলে:
(৭-৫)/(৯-৫) = ২/৪ = ১/২ ✓

অন্য অপশনগুলো যাচাই করলে কোনোটিই ১/২ দেয় না — যেমন ৯/৭ → (৯-৫)/(৭-৫) = ৪/২ = ২ (মিলে না)।`,
        subject: 'গণিত',
        topic: 'পাটিগণিত',
        subTopic: 'ভগ্নাংশ',
        sortOrder: 67,
      },

      {
        questionSetId,
        slug: 'ekti-khelna-380-takay-bikri-kore-20-taka-khoti-hole-shotokora-koto-khoti',
        questionText:
          '৬৯. একটি খেলনা ৩৮০ টাকায় বিক্রি করে ২০ টাকা ক্ষতি হলে শতকরা কত ক্ষতি হয়েছে?',
        optionA: '৮০%',
        optionB: '২০%',
        optionC: '১০%',
        optionD: '৫%',
        correctAnswer: 'D',
        explanation: `সঠিক উত্তর: (ঘ) ৫%

সমাধান:
বিক্রয়মূল্য = ৩৮০ টাকা, ক্ষতি = ২০ টাকা
ক্রয়মূল্য = বিক্রয়মূল্য + ক্ষতি = ৩৮০ + ২০ = ৪০০ টাকা
শতকরা ক্ষতি = (ক্ষতি/ক্রয়মূল্য) × ১০০%
= (২০/৪০০) × ১০০% = ৫%

মনে রাখুন: লাভ-ক্ষতির শতকরা হিসাব সর্বদা ক্রয়মূল্যের ওপর ভিত্তি করে করা হয়, বিক্রয়মূল্যের ওপর নয়।`,
        subject: 'গণিত',
        topic: 'পাটিগণিত',
        subTopic: 'লাভ-ক্ষতি',
        sortOrder: 68,
      },

      {
        questionSetId,
        slug: '6-plus-12-plus-18-dots-plus-72-dharatir-podo-songkha-koto',
        questionText: '৭০. ৬ + ১২ + ১৮ + .... + ৭২ ধারাটির পদ সংখ্যা কত?',
        optionA: '১২',
        optionB: '১১',
        optionC: '১৫',
        optionD: '১০',
        correctAnswer: 'A',
        explanation: `সঠিক উত্তর: (ক) ১২

এটি একটি সমান্তর ধারা (Arithmetic Progression), যেখানে:
প্রথম পদ (a) = ৬
সাধারণ অন্তর (d) = ১২ - ৬ = ৬
শেষ পদ (l) = ৭২

পদ সংখ্যা নির্ণয়ের সূত্র: n = [(l - a)/d] + 1
n = [(72 - 6)/6] + 1 = [66/6] + 1 = 11 + 1 = 12`,
        subject: 'গণিত',
        topic: 'বীজগণিত',
        subTopic: 'সমান্তর ধারা',
        sortOrder: 69,
      },
    ],

    /*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
সারসংক্ষেপ:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
মোট প্রশ্ন সংগৃহীত: ৬৯টি (মূল ৭০টির মধ্যে প্রশ্ন ১৮
উৎস পাতায় অনুপস্থিত থাকায় বাদ দেওয়া হয়েছে)

বিষয় অনুযায়ী বিভাজন:
  বাংলা ভাষা ও সাহিত্য: ১৯টি (প্রশ্ন ১-১৭, ১৯-২০)
  বাংলাদেশ বিষয়াবলি: ১১টি
  আন্তর্জাতিক বিষয়াবলি: ৩টি
  সাধারণ বিজ্ঞান: ৩টি
  কম্পিউটার ও তথ্যপ্রযুক্তি: ২টি
  সাধারণ জ্ঞান (ইসলামি ইতিহাস): ১টি
  ইংরেজি: ১৫টি (প্রশ্ন ৪১-৫৫)
  গণিত: ১৫টি (প্রশ্ন ৫৬-৭০)

পরীক্ষা: মন্ত্রিপরিষদ বিভাগ — পদের নাম: কম্পিউটার অপারেটর
পরীক্ষার তারিখ: ২৮.০৮.২০২৬
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Source Note:
    // উৎস: অগ্রদূত Recent Job Solution (মন্ত্রিপরিষদ বিভাগ,
    // কম্পিউটার অপারেটর, ২৮.০৮.২০২৬ পরীক্ষা) থেকে সংগৃহীত
    // এবং অগ্রদূত বাংলা (১৭তম), অগ্রদূত বাংলাদেশ বিষয়াবলি (৯ম),
    // অগ্রদূত আন্তর্জাতিক বিষয়াবলি (৯ম), অগ্রদূত বিজ্ঞান (২য়),
    // অগ্রদূত Competitive English (৩য়) ও অগ্রদূত Basic Math
    // (4th Edition) রেফারেন্স গ্রন্থের পৃষ্ঠা নম্বর অনুসারে যাচাই।
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    skipDuplicates: true,
  });
  console.log('✓ Recent Job Solution (মন্ত্রিপরিষদ বিভাগ — কম্পিউটার অপারেটর) questions seeded');
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
