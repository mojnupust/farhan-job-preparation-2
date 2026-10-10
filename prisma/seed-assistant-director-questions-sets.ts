import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
// TODO: replace with the actual QuestionSet id for this exam before running
const questionSetId = 'cmtdtem8q000th301g133841z';

async function main() {
  await prisma.question.createMany({
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // অগ্রদূত Recent Job Solution — বাংলাদেশ কর্মচারী কল্যাণ বোর্ড
    // পদের নাম: সহকারী পরিচালক
    // পরীক্ষার তারিখ: ২১.০৮.২০২৬ | সময়: ৬০ মিনিট | পূর্ণমান: ১০০
    // সংগৃহীত প্রশ্ন: ৯২টি (প্রশ্ন ৯৩–১০০ উৎস পাতায় অনুপস্থিত)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    data: [
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // বিষয়: বাংলা ভাষা ও সাহিত্য — প্রশ্ন ০১–২৫
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

      {
        questionSetId,
        slug: 'bhashar-moulik-ongsho-koyti',
        questionText: 'ভাষার মৌলিক অংশ কয়টি?',
        optionA: 'চারটি',
        optionB: 'পাঁচটি',
        optionC: 'ছয়টি',
        optionD: 'সাতটি',
        correctAnswer: 'A',
        explanation: `সঠিক উত্তর: (ক) চারটি

ভাষার মৌলিক অংশ সাধারণত চারটি ধরা হয়: ধ্বনি (বা বর্ণ), শব্দ, বাক্য ও অর্থ। এগুলোর সমন্বয়েই ভাষা গঠিত ও অর্থবোধক হয়।

মনে রাখুন:
— ধ্বনি/বর্ণ = ক্ষুদ্রতম উচ্চারিত একক
— শব্দ = অর্থবোধক একক
— বাক্য = সম্পূর্ণ ভাব প্রকাশ
— অর্থ = ভাষার লক্ষ্য`,
        subject: 'বাংলা ভাষা ও সাহিত্য',
        topic: 'ভাষাতত্ত্ব',
        subTopic: 'ভাষার মৌলিক অংশ',
        sortOrder: 1,
      },

      {
        questionSetId,
        slug: 'pro-pora-opo-kon-dhoroner-uposorgo',
        questionText: 'প্র, পরা, অপ- কোন ধরনের উপসর্গ?',
        optionA: 'সংস্কৃত উপসর্গ',
        optionB: 'বাংলা উপসর্গ',
        optionC: 'বিদেশি উপসর্গ',
        optionD: 'কোনটিই নয়',
        correctAnswer: 'A',
        explanation: `সঠিক উত্তর: (ক) সংস্কৃত উপসর্গ

প্র, পরা, অপ, অব, অনু, নি, নির্, দুর্, সু, বি, অধি, উৎ প্রভৃতি সংস্কৃত উপসর্গ। এগুলো তৎসম শব্দের আগে বসে নতুন অর্থ তৈরি করে (যেমন: প্রহার, পরাজয়, অপমান)।

পার্থক্য:
— বাংলা উপসর্গ: অ, আ, না, নি, অনা, ভর, রাম ইত্যাদি
— বিদেশি উপসর্গ: লা, বে, ফি, গর, নিম, বদ ইত্যাদি`,
        subject: 'বাংলা ভাষা ও সাহিত্য',
        topic: 'ব্যাকরণ',
        subTopic: 'উপসর্গ',
        sortOrder: 2,
      },

      {
        questionSetId,
        slug: 'ushno-shobder-juktakkhor-kon-borner-somonoye',
        questionText: '‘উষ্ণ’ শব্দের যুক্তাক্ষরটি কোন কোন বর্ণের সমন্বয়ে গঠিত?',
        optionA: 'ষ+ঞ',
        optionB: 'ষ+ণ',
        optionC: 'ষ+ন',
        optionD: 'ষ+ঙ',
        correctAnswer: 'B',
        explanation: `সঠিক উত্তর: (খ) ষ+ণ

‘উষ্ণ’ শব্দে যুক্তাক্ষরটি ষ্ণ, যা ষ ও মূর্ধন্য ণ-এর যোগে গঠিত। উষ্ণ = উষ্ + ণ (মূর্ধন্য ণ)।

বিভ্রান্তি এড়ান:
— ষ+ঞ = জ্ঞ নয়, ভিন্ন যুক্তাক্ষর
— ষ+ন = দন্ত্য ন দিয়ে হয় না; এখানে মূর্ধন্য ণ লাগে
— ষ+ঙ = ভুল সমন্বয়`,
        subject: 'বাংলা ভাষা ও সাহিত্য',
        topic: 'ব্যাকরণ',
        subTopic: 'যুক্তাক্ষর',
        sortOrder: 3,
      },

      {
        questionSetId,
        slug: 'kon-banan-shuddho-mumurshu',
        questionText: 'কোন বানানটি শুদ্ধ?',
        optionA: 'মুমূর্ষু',
        optionB: 'মুমুষু',
        optionC: 'মুমূক্ষু',
        optionD: 'মুমুক্ষু',
        correctAnswer: 'A',
        explanation: `সঠিক উত্তর: (ক) মুমূর্ষু

শুদ্ধ বানান মুমূর্ষু — যার অর্থ মৃত্যুমুখী বা মরণাপন্ন। এটি সংস্কৃত √মৃ ধাতু থেকে গঠিত।

ভুল রূপ:
— মুমুক্ষু/মুমূক্ষু = মোক্ষকামী (ভিন্ন শব্দ)
— মুমুষু = অশুদ্ধ বানান`,
        subject: 'বাংলা ভাষা ও সাহিত্য',
        topic: 'ব্যাকরণ',
        subTopic: 'শুদ্ধ বানান',
        sortOrder: 4,
      },

      {
        questionSetId,
        slug: 'sonchoy-shobder-shondhibicched',
        questionText: '‘সঞ্চয়’ শব্দের সন্ধিবিচ্ছেদ কোনটি?',
        optionA: 'সুন+চয়',
        optionB: 'সম্+চয়',
        optionC: 'সঙ+চয়',
        optionD: 'সং+চয়',
        correctAnswer: 'B',
        explanation: `সঠিক উত্তর: (খ) সম্+চয়

সঞ্চয় = সম্ + চয়। ব্যঞ্জনসন্ধিতে ম্-এর পর চ থাকলে ম্ পরিবর্তিত হয়ে ঞ্ হয় (ম্ + চ = ঞ্চ)। তাই সম্+চয় → সঞ্চয়।

মনে রাখুন: সং+চয় লেখা চলে না, কারণ উপসর্গটি সম্ (সম্-), সং নয়।`,
        subject: 'বাংলা ভাষা ও সাহিত্য',
        topic: 'ব্যাকরণ',
        subTopic: 'সন্ধি',
        sortOrder: 5,
      },

      {
        questionSetId,
        slug: 'bangla-byonjonborne-matrabihin-born-koyti',
        questionText: 'বাংলা ব্যঞ্জনবর্ণে মাত্রাবিহীন বর্ণ কয়টি?',
        optionA: 'এগারটি',
        optionB: 'ছয়টি',
        optionC: 'দশটি',
        optionD: 'আটটি',
        correctAnswer: 'B',
        explanation: `সঠিক উত্তর: (খ) ছয়টি

বাংলা ব্যঞ্জনবর্ণের মধ্যে মাত্রা (শিরোরেখা) নেই এমন বর্ণ সাধারণত ছয়টি ধরা হয়: র, ড়, ঢ়, য় এবং দুটি পূর্বসূরী চিহ্ন ং ও ঃ — পাঠ্যক্রমে এগুলোকে মাত্রাবিহীন হিসেবে গণ্য করা হয়।

বিভ্রান্তি: অনেকে শুধু র/ড়/ঢ় গণনা করেন; পরীক্ষায় প্রচলিত উত্তর ছয়টি।`,
        subject: 'বাংলা ভাষা ও সাহিত্য',
        topic: 'ব্যাকরণ',
        subTopic: 'বর্ণপরিচয়',
        sortOrder: 6,
      },

      {
        questionSetId,
        slug: 'macher-ma-bagdharar-ortho',
        questionText: '‘মাছের মা’ বাগধারাটির অর্থ কি?',
        optionA: 'নির্মম',
        optionB: 'কুচক্রী',
        optionC: 'সাহসী',
        optionD: 'ভীতু',
        correctAnswer: 'A',
        explanation: `সঠিক উত্তর: (ক) নির্মম

‘মাছের মা’ বাগধারার অর্থ নিষ্ঠুর বা নির্মম — যে নিজ সন্তানকেও রেহাই দেয় না (মাছ সন্তান খেয়ে ফেলে, এই লোকবিশ্বাস থেকে)।

অন্য অর্থ নয়: কুচক্রী = চক্রান্তকারী; সাহসী/ভীতু = স্বভাবগত বিপরীত।`,
        subject: 'বাংলা ভাষা ও সাহিত্য',
        topic: 'বাগধারা',
        subTopic: 'অর্থ',
        sortOrder: 7,
      },

      {
        questionSetId,
        slug: 'nicher-konti-deshi-shobdo-noy',
        questionText: 'নিচের কোনটি দেশি শব্দ নয়?',
        optionA: 'কুলা',
        optionB: 'ডাব',
        optionC: 'চুলা',
        optionD: 'চাবি',
        correctAnswer: 'D',
        explanation: `সঠিক উত্তর: (ঘ) চাবি

কুলা, ডাব, চুলা — এগুলো দেশি (অনার্য/দেশজ) শব্দ। চাবি ফারসি/বিদেশি উৎসের শব্দ, তাই দেশি নয়।

মনে রাখুন: দেশি শব্দ সাধারণত গ্রামীণ জীবন, গৃহস্থালি ও প্রাকৃতিক বস্তুর নামে বেশি দেখা যায়।`,
        subject: 'বাংলা ভাষা ও সাহিত্য',
        topic: 'শব্দতত্ত্ব',
        subTopic: 'দেশি ও বিদেশি শব্দ',
        sortOrder: 8,
      },

      {
        questionSetId,
        slug: 'bangla-bhashar-prothom-muslim-kobi-ke',
        questionText: 'বাংলা ভাষার প্রথম মুসলিম কবি কে?',
        optionA: 'আলাওল',
        optionB: 'শাহ্ মুহম্মদ সগীর',
        optionC: 'শেখ ফয়জুল্লাহ',
        optionD: 'কায়কোবাদ',
        correctAnswer: 'B',
        explanation: `সঠিক উত্তর: (খ) শাহ্ মুহম্মদ সগীর

মধ্যযুগের বাংলা সাহিত্যে প্রথম মুসলিম কবি হিসেবে শাহ মুহম্মদ সগীরকে গণ্য করা হয়। তিনি গাজী সিকান্দার শাহের পৃষ্ঠপোষকতায় ‘ইউসুফ-জুলেখা’ কাব্য রচনা করেন।

অন্যরা পরবর্তীকালের:
— আলাওল: আরাকান রাজসভা, পদ্মাবতী
— কায়কোবাদ: আধুনিক যুগ (মহাশ্মশান)`,
        subject: 'বাংলা ভাষা ও সাহিত্য',
        topic: 'মধ্যযুগের সাহিত্য',
        subTopic: 'কবি পরিচিতি',
        sortOrder: 9,
      },

      {
        questionSetId,
        slug: 'madhusudan-datter-gramer-bari-kon-nodir-tire',
        questionText: 'কবি মাইকেল মধুসূদন দত্তের গ্রামের বাড়ি কোন নদ/নদীর তীরে?',
        optionA: 'কপোতাক্ষ',
        optionB: 'করতোয়া',
        optionC: 'ভৈরব',
        optionD: 'চিত্রা',
        correctAnswer: 'A',
        explanation: `সঠিক উত্তর: (ক) কপোতাক্ষ

মাইকেল মধুসূদন দত্তের গ্রাম Sagardari (যশোর/কেশবপুর অঞ্চল) কপোতাক্ষ নদের তীরে। তাঁর বিখ্যাত কবিতা ‘কপোতাক্ষ নদ’-এ এই নদের কথা আছে।

অন্য নদীগুলো ভিন্ন অঞ্চলের — করতোয়া উত্তরবঙ্গ, চিত্রা নড়াইল অঞ্চল।`,
        subject: 'বাংলা ভাষা ও সাহিত্য',
        topic: 'লেখক পরিচিতি',
        subTopic: 'মাইকেল মধুসূদন দত্ত',
        sortOrder: 10,
      },

      {
        questionSetId,
        slug: 'thogi-bishoye-prothom-boi-likhechen-ke',
        questionText: '‘ঠগী’ বিষয়ে প্রথম বই লিখেছেন কে?',
        optionA: 'শ্রীপান্থ',
        optionB: 'রবীন্দ্রনাথ ঠাকুর',
        optionC: 'আবদুল্লাহ্ মুহাম্মদ উমর',
        optionD: 'শাহীন সুলতানা জামান',
        correctAnswer: 'A',
        explanation: `সঠিক উত্তর: (ক) শ্রীপান্থ

ঠগী সম্প্রদায় ও ঠগিবৃত্তি নিয়ে বাংলায় প্রথম গবেষণাধর্মী গ্রন্থের লেখক শ্রীপান্থ (নিকুঞ্জবিহারী দত্ত)। এটি ইতিহাস ও সমাজতত্ত্ব বিষয়ক রচনা, সাহিত্যিক কল্পকাহিনি নয়।`,
        subject: 'বাংলা ভাষা ও সাহিত্য',
        topic: 'লেখক পরিচিতি',
        subTopic: 'শ্রীপান্থ',
        sortOrder: 11,
      },

      {
        questionSetId,
        slug: 'muktijuddho-vittik-kabyanatto-konti',
        questionText: 'মুক্তিযুদ্ধ ভিত্তিক কাব্যনাট্য কোনটি?',
        optionA: 'স্বাধীনতা আমার স্বাধীনতা',
        optionB: 'পায়ের আওয়াজ পাওয়া যায়',
        optionC: 'কবর',
        optionD: 'জন্ডিস ও বিবিধ বেলুন',
        correctAnswer: 'B',
        explanation: `সঠিক উত্তর: (খ) পায়ের আওয়াজ পাওয়া যায়

সৈয়দ শামসুল হকের মুক্তিযুদ্ধভিত্তিক কাব্যনাট্য ‘পায়ের আওয়াজ পাওয়া যায়’। এটি পাকিস্তানি সেনা ও বাঙালি পরিবারের সংঘাত নিয়ে রচিত।

পার্থক্য:
— কবর = মুনীর চৌধুরীর নাটক (ভাষা আন্দোলন প্রসঙ্গ)
— জন্ডিস ও বিবিধ বেলুন = আবদুল্লাহ আল মামুনের নাটক`,
        subject: 'বাংলা ভাষা ও সাহিত্য',
        topic: 'নাটক',
        subTopic: 'কাব্যনাট্য',
        sortOrder: 12,
      },

      {
        questionSetId,
        slug: 'charyapod-kon-sale-abishkrito',
        questionText: '‘চর্যাপদ’ কোন সালে আবিষ্কৃত হয়?',
        optionA: '১৯০৭',
        optionB: '১৯০৮',
        optionC: '১৯০৬',
        optionD: '১৯০৯',
        correctAnswer: 'A',
        explanation: `সঠিক উত্তর: (ক) ১৯০৭

হারপ্রসাদ শাস্ত্রী নেপালের রাজদরবারের গ্রন্থাগার থেকে ১৯০৭ সালে চর্যাপদের পুথি আবিষ্কার করেন। পরে এটি ‘হাজার বছরের পুরাণ বাঙ্গালা ভাষায় বৌদ্ধগান ও দোহা’ নামে প্রকাশিত হয়।

মনে রাখুন: আবিষ্কার ১৯০৭; প্রকাশকাল কখনো ১৯১৬ উল্লেখ করা হয় — প্রশ্ন আবিষ্কার সাল চাইলে ১৯০৭।`,
        subject: 'বাংলা ভাষা ও সাহিত্য',
        topic: 'প্রাচীন যুগ',
        subTopic: 'চর্যাপদ',
        sortOrder: 13,
      },

      {
        questionSetId,
        slug: 'bangla-mudron-jontrer-abishkar-kon-sale',
        questionText: 'বাংলা মুদ্রণ যন্ত্রের আবিষ্কার হয় কোন সালে?',
        optionA: '১৬৮২ সালের পূর্বে',
        optionB: '১৬৯২ সালের পূর্বে',
        optionC: '১৮৪২ সালের পরে',
        optionD: '১৮৭২ সালের পরে',
        correctAnswer: 'A',
        explanation: `সঠিক উত্তর: (ক) ১৬৮২ সালের পূর্বে

বাংলা হরফে মুদ্রণের প্রাথমিক প্রয়াস সপ্তদশ শতকে — পর্তুগিজ মিশনারিরা ১৬৮০-এর দশকের আগেই বাংলা মুদ্রণের কাজ শুরু করেন। তাই প্রচলিত উত্তর: ১৬৮২ সালের পূর্বে।

উনিশ শতকের সালগুলো (১৮৪২/১৮৭২) আধুনিক বাংলা ছাপাখানার প্রসারকাল; ‘আবিষ্কার/প্রথম মুদ্রণ’ নয়।`,
        subject: 'বাংলা ভাষা ও সাহিত্য',
        topic: 'ভাষার ইতিহাস',
        subTopic: 'মুদ্রণযন্ত্র',
        sortOrder: 14,
      },

      {
        questionSetId,
        slug: 'moymonshingho-gitikar-songrohak-ke',
        questionText: '‘ময়মনসিংহ গীতিকা’র সংগ্রাহক কে ছিলেন?',
        optionA: 'চন্দ্রকুমার দে',
        optionB: 'দক্ষিণারঞ্জন মিত্র মজুমদার',
        optionC: 'দীনেশচন্দ্র সেন',
        optionD: 'উপেন্দ্রকিশোর রায় চৌধুরী',
        correctAnswer: 'A',
        explanation: `সঠিক উত্তর: (ক) চন্দ্রকুমার দে

পল্লিগীতিগুলো মাঠপর্যায়ে সংগ্রহ করেন চন্দ্রকুমার দে। দীনেশচন্দ্র সেন সেগুলো সম্পাদনা ও গ্রন্থাকারে প্রকাশ করেন — তাই ‘সম্পাদক’ সেন, ‘সংগ্রাহক’ চন্দ্রকুমার দে।

অন্যরা: দক্ষিণারঞ্জন — ঠাকুরমার ঝুলি; উপেন্দ্রকিশোর — শিশুসাহিত্য ও ছবি।`,
        subject: 'বাংলা ভাষা ও সাহিত্য',
        topic: 'লোকসাহিত্য',
        subTopic: 'ময়মনসিংহ গীতিকা',
        sortOrder: 15,
      },

      {
        questionSetId,
        slug: 'arakan-rajshovar-kobi-chilen',
        questionText: 'আরাকান রাজসভার কবি ছিলেন?',
        optionA: 'কোরেশী মাগন ঠাকুর',
        optionB: 'দোনা গাজী',
        optionC: 'ফকির গরীবুল্লাহ',
        optionD: 'মদন মল্লিক',
        correctAnswer: 'A',
        explanation: `সঠিক উত্তর: (ক) কোরেশী মাগন ঠাকুর

আরাকান (ম্রাউক-উ) রাজসভার বাঙালি কবিদের মধ্যে আলাওল, দৌলত কাজী ও মাগন ঠাকুর প্রধান। মাগন ঠাকুর ‘চন্দ্রাবতী’ কাব্যের জন্য পরিচিত এবং আলাওলের পৃষ্ঠপোষকও ছিলেন।`,
        subject: 'বাংলা ভাষা ও সাহিত্য',
        topic: 'মধ্যযুগের সাহিত্য',
        subTopic: 'আরাকান রাজসভা',
        sortOrder: 16,
      },

      {
        questionSetId,
        slug: 'ramayon-kon-kobir-rochona',
        questionText: '‘রামায়ণ’ কোন কবির রচনা?',
        optionA: 'কালিদাস',
        optionB: 'চণ্ডীদাস',
        optionC: 'বেদব্যাস',
        optionD: 'বাল্মীকি',
        correctAnswer: 'D',
        explanation: `সঠিক উত্তর: (ঘ) বাল্মীকি

আদিকাব্য রামায়ণের রচয়িতা বাল্মীকি। মহাভারতের রচয়িতা বেদব্যাস; কালিদাস সংস্কৃত নাটক-কাব্যের কবি; চণ্ডীদাস বাংলা পদাবলির কবি।

মনে রাখুন: বাল্মীকি = রামায়ণ, ব্যাস = মহাভারত।`,
        subject: 'বাংলা ভাষা ও সাহিত্য',
        topic: 'সাহিত্য পরিচিতি',
        subTopic: 'রামায়ণ',
        sortOrder: 17,
      },

      {
        questionSetId,
        slug: 'konti-nazrul-er-kabyogrontho-noy',
        questionText: 'কোনটি কাজী নজরুল ইসলাম এর কাব্যগ্রন্থ নয়?',
        optionA: 'অগ্নিবীণা',
        optionB: 'মহাশ্মশান',
        optionC: 'প্রলয় শিখা',
        optionD: 'চক্রবাক',
        correctAnswer: 'B',
        explanation: `সঠিক উত্তর: (খ) মহাশ্মশান

অগ্নিবীণা, প্রলয়শিখা ও চক্রবাক নজরুলের কাব্যগ্রন্থ। ‘মহাশ্মশান’ কায়কোবাদের মহাকাব্য — নজরুলের নয়।`,
        subject: 'বাংলা ভাষা ও সাহিত্য',
        topic: 'কাব্যগ্রন্থ',
        subTopic: 'কাজী নজরুল ইসলাম',
        sortOrder: 18,
      },

      {
        questionSetId,
        slug: 'roktokorobi-kon-dhoroner-rochona',
        questionText: '‘রক্তকরবী’ কোন ধরনের রচনা?',
        optionA: 'গান',
        optionB: 'কবিতা',
        optionC: 'উপন্যাস',
        optionD: 'নাটক',
        correctAnswer: 'D',
        explanation: `সঠিক উত্তর: (ঘ) নাটক

রক্তকরবী রবীন্দ্রনাথ ঠাকুরের প্রতীকী নাটক। যক্ষপুরী ও নন্দিনীর কাহিনি শোষণ ও মুক্তির প্রতীক। এটি উপন্যাস বা কাব্যগ্রন্থ নয়।`,
        subject: 'বাংলা ভাষা ও সাহিত্য',
        topic: 'নাটক',
        subTopic: 'রবীন্দ্রনাথ ঠাকুর',
        sortOrder: 19,
      },

      {
        questionSetId,
        slug: 'ekushe-februarir-bishyato-ganer-shurokar-ke',
        questionText: '‘একুশে ফেব্রুয়ারি’র বিখ্যাত গানটির সুরকার কে?',
        optionA: 'সুবীর সাহা',
        optionB: 'আলতাফ মাহমুদ',
        optionC: 'সুধীন দাস',
        optionD: 'আলতাফ মামুন',
        correctAnswer: 'B',
        explanation: `সঠিক উত্তর: (খ) আলতাফ মাহমুদ

‘আমার ভাইয়ের রক্তে রাঙানো একুশে ফেব্রুয়ারি’ গানের গীতিকার আবদুল গাফফার চৌধুরী এবং সুরকার আলতাফ মাহমুদ। সুধীন দাস ভাষা আন্দোলনের গণসঙ্গীত শিল্পী; সুবীর সাহা পরে এই গান জনপ্রিয় করেন, মূল সুরকার তিনি নন।`,
        subject: 'বাংলা ভাষা ও সাহিত্য',
        topic: 'সংগীত',
        subTopic: 'একুশে ফেব্রুয়ারি',
        sortOrder: 20,
      },

      {
        questionSetId,
        slug: 'kalo-borof-uponyasher-bishoy',
        questionText: '‘কালো বরফ’ উপন্যাসটির বিষয়?',
        optionA: 'তেভাগা আন্দোলন',
        optionB: 'ভাষা আন্দোলন',
        optionC: 'মুক্তিযুদ্ধ',
        optionD: 'দেশভাগ',
        correctAnswer: 'D',
        explanation: `সঠিক উত্তর: (ঘ) দেশভাগ

মাহমুদুল হকের উপন্যাস ‘কালো বরফ’-এর কেন্দ্রীয় বিষয় ১৯৪৭-এর দেশভাগ ও তার মানবিক-সামাজিক ক্ষত। তেভাগা, ভাষা আন্দোলন বা মুক্তিযুদ্ধ এ উপন্যাসের মূল থিম নয়।`,
        subject: 'বাংলা ভাষা ও সাহিত্য',
        topic: 'উপন্যাস',
        subTopic: 'মাহমুদুল হক',
        sortOrder: 21,
      },

      {
        questionSetId,
        slug: 'ityadi-shobdo-kon-shomash',
        questionText: '‘ইত্যাদি’ শব্দটি কোন সমাস দ্বারা নিষ্পন্ন?',
        optionA: 'তৎপুরুষ',
        optionB: 'বহুব্রীহি',
        optionC: 'কর্মধারয়',
        optionD: 'দ্বিগু',
        correctAnswer: 'A',
        explanation: `সঠিক উত্তর: (ক) তৎপুরুষ

ইত্যাদি = ইতি + আদি, অর্থ ‘এই আদি (হইতে)’ — দ্বিতীয় পদের অর্থ প্রাধান্য পায়, তাই তৎপুরুষ সমাস।

দ্বিগু সংখ্যাবাচক পূর্বপদে হয়; কর্মধারয় বিশেষণ-বিশেষ্য সম্বন্ধে; বহুব্রীহিতে অন্য পদের অর্থ প্রাধান্য পায়।`,
        subject: 'বাংলা ভাষা ও সাহিত্য',
        topic: 'ব্যাকরণ',
        subTopic: 'সমাস',
        sortOrder: 22,
      },

      {
        questionSetId,
        slug: 'kon-jatiyo-shobde-sho-er-bebohar-hoy-na',
        questionText: 'কোন জাতীয় শব্দে ‘ষ’ এর ব্যবহার হয় না?',
        optionA: 'তদ্ভব',
        optionB: 'সংস্কৃত',
        optionC: 'বিদেশি',
        optionD: 'দেশি',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) বিদেশি

মূর্ধন্য ষ তৎসম/সংস্কৃত শব্দে ব্যবহৃত হয়। বিদেশি (ফারসি, আরবি, ইংরেজি প্রভৃতি) শব্দে ষ-এর প্রয়োগ হয় না; সেখানে সাধারণত স বা শ ব্যবহৃত হয়।`,
        subject: 'বাংলা ভাষা ও সাহিত্য',
        topic: 'ব্যাকরণ',
        subTopic: 'বর্ণপ্রয়োগ',
        sortOrder: 23,
      },

      {
        questionSetId,
        slug: 'shishu-shobdoti-kon-lingo',
        questionText: '‘শিশু’ শব্দটি কোন লিঙ্গ?',
        optionA: 'পুংলিঙ্গ',
        optionB: 'স্ত্রী লিঙ্গ',
        optionC: 'ক্লীব লিঙ্গ',
        optionD: 'উভয় লিঙ্গ',
        correctAnswer: 'D',
        explanation: `সঠিক উত্তর: (ঘ) উভয় লিঙ্গ

‘শিশু’ দিয়ে ছেলে ও মেয়ে উভয়কেই বোঝায়, তাই উভয়লিঙ্গ (common gender)। পুং/স্ত্রী আলাদা রূপ নেই; ক্লীবলিঙ্গ নির্বাক/বস্তুবাচক শব্দের জন্য।`,
        subject: 'বাংলা ভাষা ও সাহিত্য',
        topic: 'ব্যাকরণ',
        subTopic: 'লিঙ্গ',
        sortOrder: 24,
      },

      {
        questionSetId,
        slug: 'shobder-age-konti-bose',
        questionText: 'শব্দের আগে কোনটি বসে?',
        optionA: 'উপসর্গ',
        optionB: 'অনুসর্গ',
        optionC: 'প্রত্যয়',
        optionD: 'বিভক্তি',
        correctAnswer: 'A',
        explanation: `সঠিক উত্তর: (ক) উপসর্গ

উপসর্গ শব্দমূলের আগে বসে। অনুসর্গ শব্দের পরে বসে (জন্য, দ্বারা, থেকে)। প্রত্যয় ও বিভক্তিও সাধারণত শব্দ/ধাতুর পরে যুক্ত হয়।`,
        subject: 'বাংলা ভাষা ও সাহিত্য',
        topic: 'ব্যাকরণ',
        subTopic: 'উপসর্গ-অনুসর্গ',
        sortOrder: 25,
      },

      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // বিষয়: ইংরেজি — প্রশ্ন ২৬–৫০
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

      {
        questionSetId,
        slug: 'the-tempest-by-shakespeare-is-a',
        questionText: "'The Tempest' by Shakespeare is a-",
        optionA: 'novel',
        optionB: 'drama',
        optionC: 'epic',
        optionD: 'book of poetry',
        correctAnswer: 'B',
        explanation: `সঠিক উত্তর: (খ) drama

The Tempest শেকসপিয়রের রোমান্টিক/ট্র্যাজি-কমেডি নাটক (play/drama), উপন্যাস বা মহাকাব্য নয়। প্রস্পেরো, মিরান্ডা ও ক্যালিবানের কাহিনি মঞ্চনাটক হিসেবে রচিত।`,
        subject: 'ইংরেজি',
        topic: 'Literature',
        subTopic: 'Shakespeare',
        sortOrder: 26,
      },

      {
        questionSetId,
        slug: 'which-word-is-not-related-to-laughing',
        questionText: "Which of the following words is not related to ‘laughing’?",
        optionA: 'screaming',
        optionB: 'smiling',
        optionC: 'giggle',
        optionD: 'chucle',
        correctAnswer: 'A',
        explanation: `সঠিক উত্তর: (ক) screaming

smiling, giggle ও chuckle (প্রশ্নপত্রে chucle ছাপার ভুল) হাসি-সম্পর্কিত। screaming মানে চিৎকার — ভয়, রাগ বা ব্যথায়, হাসি নয়।`,
        subject: 'ইংরেজি',
        topic: 'Vocabulary',
        subTopic: 'Word association',
        sortOrder: 27,
      },

      {
        questionSetId,
        slug: 'break-a-leg-means',
        questionText: "‘Break a leg’ means-",
        optionA: 'good luck',
        optionB: 'bad luck',
        optionC: 'to be failed',
        optionD: 'to hurt',
        correctAnswer: 'A',
        explanation: `সঠিক উত্তর: (ক) good luck

‘Break a leg’ থিয়েটার জগতের idiom — অভিনেতাকে শুভকামনা জানাতে ব্যবহৃত হয়, আক্ষরিকভাবে পা ভাঙা নয়। খারাপ ভাগ্য বা আঘাত বোঝায় না।`,
        subject: 'ইংরেজি',
        topic: 'Idioms',
        subTopic: 'Meaning',
        sortOrder: 28,
      },

      {
        questionSetId,
        slug: 'who-is-known-as-the-poet-of-nature',
        questionText: "Who is known as ‘the poet of nature’ in English literature?",
        optionA: 'Lord Tennyson',
        optionB: 'John Milton',
        optionC: 'William Wordsworth',
        optionD: 'John Keats',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) William Wordsworth

রোমান্টিক যুগের Wordsworth প্রকৃতির কবি হিসেবে পরিচিত; Lyrical Ballads ও প্রকৃতি-চেতনার কবিতার জন্য। Keats সৌন্দর্যের কবি, Milton মহাকাব্যিক, Tennyson ভিক্টোরীয় কবিলাureate।`,
        subject: 'ইংরেজি',
        topic: 'Literature',
        subTopic: 'Romantic poets',
        sortOrder: 29,
      },

      {
        questionSetId,
        slug: 'rubber-is-notable-for-its',
        questionText: 'Rubber is notable for its-',
        optionA: 'elasticity',
        optionB: 'heaviness',
        optionC: 'lightness',
        optionD: 'brightness',
        correctAnswer: 'A',
        explanation: `সঠিক উত্তর: (ক) elasticity

রাবারের প্রধান বৈশিষ্ট্য স্থিতিস্থাপকতা (elasticity) — টানলে প্রসারিত হয়ে আবার আগের আকারে ফিরে আসে। ওজন, উজ্জ্বলতা বা শুধু হালকা হওয়া এর মূল পরিচয় নয়।`,
        subject: 'ইংরেজি',
        topic: 'Vocabulary',
        subTopic: 'Word meaning',
        sortOrder: 30,
      },

      {
        questionSetId,
        slug: 'a-writer-who-steals-ideas-from-others',
        questionText: 'A writer who steals ideas from others-',
        optionA: 'editor',
        optionB: 'copier',
        optionC: 'plagiarist',
        optionD: 'translator',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) plagiarist

অন্যের লেখা বা ধারণা চুরি করে নিজের নামে চালানো ব্যক্তি plagiarist। editor সম্পাদক, translator অনুবাদক, copier কেবল নকলকারী — সাহিত্যচুরির নির্দিষ্ট শব্দ plagiarist।`,
        subject: 'ইংরেজি',
        topic: 'Vocabulary',
        subTopic: 'One-word substitution',
        sortOrder: 31,
      },

      {
        questionSetId,
        slug: 'phenomenology-is',
        questionText: "‘Phenomenology’ is-",
        optionA: 'theology',
        optionB: 'experience',
        optionC: 'philosophy',
        optionD: 'drama',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) philosophy

Phenomenology হলো দর্শনের একটি ধারা (হুসার্ল প্রমুখ) যা চেতনায় প্রতীয়মান বিষয়ের গঠন বিশ্লেষণ করে। এটি ধর্মতত্ত্ব বা নাটক নয়; অভিজ্ঞতা এর আলোচ্য, কিন্তু শব্দটি নিজেই একটি philosophical method।`,
        subject: 'ইংরেজি',
        topic: 'Vocabulary',
        subTopic: 'Academic terms',
        sortOrder: 32,
      },

      {
        questionSetId,
        slug: 'william-shakespeare-was-born-in',
        questionText: 'William Shakespeare was born in-',
        optionA: 'USA',
        optionB: 'Britain',
        optionC: 'Germany',
        optionD: 'Greece',
        correctAnswer: 'B',
        explanation: `সঠিক উত্তর: (খ) Britain

শেকসপিয়র ইংল্যান্ডের Stratford-upon-Avon-এ জন্মগ্রহণ করেন (১৫৬৪)। যুক্তরাষ্ট্র, জার্মানি বা গ্রিস তাঁর জন্মস্থান নয়।`,
        subject: 'ইংরেজি',
        topic: 'Literature',
        subTopic: 'Shakespeare',
        sortOrder: 33,
      },

      {
        questionSetId,
        slug: 'the-verb-form-of-politics',
        questionText: "The verb form of ‘Politics’ is-",
        optionA: 'Political',
        optionB: 'Politically',
        optionC: 'Policy',
        optionD: 'Politicise',
        correctAnswer: 'D',
        explanation: `সঠিক উত্তর: (ঘ) Politicise

Politics (noun) → politicise/politicize (verb) = রাজনীতিকরণ করা। Political বিশেষণ, politically ক্রিয়াবিশেষণ, policy নামপদ।`,
        subject: 'ইংরেজি',
        topic: 'Grammar',
        subTopic: 'Parts of speech / word formation',
        sortOrder: 34,
      },

      {
        questionSetId,
        slug: 'choose-the-meaning-of-bring-to-pass',
        questionText: "Choose the meaning of ‘Bring to pass’ -",
        optionA: 'Cause to happen',
        optionB: 'cause to pass',
        optionC: 'cause to destroy',
        optionD: 'cause to carry out',
        correctAnswer: 'A',
        explanation: `সঠিক উত্তর: (ক) Cause to happen

Bring to pass = ঘটানো বা বাস্তবায়িত করা (cause to happen)। ধ্বংস বা শুধু ‘পাস করানো’ অর্থ নয়।`,
        subject: 'ইংরেজি',
        topic: 'Idioms',
        subTopic: 'Phrasal meaning',
        sortOrder: 35,
      },

      {
        questionSetId,
        slug: 'identify-the-correct-sentence-bread-wheat',
        questionText: 'Identify the correct sentence:',
        optionA: 'Bread is usually made of wheat',
        optionB: 'Bread is usually made with wheat',
        optionC: 'Bread is usually made by wheat',
        optionD: 'Bread is usually made from wheat',
        correctAnswer: 'D',
        explanation: `সঠিক উত্তর: (ঘ) Bread is usually made from wheat

কাঁচামাল রূপান্তরিত হয়ে নতুন পদার্থ হলে made from ব্যবহার হয় (wheat → bread)। made of = উপাদান দৃশ্যমান থাকে (a table made of wood)। made by = কর্তা; made with = সহযোগী উপাদান।`,
        subject: 'ইংরেজি',
        topic: 'Grammar',
        subTopic: 'Preposition',
        sortOrder: 36,
      },

      {
        questionSetId,
        slug: 'open-the-window-identify-the-correct-passive-form',
        questionText: "'Open the window' identify the correct passive form-",
        optionA: 'The window should be opened',
        optionB: 'Let the window be opened',
        optionC: 'Let the window be opened by you',
        optionD: 'The window must be opened',
        correctAnswer: 'B',
        explanation: `সঠিক উত্তর: (খ) Let the window be opened

Imperative বাক্যের passive সাধারণত: Let + object + be + past participle। Open the window → Let the window be opened। should/must অর্থ বদলে দেয়; by you অপ্রয়োজনীয়।`,
        subject: 'ইংরেজি',
        topic: 'Grammar',
        subTopic: 'Voice',
        sortOrder: 37,
      },

      {
        questionSetId,
        slug: 'the-antonym-of-imprudent',
        questionText: "The antonym of 'imprudent'",
        optionA: 'judicious',
        optionB: 'unwise',
        optionC: 'hasty',
        optionD: 'reckless',
        correctAnswer: 'A',
        explanation: `সঠিক উত্তর: (ক) judicious

Imprudent = অবিবেচক/অসাবধান। বিপরীত: judicious (বিচক্ষণ)। unwise, hasty, reckless সবই imprudent-এর কাছাকাছি সমার্থক।`,
        subject: 'ইংরেজি',
        topic: 'Vocabulary',
        subTopic: 'Antonym',
        sortOrder: 38,
      },

      {
        questionSetId,
        slug: 'i-have-a-pain-blank-my-leg',
        questionText: 'Fill in the blank with appropriate word: I have a pain ... my leg.',
        optionA: 'on',
        optionB: 'into',
        optionC: 'with',
        optionD: 'in',
        correctAnswer: 'D',
        explanation: `সঠিক উত্তর: (ঘ) in

শরীরের অঙ্গে ব্যথা বোঝাতে pain in ব্যবহার হয়: pain in my leg/stomach/chest। on সাধারণত পৃষ্ঠে; into ভিতরে প্রবেশ; with সহিত।`,
        subject: 'ইংরেজি',
        topic: 'Grammar',
        subTopic: 'Preposition',
        sortOrder: 39,
      },

      {
        questionSetId,
        slug: 'se-ki-gotokal-esechilo-er-ingreji',
        questionText: "'সে কি গতকাল এসেছিল?' এর ইংরেজি ভাষান্তর কী?",
        optionA: 'Did he come yesterday?',
        optionB: 'Had he came yesterday',
        optionC: 'Has he come yesterday?',
        optionD: 'Do he came yesterday?',
        correctAnswer: 'A',
        explanation: `সঠিক উত্তর: (ক) Did he come yesterday?

গতকাল নির্দিষ্ট অতীত সময় — Simple Past প্রশ্ন: Did + subject + verb-এর মূল রূপ। Had he came অশুদ্ধ (had + come হতে হয়); Has he come yesterday মিলছে না (yesterday-এর সাথে present perfect নয়); Do he came ব্যাকরণভুল।`,
        subject: 'ইংরেজি',
        topic: 'Translation',
        subTopic: 'Tense',
        sortOrder: 40,
      },

      {
        questionSetId,
        slug: 'choose-the-correct-spelling-bureaucrat',
        questionText: 'Choose the correct spelling?',
        optionA: 'Bourocrate',
        optionB: 'Bureacrat',
        optionC: 'Bureaucrat',
        optionD: 'Burukral',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) Bureaucrat

শুদ্ধ বানান Bureaucrat (bureau + crat)। অন্যগুলো ভুল বানান।`,
        subject: 'ইংরেজি',
        topic: 'Spelling',
        subTopic: 'Correct spelling',
        sortOrder: 41,
      },

      {
        questionSetId,
        slug: 'nip-in-the-bud-er-ortho',
        questionText: 'Nip in the bud এর অর্থ হচ্ছে-',
        optionA: 'Beginning',
        optionB: 'Destroy at the very beginning',
        optionC: 'Bed of roses',
        optionD: 'Rare-up',
        correctAnswer: 'B',
        explanation: `সঠিক উত্তর: (খ) Destroy at the very beginning

Nip in the bud = কুঁড়িতেই নষ্ট করা, অর্থাৎ সমস্যা শুরুতেই দমন করা। শুধু ‘beginning’ অর্থ অসম্পূর্ণ; bed of roses ভিন্ন idiom।`,
        subject: 'ইংরেজি',
        topic: 'Idioms',
        subTopic: 'Meaning',
        sortOrder: 42,
      },

      {
        questionSetId,
        slug: 'admit-shobdotir-noun-nicher-konti',
        questionText: 'Admit শব্দটির Noun নিচের কোনটি?',
        optionA: 'Admission',
        optionB: 'Admittance',
        optionC: 'Admissible',
        optionD: 'Admitted',
        correctAnswer: 'A',
        explanation: `সঠিক উত্তর: (ক) Admission

Admit-এর প্রধান noun admission (ভর্তি/স্বীকার)। Admittanceও noun (প্রবেশাধিকার) কিন্তু পরীক্ষায় সাধারণ উত্তর Admission। Admissible বিশেষণ; admitted verb/adjective।`,
        subject: 'ইংরেজি',
        topic: 'Grammar',
        subTopic: 'Word formation',
        sortOrder: 43,
      },

      {
        questionSetId,
        slug: 'select-the-correct-sentence-child-born',
        questionText: 'Select the correct sentence?',
        optionA: 'The child has been born yesterday',
        optionB: 'The child had been born yesterday',
        optionC: 'The child took birth yesterday',
        optionD: 'The child was born yesterday',
        correctAnswer: 'D',
        explanation: `সঠিক উত্তর: (ঘ) The child was born yesterday

জন্ম বোঝাতে ইংরেজিতে be born ব্যবহৃত হয়। নির্দিষ্ট অতীত (yesterday) তাই Simple Past: was born। has been born yesterday ভুল; took birth অপ্রাকৃত ইংরেজি।`,
        subject: 'ইংরেজি',
        topic: 'Grammar',
        subTopic: 'Correct sentence',
        sortOrder: 44,
      },

      {
        questionSetId,
        slug: 'your-conduct-admits-blank-no-excuse',
        questionText: 'Your conduct admits ... no excuse.',
        optionA: 'to',
        optionB: 'for',
        optionC: 'of',
        optionD: 'at',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) of

Idiom: admit of = সুযোগ/অবকাশ দেওয়া। Your conduct admits of no excuse = তোমার আচরণ কোনো ওজরের সুযোগ রাখে না। admit to অন্য অর্থে (স্বীকার করা) ব্যবহৃত হয়।`,
        subject: 'ইংরেজি',
        topic: 'Grammar',
        subTopic: 'Preposition / phrasal verb',
        sortOrder: 45,
      },

      {
        questionSetId,
        slug: 'he-behaved-as-if-nothing',
        questionText: 'He behaved as if nothing-',
        optionA: 'happens',
        optionB: 'had happened',
        optionC: 'has happened',
        optionD: 'happening',
        correctAnswer: 'B',
        explanation: `সঠিক উত্তর: (খ) had happened

as if-এর পরে অতীতের বিপরীত বা কাল্পনিক ঘটনায় Past Perfect: as if nothing had happened। মূল ক্রিয়া behaved (past) হওয়ায় had happened সামঞ্জস্যপূর্ণ।`,
        subject: 'ইংরেজি',
        topic: 'Grammar',
        subTopic: 'Conditional / as if',
        sortOrder: 46,
      },

      {
        questionSetId,
        slug: 'choose-the-plural-number-agenda',
        questionText: 'Choose the plural number?',
        optionA: 'Syllabus',
        optionB: 'News',
        optionC: 'Physics',
        optionD: 'Agenda',
        correctAnswer: 'D',
        explanation: `সঠিক উত্তর: (ঘ) Agenda

Agenda ল্যাটিন agendum-এর বহুবচন (আধুনিক ইংরেজিতে agenda প্রায়ই singular ধরা হয়, কিন্তু MCQ-তে plural হিসেবেই চাওয়া হয়)। Syllabus একবচন (plural: syllabi/syllabuses)। News ও Physics plural-looking কিন্তু uncountable/singular verb নেয়।`,
        subject: 'ইংরেজি',
        topic: 'Grammar',
        subTopic: 'Number',
        sortOrder: 47,
      },

      {
        questionSetId,
        slug: 'the-phrase-by-and-by-means',
        questionText: "The phrase 'by and by' means?",
        optionA: 'Suddenly',
        optionB: 'in course of time',
        optionC: 'Soon',
        optionD: 'as if would be',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) Soon

