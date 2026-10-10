import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
// TODO: replace with the actual QuestionSet id for this exam before running
const questionSetId = "REPLACE_QUESTION_SET_ID";

async function main() {
  await prisma.question.createMany({
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Topic: Number and Gender (English Grammar)
    // Rebuilt from a raw 34-question scrape into a deduplicated, standard
    // niyog-exam set. All questionText/options/explanation are fully
    // original compositions — the messy, repeated OCR text and the
    // book-specific citations from the source scrape have been removed
    // and replaced with clean, human-written explanations in the
    // established pedagogical format (correct-answer header, context,
    // em-dash bullets, wrong-option analysis, source line).
    // 5 additional questions (sortOrder 35–39) were composed fresh on
    // the same topic, each fact-checked against standard references.
    // মোট প্রশ্ন: ৩৯টি
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    data: [
      {
        questionSetId,
        slug: "identify-singular-number-criterion",
        questionText: "Identify the singular number.",
        optionA: "Radii",
        optionB: "Media",
        optionC: "Criterion",
        optionD: "Data",
        correctAnswer: "C",
        explanation: `সঠিক উত্তর: Criterion

Criterion অর্থ মানদণ্ড বা বিচারের নিয়ামক (a standard by which something is judged)। এটি একটি singular শব্দ; এর plural হলো Criteria।
— ইংরেজিতে সাধারণত noun-এর শেষে s/es যোগ করে plural হয়, কিন্তু ল্যাটিন-গ্রিক থেকে আসা কিছু শব্দের plural হয় ভিন্নভাবে, এগুলো আলাদাভাবে মুখস্থ রাখা জরুরি।
— এই ধরনের শব্দের কয়েকটি জোড়া: Phenomenon–Phenomena, Radius–Radii, Medium–Media, Datum–Data, Agendum–Agenda।

ভুল অপশনগুলো কেন নয়:
— Radii — এটি Radius-এর plural, তাই singular নয়।
— Media — এটি Medium-এর plural।
— Data — এটি Datum-এর plural।

উৎস: প্রমিত ইংরেজি ব্যাকরণ ও অভিধান (Oxford Learner's Dictionary)।`,
        subject: "English",
        topic: "Number and Gender",
        subTopic: "Plural of Foreign/Latin-Greek Words",
        sortOrder: 1,
      },

      {
        questionSetId,
        slug: "masculine-gender-rooster",
        questionText: "Select the word that represents \"Masculine Gender\".",
        optionA: "Rooster",
        optionB: "Mare",
        optionC: "Cow",
        optionD: "Ewe",
        correctAnswer: "A",
        explanation: `সঠিক উত্তর: Rooster

Rooster (মোরগ) হলো Masculine Gender-এর শব্দ; এর স্ত্রীলিঙ্গ Hen (মুরগি)।
— Masculine gender বলতে বোঝায় প্রাণী বা ব্যক্তির পুরুষবাচক রূপ।

ভুল অপশনগুলো কেন নয়:
— Mare — স্ত্রীজাতীয় ঘোড়া (Feminine); এর masculine হলো Stallion/Horse।
— Cow — স্ত্রী গরু (Feminine); masculine হলো Bull।
— Ewe — স্ত্রী ভেড়া (Feminine); masculine হলো Ram।

উৎস: প্রমিত ইংরেজি ব্যাকরণ ও অভিধান।`,
        subject: "English",
        topic: "Number and Gender",
        subTopic: "Masculine-Feminine Word Pairs",
        sortOrder: 2,
      },

      {
        questionSetId,
        slug: "plural-form-same-as-singular-aircraft",
        questionText: "Identify the word which remains the same in its plural form.",
        optionA: "Aircraft",
        optionB: "Intention",
        optionC: "Mouse",
        optionD: "Thesis",
        correctAnswer: "A",
        explanation: `সঠিক উত্তর: Aircraft

Aircraft (উড়োজাহাজ) একটি বিশেষ ধরনের noun, যার singular ও plural রূপ একই থাকে — s/es যোগ হয় না।
— One aircraft, many aircraft — কোনো পরিবর্তন হয় না।
— একই গোত্রের আরও কিছু শব্দ: Sheep, Deer, Series, Species।

ভুল অপশনগুলো কেন নয়:
— Intention — নিয়মিত plural: Intentions।
— Mouse — irregular plural: Mice।
— Thesis — plural: Theses।

উৎস: প্রমিত ইংরেজি ব্যাকরণ ও অভিধান।`,
        subject: "English",
        topic: "Number and Gender",
        subTopic: "Same Singular-Plural Form",
        sortOrder: 3,
      },

      {
        questionSetId,
        slug: "feminine-gender-vixen",
        questionText: "Which one of the following is a 'Feminine Gender'?",
        optionA: "Buck",
        optionB: "Vixen",
        optionC: "Cock",
        optionD: "Fox",
        correctAnswer: "B",
        explanation: `সঠিক উত্তর: Vixen

Vixen অর্থ স্ত্রী শিয়াল (a female fox) — এটি Feminine Gender। এর masculine রূপ Fox।

ভুল অপশনগুলো কেন নয়:
— Buck — পুরুষ হরিণ (Masculine); feminine হলো Doe।
— Cock — পুরুষ মোরগ (Masculine); feminine হলো Hen।
— Fox — এখানে প্রজাতিবাচক/masculine অর্থে ব্যবহৃত; নির্দিষ্ট feminine রূপ Vixen।

উৎস: প্রমিত ইংরেজি ব্যাকরণ ও অভিধান।`,
        subject: "English",
        topic: "Number and Gender",
        subTopic: "Masculine-Feminine Word Pairs",
        sortOrder: 4,
      },

      {
        questionSetId,
        slug: "identify-plural-number-police",
        questionText: "Identify the plural number.",
        optionA: "Furniture",
        optionB: "Police",
        optionC: "Scenery",
        optionD: "News",
        correctAnswer: "B",
        explanation: `সঠিক উত্তর: Police

Police সবসময় Plural Number হিসেবে ব্যবহৃত হয় এবং plural verb নেয় (The police are investigating)।
— যেসব শব্দ সবসময় plural হিসেবে ব্যবহৃত হয়: Police, People, Cattle, Folk, Vermin।

ভুল অপশনগুলো কেন নয়:
— Furniture, Scenery, News — এই তিনটিই সবসময় singular (uncountable) হিসেবে ব্যবহৃত হয়।

উৎস: প্রমিত ইংরেজি ব্যাকরণ ও অভিধান।`,
        subject: "English",
        topic: "Number and Gender",
        subTopic: "Always Plural Nouns",
        sortOrder: 5,
      },

      {
        questionSetId,
        slug: "opposite-gender-marquis",
        questionText: "What is the opposite gender of 'Marquis'?",
        optionA: "Marqui",
        optionB: "Marquises",
        optionC: "Marchioness",
        optionD: "None of these",
        correctAnswer: "C",
        explanation: `সঠিক উত্তর: Marchioness

Marquis (ব্রিটিশ অভিজাত উপাধি, ডিউকের ঠিক নিচের পদমর্যাদা) — এর feminine রূপ Marchioness।
— কিছু noun-এর ক্ষেত্রে masculine থেকে feminine-এ যাওয়ার নির্দিষ্ট সাধারণ নিয়ম নেই, প্রতিটি শব্দ আলাদাভাবে মনে রাখতে হয়; যেমন Abbot–Abbess, Master–Miss।

ভুল অপশনগুলো কেন নয়:
— Marqui — এমন কোনো সঠিক ইংরেজি শব্দ নেই।
— Marquises — এটি Marquis-এর plural, feminine রূপ নয়।
— None of these — যেহেতু সঠিক উত্তর (Marchioness) অপশনেই আছে, তাই এটি প্রযোজ্য নয়।

উৎস: প্রমিত ইংরেজি ব্যাকরণ ও অভিধান।`,
        subject: "English",
        topic: "Number and Gender",
        subTopic: "Masculine-Feminine Word Pairs",
        sortOrder: 6,
      },

      {
        questionSetId,
        slug: "plural-of-criterion",
        questionText: "Choose the plural of 'Criterion'.",
        optionA: "Criteri",
        optionB: "Criteria",
        optionC: "Criterie",
        optionD: "Criterion",
        correctAnswer: "B",
        explanation: `সঠিক উত্তর: Criteria

Criterion (মানদণ্ড) শব্দটি singular; এর plural রূপ Criteria — এটি গ্রিক বংশোদ্ভূত শব্দগুলোর একটি, যেগুলোর plural সাধারণ s/es নিয়ম মেনে চলে না।

ভুল অপশনগুলো কেন নয়:
— Criteri, Criterie — এমন কোনো ইংরেজি শব্দ নেই।
— Criterion — এটি নিজেই singular রূপ, plural নয়।

উৎস: প্রমিত ইংরেজি ব্যাকরণ ও অভিধান।`,
        subject: "English",
        topic: "Number and Gender",
        subTopic: "Plural of Foreign/Latin-Greek Words",
        sortOrder: 7,
      },

      {
        questionSetId,
        slug: "feminine-gender-swain",
        questionText: "The feminine gender of the word 'Swain' is —",
        optionA: "Swain",
        optionB: "Dame",
        optionC: "Nymph",
        optionD: "Sire",
        correctAnswer: "C",
        explanation: `সঠিক উত্তর: Nymph

Swain একটি পুরনো/কাব্যিক শব্দ, যার অর্থ গ্রাম্য যুবক বা প্রেমিক। প্রথাগত ইংরেজি ব্যাকরণে এর feminine রূপ ধরা হয় Nymph (রূপসী তরুণী)।
— এই ধরনের কাব্যিক gender-জোড়া (poetic gender pairs) সরকারি চাকরির পরীক্ষায় প্রায়ই আসে, তাই আলাদাভাবে মুখস্থ রাখা ভালো।

ভুল অপশনগুলো কেন নয়:
— Dame — সম্মানসূচক নারী উপাধি, Swain-এর প্রথাগত feminine জোড়া নয়।
— Sire — এটি Masculine অর্থে (প্রভু/রাজা) ব্যবহৃত হয়।

উৎস: প্রমিত ইংরেজি ব্যাকরণ (classical gender list)।`,
        subject: "English",
        topic: "Number and Gender",
        subTopic: "Masculine-Feminine Word Pairs",
        sortOrder: 8,
      },

      {
        questionSetId,
        slug: "common-gender-enemy",
        questionText: "Choose the gender of the word 'Enemy' from the given options.",
        optionA: "Masculine gender",
        optionB: "Feminine gender",
        optionC: "Common gender",
        optionD: "Neuter gender",
        correctAnswer: "C",
        explanation: `সঠিক উত্তর: Common gender

Enemy (শত্রু) শব্দটি নারী ও পুরুষ উভয়ের ক্ষেত্রেই ব্যবহার করা যায় বলে এটি Common Gender।
— একই গোত্রের আরও শব্দ: Friend, Infant, Orphan, Baby, Student, Teacher, Citizen।

ভুল অপশনগুলো কেন নয়:
— Masculine/Feminine — Enemy নির্দিষ্টভাবে কোনো এক লিঙ্গকে বোঝায় না, তাই এই দুটি প্রযোজ্য নয়।
— Neuter — Neuter gender জড় বস্তুর ক্ষেত্রে ব্যবহৃত হয়, কিন্তু Enemy একজন ব্যক্তি হতে পারে।

উৎস: প্রমিত ইংরেজি ব্যাকরণ।`,
        subject: "English",
        topic: "Number and Gender",
        subTopic: "Common Gender",
        sortOrder: 9,
      },

      {
        questionSetId,
        slug: "feminine-gender-votary",
        questionText: "Choose the feminine gender of 'Votary'.",
        optionA: "Votary",
        optionB: "Votarie",
        optionC: "Votaress",
        optionD: "Votariss",
        correctAnswer: "C",
        explanation: `সঠিক উত্তর: Votaress

Votary অর্থ উপাসক বা অনুরাগী (a person devoted to a religion or cause)। এর feminine রূপ Votaress।

ভুল অপশনগুলো কেন নয়:
— Votarie, Votariss — ভুল বানান, ইংরেজিতে এমন কোনো শব্দ নেই।

উৎস: প্রমিত ইংরেজি ব্যাকরণ ও অভিধান।`,
        subject: "English",
        topic: "Number and Gender",
        subTopic: "Masculine-Feminine Word Pairs",
        sortOrder: 10,
      },

      {
        questionSetId,
        slug: "masculine-gender-mare",
        questionText: "Which of the following will be the masculine gender of the word 'Mare'?",
        optionA: "Doe",
        optionB: "Horse",
        optionC: "Abbot",
        optionD: "Abbess",
        correctAnswer: "B",
        explanation: `সঠিক উত্তর: Horse

Mare অর্থ স্ত্রী ঘোড়া (a female horse); এর masculine রূপ সাধারণভাবে Horse (নির্দিষ্টভাবে Stallion)।

ভুল অপশনগুলো কেন নয়:
— Doe — স্ত্রী হরিণ (Feminine); masculine হলো Buck।
— Abbot — পুরুষ মঠাধ্যক্ষ (Masculine), কিন্তু এটি Mare-এর সাথে সম্পর্কিত নয়।
— Abbess — এটি Feminine gender, প্রশ্নের চাহিদার বিপরীত।

উৎস: প্রমিত ইংরেজি ব্যাকরণ ও অভিধান।`,
        subject: "English",
        topic: "Number and Gender",
        subTopic: "Masculine-Feminine Word Pairs",
        sortOrder: 11,
      },

      {
        questionSetId,
        slug: "plural-number-crisis-crises",
        questionText: "Choose the plural number.",
        optionA: "Radius",
        optionB: "Crises",
        optionC: "Medium",
        optionD: "Thesis",
        correctAnswer: "B",
        explanation: `সঠিক উত্তর: Crises

Crises হলো Crisis (সংকট)-এর plural রূপ। গ্রিক বংশোদ্ভূত -is দিয়ে শেষ হওয়া শব্দের plural সাধারণত -es হয়ে যায় (is → es)।
— একই নিয়মের আরও শব্দ: Analysis–Analyses, Thesis–Theses, Axis–Axes।

ভুল অপশনগুলো কেন নয়:
— Radius, Medium — এই দুটি singular রূপ (plural যথাক্রমে Radii, Media)।
— Thesis — এটিও singular রূপ (plural Theses), নিজে plural নয়।

উৎস: প্রমিত ইংরেজি ব্যাকরণ ও অভিধান।`,
        subject: "English",
        topic: "Number and Gender",
        subTopic: "Plural of Foreign/Latin-Greek Words",
        sortOrder: 12,
      },

      {
        questionSetId,
        slug: "identify-singular-number-focus",
        questionText: "Identify the singular number from the following options.",
        optionA: "Radii",
        optionB: "Media",
        optionC: "Focus",
        optionD: "Data",
        correctAnswer: "C",
        explanation: `সঠিক উত্তর: Focus

Focus (কেন্দ্রবিন্দু) একটি singular শব্দ; এর plural রূপ Foci অথবা Focuses।
— ল্যাটিন থেকে আসা -us দিয়ে শেষ হওয়া অনেক শব্দের plural হয় -i দিয়ে, যেমন Nucleus–Nuclei, Radius–Radii।

ভুল অপশনগুলো কেন নয়:
— Radii — Radius-এর plural।
— Media — Medium-এর plural।
— Data — Datum-এর plural।

উৎস: প্রমিত ইংরেজি ব্যাকরণ ও অভিধান।`,
        subject: "English",
        topic: "Number and Gender",
        subTopic: "Plural of Foreign/Latin-Greek Words",
        sortOrder: 13,
      },

      {
        questionSetId,
        slug: "plural-form-goose-geese",
        questionText: "Which of the following is plural?",
        optionA: "News",
        optionB: "Linguistics",
        optionC: "Geese",
        optionD: "Furniture",
        correctAnswer: "C",
        explanation: `সঠিক উত্তর: Geese

Geese হলো Goose (রাজহাঁস জাতীয় পাখি)-এর irregular plural — vowel পরিবর্তনের মাধ্যমে plural গঠিত হয়, s/es যোগ করে নয়।
— একই ধরনের আরও শব্দ: Tooth–Teeth, Foot–Feet, Mouse–Mice, Man–Men।

ভুল অপশনগুলো কেন নয়:
— News, Linguistics, Furniture — এই তিনটিই সবসময় singular (uncountable) noun হিসেবে ব্যবহৃত হয়, plural নয়।

উৎস: প্রমিত ইংরেজি ব্যাকরণ ও অভিধান।`,
        subject: "English",
        topic: "Number and Gender",
        subTopic: "Irregular Plural Forms",
        sortOrder: 14,
      },

      {
        questionSetId,
        slug: "common-gender-orphan",
        questionText: "Which gender is the word 'Orphan'?",
        optionA: "Neuter",
        optionB: "Feminine",
        optionC: "Masculine",
        optionD: "Common",
        correctAnswer: "D",
        explanation: `সঠিক উত্তর: Common gender

Orphan (এতিম) এমন শিশুকে বোঝায় যার বাবা-মা মারা গেছেন — ছেলে বা মেয়ে উভয়ের ক্ষেত্রেই প্রযোজ্য, তাই এটি Common Gender।
— এটি একটি বহুল-প্রচলিত প্রশ্ন; বাস্তবে ৪৩তম বিসিএস প্রিলিমিনারিতেও এই ধরনের প্রশ্ন এসেছিল।
— Gender মূলত চার প্রকার: Masculine (Man, Boy, Bull), Feminine (Woman, Cow, Girl), Neuter (Book, Table), Common (Baby, Student, Orphan)।

ভুল অপশনগুলো কেন নয়:
— Neuter — এটি জড় বস্তুর জন্য প্রযোজ্য, কিন্তু Orphan একজন ব্যক্তি।
— Feminine/Masculine — Orphan নির্দিষ্টভাবে কোনো একটি লিঙ্গ বোঝায় না।

উৎস: প্রমিত ইংরেজি ব্যাকরণ; পূর্ববর্তী বিসিএস প্রিলিমিনারি প্রশ্নপত্র।`,
        subject: "English",
        topic: "Number and Gender",
        subTopic: "Common Gender",
        sortOrder: 15,
      },

      {
        questionSetId,
        slug: "opposite-gender-administrator",
        questionText: "Opposite gender of 'administrator' is —",
        optionA: "administratrix",
        optionB: "administratorix",
        optionC: "administratess",
        optionD: "administrix",
        correctAnswer: "A",
        explanation: `সঠিক উত্তর: administratrix

Administrator (পরিচালক/প্রশাসক) শব্দের feminine রূপ administratrix — ইংরেজিতে -or দিয়ে শেষ হওয়া কিছু শব্দের feminine হয় -or বাদ দিয়ে -trix যোগ করে।
— একই নিয়মের উদাহরণ: Aviator–Aviatrix, Executor–Executrix।

ভুল অপশনগুলো কেন নয়:
— administratorix, administratess, administrix — এগুলো সঠিক গঠন-নিয়ম মেনে তৈরি করা শব্দ নয়; ইংরেজিতে এসব রূপ ব্যবহৃত হয় না।

উৎস: প্রমিত ইংরেজি ব্যাকরণ ও অভিধান।`,
        subject: "English",
        topic: "Number and Gender",
        subTopic: "Masculine-Feminine Word Pairs",
        sortOrder: 16,
      },

      {
        questionSetId,
        slug: "feminine-gender-actor",
        questionText: "What is the feminine form of \"actor\"?",
        optionA: "Actoress",
        optionB: "Actress",
        optionC: "Acting",
        optionD: "Ctorine",
        correctAnswer: "B",
        explanation: `সঠিক উত্তর: Actress

Actor (অভিনেতা)-এর feminine রূপ Actress (অভিনেত্রী)। আধুনিক ব্যবহারে 'Actor' শব্দটি এখন প্রায়ই উভয় লিঙ্গের জন্য ব্যবহৃত হলেও, প্রথাগত ব্যাকরণ ও পরীক্ষায় Actor–Actress জোড়াটিই সঠিক উত্তর হিসেবে ধরা হয়।

ভুল অপশনগুলো কেন নয়:
— Actoress, Ctorine — ভুল বানান/অস্তিত্বহীন শব্দ।
— Acting — এটি একটি noun/gerund, কিন্তু gender নির্দেশক শব্দ নয়; বরং একটি কাজ বা প্রক্রিয়া বোঝায়।

উৎস: প্রমিত ইংরেজি ব্যাকরণ ও অভিধান।`,
        subject: "English",
        topic: "Number and Gender",
        subTopic: "Masculine-Feminine Word Pairs",
        sortOrder: 17,
      },

      {
        questionSetId,
        slug: "neuter-gender-table",
        questionText: "Which of the following is a neuter gender?",
        optionA: "King",
        optionB: "Queen",
        optionC: "Table",
        optionD: "Hero",
        correctAnswer: "C",
        explanation: `সঠিক উত্তর: Table

Table (টেবিল) একটি জড় বস্তু, যার কোনো পুরুষ বা স্ত্রী লিঙ্গ নেই — তাই এটি Neuter Gender।

ভুল অপশনগুলো কেন নয়:
— King — পুরুষ শাসক (Masculine)।
— Queen — নারী শাসক (Feminine)।
— Hero — বীর পুরুষ (Masculine); feminine হলো Heroine।

উৎস: প্রমিত ইংরেজি ব্যাকরণ।`,
        subject: "English",
        topic: "Number and Gender",
        subTopic: "Neuter Gender",
        sortOrder: 18,
      },

      {
        questionSetId,
        slug: "common-gender-baby",
        questionText: "What is the common gender noun in the following?",
        optionA: "Uncle",
        optionB: "Baby",
        optionC: "Lion",
        optionD: "Princess",
        correctAnswer: "B",
        explanation: `সঠিক উত্তর: Baby

Baby (শিশু) ছেলে বা মেয়ে — উভয়ের ক্ষেত্রেই ব্যবহার করা যায়, তাই এটি Common Gender noun।

ভুল অপশনগুলো কেন নয়:
— Uncle — পুরুষ আত্মীয় (Masculine)।
— Lion — পুরুষ সিংহ (Masculine); feminine হলো Lioness।
— Princess — রাজকন্যা (Feminine)।

উৎস: প্রমিত ইংরেজি ব্যাকরণ।`,
        subject: "English",
        topic: "Number and Gender",
        subTopic: "Common Gender",
        sortOrder: 19,
      },

      {
        questionSetId,
        slug: "feminine-gender-wizard",
        questionText: "The feminine form of \"wizard\" is —",
        optionA: "Witch",
        optionB: "Warlock",
        optionC: "Lord",
        optionD: "Wizarde",
        correctAnswer: "A",
        explanation: `সঠিক উত্তর: Witch

Wizard (পুরুষ জাদুকর)-এর feminine রূপ Witch (নারী জাদুকর/ডাইনি)।

ভুল অপশনগুলো কেন নয়:
— Warlock — এটিও পুরুষবাচক শব্দ (কালো জাদুতে পারদর্শী পুরুষ), feminine নয়।
— Lord — সম্মানসূচক পুরুষ উপাধি, Wizard-এর সাথে সরাসরি সম্পর্কিত নয়।
— Wizarde — এমন কোনো ইংরেজি শব্দ নেই।

উৎস: প্রমিত ইংরেজি ব্যাকরণ ও অভিধান।`,
        subject: "English",
        topic: "Number and Gender",
        subTopic: "Masculine-Feminine Word Pairs",
        sortOrder: 20,
      },

      {
        questionSetId,
        slug: "masculine-gender-niece",
        questionText: "The masculine form of \"niece\" is —",
        optionA: "Nephew",
        optionB: "Uncle",
        optionC: "Brother",
        optionD: "Son",
        correctAnswer: "A",
        explanation: `সঠিক উত্তর: Nephew

Niece (ভাইঝি/বোনঝি)-এর masculine রূপ Nephew (ভাতিজা/ভাগ্নে)।

ভুল অপশনগুলো কেন নয়:
— Uncle — চাচা/মামা, এটি ভিন্ন একটি আত্মীয়তার সম্পর্ক বোঝায়।
— Brother — ভাই, এটিও ভিন্ন সম্পর্ক।
— Son — ছেলে, এটিও ভিন্ন সম্পর্ক নির্দেশ করে।

উৎস: প্রমিত ইংরেজি ব্যাকরণ ও অভিধান।`,
        subject: "English",
        topic: "Number and Gender",
        subTopic: "Masculine-Feminine Word Pairs",
        sortOrder: 21,
      },

      {
        questionSetId,
        slug: "feminine-gender-peacock",
        questionText: "What is the feminine form of \"peacock\"?",
        optionA: "Peahen",
        optionB: "Peawoman",
        optionC: "Peafowl",
        optionD: "Henpeacock",
        correctAnswer: "A",
        explanation: `সঠিক উত্তর: Peahen

Peacock (ময়ূর)-এর feminine রূপ Peahen (ময়ূরী)। 'Peafowl' পুরো প্রজাতির সাধারণ নাম, যা নারী-পুরুষ আলাদা করে বোঝায় না।

ভুল অপশনগুলো কেন নয়:
— Peawoman, Henpeacock — এমন কোনো ইংরেজি শব্দ নেই।
— Peafowl — এটি প্রজাতির সাধারণ নাম, নির্দিষ্ট feminine রূপ নয়।

উৎস: প্রমিত ইংরেজি ব্যাকরণ ও অভিধান।`,
        subject: "English",
        topic: "Number and Gender",
        subTopic: "Masculine-Feminine Word Pairs",
        sortOrder: 22,
      },

      {
        questionSetId,
        slug: "always-singular-news",
        questionText: "Which word is always singular and has no plural form?",
        optionA: "Scissors",
        optionB: "News",
        optionC: "Pants",
        optionD: "Glasses",
        correctAnswer: "B",
        explanation: `সঠিক উত্তর: News

News (সংবাদ) একটি uncountable noun, যা সবসময় singular হিসেবে ব্যবহৃত হয় এবং এর কোনো plural রূপ নেই।

ভুল অপশনগুলো কেন নয়:
— Scissors — সবসময় plural (These scissors are sharp)।
— Pants — সবসময় plural (My pants are new)।
— Glasses — চশমা অর্থে সবসময় plural (These glasses are expensive)।

উৎস: প্রমিত ইংরেজি ব্যাকরণ ও অভিধান।`,
        subject: "English",
        topic: "Number and Gender",
        subTopic: "Always Singular Nouns",
        sortOrder: 23,
      },

      {
        questionSetId,
        slug: "plural-of-cactus",
        questionText: "The plural of \"cactus\" is —",
        optionA: "Cactuses",
        optionB: "Cacti",
        optionC: "Both A and B",
        optionD: "Cactuss",
        correctAnswer: "C",
        explanation: `সঠিক উত্তর: Both A and B (Cactuses ও Cacti)

Cactus (নাগফণী/ফণিমনসা) শব্দের দুটি সঠিক plural রূপ রয়েছে — নিয়মিত রূপ Cactuses এবং ল্যাটিন রূপ Cacti। দুটোই ব্যাকরণসম্মত ও ব্যবহারযোগ্য।

ভুল অপশনগুলো কেন নয়:
— শুধু Cactuses বা শুধু Cacti বেছে নিলে উত্তরটি অসম্পূর্ণ থেকে যায়, কারণ দুটোই গ্রহণযোগ্য রূপ।
— Cactuss — ভুল বানান।

উৎস: Cambridge Dictionary, Merriam-Webster Dictionary।`,
        subject: "English",
        topic: "Number and Gender",
        subTopic: "Plural of Foreign/Latin-Greek Words",
        sortOrder: 24,
      },

      {
        questionSetId,
        slug: "plural-of-knife",
        questionText: "What is the correct plural of \"knife\"?",
        optionA: "Knifes",
        optionB: "Knives",
        optionC: "Knive",
        optionD: "Knifs",
        correctAnswer: "B",
        explanation: `সঠিক উত্তর: Knives

Knife (ছুরি) শব্দের plural গঠনের সময় শেষের 'fe' পরিবর্তিত হয়ে 'ves' হয় — Knife → Knives।
— একই নিয়মের আরও শব্দ: Life–Lives, Wife–Wives, Leaf–Leaves।

ভুল অপশনগুলো কেন নয়:
— Knifes, Knive, Knifs — এগুলো সাধারণ s-যোগ নিয়মে তৈরি হলেও 'knife'-এর ক্ষেত্রে প্রযোজ্য নয়, তাই ভুল।

উৎস: প্রমিত ইংরেজি ব্যাকরণ ও অভিধান।`,
        subject: "English",
        topic: "Number and Gender",
        subTopic: "Irregular Plural Forms",
        sortOrder: 25,
      },

      {
        questionSetId,
        slug: "singular-of-mice",
        questionText: "What is the singular form of \"mice\"?",
        optionA: "Mouses",
        optionB: "Mouse",
        optionC: "Mices",
        optionD: "Meese",
        correctAnswer: "B",
        explanation: `সঠিক উত্তর: Mouse

Mice হলো Mouse (ইঁদুর)-এর irregular plural রূপ, তাই এর singular রূপ Mouse।

ভুল অপশনগুলো কেন নয়:
— Mouses — এই রূপ প্রাণীবাচক অর্থে ব্যবহৃত হয় না, শুধু কম্পিউটার মাউসের ক্ষেত্রে informal ব্যবহারে দেখা যায়।
— Mices, Meese — এমন কোনো সঠিক ইংরেজি শব্দ নেই।

উৎস: প্রমিত ইংরেজি ব্যাকরণ ও অভিধান।`,
        subject: "English",
        topic: "Number and Gender",
        subTopic: "Irregular Plural Forms",
        sortOrder: 26,
      },

      {
        questionSetId,
        slug: "plural-of-child",
        questionText: "Which of the following is the correct plural form of \"child\"?",
        optionA: "Childs",
        optionB: "Children",
        optionC: "Childes",
        optionD: "Childen",
        correctAnswer: "B",
        explanation: `সঠিক উত্তর: Children

Child (শিশু) শব্দের irregular plural রূপ Children — vowel ও suffix উভয়ই পরিবর্তিত হয়।

ভুল অপশনগুলো কেন নয়:
— Childs, Childes, Childen — এগুলো নিয়মিত plural গঠনের ভুল প্রচেষ্টা বা ভুল বানান; ইংরেজিতে সঠিক নয়।

উৎস: প্রমিত ইংরেজি ব্যাকরণ ও অভিধান।`,
        subject: "English",
        topic: "Number and Gender",
        subTopic: "Irregular Plural Forms",
        sortOrder: 27,
      },

      {
        questionSetId,
        slug: "plural-of-ant",
        questionText: "What is the plural of 'ant'?",
        optionA: "Antves",
        optionB: "Ants",
        optionC: "Anties",
        optionD: "Drone",
        correctAnswer: "B",
        explanation: `সঠিক উত্তর: Ants

Ant (পিঁপড়া) শব্দটি নিয়মিত plural গঠনের নিয়ম মেনে চলে — শেষে শুধু s যোগ করে Ants হয়।

ভুল অপশনগুলো কেন নয়:
— Antves, Anties — ভুল বানান/ভুল গঠন।
— Drone — এটি মৌমাছি বা পিঁপড়ার একটি প্রজননক্ষম পুরুষ সদস্যকে বোঝায়; এটি 'Ant'-এর plural নয়।

উৎস: প্রমিত ইংরেজি ব্যাকরণ ও অভিধান।`,
        subject: "English",
        topic: "Number and Gender",
        subTopic: "Regular Plural Formation",
        sortOrder: 28,
      },

      {
        questionSetId,
        slug: "feminine-gender-colt",
        questionText: "Feminine form of 'Colt' is —",
        optionA: "Hart",
        optionB: "Roe",
        optionC: "Mare",
        optionD: "Filly",
        correctAnswer: "D",
        explanation: `সঠিক উত্তর: Filly

Colt (পুরুষ অশ্বশাবক) শব্দের feminine রূপ Filly (স্ত্রী অশ্বশাবক)।

ভুল অপশনগুলো কেন নয়:
— Hart — পুরুষ হরিণ (Masculine); feminine হলো Roe।
— Roe — উপরের Hart-এর feminine, Colt-এর সাথে সম্পর্কিত নয়।
— Mare — পূর্ণবয়স্ক স্ত্রী ঘোড়া বোঝায়, কিন্তু Colt বিশেষভাবে শাবক (young horse) বোঝায় বলে এর সঠিক জোড়া Filly।

উৎস: প্রমিত ইংরেজি ব্যাকরণ (classical gender list)।`,
        subject: "English",
        topic: "Number and Gender",
        subTopic: "Masculine-Feminine Word Pairs",
        sortOrder: 29,
      },

      {
        questionSetId,
        slug: "plural-of-memorandum",
        questionText: "Plural of 'Memorandum' is —",
        optionA: "Memorandumess",
        optionB: "Memorandii",
        optionC: "Memorandi",
        optionD: "Memoranda",
        correctAnswer: "D",
        explanation: `সঠিক উত্তর: Memoranda

Memorandum (স্মারকলিপি) একটি ল্যাটিন বংশোদ্ভূত শব্দ, যার plural রূপ Memoranda (-um → -a নিয়মে)।
— একই নিয়মের আরও শব্দ: Datum–Data, Agendum–Agenda।

ভুল অপশনগুলো কেন নয়:
— Memorandumess, Memorandii, Memorandi — এগুলো ভুল/অস্তিত্বহীন গঠন।

উৎস: Cambridge Dictionary।`,
        subject: "English",
        topic: "Number and Gender",
        subTopic: "Plural of Foreign/Latin-Greek Words",
        sortOrder: 30,
      },

      {
        questionSetId,
        slug: "feminine-gender-rooster-hen",
        questionText: "The feminine gender of 'Rooster' is —",
        optionA: "Roe",
        optionB: "Filly",
        optionC: "Hen",
        optionD: "Heifer",
        correctAnswer: "C",
        explanation: `সঠিক উত্তর: Hen

Rooster (পোষা মোরগ)-এর feminine রূপ Hen (মুরগি)।

ভুল অপশনগুলো কেন নয়:
— Heifer — বকনা বাছুর (গরুর ক্ষেত্রে প্রযোজ্য); masculine Bullock।
— Filly — স্ত্রী অশ্বশাবক (ঘোড়ার ক্ষেত্রে প্রযোজ্য); masculine Colt।
— Roe — হরিণী (হরিণের ক্ষেত্রে প্রযোজ্য); masculine Hart।

উৎস: প্রমিত ইংরেজি ব্যাকরণ ও অভিধান।`,
        subject: "English",
        topic: "Number and Gender",
        subTopic: "Masculine-Feminine Word Pairs",
        sortOrder: 31,
      },

      {
        questionSetId,
        slug: "common-gender-monarch",
        questionText: "What kind of gender is the word 'Monarch'?",
        optionA: "Masculine gender",
        optionB: "Feminine gender",
        optionC: "Neuter gender",
        optionD: "Common gender",
        correctAnswer: "D",
        explanation: `সঠিক উত্তর: Common gender

Monarch (রাজা, রানি বা সম্রাট-সম্রাজ্ঞীর মতো সর্বোচ্চ শাসক) নারী ও পুরুষ উভয়ের ক্ষেত্রেই ব্যবহৃত হয়, তাই এটি Common Gender।

ভুল অপশনগুলো কেন নয়:
— Masculine/Feminine — Monarch নির্দিষ্টভাবে একটি লিঙ্গ বোঝায় না।
— Neuter — Monarch একজন ব্যক্তি, জড় বস্তু নয়।

উৎস: Oxford Learner's Dictionary।`,
        subject: "English",
        topic: "Number and Gender",
        subTopic: "Common Gender",
        sortOrder: 32,
      },

      {
        questionSetId,
        slug: "plural-of-index",
        questionText: "Which of the following is the plural form of 'Index'?",
        optionA: "Indiceis",
        optionB: "Indexies",
        optionC: "Indexs",
        optionD: "Indices",
        correctAnswer: "D",
        explanation: `সঠিক উত্তর: Indices

Index (সূচক/নির্দেশক)-এর plural রূপ হতে পারে Indices (গাণিতিক/প্রযুক্তিগত অর্থে) অথবা Indexes (সাধারণ অর্থে, যেমন বইয়ের সূচিপত্র)। প্রদত্ত অপশনগুলোর মধ্যে সঠিক গঠন Indices।

ভুল অপশনগুলো কেন নয়:
— Indiceis, Indexies, Indexs — এগুলো ভুল বানান, ইংরেজিতে এমন রূপ নেই।

উৎস: Cambridge & Merriam-Webster Dictionary।`,
        subject: "English",
        topic: "Number and Gender",
        subTopic: "Plural of Foreign/Latin-Greek Words",
        sortOrder: 33,
      },

      {
        questionSetId,
        slug: "always-singular-physics",
        questionText: "Select the singular number.",
        optionA: "Physics",
        optionB: "Police",
        optionC: "People",
        optionD: "Cattle",
        correctAnswer: "A",
        explanation: `সঠিক উত্তর: Physics

Physics (পদার্থবিজ্ঞান) একটি বিষয়ের নাম হওয়ায় এটি সবসময় Singular Number হিসেবে ব্যবহৃত হয়, যদিও শেষে 's' আছে।
— একই গোত্রের আরও শব্দ: Economics, Politics, Mathematics, News।
— বিপরীতে কিছু শব্দ সবসময় Plural: People, Police, Cattle।

ভুল অপশনগুলো কেন নয়:
— Police, People, Cattle — এই তিনটিই সবসময় plural হিসেবে ব্যবহৃত হয়।

উৎস: প্রমিত ইংরেজি ব্যাকরণ ও অভিধান।`,
        subject: "English",
        topic: "Number and Gender",
        subTopic: "Always Singular Nouns",
        sortOrder: 34,
      },

      {
        questionSetId,
        slug: "plural-of-ox",
        questionText: "Choose the plural form of 'Ox'.",
        optionA: "Oxes",
        optionB: "Oxen",
        optionC: "Oxi",
        optionD: "Oxs",
        correctAnswer: "B",
        explanation: `সঠিক উত্তর: Oxen

Ox (ষাঁড়/বলদ) শব্দের plural রূপ Oxen — এটি ইংরেজির অন্যতম প্রাচীন irregular plural, যা -en যোগ করে গঠিত হয়।
— একই নিয়মের আরেকটি পরিচিত উদাহরণ: Child–Children।

ভুল অপশনগুলো কেন নয়:
— Oxes, Oxi, Oxs — এগুলো নিয়মিত plural গঠনের ভুল প্রচেষ্টা, ইংরেজিতে সঠিক নয়।

উৎস: Merriam-Webster Dictionary, Oxford Learner's Dictionary।`,
        subject: "English",
        topic: "Number and Gender",
        subTopic: "Irregular Plural Forms",
        sortOrder: 35,
      },

      {
        questionSetId,
        slug: "plural-of-nucleus",
        questionText: "What is the plural of 'Nucleus'?",
        optionA: "Nucleuses",
        optionB: "Nuclei",
        optionC: "Nucleain",
        optionD: "Nucleas",
        correctAnswer: "B",
        explanation: `সঠিক উত্তর: Nuclei

Nucleus (কোষকেন্দ্র/নিউক্লিয়াস) একটি ল্যাটিন বংশোদ্ভূত শব্দ, যার plural রূপ Nuclei (-us → -i নিয়মে)।
— একই নিয়মের আরও শব্দ: Focus–Foci, Radius–Radii, Stimulus–Stimuli।

ভুল অপশনগুলো কেন নয়:
— Nucleuses — কথ্য ব্যবহারে কিছুটা দেখা গেলেও, প্রমিত/একাডেমিক উত্তর হিসেবে Nuclei-ই সঠিক ধরা হয়।
— Nucleain, Nucleas — ভুল বানান, ইংরেজিতে এমন শব্দ নেই।

উৎস: Cambridge Dictionary, Merriam-Webster Dictionary।`,
        subject: "English",
        topic: "Number and Gender",
        subTopic: "Plural of Foreign/Latin-Greek Words",
        sortOrder: 36,
      },

      {
        questionSetId,
        slug: "feminine-gender-duke",
        questionText: "The feminine gender of 'Duke' is —",
        optionA: "Duchess",
        optionB: "Countess",
        optionC: "Baroness",
        optionD: "Madam",
        correctAnswer: "A",
        explanation: `সঠিক উত্তর: Duchess

Duke (ডিউক, ব্রিটিশ অভিজাত উপাধিতে সর্বোচ্চ পদমর্যাদার একজন) শব্দের feminine রূপ Duchess।

ভুল অপশনগুলো কেন নয়:
— Countess — এটি Count/Earl উপাধির feminine রূপ, Duke-এর নয়।
— Baroness — এটি Baron উপাধির feminine রূপ।
— Madam — সাধারণ সম্মানসূচক সম্বোধন, নির্দিষ্ট কোনো উপাধি নয়।

উৎস: Oxford Learner's Dictionary।`,
        subject: "English",
        topic: "Number and Gender",
        subTopic: "Masculine-Feminine Word Pairs",
        sortOrder: 37,
      },

      {
        questionSetId,
        slug: "common-gender-teacher",
        questionText: "Which of the following is a Common Gender?",
        optionA: "Teacher",
        optionB: "Actor",
        optionC: "Duke",
        optionD: "Widower",
        correctAnswer: "A",
        explanation: `সঠিক উত্তর: Teacher

Teacher (শিক্ষক/শিক্ষিকা) নারী ও পুরুষ উভয়ের ক্ষেত্রেই ব্যবহৃত হয়, তাই এটি Common Gender।

ভুল অপশনগুলো কেন নয়:
— Actor — সাধারণত Masculine ধরা হয় (feminine: Actress)।
— Duke — নির্দিষ্টভাবে Masculine (feminine: Duchess)।
— Widower — নির্দিষ্টভাবে Masculine (feminine: Widow)।

উৎস: প্রমিত ইংরেজি ব্যাকরণ।`,
        subject: "English",
        topic: "Number and Gender",
        subTopic: "Common Gender",
        sortOrder: 38,
      },

      {
        questionSetId,
        slug: "always-singular-mumps",
        questionText: "Which of the following words is always used in the singular form?",
        optionA: "Trousers",
        optionB: "Mumps",
        optionC: "Cattle",
        optionD: "Data",
        correctAnswer: "B",
        explanation: `সঠিক উত্তর: Mumps

Mumps (গালফুলা রোগ) শব্দের শেষে 's' থাকলেও এটি সবসময় singular verb নেয় এবং একটি নির্দিষ্ট রোগকে বোঝায়, তাই এটি always singular শব্দ।
— একই গোত্রের আরও রোগের নাম: Measles, Rickets — এগুলোও -s দিয়ে শেষ হলেও singular হিসেবে গণ্য হয়।

ভুল অপশনগুলো কেন নয়:
— Trousers — সবসময় plural (These trousers are new)।
— Cattle — সবসময় plural।
— Data — Datum-এর plural রূপ, তাই plural হিসেবে গণ্য।

উৎস: Merriam-Webster Dictionary।`,
        subject: "English",
        topic: "Number and Gender",
        subTopic: "Always Singular Nouns",
        sortOrder: 39,
      },
    ],

    skipDuplicates: true,
  });
  console.log('✓ Seeded 39 Number and Gender questions');
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
