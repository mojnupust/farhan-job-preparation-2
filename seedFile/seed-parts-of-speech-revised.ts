import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
// TODO: replace with the actual QuestionSet id for this exam before running
const questionSetId = "REPLACE_QUESTION_SET_ID";

async function main() {
  await prisma.question.createMany({
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Filtered by keyword(s): noun, pronoun, adjective, adverb, verb, part of speech
    // Topic: Parts of Speech (Noun, Pronoun, Adjective, Adverb, Verb)
    // Revision notes:
    //   - All explanations rewritten in the writer's own words (no dictionary text
    //     copied verbatim) and cleaned of leftover OCR/duplicate text.
    //   - Two questions that previously had no explanation (sortOrder 7 and 37) now have one.
    //   - Five duplicate slugs from the source file were renamed to keep every slug unique:
    //       the-adjective-form-of      -> adjective-form-of-ability / adjective-form-of-diverge
    //       choose-the-noun-form       -> noun-form-of-dismiss / noun-form-of-approve
    //       choose-the-noun-form-2     -> noun-form-of-elicit / noun-form-of-strong
    //       choose-the-adjective-form  -> adjective-form-of-pathos / adjective-form-of-glory
    //       which-of-the-following-2   -> reflexive-pronoun-itself / reciprocal-pronoun-each-other
    //   - 5 new original questions added (sortOrder 48-52), covering Proper Noun,
    //     Distributive Pronoun, Adjective formation, Adverb of Degree, and Verb formation —
    //     gaps in the original 47 that are commonly repeated in BD govt. job exams.
    // মোট প্রশ্ন (Parts of Speech - Noun, Pronoun, Adjective, Adverb, Verb): 52টি
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    data: [
      {
        questionSetId,
        slug: "lets-have-a-look",
        questionText: "Let’s have a look at the report. Here, what part of speech is \"look\"?",
        optionA: "Verb",
        optionB: "Noun",
        optionC: "Preposition",
        optionD: "Adjective",
        correctAnswer: "B",
        explanation: `সঠিক উত্তর: Noun।
বাক্যে "at" (preposition) এবং তার আগে article "a" বসেছে। Article বা Preposition-এর পরে যে শব্দ বসে তা সাধারণত Noun হিসেবেই কাজ করে। এছাড়া "look" শব্দটি এখানে verb 'have' এর object হিসেবে বসেছে, যা আরও নিশ্চিত করে এটি একটি Noun।

শব্দ পরিচিতি:
• Look (Noun/Verb) — বাংলা অর্থ: দৃষ্টি, তাকানো; নির্দিষ্ট দিকে চোখ ফেরানো অর্থে verb হিসেবেও ব্যবহৃত হয়।

মনে রাখার কৌশল: Article/Preposition-এর পরপর যে শব্দ বসে, তা সাধারণত Noun — এই নিয়মটি এই ধরনের প্রশ্নে খুব কাজে লাগে।`,
        subject: "",
        topic: "",
        subTopic: "",
        sortOrder: 1,
      },

      {
        questionSetId,
        slug: "what-is-the-verb",
        questionText: "What is the verb of the word 'Danger'?",
        optionA: "Danger",
        optionB: "Endanger",
        optionC: "Dangerous",
        optionD: "Dangerously",
        correctAnswer: "B",
        explanation: `সঠিক উত্তর: Endanger।
Danger (বিপদ) শব্দের সাথে 'en-' prefix যুক্ত হয়ে verb 'Endanger' গঠিত হয়েছে, যার অর্থ কাউকে বিপদে ফেলা বা বিপন্ন করা।

শব্দ পরিচিতি:
• Danger (Noun) — বিপদ, ঝুঁকি, আশঙ্কা।
• Endanger (Verb) — বিপদে ফেলা, বিপন্ন করা।
• Dangerous (Adjective) — বিপজ্জনক।
• Dangerously (Adverb) — বিপজ্জনকভাবে।

একই মূল শব্দ থেকে এভাবে Noun, Verb, Adjective ও Adverb — চারটি রূপ তৈরি হয়, যা পরীক্ষায় প্রায়ই জিজ্ঞাসা করা হয়।`,
        subject: "",
        topic: "",
        subTopic: "",
        sortOrder: 2,
      },

      {
        questionSetId,
        slug: "choose-the-correct-adjective",
        questionText: "Choose the correct adjective derived from the word \"fool\".",
        optionA: "Fool",
        optionB: "Foolish",
        optionC: "Befool",
        optionD: "Foolery",
        correctAnswer: "B",
        explanation: `সঠিক উত্তর: Foolish।
'Fool' (Noun)-এর সাথে '-ish' প্রত্যয় যুক্ত হয়ে adjective 'Foolish' গঠিত হয়েছে, যার অর্থ বিচার-বুদ্ধিহীন বা বোকামিপূর্ণ আচরণ।

শব্দ পরিচিতি:
• Fool (Noun) — বোকা, মূর্খ ব্যক্তি।
• Foolish (Adjective) — বোকামিপূর্ণ, অবিবেচক।
• Befool (Verb) — বোকা বানানো।
• Foolery (Noun) — বোকামি, মূর্খতা।`,
        subject: "",
        topic: "",
        subTopic: "",
        sortOrder: 3,
      },

      {
        questionSetId,
        slug: "what-is-the-verb-2",
        questionText: "What is the verb form of \"Ably\"?",
        optionA: "Enable",
        optionB: "Ability",
        optionC: "Abled",
        optionD: "Able",
        correctAnswer: "A",
        explanation: `সঠিক উত্তর: Enable।
Ably হলো Able-এর adverb রূপ। এই শব্দগুচ্ছের verb রূপ হলো Enable, যার অর্থ কাউকে কোনো কাজ করতে সক্ষম করে তোলা।

শব্দ পরিচিতি:
• Enable (Verb) — সক্ষম করা, সুযোগ করে দেওয়া।
• Ability (Noun) — সামর্থ্য, দক্ষতা।
• Able (Adjective) — সমর্থ, দক্ষ।
• Ably (Adverb) — দক্ষতার সাথে।

লক্ষণীয়: 'Abled' বলে ইংরেজিতে প্রচলিত কোনো শব্দ নেই, তাই এটি উত্তর হতে পারে না।`,
        subject: "",
        topic: "",
        subTopic: "",
        sortOrder: 4,
      },

      {
        questionSetId,
        slug: "rima-wore-a-beautiful",
        questionText: "Rima wore a beautiful dress at the school party. Here, the underlined word is a/ an -",
        optionA: "Noun",
        optionB: "Verb",
        optionC: "Preposition",
        optionD: "Adjective",
        correctAnswer: "D",
        explanation: `সঠিক উত্তর: Adjective।
বাক্যে 'dress' (Noun)-এর ঠিক আগে বসে 'beautiful' শব্দটি তার গুণ (পোশাকটি কেমন) প্রকাশ করছে। Noun বা Pronoun-এর দোষ, গুণ, অবস্থা বা বৈশিষ্ট্য বোঝাতে যে শব্দ বসে, তাকে Adjective বলে। তাই এই বাক্যে 'beautiful' একটি Adjective।

শব্দ পরিচিতি:
• Beautiful (Adjective) — সুন্দর, মনোরম; দেখতে বা অনুভব করতে ভালো লাগে এমন কিছু বোঝাতে ব্যবহৃত হয়।`,
        subject: "",
        topic: "",
        subTopic: "",
        sortOrder: 5,
      },

      {
        questionSetId,
        slug: "which-is-the-verb",
        questionText: "Which is the verb of the word 'beautiful'?",
        optionA: "Beautify",
        optionB: "Beautiful",
        optionC: "Beauty",
        optionD: "Beautifully",
        correctAnswer: "A",
        explanation: `সঠিক উত্তর: Beautify।
'Beautiful' adjective-এর শেষের '-ful' বাদ দিয়ে '-ify' যুক্ত করলে verb 'Beautify' পাওয়া যায়, অর্থ কোনো কিছুকে সুন্দর করে তোলা।

শব্দ পরিচিতি:
• Beautify (Verb) — সুন্দর করা।
• Beautiful (Adjective) — সুন্দর, চমৎকার।
• Beauty (Noun) — সৌন্দর্য।
• Beautifully (Adverb) — সুন্দরভাবে।`,
        subject: "",
        topic: "",
        subTopic: "",
        sortOrder: 6,
      },

      {
        questionSetId,
        slug: "identify-the-reciprocal-pronoun",
        questionText: "Identify the Reciprocal Pronoun.",
        optionA: "Nothing",
        optionB: "One",
        optionC: "Each other",
        optionD: "Another",
        correctAnswer: "C",
        explanation: `সঠিক উত্তর: Each other।
দুই বা ততোধিক পক্ষের মধ্যে পারস্পরিক সম্পর্ক বোঝাতে যে pronoun ব্যবহৃত হয়, তাকে Reciprocal pronoun বলে। ইংরেজিতে মূলত দুটি Reciprocal pronoun আছে — each other এবং one another।

• Each other সাধারণত দু'জনের মধ্যে পারস্পরিক সম্পর্ক বোঝাতে ব্যবহৃত হয় (যেমন: The two friends helped each other)।
• One another সাধারণত দুইয়ের বেশি জনের ক্ষেত্রে ব্যবহৃত হয় (যেমন: The players encouraged one another)।

Pronoun মোট ৮ প্রকার: Personal, Demonstrative, Interrogative, Relative, Indefinite, Distributive, Reflexive ও Reciprocal pronoun। এখানে বাকি অপশন (Nothing, One, Another) এই তালিকার কোনোটিতেই পড়ে না, তাই সঠিক উত্তর 'Each other'।`,
        subject: "",
        topic: "",
        subTopic: "",
        sortOrder: 7,
      },

      {
        questionSetId,
        slug: "the-word-sometimes-is",
        questionText: "The word 'sometimes' is usually used in a sentence as an adverb of -",
        optionA: "time",
        optionB: "place",
        optionC: "manner",
        optionD: "frequency",
        correctAnswer: "D",
        explanation: `সঠিক উত্তর: Frequency।
'Sometimes' (মাঝে মাঝে) শব্দটি বোঝাচ্ছে কোনো কাজ কতবার বা কত ঘনঘন ঘটে — এই ধরনের adverb-কে Adverb of frequency বলে। এই শ্রেণির অন্যান্য শব্দ: always, usually, often, rarely, never ইত্যাদি।

তুলনা করে দেখুন:
• Adverb of time — কাজটি ঠিক কখন ঘটেছে বোঝায় ('When' দিয়ে প্রশ্ন করলে উত্তর পাওয়া যায়)।
• Adverb of place — কোথায় ঘটেছে বোঝায় ('Where' দিয়ে প্রশ্ন করলে উত্তর পাওয়া যায়)।
• Adverb of manner — কীভাবে ঘটেছে বোঝায় ('How' দিয়ে প্রশ্ন করলে উত্তর পাওয়া যায়)।

যেহেতু 'sometimes' 'কতবার' প্রশ্নের উত্তর দেয়, তাই এটি Adverb of frequency।`,
        subject: "",
        topic: "",
        subTopic: "",
        sortOrder: 8,
      },

      {
        questionSetId,
        slug: "read-the-following-sentence",
        questionText: "Read the following sentence and find out the adjective: This is his book.",
        optionA: "this",
        optionB: "is",
        optionC: "his",
        optionD: "book",
        correctAnswer: "C",
        explanation: `সঠিক উত্তর: his।
My, our, his, her — এই শব্দগুলো সাধারণত Possessive pronoun হিসেবে পরিচিত। কিন্তু এদের ঠিক পরে যখন কোনো Noun বসে, তখন এরা সেই Noun-কে বিশেষায়িত করে বলে Possessive adjective হিসেবে গণ্য হয়। এখানে 'his'-এর ঠিক পরেই noun 'book' বসেছে, তাই এই বাক্যে 'his' একটি Possessive adjective।

সহজে মনে রাখার উপায়: Possessive pronoun-এর পরে আলাদা কোনো Noun বসে না (যেমন: This book is his), কিন্তু Possessive adjective-এর ঠিক পরে সবসময় একটি Noun বসে (যেমন: This is his book)।`,
        subject: "",
        topic: "",
        subTopic: "",
        sortOrder: 9,
      },

      {
        questionSetId,
        slug: "the-boy-walks-slowly",
        questionText: "\"The boy walks slowly.\" Here, the word 'slowly' is an adverb of:",
        optionA: "frequency",
        optionB: "place",
        optionC: "manner",
        optionD: "time",
        correctAnswer: "C",
        explanation: `সঠিক উত্তর: Manner।
'Slowly' verb 'walks'-কে বর্ণনা করছে যে কাজটি কীভাবে (কেমনভাবে) হচ্ছে — এই ধরনের adverb-কে Adverb of manner বলে। Manner-এর অধিকাংশ adverb-ই adjective-এর সাথে '-ly' প্রত্যয় যোগে গঠিত হয়, যেমন: clearly, quickly, badly, slowly।

তুলনায়, Adverb of time কখন, Adverb of place কোথায়, আর Adverb of frequency কতবার — এসব প্রশ্নের উত্তর দেয়। এখানে প্রশ্ন হলো 'কীভাবে হাঁটে', তাই উত্তর Adverb of manner।`,
        subject: "",
        topic: "",
        subTopic: "",
        sortOrder: 10,
      },

      {
        questionSetId,
        slug: "which-one-is-an",
        questionText: "Which one is an Indefinite pronoun from the given options?",
        optionA: "We",
        optionB: "That",
        optionC: "Myself",
        optionD: "Some",
        correctAnswer: "D",
        explanation: `সঠিক উত্তর: Some।
যে Pronoun দ্বারা নির্দিষ্ট কোনো ব্যক্তি বা বস্তু না বুঝিয়ে অনির্দিষ্টভাবে কিছু বোঝানো হয়, তাকে Indefinite pronoun বলে। এই শ্রেণির শব্দের মধ্যে আছে one, some, any, all, many, everyone, nobody ইত্যাদি।

Pronoun-এর ৮টি প্রকার: Personal, Demonstrative, Interrogative, Relative, Indefinite, Distributive, Reflexive ও Reciprocal। এখানে We (Personal), That (Demonstrative) এবং Myself (Reflexive) — এই তিনটি ভিন্ন শ্রেণির, তাই সঠিক উত্তর 'Some'।`,
        subject: "",
        topic: "",
        subTopic: "",
        sortOrder: 11,
      },

      {
        questionSetId,
        slug: "which-kind-of-noun",
        questionText: "Which kind of noun is 'wisdom'?",
        optionA: "Abstract noun",
        optionB: "Material noun",
        optionC: "Collective noun",
        optionD: "None of these",
        correctAnswer: "A",
        explanation: `সঠিক উত্তর: Abstract noun।
যে Noun দিয়ে কোনো গুণ, ভাব বা ধারণা বোঝায় — যাকে স্পর্শ করা, দেখা বা শোনা যায় না, শুধু মনে মনে অনুভব বা কল্পনা করা যায় — তাকে Abstract noun বলে। 'Wisdom' (প্রজ্ঞা) এমনই একটি ভাববাচক গুণ, এর কোনো ভৌত অস্তিত্ব নেই, তাই এটি Abstract noun।`,
        subject: "",
        topic: "",
        subTopic: "",
        sortOrder: 12,
      },

      {
        questionSetId,
        slug: "adjective-form-of-pathos",
        questionText: "Choose the adjective form of 'Pathos'.",
        optionA: "Pathology",
        optionB: "Pathos",
        optionC: "Pathetic",
        optionD: "Pathologize",
        correctAnswer: "C",
        explanation: `সঠিক উত্তর: Pathetic।
Pathos একটি Noun, যার অর্থ করুণ রস — এমন কিছু যা মানুষের মনে সহানুভূতি বা করুণার অনুভূতি জাগায়। এর adjective রূপ হলো Pathetic, যা দিয়ে কোনো কিছুর করুণ বা মর্মস্পর্শী বৈশিষ্ট্য বোঝানো হয়।

শব্দ পরিচিতি:
• Pathos (Noun) — করুণ রস।
• Pathetic (Adjective) — করুণ, মর্মস্পর্শী।

লক্ষণীয়: বাকি দুটি অপশন সম্পূর্ণ ভিন্ন অর্থের শব্দ — Pathology মানে রোগতত্ত্ব (রোগ-সংক্রান্ত বিজ্ঞান), আর Pathologize মানে কোনো কিছুকে অন্যায়ভাবে সমস্যা বা রোগ হিসেবে চিহ্নিত করা।`,
        subject: "",
        topic: "",
        subTopic: "",
        sortOrder: 13,
      },

      {
        questionSetId,
        slug: "which-of-the-given",
        questionText: "Which of the given options is an example of a 'Quantitive adjective'?",
        optionA: "Intelligent",
        optionB: "Strong",
        optionC: "Sufficient",
        optionD: "My",
        correctAnswer: "C",
        explanation: `সঠিক উত্তর: Sufficient।
যে Adjective দিয়ে কোনো uncountable noun-এর পরিমাণ বোঝানো হয়, তাকে Quantitative adjective বলে; যেমন: much, enough, whole, sufficient, half ইত্যাদি। এখানে 'Sufficient' (পর্যাপ্ত) একটি Quantitative adjective।

বাকি অপশনগুলো ভিন্ন শ্রেণির — Intelligent ও Strong গুণবাচক (Descriptive) adjective, আর My একটি Pronominal (সর্বনামজাত) adjective।`,
        subject: "",
        topic: "",
        subTopic: "",
        sortOrder: 14,
      },

      {
        questionSetId,
        slug: "adjective-form-of-stigma",
        questionText: "Adjective form of 'Stigma' is -",
        optionA: "Stigmata",
        optionB: "Stigma",
        optionC: "Stigmatic",
        optionD: "Stigmy",
        correctAnswer: "C",
        explanation: `সঠিক উত্তর: Stigmatic।
Stigma (Noun)-এর অর্থ কলঙ্ক বা লজ্জার চিহ্ন। এর সাথে '-ic' প্রত্যয় যুক্ত হয়ে adjective 'Stigmatic' গঠিত হয়েছে, অর্থ কলঙ্কচিহ্নিত বা দাগযুক্ত।

শব্দ পরিচিতি:
• Stigma (Noun) — কলঙ্ক, লজ্জার চিহ্ন।
• Stigmatic (Adjective) — কলঙ্কচিহ্নিত।
• Stigmata (Noun, বহুবচন) — একাধিক কলঙ্কচিহ্ন; বিশেষভাবে ধর্মীয় প্রেক্ষাপটে ব্যবহৃত হয়।

লক্ষণীয়: 'Stigmy' নামে ইংরেজিতে কোনো প্রচলিত শব্দ নেই।`,
        subject: "",
        topic: "",
        subTopic: "",
        sortOrder: 15,
      },

      {
        questionSetId,
        slug: "adjective-form-of-ability",
        questionText: "The adjective form of the word \"ability\" is -",
        optionA: "Capability",
        optionB: "Inability",
        optionC: "Able",
        optionD: "Ably",
        correctAnswer: "C",
        explanation: `সঠিক উত্তর: Able।
Ability (Noun)-এর অর্থ সামর্থ্য বা যোগ্যতা। এর adjective রূপ হলো Able, অর্থ সক্ষম বা দক্ষ।

শব্দ পরিচিতি:
• Ability (Noun) — সামর্থ্য, যোগ্যতা।
• Able (Adjective) — সক্ষম, দক্ষ।
• Ably (Adverb) — দক্ষতার সাথে।
• Capability (Noun) — সামর্থ্য (Ability-র প্রায় সমার্থক শব্দ, কিন্তু এটিও একটি Noun)।
• Inability (Noun) — অক্ষমতা, দুর্বলতা।

যেহেতু Capability ও Inability দুটোই Noun, তাই এগুলো এখানে সঠিক উত্তর হতে পারে না।`,
        subject: "",
        topic: "",
        subTopic: "",
        sortOrder: 16,
      },

      {
        questionSetId,
        slug: "the-verb-form-of",
        questionText: "The verb form of 'clear' -",
        optionA: "Cleaning",
        optionB: "Clearly",
        optionC: "Cleanse",
        optionD: "Clarify",
        correctAnswer: "D",
        explanation: `সঠিক উত্তর: Clarify।
Clear (Adjective)-এর অর্থ স্পষ্ট বা বোধগম্য। এর verb রূপ হলো Clarify, অর্থ কোনো কিছু স্পষ্ট করে তোলা বা ব্যাখ্যা করা।

শব্দ পরিচিতি:
• Clear (Adjective) — স্পষ্ট, পরিষ্কার।
• Clarify (Verb) — স্পষ্ট করা।
• Cleanse (Verb) — পরিষ্কার করা (মূলত 'clean' শব্দ থেকে গঠিত, 'clear'-এর সরাসরি রূপ নয়)।
• Cleaning (Noun/Verb-ing) — পরিষ্কার করার কাজ।`,
        subject: "",
        topic: "",
        subTopic: "",
        sortOrder: 17,
      },

      {
        questionSetId,
        slug: "which-kind-of-noun-2",
        questionText: "Which kind of noun is 'sand'?",
        optionA: "Common noun",
        optionB: "Proper noun",
        optionC: "Materiel noun",
        optionD: "Abstract noun",
        correctAnswer: "C",
        explanation: `সঠিক উত্তর: Material noun।
যে Noun দিয়ে কোনো পদার্থ বা উপাদানকে বোঝায় — যা গণনা করা যায় না, তবে ওজন বা পরিমাণ দিয়ে মাপা যায় — তাকে Material noun বলে। 'Sand' (বালি) এমনই একটি বস্তুবাচক পদার্থ, তাই এটি Material noun। এই শ্রেণির আরও উদাহরণ: gold, iron, water, wood, tea ইত্যাদি।`,
        subject: "",
        topic: "",
        subTopic: "",
        sortOrder: 18,
      },

      {
        questionSetId,
        slug: "noun-form-of-dismiss",
        questionText: "Choose the noun form of 'Dismiss'.",
        optionA: "Dismissed",
        optionB: "Dismay",
        optionC: "Dismissal",
        optionD: "Dismissive",
        correctAnswer: "C",
        explanation: `সঠিক উত্তর: Dismissal।
Dismiss (Verb)-এর অর্থ কাউকে চাকরি বা দায়িত্ব থেকে বরখাস্ত করা, অথবা কোনো চিন্তা মন থেকে সরিয়ে দেওয়া। এর noun রূপ হলো Dismissal, অর্থ বরখাস্ত বা পদচ্যুতি।

শব্দ পরিচিতি:
• Dismiss (Verb) — বরখাস্ত করা, বিদায় দেওয়া।
• Dismissal (Noun) — বরখাস্ত, পদচ্যুতি।
• Dismissive (Adjective) — উপেক্ষাসূচক, তুচ্ছার্থক।
• Dismay (Noun/Verb) — হতাশা বা মর্মাহত হওয়া — এটি Dismiss-এর সাথে সরাসরি সম্পর্কিত নয়, সম্পূর্ণ ভিন্ন অর্থের একটি শব্দ।`,
        subject: "",
        topic: "",
        subTopic: "",
        sortOrder: 19,
      },

      {
        questionSetId,
        slug: "noun-form-of-elicit",
        questionText: "Choose the noun form of 'Elicit'.",
        optionA: "Elicitation",
        optionB: "Elicited",
        optionC: "Eliciting",
        optionD: "Elicit",
        correctAnswer: "A",
        explanation: `সঠিক উত্তর: Elicitation।
Elicit (Verb)-এর অর্থ কারও কাছ থেকে কোনো তথ্য, উত্তর বা প্রতিক্রিয়া টেনে বের করা। এর noun রূপ হলো Elicitation।

শব্দ পরিচিতি:
• Elicit (Verb) — টেনে বের করা, প্রকাশ করানো।
• Elicitation (Noun) — বের করে আনার প্রক্রিয়া।
• Elicited / Eliciting — যথাক্রমে Elicit-এর past form ও present participle; উভয়ই Verb-এর রূপ, Noun নয়।`,
        subject: "",
        topic: "",
        subTopic: "",
        sortOrder: 20,
      },

      {
        questionSetId,
        slug: "which-kind-of-noun-3",
        questionText: "Which kind of noun is 'gold'?",
        optionA: "Proper noun",
        optionB: "Abstract noun",
        optionC: "Materiel noun",
        optionD: "Common noun",
        correctAnswer: "C",
        explanation: `সঠিক উত্তর: Material noun।
'Gold' (স্বর্ণ) একটি বস্তুবাচক পদার্থ যা গণনা না করে ওজন বা পরিমাণ দিয়ে মাপা হয়, তাই এটি Material noun। একই শ্রেণির অন্য উদাহরণ: water, iron, silver, tea, wood ইত্যাদি।`,
        subject: "",
        topic: "",
        subTopic: "",
        sortOrder: 21,
      },

      {
        questionSetId,
        slug: "which-type-of-noun",
        questionText: "Which type of noun is the word 'crew'?",
        optionA: "Proper Noun",
        optionB: "Material Noun",
        optionC: "Collective Noun",
        optionD: "Abstract Noun",
        correctAnswer: "C",
        explanation: `সঠিক উত্তর: Collective noun।
যে Noun দিয়ে একই জাতীয় একদল ব্যক্তি বা বস্তুর সমষ্টিকে একক হিসেবে বোঝানো হয়, তাকে Collective noun বলে। 'Crew' বলতে একসাথে কাজ করা একদল মানুষকে বোঝায় (যেমন জাহাজ বা বিমানের কর্মীদল), তাই এটি Collective noun। এই শ্রেণির আরও উদাহরণ: army, jury, committee, family, herd ইত্যাদি।`,
        subject: "",
        topic: "",
        subTopic: "",
        sortOrder: 22,
      },

      {
        questionSetId,
        slug: "what-is-the-adjective",
        questionText: "What is the adjective of the verb \"Occlude\"?",
        optionA: "Occlude",
        optionB: "Occlusive",
        optionC: "Occlusion",
        optionD: "Occlusively",
        correctAnswer: "B",
        explanation: `সঠিক উত্তর: Occlusive।
Occlude (Verb)-এর অর্থ কোনো কিছু বন্ধ করে দেওয়া বা রুদ্ধ করা। এর adjective রূপ হলো Occlusive, অর্থ অবরোধক বা বন্ধকারী।

শব্দ পরিচিতি:
• Occlude (Verb) — বন্ধ করা, রুদ্ধ করা।
• Occlusive (Adjective) — অবরোধক।
• Occlusion (Noun) — অবরোধ।
• Occlusively (Adverb) — অবরুদ্ধভাবে।`,
        subject: "",
        topic: "",
        subTopic: "",
        sortOrder: 23,
      },

      {
        questionSetId,
        slug: "what-part-of-speech",
        questionText: "What part of speech is the underlined word? He spoke in a calm voice.",
        optionA: "Pronoun",
        optionB: "Adjective",
        optionC: "Preposition",
        optionD: "Adverb",
        correctAnswer: "B",
        explanation: `সঠিক উত্তর: Adjective।
বাক্যে 'calm' শব্দটি noun 'voice'-এর বৈশিষ্ট্য বোঝাচ্ছে — কণ্ঠস্বর কেমন ছিল জিজ্ঞেস করলে উত্তর আসে 'calm' (শান্ত), তাই এটি Adjective।

লক্ষণীয়: 'Calm' শব্দটি প্রসঙ্গভেদে Noun, Verb এবং Adjective — তিন রূপেই ব্যবহৃত হতে পারে, তাই বাক্যে এর অবস্থান দেখেই part of speech নির্ধারণ করতে হয়।`,
        subject: "",
        topic: "",
        subTopic: "",
        sortOrder: 24,
      },

      {
        questionSetId,
        slug: "identify-the-part-of",
        questionText: "Identify the part of speech of the underlined word: Her explanation was both lucid and convincing.",
        optionA: "Noun",
        optionB: "Adverb",
        optionC: "Adjective",
        optionD: "Verb",
        correctAnswer: "C",
        explanation: `সঠিক উত্তর: Adjective।
বাক্যে 'lucid' শব্দটি noun 'explanation'-এর গুণ বোঝাচ্ছে — ব্যাখ্যাটি কেমন ছিল প্রশ্ন করলে উত্তর আসে 'lucid', তাই এটি Adjective।

শব্দ পরিচিতি:
• Lucid (Adjective) — স্পষ্ট, সহজবোধ্য।`,
        subject: "",
        topic: "",
        subTopic: "",
        sortOrder: 25,
      },

      {
        questionSetId,
        slug: "what-part-of-speech-2",
        questionText: "What part of speech is the underlined word? The soldiers moved stealthily through the forest.",
        optionA: "Verb",
        optionB: "Noun",
        optionC: "Adverb",
        optionD: "Adjective",
        correctAnswer: "C",
        explanation: `সঠিক উত্তর: Adverb।
'Stealthily' verb 'moved'-কে বর্ণনা করছে সৈনিকরা কীভাবে চলাচল করেছিল, তাই এটি Adverb of manner। লক্ষণীয়, বেশিরভাগ Adverb of manner adjective-এর সাথে '-ly' যুক্ত করে গঠিত হয়।

শব্দ পরিচিতি:
• Stealthily (Adverb) — গোপনে, নিঃশব্দে, কারও অজান্তে।`,
        subject: "",
        topic: "",
        subTopic: "",
        sortOrder: 26,
      },

      {
        questionSetId,
        slug: "what-is-the-common",
        questionText: "What is the common gender noun in the following?",
        optionA: "Uncle",
        optionB: "Baby",
        optionC: "Lion",
        optionD: "Princess",
        correctAnswer: "B",
        explanation: `সঠিক উত্তর: Baby।
যে Noun ছেলে বা মেয়ে উভয়ের ক্ষেত্রেই সমানভাবে ব্যবহার করা যায়, তাকে Common gender noun বলে। 'Baby' (শিশু) শব্দটি ছেলে বা মেয়ে উভয় সন্তানের ক্ষেত্রেই ব্যবহৃত হয়, তাই এটি Common gender।

তুলনায়: Uncle ও Lion পুংলিঙ্গবাচক (Masculine), আর Princess স্ত্রীলিঙ্গবাচক (Feminine)।`,
        subject: "",
        topic: "",
        subTopic: "",
        sortOrder: 27,
      },

      {
        questionSetId,
        slug: "choose-the-correct-part",
        questionText: "Choose the correct part of speech of the word \"serenity\" in the sentence: We were struck by the serenity of the mountain view.",
        optionA: "Noun",
        optionB: "Adverb",
        optionC: "Adjective",
        optionD: "Verb",
        correctAnswer: "A",
        explanation: `সঠিক উত্তর: Noun।
বাক্যে article 'the' ও preposition 'of'-এর মাঝে বসে 'serenity' শব্দটি Noun হিসেবে ব্যবহৃত হয়েছে। এছাড়া 'Serenity' একটি মানসিক অবস্থা বা অনুভূতি (প্রশান্তি) বোঝায়, আর এ ধরনের ভাববাচক শব্দ সাধারণত Noun হয়।

শব্দ পরিচিতি:
• Serenity (Noun) — প্রশান্তি, স্থিরতা।`,
        subject: "",
        topic: "",
        subTopic: "",
        sortOrder: 28,
      },

      {
        questionSetId,
        slug: "noun-form-of-approve",
        questionText: "Choose the noun form of \"approve\":",
        optionA: "Approval",
        optionB: "Approved",
        optionC: "Approving",
        optionD: "Approve",
        correctAnswer: "A",
        explanation: `সঠিক উত্তর: Approval।
Approve (Verb)-এর অর্থ কোনো কিছু সমর্থন করা বা অনুমোদন দেওয়া। এর noun রূপ হলো Approval, অর্থ অনুমোদন বা সম্মতি।

শব্দ পরিচিতি:
• Approve (Verb) — সমর্থন করা, অনুমোদন দেওয়া।
• Approval (Noun) — অনুমোদন, সম্মতি।
• Approved — Approve-এর past form/participle, Verb-এর রূপ।
• Approving (Adjective) — সমর্থনসূচক।`,
        subject: "",
        topic: "",
        subTopic: "",
        sortOrder: 29,
      },

      {
        questionSetId,
        slug: "she-is-a-very",
        questionText: "She is a very kind person. What part of speech is \"kind\"?",
        optionA: "Conjunction",
        optionB: "Verb",
        optionC: "Adjective",
        optionD: "Adverb",
        correctAnswer: "C",
        explanation: `সঠিক উত্তর: Adjective।
বাক্যে 'kind' শব্দটি noun 'person'-এর গুণ প্রকাশ করছে — ব্যক্তিটি কেমন (দয়ালু) তা বোঝাচ্ছে, তাই এটি Adjective।

শব্দ পরিচিতি:
• Kind (Adjective) — সদয়, দয়ালু।
• Kind (Noun হিসেবে ব্যবহৃত হলে) — শ্রেণি, প্রকার।`,
        subject: "",
        topic: "",
        subTopic: "",
        sortOrder: 30,
      },

      {
        questionSetId,
        slug: "he-plays-the-piano",
        questionText: "He plays the piano beautifully. What part of speech is \"beautifully\"?",
        optionA: "Adverb",
        optionB: "Verb",
        optionC: "Noun",
        optionD: "Adjective",
        correctAnswer: "A",
        explanation: `সঠিক উত্তর: Adverb।
বাক্যে 'beautifully' verb 'plays'-কে বর্ণনা করছে — তিনি কীভাবে বাজান তা বোঝাচ্ছে, তাই এটি Adverb of manner।

শব্দ পরিচিতি:
• Beautifully (Adverb) — সুন্দরভাবে।`,
        subject: "",
        topic: "",
        subTopic: "",
        sortOrder: 31,
      },

      {
        questionSetId,
        slug: "he-is-poor-but",
        questionText: "He is poor but honest. What part of speech is \"but\"?",
        optionA: "Adverb",
        optionB: "Preposition",
        optionC: "Conjunction",
        optionD: "Noun",
        correctAnswer: "C",
        explanation: `সঠিক উত্তর: Conjunction।
এখানে 'but' দুটি ধারণাকে (poor এবং honest) একসাথে যুক্ত করেছে। দুটি শব্দ, clause বা বাক্যাংশকে যুক্ত করলে সেই শব্দ Conjunction হিসেবে গণ্য হয়।

শব্দ পরিচিতি:
• But (Conjunction) — কিন্তু, তবে।`,
        subject: "",
        topic: "",
        subTopic: "",
        sortOrder: 32,
      },

      {
        questionSetId,
        slug: "adjective-form-of-glory",
        questionText: "Choose the adjective form of \"glory\":",
        optionA: "Glorious",
        optionB: "Glorify",
        optionC: "Glorification",
        optionD: "Glory",
        correctAnswer: "A",
        explanation: `সঠিক উত্তর: Glorious।
Glory (Noun)-এর অর্থ যশ, গৌরব বা মহিমা। এর adjective রূপ হলো Glorious, অর্থ গৌরবময় বা মহিমান্বিত।

শব্দ পরিচিতি:
• Glory (Noun) — যশ, গৌরব।
• Glorious (Adjective) — গৌরবময়, মহিমান্বিত।
• Glorify (Verb) — গৌরবান্বিত করা, প্রশংসা করা।
• Glorification (Noun) — গৌরবান্বিতকরণ, প্রশংসা।`,
        subject: "",
        topic: "",
        subTopic: "",
        sortOrder: 33,
      },

      {
        questionSetId,
        slug: "noun-form-of-strong",
        questionText: "Choose the noun form of the word \"strong\":",
        optionA: "Strengthen",
        optionB: "Strength",
        optionC: "Strongly",
        optionD: "Strong",
        correctAnswer: "B",
        explanation: `সঠিক উত্তর: Strength।
Strong (Adjective)-এর অর্থ শক্তিশালী বা দৃঢ়। এর noun রূপ হলো Strength, অর্থ শক্তি বা সামর্থ্য।

শব্দ পরিচিতি:
• Strong (Adjective) — শক্তিশালী, দৃঢ়।
• Strength (Noun) — শক্তি, সামর্থ্য।
• Strengthen (Verb) — শক্তিশালী করা।
• Strongly (Adverb) — দৃঢ়ভাবে।`,
        subject: "",
        topic: "",
        subTopic: "",
        sortOrder: 34,
      },

      {
        questionSetId,
        slug: "choose-the-verb-form",
        questionText: "Choose the verb form of the word \"decision\":",
        optionA: "Decided",
        optionB: "Deciding",
        optionC: "Decide",
        optionD: "Decisive",
        correctAnswer: "C",
        explanation: `সঠিক উত্তর: Decide।
Decision (Noun)-এর অর্থ সিদ্ধান্ত। এর verb রূপ হলো Decide, অর্থ চূড়ান্তভাবে কোনো কিছু স্থির করা বা সিদ্ধান্ত নেওয়া।

শব্দ পরিচিতি:
• Decide (Verb) — সিদ্ধান্ত নেওয়া।
• Decided (Adjective) — সুনির্দিষ্ট, সুস্পষ্ট।
• Deciding (Adjective) — নিষ্পত্তিকর।
• Decisive (Adjective) — চূড়ান্ত, নিশ্চায়ক।`,
        subject: "",
        topic: "",
        subTopic: "",
        sortOrder: 35,
      },

      {
        questionSetId,
        slug: "choose-the-adjective-form-2",
        questionText: "Choose the adjective form of the word \"danger\":",
        optionA: "Dangerous",
        optionB: "Dangerously",
        optionC: "Endanger",
        optionD: "Danger",
        correctAnswer: "A",
        explanation: `সঠিক উত্তর: Dangerous।
Danger (Noun)-এর অর্থ বিপদ। এর adjective রূপ হলো Dangerous, অর্থ বিপজ্জনক।

শব্দ পরিচিতি:
• Danger (Noun) — বিপদ, ঝুঁকি।
• Dangerous (Adjective) — বিপজ্জনক।
• Dangerously (Adverb) — বিপজ্জনকভাবে।
• Endanger (Verb) — বিপদে ফেলা।`,
        subject: "",
        topic: "",
        subTopic: "",
        sortOrder: 36,
      },

      {
        questionSetId,
        slug: "noun-form-of-advise",
        questionText: "Choose the noun form of the word \"advise\":",
        optionA: "Advisable",
        optionB: "Advising",
        optionC: "Advice",
        optionD: "Advise",
        correctAnswer: "C",
        explanation: `সঠিক উত্তর: Advice।
Advise একটি Verb, অর্থ পরামর্শ দেওয়া। এর noun রূপ হলো Advice, অর্থ পরামর্শ।

শব্দ পরিচিতি:
• Advise (Verb) — পরামর্শ দেওয়া (বানানের শেষে 's')।
• Advice (Noun) — পরামর্শ (বানানের শেষে 'c')।
• Advisable (Adjective) — পরামর্শযোগ্য, সমীচীন।
• Advising (Verb-ing/Gerund) — পরামর্শ দেওয়ার কাজ।

সহজে মনে রাখার উপায়: Verb-এ 's' (advise), আর Noun-এ 'c' (advice) — অনেকটা 'practise/practice'-এর মতোই এই নিয়ম কাজ করে।`,
        subject: "",
        topic: "",
        subTopic: "",
        sortOrder: 37,
      },

      {
        questionSetId,
        slug: "reflexive-pronoun-itself",
        questionText: "Which of the following is 'Reflexive pronoun'?",
        optionA: "Each",
        optionB: "Itself",
        optionC: "Any",
        optionD: "It",
        correctAnswer: "B",
        explanation: `সঠিক উত্তর: Itself।
Personal pronoun-এর সাথে self/selves যুক্ত হয়ে যে pronoun গঠিত হয়, তাকে Reflexive pronoun বলে; যেমন: myself, yourself, himself, itself, themselves ইত্যাদি। এখানে 'Itself' একটি Reflexive pronoun।

Pronoun-এর ৮টি প্রকার: Personal, Demonstrative, Interrogative, Relative, Indefinite, Distributive, Reflexive ও Reciprocal। Each (Distributive), Any (Indefinite) এবং It (Personal) — এই তিনটি ভিন্ন শ্রেণির শব্দ, তাই সঠিক উত্তর 'Itself'।`,
        subject: "",
        topic: "",
        subTopic: "",
        sortOrder: 38,
      },

      {
        questionSetId,
        slug: "which-of-the-following-3",
        questionText: "Which of the following is 'calm' is an adjective?",
        optionA: "The pilot said we’d have to make an emergency landing, and the flight attendants tried to keep us calm.",
        optionB: "Amid the calm, there was a sense that something could happen at any moment",
        optionC: "I needed some time to calm down.",
        optionD: "It was the calm of the countryside that he loved so much.",
        correctAnswer: "A",
        explanation: `সঠিক উত্তর: (ক) — "The pilot said we'd have to make an emergency landing, and the flight attendants tried to keep us calm."
এই বাক্যে 'calm' শব্দটি Adjective হিসেবে ব্যবহৃত হয়েছে, কারণ এটি যাত্রীদের অবস্থা (শান্ত/অবিচলিত) বর্ণনা করছে।

বাকি বাক্যগুলোতে 'calm' ভিন্ন part of speech হিসেবে ব্যবহৃত হয়েছে:
• "Amid the calm, there was a sense that something could happen at any moment" এবং "It was the calm of the countryside that he loved so much" — এই দুই বাক্যে 'calm' একটি Noun (শান্ত পরিবেশ বা অবস্থা অর্থে)।
• "I needed some time to calm down" — এই বাক্যে 'calm' একটি Verb (শান্ত হওয়া অর্থে)।

এভাবে একই শব্দ বাক্যের গঠন অনুযায়ী ভিন্ন ভিন্ন part of speech হিসেবে কাজ করতে পারে — এটিই এই প্রশ্নের মূল শিক্ষণীয় বিষয়।`,
        subject: "",
        topic: "",
        subTopic: "",
        sortOrder: 39,
      },

      {
        questionSetId,
        slug: "which-of-the-following-4",
        questionText: "Which of the following is an adjective?",
        optionA: "Beautiful",
        optionB: "Beauty",
        optionC: "Beautify",
        optionD: "Beautification",
        correctAnswer: "A",
        explanation: `সঠিক উত্তর: Beautiful।
প্রদত্ত অপশনগুলোর মধ্যে 'Beautiful' শব্দটিই একমাত্র Adjective, অর্থ সুন্দর বা মনোরম।

শব্দ পরিচিতি:
• Beautiful (Adjective) — সুন্দর।
• Beauty (Noun) — সৌন্দর্য।
• Beautify (Verb) — সুন্দর করা।
• Beautification (Noun) — সৌন্দর্যবর্ধনের প্রক্রিয়া।`,
        subject: "",
        topic: "",
        subTopic: "",
        sortOrder: 40,
      },

      {
        questionSetId,
        slug: "what-kind-of-noun",
        questionText: "What kind of noun is 'crew'?",
        optionA: "Proper Noun",
        optionB: "Common Noun",
        optionC: "Collective Noun",
        optionD: "Abstract Noun",
        correctAnswer: "C",
        explanation: `সঠিক উত্তর: Collective noun।
একই জাতের একদল ব্যক্তি বা বস্তুকে একত্রে একটি নাম দিয়ে বোঝালে সেটিকে Collective noun বলে। 'Crew' দ্বারা একসাথে কাজ করা একটি কর্মীদল বোঝানো হয় বলে এটি Collective noun। অনুরূপ উদাহরণ: team, army, jury, family, committee ইত্যাদি।`,
        subject: "",
        topic: "",
        subTopic: "",
        sortOrder: 41,
      },

      {
        questionSetId,
        slug: "adjective-form-of-diverge",
        questionText: "The adjective form of the word 'Diverge' is-",
        optionA: "Divergrant",
        optionB: "Diverge",
        optionC: "Divergence",
        optionD: "Divergent",
        correctAnswer: "D",
        explanation: `সঠিক উত্তর: Divergent।
Diverge (Verb)-এর অর্থ একই বিন্দু থেকে বিভিন্ন দিকে ছড়িয়ে পড়া বা পথ আলাদা হয়ে যাওয়া। এর adjective রূপ হলো Divergent, অর্থ ভিন্নমুখী বা বিচ্যুত।

শব্দ পরিচিতি:
• Diverge (Verb) — ভিন্ন পথে যাওয়া।
• Divergent (Adjective) — ভিন্নমুখী, বিচ্যুত।
• Divergence (Noun) — বিচ্যুতি, পার্থক্য।

লক্ষণীয়: 'Divergrant' নামে ইংরেজিতে কোনো প্রচলিত শব্দ নেই।`,
        subject: "",
        topic: "",
        subTopic: "",
        sortOrder: 42,
      },

      {
        questionSetId,
        slug: "what-kind-of-pronoun",
        questionText: "What kind of pronoun is 'We'?",
        optionA: "Relative pronoun",
        optionB: "Personal pronoun",
        optionC: "Interrogative pronoun",
        optionD: "Demonstrative pronoun",
        correctAnswer: "B",
        explanation: `সঠিক উত্তর: Personal pronoun।
কোনো ব্যক্তির নামের পরিবর্তে সরাসরি ব্যবহৃত pronoun-কে Personal pronoun বলে; যেমন: I, we, you, he, she, it, they। এখানে 'We' একটি Personal pronoun।

Pronoun-এর ৮টি প্রকার: Personal, Demonstrative, Interrogative, Relative, Indefinite, Distributive, Reflexive ও Reciprocal।`,
        subject: "",
        topic: "",
        subTopic: "",
        sortOrder: 43,
      },

      {
        questionSetId,
        slug: "what-is-the-adverb",
        questionText: "What is the adverb form of the word 'Caustic'?",
        optionA: "Causticaly",
        optionB: "Caustically",
        optionC: "Causticly",
        optionD: "Causticity",
        correctAnswer: "B",
        explanation: `সঠিক উত্তর: Caustically।
Caustic (Adjective)-এর অর্থ ক্ষয়কর বা তীব্র সমালোচনামূলক; রসায়নে এর অর্থ এমন পদার্থ যা পুড়িয়ে বা ক্ষয় করে দিতে পারে। এর সঠিক adverb রূপ হলো Caustically (একটি অতিরিক্ত 'l' সহ)।

শব্দ পরিচিতি:
• Caustic (Adjective) — ক্ষয়কর, তীব্র, বিদ্রূপাত্মক।
• Caustically (Adverb) — তীব্রভাবে, বিদ্রূপাত্মকভাবে।
• Causticity (Noun) — তীব্রতা, ক্ষয়কারিতা।

লক্ষণীয়: 'Causticaly' ও 'Causticly' — এই দুটি বানানই ভুল।`,
        subject: "",
        topic: "",
        subTopic: "",
        sortOrder: 44,
      },

      {
        questionSetId,
        slug: "they-often-visit-their",
        questionText: "They often visit their grandparents on weekends. Which type of adverb 'often' is here?",
        optionA: "Adverb of degree",
        optionB: "Adverb of frequency",
        optionC: "Adverb of manner",
        optionD: "Adverb of place",
        correctAnswer: "B",
        explanation: `সঠিক উত্তর: Adverb of frequency।
'Often' শব্দটি বোঝাচ্ছে কাজটি (grandparents-কে visit করা) কতবার ঘটে, তাই এটি Adverb of frequency। এই শ্রেণির অন্য উদাহরণ: always, usually, sometimes, rarely, never।

তুলনায়, Adverb of degree (too, very, enough) মাত্রা বোঝায়, Adverb of place কোথায় তা বোঝায়, আর Adverb of manner কীভাবে তা বোঝায়।`,
        subject: "",
        topic: "",
        subTopic: "",
        sortOrder: 45,
      },

      {
        questionSetId,
        slug: "what-is-the-noun",
        questionText: "What is the noun form of the word 'Whimsical'?",
        optionA: "Whimsicallyness",
        optionB: "Whimsical",
        optionC: "Whimsicality",
        optionD: "Whimsically",
        correctAnswer: "C",
        explanation: `সঠিক উত্তর: Whimsicality।
Whimsical (Adjective)-এর অর্থ খেয়ালি বা অদ্ভুত স্বভাবের। এর noun রূপ হলো Whimsicality, অর্থ খেয়ালিপনা।

শব্দ পরিচিতি:
• Whimsical (Adjective) — খেয়ালি, অদ্ভুত স্বভাবের।
• Whimsicality (Noun) — খেয়ালিপনা।
• Whimsically (Adverb) — খেয়ালিভাবে।
• Whimsy (Noun) — খেয়াল, বাতিক।`,
        subject: "",
        topic: "",
        subTopic: "",
        sortOrder: 46,
      },

      {
        questionSetId,
        slug: "reciprocal-pronoun-each-other",
        questionText: "Which of the following is a 'Reciprocal pronoun'?",
        optionA: "This",
        optionB: "Each other",
        optionC: "Some",
        optionD: "Myself",
        correctAnswer: "B",
        explanation: `সঠিক উত্তর: Each other।
দুই বা ততোধিক পক্ষের মধ্যে পারস্পরিক সম্পর্ক বোঝাতে ব্যবহৃত pronoun-কে Reciprocal pronoun বলে — যেমন each other ও one another। এখানে 'Each other' একটি Reciprocal pronoun, যা সাধারণত দু'জনের মধ্যে পারস্পরিক ক্রিয়া বোঝাতে ব্যবহৃত হয় (যেমন: They respect each other)।

Pronoun-এর ৮টি প্রকার: Personal, Demonstrative, Interrogative, Relative, Indefinite, Distributive, Reflexive ও Reciprocal।`,
        subject: "",
        topic: "",
        subTopic: "",
        sortOrder: 47,
      },

      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // New questions (48-52): fill gaps in the original 47 —
      // Proper Noun, Distributive Pronoun, Adjective/Verb word-formation, Adverb of Degree —
      // all recurring, high-frequency topics in BD govt. job (BCS/Bank/Niyog) exams.
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

      {
        questionSetId,
        slug: "choose-the-proper-noun",
        questionText: "Choose the Proper Noun from the following options.",
        optionA: "Dhaka",
        optionB: "City",
        optionC: "River",
        optionD: "Beauty",
        correctAnswer: "A",
        explanation: `সঠিক উত্তর: Dhaka।
যে Noun দিয়ে কোনো নির্দিষ্ট ব্যক্তি, স্থান বা বস্তুর নাম বোঝায় এবং যার প্রথম অক্ষর সবসময় Capital letter-এ লেখা হয়, তাকে Proper noun বলে। 'Dhaka' একটি নির্দিষ্ট শহরের নাম, তাই এটি Proper noun।

তুলনায়: City ও River হলো Common noun (সাধারণ শ্রেণিবাচক নাম), আর Beauty একটি Abstract noun (ভাববাচক গুণ)।`,
        subject: "",
        topic: "",
        subTopic: "",
        sortOrder: 48,
      },

      {
        questionSetId,
        slug: "which-is-a-distributive-pronoun",
        questionText: "Which of the following is a Distributive pronoun?",
        optionA: "Each",
        optionB: "Someone",
        optionC: "Which",
        optionD: "Ourselves",
        correctAnswer: "A",
        explanation: `সঠিক উত্তর: Each।
যে Pronoun দলের সদস্যদের একজন একজন করে আলাদাভাবে বোঝায়, তাকে Distributive pronoun বলে; এই শ্রেণির মূল শব্দ হলো each, either, neither। এখানে 'Each' একটি Distributive pronoun।

তুলনায়: Someone (Indefinite pronoun), Which (Interrogative/Relative pronoun) এবং Ourselves (Reflexive pronoun) — এই তিনটি ভিন্ন শ্রেণির।

Pronoun-এর ৮টি প্রকার: Personal, Demonstrative, Interrogative, Relative, Indefinite, Distributive, Reflexive ও Reciprocal।`,
        subject: "",
        topic: "",
        subTopic: "",
        sortOrder: 49,
      },

      {
        questionSetId,
        slug: "adjective-form-of-courage",
        questionText: "Choose the adjective form of the word \"Courage\":",
        optionA: "Courageous",
        optionB: "Courage",
        optionC: "Encourage",
        optionD: "Courageously",
        correctAnswer: "A",
        explanation: `সঠিক উত্তর: Courageous।
Courage (Noun)-এর অর্থ সাহস। এর সাথে '-ous' প্রত্যয় যুক্ত হয়ে adjective 'Courageous' গঠিত হয়েছে, অর্থ সাহসী।

শব্দ পরিচিতি:
• Courage (Noun) — সাহস।
• Courageous (Adjective) — সাহসী।
• Encourage (Verb) — উৎসাহিত করা।
• Courageously (Adverb) — সাহসের সাথে।

একই মূল শব্দ থেকে এভাবে Noun, Adjective, Verb ও Adverb — চার ধরনের part of speech গঠিত হতে পারে, যা পরীক্ষায় প্রায়ই আসে।`,
        subject: "",
        topic: "",
        subTopic: "",
        sortOrder: 50,
      },

      {
        questionSetId,
        slug: "she-is-too-tired",
        questionText: "She is too tired to walk. Here, 'too' is an adverb of -",
        optionA: "Frequency",
        optionB: "Place",
        optionC: "Degree",
        optionD: "Manner",
        correctAnswer: "C",
        explanation: `সঠিক উত্তর: Degree।
'Too' শব্দটি adjective 'tired'-এর মাত্রা বা তীব্রতা বোঝাচ্ছে — কতটা ক্লান্ত তা প্রকাশ করছে, তাই এটি Adverb of degree। এই শ্রেণির অন্য উদাহরণ: very, enough, extremely, barely।

তুলনায়, Adverb of frequency কতবার, Adverb of place কোথায়, আর Adverb of manner কীভাবে তা বোঝায়। যেহেতু এখানে প্রশ্নটি মাত্রা সংক্রান্ত, তাই উত্তর Degree।`,
        subject: "",
        topic: "",
        subTopic: "",
        sortOrder: 51,
      },

      {
        questionSetId,
        slug: "verb-form-of-criticism",
        questionText: "Choose the verb form of the word \"Criticism\":",
        optionA: "Critic",
        optionB: "Critical",
        optionC: "Criticize",
        optionD: "Critically",
        correctAnswer: "C",
        explanation: `সঠিক উত্তর: Criticize।
Criticism (Noun)-এর অর্থ সমালোচনা। এর verb রূপ হলো Criticize, অর্থ সমালোচনা করা।

শব্দ পরিচিতি:
• Criticism (Noun) — সমালোচনা।
• Criticize (Verb) — সমালোচনা করা।
• Critical (Adjective) — সমালোচনামূলক।
• Critically (Adverb) — সমালোচনামূলকভাবে।
• Critic (Noun) — সমালোচক (ব্যক্তি)।`,
        subject: "",
        topic: "",
        subTopic: "",
        sortOrder: 52,
      },
    ],

    skipDuplicates: true,
  });
  console.log('✓ Seeded 52 Parts of Speech (Noun, Pronoun, Adjective, Adverb, Verb) questions');
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