By and by-এর প্রচলিত অর্থ শীঘ্রই / কিছুক্ষণ পরে (soon)। Suddenly হঠাৎ; as if would be অর্থহীন এখানে। কিছু অভিধানে ‘ক্রমে’ও থাকে, এই প্রশ্নপত্রে নির্দেশিত উত্তর Soon।`,
        subject: 'ইংরেজি',
        topic: 'Idioms',
        subTopic: 'Meaning',
        sortOrder: 48,
      },

      {
        questionSetId,
        slug: 'maiden-speech-means',
        questionText: "'Maiden speech' means-",
        optionA: 'farewell speech',
        optionB: 'late speech',
        optionC: 'last speech',
        optionD: 'first speech',
        correctAnswer: 'D',
        explanation: `সঠিক উত্তর: (ঘ) first speech

Maiden speech = কোনো সভাতে (বিশেষত সংসদে) প্রথম বক্তৃতা। farewell/last speech বিদায়/শেষ বক্তৃতা — বিপরীত ধারণা।`,
        subject: 'ইংরেজি',
        topic: 'Idioms',
        subTopic: 'Meaning',
        sortOrder: 49,
      },

      {
        questionSetId,
        slug: 'which-is-the-correct-spelling-lieutenant',
        questionText: 'Which is the correct spelling?',
        optionA: 'Lieaftenant',
        optionB: 'Leftanant',
        optionC: 'Lieftenant',
        optionD: 'Lieutenant',
        correctAnswer: 'D',
        explanation: `সঠিক উত্তর: (ঘ) Lieutenant

শুদ্ধ বানান Lieutenant (উচ্চারণ প্রায় leff-tenant)। অন্যগুলো ভুল বানান।`,
        subject: 'ইংরেজি',
        topic: 'Spelling',
        subTopic: 'Correct spelling',
        sortOrder: 50,
      },

      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // বিষয়: বাংলাদেশ ও আন্তর্জাতিক বিষয়াবলি / সাধারণ জ্ঞান — প্রশ্ন ৫১–৭৫
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

      {
        questionSetId,
        slug: 'kon-deshke-dhiborer-desh-bola-hoy',
        questionText: "কোন দেশকে 'ধীবরের দেশ' বলা হয়?",
        optionA: 'নরওয়ে',
        optionB: 'থাইল্যান্ড',
        optionC: 'মালয়েশিয়া',
        optionD: 'ফিলিপাইন',
        correctAnswer: 'A',
        explanation: `সঠিক উত্তর: (ক) নরওয়ে

নরওয়েকে মাছধরা ও মৎস্যশিল্পের জন্য ‘ধীবরের দেশ’ (land of fishermen) বলা হয়। দীর্ঘ উপকূল ও ফিয়োর্ডে মৎস্য আহরণের ঐতিহ্য রয়েছে।`,
        subject: 'আন্তর্জাতিক বিষয়াবলি',
        topic: 'দেশ পরিচিতি',
        subTopic: 'উপনাম',
        sortOrder: 51,
      },

      {
        questionSetId,
        slug: 'poschim-tir-kon-nodir-tire-obosthito',
        questionText: 'পশ্চিম তীর কোন নদীর তীরে অবস্থিত?',
        optionA: 'পদ্মা',
        optionB: 'ভাগীরথী',
        optionC: 'নীল',
        optionD: 'জর্ডান',
        correctAnswer: 'D',
        explanation: `সঠিক উত্তর: (ঘ) জর্ডান

West Bank (পশ্চিম তীর) জর্ডান নদীর পশ্চিম পাশে অবস্থিত ফিলিস্তিনি অঞ্চল। পদ্মা/ভাগীরথী বাংলাদেশ-ভারতের নদী; নীল আফ্রিকার।`,
        subject: 'আন্তর্জাতিক বিষয়াবলি',
        topic: 'ভূগোল',
        subTopic: 'মধ্যপ্রাচ্য',
        sortOrder: 52,
      },

      {
        questionSetId,
        slug: 'nokshigram-kon-jelay-obosthito',
        questionText: 'নক্সীগ্রাম কোন জেলায় অবস্থিত?',
        optionA: 'যশোর',
        optionB: 'জামালপুর',
        optionC: 'টাঙ্গাইল',
        optionD: 'শেরপুর',
        correctAnswer: 'D',
        explanation: `সঠিক উত্তর: (ঘ) শেরপুর

নকশীগ্রাম/নক্সীগ্রাম শেরপুর জেলায় অবস্থিত। এটি নকশিকাঁথা ও লোকশিল্পের সাথে পরিচিত এলাকা হিসেবে প্রশ্নব্যাংকে আসে।`,
        subject: 'বাংলাদেশ বিষয়াবলি',
        topic: 'জেলা পরিচিতি',
        subTopic: 'স্থান',
        sortOrder: 53,
      },

      {
        questionSetId,
        slug: 'tebhaga-andoloner-netri-ke-chilen',
        questionText: 'তেভাগা আন্দোলনের নেত্রী কে ছিলেন?',
        optionA: 'মহাশ্বেতা দেবী',
        optionB: 'সুমিত্র দেবী',
        optionC: 'তারামন বিবি',
        optionD: 'ইলা মিত্র',
        correctAnswer: 'D',
        explanation: `সঠিক উত্তর: (ঘ) ইলা মিত্র

তেভাগা আন্দোলনে (১৯৪৬–৪৭) কৃষক অধিকারের অন্যতম নেত্রী ইলা মিত্র। তারামন বিবি মুক্তিযোদ্ধা; মহাশ্বেতা দেবী সাহিত্যিক ও আদিবাসী আন্দোলনের সাথে পরিচিত — তেভাগার প্রধান নেত্রী তিনি নন।`,
        subject: 'বাংলাদেশ বিষয়াবলি',
        topic: 'ইতিহাস',
        subTopic: 'তেভাগা আন্দোলন',
        sortOrder: 54,
      },

      {
        questionSetId,
        slug: 'nicher-konti-bishwo-oitiho',
        questionText: 'নিচের কোনটি বিশ্ব-ঐতিহ্য?',
        optionA: 'শালবন বিহার',
        optionB: 'মহাস্থানগড়',
        optionC: 'বঙ্গোপসাগর',
        optionD: 'সুন্দরবন',
        correctAnswer: 'D',
        explanation: `সঠিক উত্তর: (ঘ) সুন্দরবন

UNESCO বিশ্ব ঐতিহ্য হিসেবে বাংলাদেশের সুন্দরবন স্বীকৃত (প্রাকৃতিক ঐতিহ্য)। শালবন বিহার ও মহাস্থানগড় গুরুত্বপূর্ণ প্রত্নস্থল হলেও এই তালিকায় সুন্দরবনই বিশ্ব ঐতিহ্য। বঙ্গোপসাগর সাগর, ঐতিহ্য স্থান নয়।`,
        subject: 'বাংলাদেশ বিষয়াবলি',
        topic: 'ঐতিহ্য',
        subTopic: 'UNESCO',
        sortOrder: 55,
      },

      {
        questionSetId,
        slug: 'monpura-70-ki',
        questionText: 'মনপুরা-৭০ কী?',
        optionA: 'একটি সিনেমা',
        optionB: 'একটি চিত্রকর্ম',
        optionC: 'একটি উপন্যাস',
        optionD: 'একটি উপজেলা',
        correctAnswer: 'B',
        explanation: `সঠিক উত্তর: (খ) একটি চিত্রকর্ম

মনপুরা-৭০ শিল্পী এস এম সুলতানের বিখ্যাত চিত্রকর্ম, যা ১৯৭০-এর ঘূর্ণিঝড় ও মনপুরার মানুষের সংগ্রামকে তুলে ধরে। এটি উপজেলা বা চলচ্চিত্রের নাম নয় (মনপুরা দ্বীপ/উপজেলা আলাদা)।`,
        subject: 'বাংলাদেশ বিষয়াবলি',
        topic: 'শিল্পকলা',
        subTopic: 'এস এম সুলতান',
        sortOrder: 56,
      },

      {
        questionSetId,
        slug: 'homarke-keno-ondho-kobi-bola-hoy',
        questionText: 'হোমারকে কেন অন্ধ কবি বলা হয়?',
        optionA: 'তার চোখ অন্ধ ছিল',
        optionB: 'তিনি মুখে মুখে লোক সংগীত ও কবিতা আবৃত্তি করতেন',
        optionC: 'তিনি শুধু উচ্চ বিত্ত ও সম্রাটদের নিয়ে গান ও কবিতা আবৃত্তি করতেন',
        optionD: 'তাকে অযথা অন্ধ কবি বলা হয়',
        correctAnswer: 'A',
        explanation: `সঠিক উত্তর: (ক) তার চোখ অন্ধ ছিল

প্রাচীন গ্রিক মহাকবি হোমারকে ঐতিহ্যগতভাবে অন্ধ কবি বলা হয় — প্রচলিত বিবরণ অনুসারে তিনি দৃষ্টিহীন ছিলেন। ইলিয়াড ও ওডিসি মৌখিক আবৃত্তির ধারায় রচিত হলেও এই প্রশ্নের নির্দেশিত কারণ দৃষ্টিহীনতা।`,
        subject: 'আন্তর্জাতিক বিষয়াবলি',
        topic: 'সাহিত্য',
        subTopic: 'হোমার',
        sortOrder: 57,
      },

      {
        questionSetId,
        slug: 'banijjik-vittite-kon-jelay-prothom-peyara-chash',
        questionText: 'বাণিজ্যিক ভিত্তিতে কোন জেলায় প্রথম পেয়ারা চাষ হয়?',
        optionA: 'যশোর',
        optionB: 'পিরোজপুর',
        optionC: 'ঝালকাঠি',
        optionD: 'সাতক্ষীরা',
        correctAnswer: 'B',
        explanation: `সঠিক উত্তর: (খ) পিরোজপুর

বাংলাদেশে বাণিজ্যিক পেয়ারা চাষের খ্যাতি পিরোজপুরের স্বরূপকাঠি/নেছারাবাদ অঞ্চলের। এখানকার পেয়ারা দেশজুড়ে পরিচিত।`,
        subject: 'বাংলাদেশ বিষয়াবলি',
        topic: 'কৃষি',
        subTopic: 'জেলা পরিচিতি',
        sortOrder: 58,
      },

      {
        questionSetId,
        slug: 'rokter-group-koyti',
        questionText: 'রক্তের গ্রুপ কয়টি?',
        optionA: '৫টি',
        optionB: '২টি',
        optionC: '৪টি',
        optionD: '৬টি',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) ৪টি

ABO পদ্ধতিতে প্রধান রক্তগ্রুপ চারটি: A, B, AB ও O। Rh ধনাত্মক/ঋণাত্মক আলাদা শ্রেণি; এই প্রশ্নে ক্লাসিক উত্তর ৪টি।`,
        subject: 'সাধারণ বিজ্ঞান',
        topic: 'জীববিজ্ঞান',
        subTopic: 'রক্ত',
        sortOrder: 59,
      },

      {
        questionSetId,
        slug: 'ashiar-dirghotomo-nodi-konti',
        questionText: 'এশিয়ার দীর্ঘতম নদী কোনটি?',
        optionA: 'আমাজন',
        optionB: 'নীল',
        optionC: 'ইয়াংসিকিয়াং',
        optionD: 'যমুনা',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) ইয়াংসিকিয়াং

ইয়াংসিকিয়াং (চাং জিয়াং/Yangtze) এশিয়ার দীর্ঘতম নদী (চীন)। আমাজন দক্ষিণ আমেরিকা, নীল আফ্রিকা — এশিয়ার নয়। যমুনা তুলনায় অনেক ছোট।`,
        subject: 'আন্তর্জাতিক বিষয়াবলি',
        topic: 'ভূগোল',
        subTopic: 'নদী',
        sortOrder: 60,
      },

      {
        questionSetId,
        slug: 'cha-patay-kon-vitamin-thake',
        questionText: 'চা পাতায় কোন ভিটামিন থাকে?',
        optionA: 'ভিটামিন কে',
        optionB: 'ভিটামিন বি কমপ্লেক্স',
        optionC: 'ভিটামিন এ',
        optionD: 'ভিটামিন ই',
        correctAnswer: 'B',
        explanation: `সঠিক উত্তর: (খ) ভিটামিন বি কমপ্লেক্স

চা পাতায় বি-কমপ্লেক্স গ্রুপের ভিটামিন (বিশেষত নিয়াসিন ইত্যাদি) এবং অ্যান্টিঅক্সিডেন্ট পলিফেনল থাকে। পরীক্ষায় প্রচলিত উত্তর ভিটামিন বি কমপ্লেক্স।`,
        subject: 'সাধারণ বিজ্ঞান',
        topic: 'পুষ্টি',
        subTopic: 'ভিটামিন',
        sortOrder: 61,
      },

      {
        questionSetId,
        slug: 'bishwo-manobadhikar-dibos-kon-tarikhe',
        questionText: 'বিশ্ব মানবাধিকার দিবস কোন তারিখে?',
        optionA: '১০ ডিসেম্বর',
        optionB: '১১ ডিসেম্বর',
        optionC: '১২ ডিসেম্বর',
        optionD: '৯ ডিসেম্বর',
        correctAnswer: 'A',
        explanation: `সঠিক উত্তর: (ক) ১০ ডিসেম্বর

১৯৪৮ সালের ১০ ডিসেম্বর জাতিসংঘ সাধারণ পরিষদে মানবাধিকারের সার্বজনীন ঘোষণা গৃহীত হয়। সেই দিনকে বিশ্ব মানবাধিকার দিবস পালন করা হয়।`,
        subject: 'আন্তর্জাতিক বিষয়াবলি',
        topic: 'জাতিসংঘ',
        subTopic: 'দিবস',
        sortOrder: 62,
      },

      {
        questionSetId,
        slug: 'nato-kon-dhoroner-jot',
        questionText: 'ন্যাটো (NATO) কোন ধরনের জোট?',
        optionA: 'অর্থনৈতিক',
        optionB: 'রাজনৈতিক',
        optionC: 'সামরিক',
        optionD: 'পরিবেশ',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) সামরিক

NATO (North Atlantic Treaty Organization) ১৯৪৯ সালে গঠিত সামরিক জোট। সমষ্টিগত প্রতিরক্ষা (অনুচ্ছেদ ৫) এর মূল ভিত্তি। এটি শুধু অর্থনৈতিক বা পরিবেশ জোট নয়।`,
        subject: 'আন্তর্জাতিক বিষয়াবলি',
        topic: 'আন্তর্জাতিক সংস্থা',
        subTopic: 'NATO',
        sortOrder: 63,
      },

      {
        questionSetId,
        slug: 'bhumikompo-bibechonay-beshi-jhukipurno',
        questionText: 'ভূমিকম্প বিবেচনায় বেশি ঝুঁকিপূর্ণ?',
        optionA: 'ঢাকা',
        optionB: 'সিলেট',
        optionC: 'চাঁদপুর',
        optionD: 'বরিশাল',
        correctAnswer: 'B',
        explanation: `সঠিক উত্তর: (খ) সিলেট

বাংলাদেশে সিলেট অঞ্চল ডাউকি ফল্ট ও ভারত-মায়ানমার প্লেট সীমান্তের কাছাকাছি হওয়ায় ভূমিকম্পের ঝুঁকি তুলনামূলক বেশি। ঢাকাও ঝুঁকিপূর্ণ নগরী, কিন্তু এই তালিকায় প্রচলিত উত্তর সিলেট।`,
        subject: 'বাংলাদেশ বিষয়াবলি',
        topic: 'দুর্যোগ',
        subTopic: 'ভূমিকম্প',
        sortOrder: 64,
      },

      {
        questionSetId,
        slug: 'july-smriti-jadughor-kobe-udbodhon',
        questionText: 'জুলাই স্মৃতি জাদুঘর কবে উদ্বোধন করা হয়?',
        optionA: '৮ আগস্ট, ২০২৬',
        optionB: '৯ আগস্ট, ২০২৬',
        optionC: '৭ আগস্ট, ২০২৬',
        optionD: '৫ আগস্ট, ২০২৬',
        correctAnswer: 'D',
        explanation: `সঠিক উত্তর: (ঘ) ৫ আগস্ট, ২০২৬

এই প্রশ্নপত্র অনুসারে জুলাই স্মৃতি জাদুঘরের উদ্বোধন ৫ আগস্ট ২০২৬। অন্য তারিখগুলো বিভ্রান্তিকর অপশন।`,
        subject: 'বাংলাদেশ বিষয়াবলি',
        topic: 'সাম্প্রতিক ঘটনা',
        subTopic: 'জাদুঘর',
        sortOrder: 65,
      },

      {
        questionSetId,
        slug: 'japaner-ainshovar-nam-ki',
        questionText: 'জাপানের আইনসভার নাম কী?',
        optionA: 'পার্লামেন্ট',
        optionB: 'নেসেট',
        optionC: 'ডায়েট',
        optionD: 'জাতীয় সংসদ',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) ডায়েট

জাপানের জাতীয় আইনসভার নাম National Diet (কক্কাই)। নেসেট ইসরায়েলের; পার্লামেন্ট/জাতীয় সংসদ সাধারণ বা বাংলাদেশের পরিভাষা।`,
        subject: 'আন্তর্জাতিক বিষয়াবলি',
        topic: 'রাষ্ট্রব্যবস্থা',
        subTopic: 'আইনসভা',
        sortOrder: 66,
      },

      {
        questionSetId,
        slug: 'chhiyattorer-monontor-bangla-koto-sale',
        questionText: 'ছিয়াত্তরের মনন্তর হয়েছিল বাংলা কত সালে?',
        optionA: '১৪৭৬ সালে',
        optionB: '১৩৭৬ সালে',
        optionC: '১২৭৬ সালে',
        optionD: '১১৭৬ সালে',
        correctAnswer: 'D',
        explanation: `সঠিক উত্তর: (ঘ) ১১৭৬ সালে

ছিয়াত্তরের মন্বন্তর ১১৭৬ বঙ্গাব্দে (ইংরেজি ১৭৭০ সালের কাছাকাছি) সংঘটিত দুর্ভিক্ষ। ‘ছিয়াত্তর’ নামটি বাংলা সন ১১৭৬ থেকে। ইংরেজি শতকের সাথে গুলিয়ে ১২৭৬/১৩৭৬ লেখা ভুল।`,
        subject: 'বাংলাদেশ বিষয়াবলি',
        topic: 'ইতিহাস',
        subTopic: 'মন্বন্তর',
        sortOrder: 67,
      },

      {
        questionSetId,
        slug: 'swarno-utpadone-bishwe-shirshosthaniyo-desh',
        questionText: 'স্বর্ণ উৎপাদনে বিশ্বে শীর্ষস্থানীয় দেশ কোনটি?',
        optionA: 'চীন',
        optionB: 'শ্রীলঙ্কা',
        optionC: 'ব্রাজিল',
        optionD: 'দক্ষিণ আফ্রিকা',
        correctAnswer: 'A',
        explanation: `সঠিক উত্তর: (ক) চীন

বর্তমানে বিশ্বে স্বর্ণ উৎপাদনে শীর্ষে চীন। অতীতে দক্ষিণ আফ্রিকা দীর্ঘদিন শীর্ষে ছিল; এখন আর প্রথম নয়। শ্রীলঙ্কা স্বর্ণ উৎপাদনে শীর্ষ নয়।`,
        subject: 'আন্তর্জাতিক বিষয়াবলি',
        topic: 'অর্থনীতি',
        subTopic: 'খনিজ উৎপাদন',
        sortOrder: 68,
      },

      {
        questionSetId,
        slug: 'camp-david-chukti-sompadito-hoyeche',
        questionText: "'ক্যাম্প ডেভিড' চুক্তি সম্পাদিত হয়েছে?",
        optionA: 'ইরান-ইসরাইলের মধ্যে',
        optionB: 'মিশর-ইসরাইলের মধ্যে',
        optionC: 'ইরাক-ইরানের মধ্যে',
        optionD: 'প্যালেস্টাইন-ইসরাইলের মধ্যে',
        correctAnswer: 'B',
        explanation: `সঠিক উত্তর: (খ) মিশর-ইসরাইলের মধ্যে

Camp David Accords (১৯৭৮) মিশর ও ইসরায়েলের মধ্যে যুক্তরাষ্ট্রের মধ্যস্থতায় স্বাক্ষরিত হয় (সাদাত–বেগিন)। এটি ইরান বা ইরাকের চুক্তি নয়।`,
        subject: 'আন্তর্জাতিক বিষয়াবলি',
        topic: 'কূটনীতি',
        subTopic: 'চুক্তি',
        sortOrder: 69,
      },

      {
        questionSetId,
        slug: 'victor-hugo-kon-desher-shahittik',
        questionText: 'ভিক্টর হুগো কোন দেশের সাহিত্যিক?',
        optionA: 'রাশিয়া',
        optionB: 'অস্ট্রিয়া',
        optionC: 'ফ্রান্স',
        optionD: 'হাঙ্গেরি',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) ফ্রান্স

ভিক্টর হুগো ফরাসি ঔপন্যাসিক ও কবি — Les Misérables ও The Hunchback of Notre-Dame-এর লেখক। তিনি রাশিয়া বা হাঙ্গেরির লেখক নন।`,
        subject: 'আন্তর্জাতিক বিষয়াবলি',
        topic: 'সাহিত্য',
        subTopic: 'লেখক পরিচিতি',
        sortOrder: 70,
      },

      {
        questionSetId,
        slug: 'commonwealth-games-koto-bochor-por-por',
        questionText: 'কমনওয়েলথ গেমস অনুষ্ঠিত হয় কত বছর পর পর?',
        optionA: '২ বৎসর',
        optionB: '৫ বৎসর',
        optionC: '৪ বৎসর',
        optionD: '৩ বৎসর',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) ৪ বৎসর

কমনওয়েলথ গেমস সাধারণত প্রতি চার বছর অন্তর অনুষ্ঠিত হয় (অলিম্পিকের মতো চক্রে)। দুই বা তিন বছর নয়।`,
        subject: 'আন্তর্জাতিক বিষয়াবলি',
        topic: 'ক্রীড়া',
        subTopic: 'কমনওয়েলথ গেমস',
        sortOrder: 71,
      },

      {
        questionSetId,
        slug: 'quad-er-purno-nam-ki',
        questionText: 'QUAD এর পূর্ণ নাম কি?',
        optionA: 'Quadmnt Universal Dialogue',
        optionB: 'Quadrilateral Security Dialogue',
        optionC: 'Quarter Asian Dialogue',
        optionD: 'কোনটি নয়',
        correctAnswer: 'B',
        explanation: `সঠিক উত্তর: (খ) Quadrilateral Security Dialogue

QUAD = Quadrilateral Security Dialogue — যুক্তরাষ্ট্র, জাপান, অস্ট্রেলিয়া ও ভারতের কৌশলগত আলোচনা ফোরাম। অন্য পূর্ণরূপগুলো ভুল।`,
        subject: 'আন্তর্জাতিক বিষয়াবলি',
        topic: 'আন্তর্জাতিক সংস্থা',
        subTopic: 'QUAD',
        sortOrder: 72,
      },

      {
        questionSetId,
        slug: 'obivokto-banglar-shesh-mukhyomontri-ke',
        questionText: 'অবিভক্ত বাংলার শেষ মুখ্যমন্ত্রী কে ছিলেন?',
        optionA: 'শেরে-ই-বাংলা এ কে ফজলুল হক',
        optionB: 'মাওলানা আবুল কালাম আজাদ',
        optionC: 'হোসেন শহীদ সোহরাওয়ার্দী',
        optionD: 'পন্ডিত জওহরলাল নেহেরু',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) হোসেন শহীদ সোহরাওয়ার্দী

১৯৪৬ সালে অবিভক্ত বাংলার শেষ মুখ্যমন্ত্রী হোসেন শহীদ সোহরাওয়ার্দী। এ কে ফজলুল হক পূর্ববর্তী সময়ে মুখ্যমন্ত্রী ছিলেন; নেহেরু ভারতের প্রধানমন্ত্রী; আজাদ কেন্দ্রীয় নেতা, বাংলার মুখ্যমন্ত্রী নন।`,
        subject: 'বাংলাদেশ বিষয়াবলি',
        topic: 'ইতিহাস',
        subTopic: 'অবিভক্ত বাংলা',
        sortOrder: 73,
      },

      {
        questionSetId,
        slug: 'european-unioner-sodar-doftor-kothay',
        questionText: 'ইউরোপীয় ইউনিয়নের সদর দপ্তর কোথায় অবস্থিত?',
        optionA: 'প্যারিস',
        optionB: 'লন্ডন',
        optionC: 'রোম',
        optionD: 'ব্রাসেলস',
        correctAnswer: 'D',
        explanation: `সঠিক উত্তর: (ঘ) ব্রাসেলস

ইউরোপীয় ইউনিয়নের প্রধান প্রতিষ্ঠানগুলোর সদর দপ্তর বেলজিয়ামের ব্রাসেলসে। ইউরোপীয় পার্লামেন্টের কিছু অধিবেশন স্ট্রাসবুর্গে হলেও HQ হিসেবে প্রচলিত উত্তর ব্রাসেলস।`,
        subject: 'আন্তর্জাতিক বিষয়াবলি',
        topic: 'আন্তর্জাতিক সংস্থা',
        subTopic: 'ইউরোপীয় ইউনিয়ন',
        sortOrder: 74,
      },

      {
        questionSetId,
        slug: 'wari-bateshwar-kon-jelay',
        questionText: "'উয়ারী-বটেশ্বর' কোন জেলায় অবস্থিত?",
        optionA: 'দিনাজপুর',
        optionB: 'নরসিংদী',
        optionC: 'ঢাকা',
        optionD: 'বগুড়া',
        correctAnswer: 'B',
        explanation: `সঠিক উত্তর: (খ) নরসিংদী

উয়ারী-বটেশ্বর নরসিংদী জেলার একটি গুরুত্বপূর্ণ প্রত্নতাত্ত্বিক স্থান — প্রাচীন নগর সভ্যতার নিদর্শন। মহাস্থানগড় বগুড়ায়; এ দুটিকে গুলিয়ে ফেলা যায় না।`,
        subject: 'বাংলাদেশ বিষয়াবলি',
        topic: 'প্রত্নতত্ত্ব',
        subTopic: 'উয়ারী-বটেশ্বর',
        sortOrder: 75,
      },

      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // বিষয়: গণিত ও সাধারণ বিজ্ঞান — প্রশ্ন ৭৬–৯২
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

      {
        questionSetId,
        slug: '45-degree-koner-sompurak-kon',
        questionText: '৪৫° কোণের সম্পূরক কোণ কোনটি?',
        optionA: '৪৫°',
        optionB: '৯০°',
        optionC: '১৩৫°',
        optionD: '১৮০°',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) ১৩৫°

সম্পূরক কোণ: দুটি কোণের সমষ্টি ১৮০°। অতএব ৪৫°-এর সম্পূরক = ১৮০° − ৪৫° = ১৩৫°।

পূরক কোণের সমষ্টি ৯০° — তাহলে ৪৫°-এর পূরকও ৪৫° হতো; এখানে সম্পূরক চাওয়া হয়েছে।`,
        subject: 'গণিত',
        topic: 'জ্যামিতি',
        subTopic: 'কোণ',
        sortOrder: 76,
      },

      {
        questionSetId,
        slug: 'jodi-a-minus-1-over-a-equals-2-hole-a4-plus-1-over-a4',
        questionText: 'যদি a - 1/a = 2 হয়, তবে a⁴ + 1/a⁴ = কত?',
        optionA: '৩৬',
        optionB: '৩২',
        optionC: '৩৪',
        optionD: '৪০',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) ৩৪

a − 1/a = 2
উভয় পক্ষ বর্গ: a² + 1/a² − 2 = 4 ⇒ a² + 1/a² = 6
আবার বর্গ: (a² + 1/a²)² = a⁴ + 2 + 1/a⁴ = ৩৬
⇒ a⁴ + 1/a⁴ = ৩৬ − ২ = ৩৪`,
        subject: 'গণিত',
        topic: 'বীজগণিত',
        subTopic: 'সূচক ও সমীকরণ',
        sortOrder: 77,
      },

      {
        questionSetId,
        slug: 'barsik-shotkora-koto-hare-sude-2000-taka-3-bochore-2300',
        questionText: 'বার্ষিক শতকরা কত হার সুদে ২০০০ টাকা ৩ বছরের সুদে-আসলে ২৩০০ টাকা হয়?',
        optionA: '১৫%',
        optionB: '১০%',
        optionC: '৭.৫%',
        optionD: '৫%',
        correctAnswer: 'D',
        explanation: `সঠিক উত্তর: (ঘ) ৫%

সরল সুদ: সুদ = ২৩০০ − ২০০০ = ৩০০ টাকা
সূত্র: I = (P × r × t) / 100
৩০০ = (২০০০ × r × ৩) / ১০০
৩০০ = ৬০r ⇒ r = ৫

অর্থাৎ বার্ষিক ৫% সরল সুদ।`,
        subject: 'গণিত',
        topic: 'পাটিগণিত',
        subTopic: 'সরল সুদ',
        sortOrder: 78,
      },

      {
        questionSetId,
        slug: 'konti-moulik-songkha-59',
        questionText: 'কোনটি মৌলিক সংখ্যা?',
        optionA: '৪৯',
        optionB: '৫১',
        optionC: '৫৭',
        optionD: '৫৯',
        correctAnswer: 'D',
        explanation: `সঠিক উত্তর: (ঘ) ৫৯

৫৯-কে ১ ও নিজে ছাড়া অন্য পূর্ণসংখ্যা দিয়ে ভাগ যায় না।
৪৯ = ৭×৭, ৫১ = ৩×১৭, ৫৭ = ৩×১৯ — সব যৌগিক।`,
        subject: 'গণিত',
        topic: 'সংখ্যাতত্ত্ব',
        subTopic: 'মৌলিক সংখ্যা',
        sortOrder: 79,
      },

      {
        questionSetId,
        slug: 'jodi-0-less-x-less-1-hole-konti-boro',
        questionText: 'যদি 0 < x < 1 হয় তাহলে নিচের কোনটি অপর তিনটি হতে বড়?',
        optionA: '1/x',
        optionB: '1/x²',
        optionC: 'x²',
        optionD: 'x³',
        correctAnswer: 'B',
        explanation: `সঠিক উত্তর: (খ) 1/x²

০ ও ১-এর মধ্যে x হলে x³ < x² < x < 1, আর 1/x > 1 এবং 1/x² আরও বড় (বর্গ করে হর আরও ছোট হয়)। উদাহরণ x = 0.5: x³=0.125, x²=0.25, 1/x=2, 1/x²=4 — সবচেয়ে বড় 1/x²।`,
        subject: 'গণিত',
        topic: 'বীজগণিত',
        subTopic: 'অসমতা',
        sortOrder: 80,
      },

      {
        questionSetId,
        slug: 'roktoshunnota-bolte-ki-bojhay',
        questionText: 'রক্তশূন্যতা বলতে কী বোঝায়?',
        optionA: 'রক্তে হিমোগ্লোবিন হ্রাস পাওয়া',
        optionB: 'রক্তরসের পরিমাণ কমে যাওয়া',
        optionC: 'রক্তের পরিমাণ কমে যাওয়া',
        optionD: 'রক্তে অণুচক্রিকার পরিমাণ কমে যাওয়া',
        correctAnswer: 'A',
        explanation: `সঠিক উত্তর: (ক) রক্তে হিমোগ্লোবিন হ্রাস পাওয়া

অ্যানিমিয়া/রক্তশূন্যতা মূলত রক্তে হিমোগ্লোবিন বা লোহিত কণিকার কার্যকর পরিমাণ কমে যাওয়া। অণুচক্রিকা কমা = থ্রম্বোসাইটোপেনিয়া; শুধু প্লাজমা কমা ভিন্ন অবস্থা।`,
        subject: 'সাধারণ বিজ্ঞান',
        topic: 'জীববিজ্ঞান',
        subTopic: 'রক্ত',
        sortOrder: 81,
      },

      {
        questionSetId,
        slug: 'stephen-hawking-chilen-bishwer-ekjon-bikhyato',
        questionText: 'স্টিফেন হকিং ছিলেন বিশ্বের একজন বিখ্যাত-',
        optionA: 'কবি',
        optionB: 'রসায়নবিদ',
        optionC: 'পদার্থবিদ',
        optionD: 'দার্শনিক',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) পদার্থবিদ

স্টিফেন হকিং তাত্ত্বিক পদার্থবিদ ও মহাজাগতিক বিজ্ঞানী — কৃষ্ণগহ্বর, মহাবিশ্বের উৎপত্তি ও A Brief History of Time-এর জন্য বিখ্যাত। তিনি কবি বা রসায়নবিদ নন।`,
        subject: 'সাধারণ বিজ্ঞান',
        topic: 'বিজ্ঞানী পরিচিতি',
        subTopic: 'পদার্থবিদ্যা',
        sortOrder: 82,
      },

      {
        questionSetId,
        slug: 'ek-ghonfut-lohar-ojon-koto',
        questionText: 'এক ঘনফুট লোহার ওজন কত?',
        optionA: '100lb',
        optionB: '200lb',
        optionC: '400lb',
        optionD: '490lb',
        correctAnswer: 'D',
        explanation: `সঠিক উত্তর: (ঘ) 490lb

লোহার ঘনত্ব প্রায় ৪৯০ lb/ft³ (প্রায় ৭.৮ g/cm³-এর ইম্পেরিয়াল সমতুল্য)। চাকরির গণিত/সাধারণ জ্ঞানে প্রচলিত মান ৪৯০ পাউন্ড প্রতি ঘনফুট।`,
        subject: 'সাধারণ বিজ্ঞান',
        topic: 'পদার্থবিজ্ঞান',
        subTopic: 'ঘনত্ব',
        sortOrder: 83,
      },

      {
        questionSetId,
        slug: 'somkoni-tribhujer-3-o-4-cm-hole-otibhuj',
        questionText:
          'সমকোণী ত্রিভুজের সমকোণ সংলগ্ন ২ বাহুর দৈর্ঘ্য যথাক্রমে ৩ সে.মি. ও ৪ সে.মি. হলে অতিভুজের দৈর্ঘ্য কত?',
        optionA: '১২ সে.মি.',
        optionB: '৭ সে.মি.',
        optionC: '৬ সে.মি.',
        optionD: '৫ সে.মি.',
        correctAnswer: 'D',
        explanation: `সঠিক উত্তর: (ঘ) ৫ সে.মি.

পিথাগোরাস: অতিভুজ² = ৩² + ৪² = ৯ + ১৬ = ২৫ ⇒ অতিভুজ = ৫ সে.মি। এটি ক্লাসিক ৩-৪-৫ সমকোণী ত্রিভুজ। ৩+৪=৭ যোগফল, গুণফল ১২ — অতিভুজ নয়।`,
        subject: 'গণিত',
        topic: 'জ্যামিতি',
        subTopic: 'পিথাগোরাস',
        sortOrder: 84,
      },

      {
        questionSetId,
        slug: 'x2-minus-5x-minus-16250-er-utpadok',
        questionText: 'x² - 5x - 16250 এর উৎপাদক হবে-',
        optionA: '(x - 125)(x + 120)',
        optionB: '(x + 130)(x - 125)',
        optionC: '(x + 125)(x - 120)',
        optionD: '(x - 130)(x + 125)',
        correctAnswer: 'D',
        explanation: `সঠিক উত্তর: (ঘ) (x - 130)(x + 125)

দুটি সংখ্যা যার গুণফল −১৬২৫০ এবং যোগফল −৫: −১৩০ ও +১২৫।
(−১৩০)×১২৫ = −১৬২৫০ এবং −১৩০+১২৫ = −৫।
যাচাই: (x − ১৩০)(x + ১২৫) = x² + (১২৫−১৩০)x − ১৬২৫০ = x² − ৫x − ১৬২৫০।`,
        subject: 'গণিত',
        topic: 'বীজগণিত',
        subTopic: 'উৎপাদকে বিশ্লেষণ',
        sortOrder: 85,
      },

      {
        questionSetId,
        slug: 'pita-o-putrer-boyos-somosti-64-onter-26',
        questionText:
          'পিতা ও পুত্রের বয়সের সমষ্টি ৬৪ বৎসর এবং পিতা ও পুত্রের বয়সের অন্তর ২৬ বৎসর হলে পিতা ও পুত্রের বয়স আলাদাভাবে কত বৎসর হবে?',
        optionA: '৪৪ ও ২০',
        optionB: '৪৭ ও ১৯',
        optionC: '৪৬ ও ১৮',
        optionD: '৪৫ ও ১৯',
        correctAnswer: 'D',
        explanation: `সঠিক উত্তর: (ঘ) ৪৫ ও ১৯

ধরি পিতা x, পুত্র y।
x + y = ৬৪, x − y = ২৬
যোগ: ২x = ৯০ ⇒ x = ৪৫; y = ৬৪ − ৪৫ = ১৯।
পরীক্ষা: ৪৫−১৯=২৬ ✓`,
        subject: 'গণিত',
        topic: 'পাটিগণিত',
        subTopic: 'বয়স',
        sortOrder: 86,
      },

      {
        questionSetId,
        slug: '10-takay-1-dojon-lebu-2-hali-10-takay-bikroy-labh',
        questionText:
          '১০ টাকায় ১ ডজন লেবু ক্রয় করে ২ হালি লেবু ১০ টাকায় বিক্রয় করলে কত শতাংশ লাভ হবে?',
        optionA: '২০%',
        optionB: '২৫%',
        optionC: '৪৫%',
        optionD: '৫০%',
        correctAnswer: 'D',
        explanation: `সঠিক উত্তর: (ঘ) ৫০%

১ ডজন = ১২টি, ক্রয়মূল্য ১০ টাকা।
২ হালি = ৮টি (১ হালি = ৪টি)।
৮টির ক্রয়মূল্য = ১০ × (৮/১২) = ২০/৩ টাকা।
বিক্রয়মূল্য = ১০ টাকা। লাভ = ১০ − ২০/৩ = ১০/৩।
লাভ% = [(১০/৩) ÷ (২০/৩)] × ১০০ = ৫০%।`,
        subject: 'গণিত',
        topic: 'পাটিগণিত',
        subTopic: 'লাভ-ক্ষতি',
        sortOrder: 87,
      },

      {
        questionSetId,
        slug: 'saarc-kokhon-protisthito-hoy',
        questionText: 'SAARC কখন প্রতিষ্ঠিত হয়?',
        optionA: '১৯৮৪',
        optionB: '১৯৮৬',
        optionC: '১৯৮৫',
        optionD: '১৯৮৭',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) ১৯৮৫

SAARC (দক্ষিণ এশীয় আঞ্চলিক সহযোগিতা সংস্থা) ১৯৮৫ সালে ঢাকায় প্রতিষ্ঠিত হয়। প্রথম শীর্ষ সম্মেলনও ঢাকায় অনুষ্ঠিত হয়।`,
        subject: 'আন্তর্জাতিক বিষয়াবলি',
        topic: 'আন্তর্জাতিক সংস্থা',
        subTopic: 'SAARC',
        sortOrder: 88,
      },

      {
        questionSetId,
        slug: 'manobdehe-rokte-sweto-o-lohit-konikar-onupat',
        questionText: 'মানবদেহে রক্তে শ্বেত কণিকা ও লোহিত কণিকার অনুপাত',
        optionA: '৪০০ : ৫০০',
        optionB: '৫ : ১০০',
        optionC: '১ : ৭০০',
        optionD: '২ : ১০০',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) ১ : ৭০০

স্বাভাবিক রক্তে লোহিত কণিকা প্রায় ৫০ লক্ষ/μL, শ্বেত কণিকা প্রায় ৭০০০/μL — অনুপাত প্রায় ১ : ৭০০। অন্য অনুপাতগুলো এই মানের কাছাকাছি নয়।`,
        subject: 'সাধারণ বিজ্ঞান',
        topic: 'জীববিজ্ঞান',
        subTopic: 'রক্তকণিকা',
        sortOrder: 89,
      },

      {
        questionSetId,
        slug: 'kon-podarthoti-choumbok-podartho-noy',
        questionText: 'কোন পদার্থটি চৌম্বক পদার্থ নয়?',
        optionA: 'কাঁচা লোহা',
        optionB: 'ইস্পাত',
        optionC: 'অ্যালুমিনিয়াম',
        optionD: 'কোবাল্ট',
        correctAnswer: 'C',
        explanation: `সঠিক উত্তর: (গ) অ্যালুমিনিয়াম

লোহা, ইস্পাত, কোবাল্ট, নিকেল ফেরোম্যাগনেটিক। অ্যালুমিনিয়াম প্যারাম্যাগনেটিক/সাধারণ অর্থে চৌম্বক পদার্থ হিসেবে গণ্য হয় না — স্থায়ী চুম্বক হয় না।`,
        subject: 'সাধারণ বিজ্ঞান',
        topic: 'পদার্থবিজ্ঞান',
        subTopic: 'চুম্বকত্ব',
        sortOrder: 90,
      },

      {
        questionSetId,
        slug: 'konti-greenhouse-gas-noy',
        questionText: 'কোনটি গ্রিনহাউজ গ্যাস নয়?',
        optionA: 'জলীয় বাষ্প',
        optionB: 'কার্বন ডাই অক্সাইড',
        optionC: 'মিথেন',
        optionD: 'নাইট্রিক অক্সাইড',
        correctAnswer: 'D',
        explanation: `সঠিক উত্তর: (ঘ) নাইট্রিক অক্সাইড

CO₂, CH₄ ও জলীয় বাষ্প প্রধান গ্রিনহাউজ গ্যাস। নাইট্রাস অক্সাইড (N₂O) গ্রিনহাউজ গ্যাস; নাইট্রিক অক্সাইড (NO) মূলত বায়ুদূষক, গ্রিনহাউজ গ্যাসের তালিকায় সাধারণত ধরা হয় না। প্রশ্নপত্রে নাইট্রিক অক্সাইডকেই বাদ দেওয়া উত্তর।`,
        subject: 'সাধারণ বিজ্ঞান',
        topic: 'পরিবেশ বিজ্ঞান',
        subTopic: 'গ্রিনহাউজ গ্যাস',
        sortOrder: 91,
      },

      {
        questionSetId,
        slug: 'koto-degree-celsius-poromshunno-tapmatra',
        questionText: 'কত ডিগ্রী সেলসিয়াস তাপমাত্রাকে পরমশূন্য তাপমাত্রা বলা হয়?',
        optionA: '০° সেলসিয়াস',
        optionB: '-২৭৩° সেলসিয়াস',
        optionC: '-২৭১° সেলসিয়াস',
        optionD: '-৪° সেলসিয়াস',
        correctAnswer: 'B',
        explanation: `সঠিক উত্তর: (খ) -২৭৩° সেলসিয়াস

পরম শূন্য ≈ −২৭৩°C (সঠিকতর মান −২৭৩.১৫°C বা ০ কেলভিন)। ০°C বরফের বিন্দু; −২৭১ বা −৪ ভুল মান।`,
        subject: 'সাধারণ বিজ্ঞান',
        topic: 'পদার্থবিজ্ঞান',
        subTopic: 'তাপমাত্রা',
        sortOrder: 92,
      },
    ],

    /*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
সারসংক্ষেপ:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
মোট প্রশ্ন সংগৃহীত: ৯২টি (মূল ১০০ নম্বরের সেট;
প্রশ্ন ৯৩–১০০ উৎস পাতায় অনুপস্থিত)

বিষয় অনুযায়ী বিভাজন:
  বাংলা ভাষা ও সাহিত্য: ২৫টি (প্রশ্ন ১–২৫)
  ইংরেজি: ২৫টি (প্রশ্ন ২৬–৫০)
  বাংলাদেশ ও আন্তর্জাতিক বিষয়াবলি / সাধারণ জ্ঞান: ২৫টি (প্রশ্ন ৫১–৭৫)
  গণিত ও সাধারণ বিজ্ঞান: ১৭টি (প্রশ্ন ৭৬–৯২)

পরীক্ষা: বাংলাদেশ কর্মচারী কল্যাণ বোর্ড — পদের নাম: সহকারী পরিচালক
পরীক্ষার তারিখ: ২১.০৮.২০২৬
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/

    skipDuplicates: true,
  });
  console.log(
    '✓ Recent Job Solution (বাংলাদেশ কর্মচারী কল্যাণ বোর্ড — সহকারী পরিচালক) questions seeded',
  );
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
