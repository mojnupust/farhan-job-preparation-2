import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
// TODO: replace with the actual QuestionSet id for this exam before running
const questionSetId = 'cmtn8bqem0030ah01om1xyxoa';

async function main() {
  // Seed mock questions
  await prisma.question.createMany({
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // "MASTER" Pronoun Chapter — HIGH-FREQUENCY MCQ SEED (Farhan MCQ)
    // উৎস: "MASTER" Pronoun অধ্যায় (পৃষ্ঠা ৫০-৬৯), ২৪০+ MCQ, ১০০+ ভিন্ন
    // সরকারি নিয়োগ পরীক্ষার citation (বিসিএস, ব্যাংক, প্রাথমিক শিক্ষক,
    // এনটিআরসিএ, বিশ্ববিদ্যালয় ভর্তি/বিভাগীয় ইউনিট, মন্ত্রণালয়)।
    //
    // ৩০টি সর্বোচ্চ গুরুত্বপূর্ণ প্রশ্ন বেছে নেওয়া হয়েছে এবং exam-citation
    // সংখ্যা অনুযায়ী নিয়ম-ভিত্তিক পুনরাবৃত্তি ক্রম (ruleRank) অনুসারে
    // sortOrder সাজানো হয়েছে (সবচেয়ে বেশি পুনরাবৃত্ত নিয়ম আগে):
    //
    //  ১. "231" ক্রম নিয়ম (সাধারণ বিবৃতি: 2nd→3rd→1st person)   [৩টি প্রশ্ন]
    //  ২. "123" ক্রম নিয়ম (দোষ/অপরাধ স্বীকার)                    [২টি প্রশ্ন]
    //  ৩. Object form নিয়ম (verb/let/preposition-এর পরে)         [৪টি প্রশ্ন]
    //  ৪. Relative pronoun নির্বাচন (who/whom/which/that/whoever/whose) [৫টি]
    //  ৫. "One of the + superlative + plural noun + singular verb"  [২টি]
    //  ৬. Comparative substitution — "that of" vs "those of"        [২টি]
    //  ৭. Be-verb + subjective form                                  [১টি]
    //  ৮. Distributive pronoun (each/either/neither)                 [৩টি]
    //  ৯. "One's" — One Subject হলে একমাত্র সঠিক possessive          [১টি]
    // ১০. Reflexive pronoun                                          [২টি]
    // ১১. Reciprocal pronoun (each other vs one another)             [১টি]
    // ১২. Possessive adjective + gerund; it's vs its; possessive idiom [৩টি]
    // ১৩. সম্পূর্ণ বিবৃতি Noun clause (Subject) হলে "that"            [১টি]
    //
    // ১-৪ নম্বর নিয়ম একাই ৩০টির মধ্যে ১৪টি প্রশ্ন দখল করে আছে — মূল
    // ২৪০-প্রশ্নের অধ্যায়েও এই চারটি নিয়মে সবচেয়ে বেশি ভিন্ন পরীক্ষার
    // citation পাওয়া গেছে, তাই প্রস্তুতির জন্য এগুলো সর্বোচ্চ অগ্রাধিকার।
    // মোট প্রশ্ন: ৩০টি (Pronoun অংশ)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    data: [
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // বিষয়: English Grammar — Pronoun — প্রশ্ন ০১–৩০
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

      {
        questionSetId,
        slug: 'pronoun-231-rule-01',
        questionText: 'Which one is the correct sentence given below?',
        optionA: 'You, he and I went there.',
        optionB: 'He, you and I went there.',
        optionC: 'I, you and he went there.',
        optionD: 'You, I and he went there.',
        correctAnswer: 'A',
        explanation: `সাধারণ বিবৃতিতে verb-এর পূর্বে একাধিক Person-এর subject একসাথে থাকলে ক্রম হয় প্রথমে 2nd Person, তারপর 3rd Person এবং সবশেষে 1st Person — সংক্ষেপে "231" নিয়ম। প্রত্যেকটি pronoun-ই Subjective form-এ বসে এবং verb সর্বদা Plural হয়।

এখানে "You" (2nd person), "he" (3rd person), "I" (1st person) — ক্রমটি ঠিক 2-3-1, অর্থাৎ 231 নিয়ম মেনে চলেছে। তিনটি pronoun-ই Subjective form-এ আছে (You, he, I), তাই বাক্যটি সঠিক।

বিভ্রান্তিকর অপশন এড়িয়ে চলুন:
— "He, you and I" — ক্রম হলো 3-2-1, যা 231 নিয়মের লঙ্ঘন (2nd person সবার আগে বসা দরকার ছিল)
— "I, you and he" — ক্রম 1-2-3, এটি সাধারণ বিবৃতির জন্য ভুল ক্রম (এই ক্রমটি কেবল দোষ স্বীকারের ক্ষেত্রে "123" নিয়মে ব্যবহৃত হয়, সাধারণ বিবৃতিতে নয়)
— "You, I and he" — ক্রম 2-1-3, অর্থাৎ 1st person 3rd person-এর আগে বসেছে, যা 231 নিয়ম অনুযায়ী ভুল

মনে রাখার কৌশল: সংখ্যা দিয়ে মনে রাখুন — "2-3-1" = You-He-I। সাধারণ কথায় বললে "তুমি-সে-আমি", কখনো "আমি" প্রথমে বসে না (দোষ স্বীকার না হলে)।`,
        subject: 'English Grammar',
        topic: 'Pronoun',
        subTopic: 'Personal Pronoun — 231 Order Rule',
        sortOrder: 1,
      },

      {
        questionSetId,
        slug: 'pronoun-231-rule-02',
        questionText: 'Choose the correct sentence:',
        optionA: 'I, you and he are present.',
        optionB: 'You, he and I are present.',
        optionC: 'You, he and I am present.',
        optionD: 'He, you and I are present.',
        correctAnswer: 'B',
        explanation: `231 নিয়ম অনুযায়ী ক্রম হবে 2nd-3rd-1st Person, প্রত্যেকটি Subjective form-এ থাকবে, এবং ভিন্ন Person একসাথে Subject হলে Verb সর্বদা Plural (are) হবে — কোনো একটি Person-এর সাথে মিলিয়ে Singular (am/is) বসে না।

"You, he and I" — ক্রম ঠিক 2-3-1, এবং verb "are" ব্যবহৃত হয়েছে যা যৌগিক ভিন্ন-Person Subject-এর জন্য নিয়ম অনুযায়ী সঠিক।

এই প্রশ্নটি একাধিক ভিন্ন নিয়োগ পরীক্ষায় হুবহু এসেছে — তথ্য মন্ত্রণালয়ের তথ্য অফিসার, কর্মসংস্থান ও প্রশিক্ষণ ব্যুরোর উপপরিচালক, BRDB-এর মাঠ সংগঠক, রাজশাহী বিশ্ববিদ্যালয় (E-জোড়) এবং রাজশাহী কৃষি উন্নয়ন ব্যাংকের সিনিয়র অফিসার নিয়োগ পরীক্ষা — মোট ৫টি ভিন্ন পরীক্ষায়, যা এই নিয়মের অত্যধিক পুনরাবৃত্তি প্রমাণ করে।

বিভ্রান্তিকর অপশন এড়িয়ে চলুন:
— "I, you and he" — ক্রম 1-2-3, 231 নিয়মের বিপরীত, তাই ভুল
— "You, he and I am present" — ক্রম (2-3-1) ঠিক থাকলেও verb "am" ব্যবহৃত হয়েছে যা শুধু 1st person singular-এর সাথে মেলে; যৌগিক Subject-এ verb সবসময় Plural "are" হয়
— "He, you and I" — ক্রম 3-2-1, যা 231 নিয়ম লঙ্ঘন করে (2nd person সবার আগে আসার কথা ছিল)

মনে রাখার কৌশল: "am" নয়, ভিন্ন Person মিলে Subject হলে verb সবসময় "are/were" — কারণ Person মিশ্রিত হলে Verb হিসাব করা হয় Plural হিসেবে।`,
        subject: 'English Grammar',
        topic: 'Pronoun',
        subTopic: 'Personal Pronoun — 231 Order Rule + Verb Agreement',
        sortOrder: 2,
      },

      {
        questionSetId,
        slug: 'pronoun-231-rule-03-simple',
        questionText: 'Choose the correct one.',
        optionA: 'He and me will go there.',
        optionB: 'He and I will go there.',
        optionC: 'Me and He will go there.',
        optionD: 'I and He will go there.',
        correctAnswer: 'B',
        explanation: `শুধু 3rd ও 1st Person থাকলে 231 নিয়ম সংক্ষিপ্ত হয়ে 3rd-তারপর-1st (He...I) ক্রমে দাঁড়ায়, এবং Subject-এর অংশ হওয়ায় pronoun দুটিই Subjective form-এ বসবে ("will go"-র subject হিসেবে)।

"He and I" — ক্রম 3-1 ঠিক আছে এবং উভয়ই Subjective form (He, I), কারণ এরা মিলিতভাবে verb "will go"-এর Subject।

বিভ্রান্তিকর অপশন এড়িয়ে চলুন:
— "He and me" — "me" Object form; কিন্তু এখানে pronoun-টি Subject-এর অংশ, তাই Subjective form "I" হওয়া উচিত ছিল
— "Me and He" — ক্রম উল্টো (1st person আগে) এবং "Me" Object form — দুটি ভুলই একসাথে আছে
— "I and He" — Case (I, He উভয়ই Subjective) ঠিক থাকলেও ক্রম ভুল — 1st person, 3rd person-এর আগে বসেছে, যা 231 নিয়ম লঙ্ঘন করে

মনে রাখার কৌশল: দুই Person হলে মনে রাখুন — "He and I", "You and I", "You and he" — কখনোই "I" সবার আগে না (দোষ স্বীকার না হলে)।`,
        subject: 'English Grammar',
        topic: 'Pronoun',
        subTopic: 'Personal Pronoun — 231 Order Rule (two persons)',
        sortOrder: 3,
      },

      {
        questionSetId,
        slug: 'pronoun-123-guilt-01',
        questionText: 'Choose the correct sentence:',
        optionA: 'I, you and he committed the crime.',
        optionB: 'You, he and I committed the crime.',
        optionC: 'He, I and you committed the crime.',
        optionD: 'I, he and you committed the crime.',
        correctAnswer: 'A',
        explanation: `দোষ, অপরাধ, ভুল বা ব্যর্থতা স্বীকার করার (guilty/to blame/committed/mess-এর মতো) বাক্যে সাধারণ "231" নিয়ম উল্টে যায় — ক্রম হয় 1st-তারপর-2nd-তারপর-3rd Person, সংক্ষেপে "123" নিয়ম। এই নিয়মের একটি বিকল্প রূপ "132"-ও ব্যাকরণে স্বীকৃত, তবে পরীক্ষার প্রশ্নে "123" ক্রমটিই মান-প্রমিত ও সর্বাধিক গৃহীত ধরা হয়।

"I, you and he" — ক্রম ঠিক 1-2-3, যা অপরাধ স্বীকারের প্রমিত নিয়ম মেনে চলে, তাই এটিই সঠিক উত্তর হিসেবে গৃহীত।

বিভ্রান্তিকর অপশন এড়িয়ে চলুন:
— "You, he and I" — এটি সাধারণ বিবৃতির (231) ক্রম; কিন্তু এখানে অপরাধ স্বীকারের প্রসঙ্গ (committed the crime), তাই 231 নয়, 123 নিয়ম প্রযোজ্য
— "He, I and you" — ক্রম 3-1-2, যা কোনো স্বীকৃত নিয়মের (123 বা 132) সাথেই মেলে না, তাই সরাসরি ভুল
— "I, he and you" — ক্রম 1-3-2, যা বিকল্প "132" প্যাটার্নের সাথে মেলে এবং ব্যাকরণগতভাবে অগ্রহণযোগ্য নয়, তবে পরীক্ষায় "123" ক্রমটিই বেশি প্রচলিত ও প্রমিত ধরা হয় বলে MCQ-তে একক সঠিক উত্তর "a" গৃহীত হয়েছে

মনে রাখার কৌশল: দোষ স্বীকারে ক্রম উল্টে যায় — সাধারণ বাক্যে 231 (You-He-I), কিন্তু দোষ/অপরাধে 123 (I-You-He) — "নিজের ভুল আগে স্বীকার করো" ভাবলে মনে থাকবে।`,
        subject: 'English Grammar',
        topic: 'Pronoun',
        subTopic: 'Personal Pronoun — 123 Order Rule (guilt/blame)',
        sortOrder: 4,
      },

      {
        questionSetId,
        slug: 'pronoun-123-guilt-not-02',
        questionText: 'He, not I, — to be held responsible for loss.',
        optionA: 'am',
        optionB: 'was (not I) — "He, not me, is to be held..."',
        optionC: 'is',
        optionD: 'is (...to be hold responsible...)',
        correctAnswer: 'C',
        explanation: `তিনটি নিয়ম একসাথে কাজ করে: ১) Verb-এর পূর্বে Subject form বসে। ২) "not"-এর আগে ও পরে দুটি Subject form থাকলে Verb বসে "not"-এর আগেরটির Person/Number অনুযায়ী। ৩) "to be" verb-এর পরে verb থাকলে Passive অর্থ বোঝালে Past Participle বসে (base form নয়)।

সঠিক বাক্য: "He, not I, is to be held responsible for loss." এখানে "not"-এর আগে "He" (3rd person singular) আছে বলে verb হবে "is", "I" উভয় পাশেই Subjective form-এ থাকবে ("not I", "not me" নয়), এবং Passive অর্থে "held" (Past Participle) বসবে, "hold" (base form) নয়।

বিভ্রান্তিকর অপশন এড়িয়ে চলুন:
— "am" — verb-টি "not"-এর পরের "I"-এর সাথে মিলিয়ে ধরা ভুল; নিয়ম অনুযায়ী verb "not"-এর আগের Subject "He"-এর সাথে মিলবে, তাই "am" নয়, "is" হবে
— "not me" রূপ — Object form ব্যবহার করা হয়েছে; কিন্তু "not"-এর দুই পাশেই Subject-নির্দেশক pronoun Subjective form-এ থাকতে হবে ("not I"), তাই এটি ভুল
— "...to be hold..." রূপ — verb "is" ঠিক থাকলেও base form "hold" ব্যবহৃত হয়েছে; Passive অর্থ (দায়ী গণ্য করা হবে) বোঝাতে Past Participle "held" দরকার, তাই এটি ভুল

মনে রাখার কৌশল: "not"-এর আগের Subject-ই Verb ঠিক করে দেয়; আর "to be"-এর পরে সবসময় Past Participle খুঁজবেন যদি Passive অর্থ বোঝায় (held, not hold)।`,
        subject: 'English Grammar',
        topic: 'Pronoun',
        subTopic: "Personal Pronoun — Subject Form with 'not' + Passive Infinitive",
        sortOrder: 5,
      },

      {
        questionSetId,
        slug: 'pronoun-object-form-verb-01',
        questionText: 'They called — on the telephone. (তারা আমাদের সাথে টেলিফোনে কথা বললো)',
        optionA: 'we',
        optionB: 'they',
        optionC: 'hers',
        optionD: 'us',
        correctAnswer: 'D',
        explanation: `"To be" verb ছাড়া অন্য যেকোনো verb-এর পরে pronoun-এর Object form (me, us, him, her, them) বসে। একাধিক Object form থাকলে দোষ/অপরাধ স্বীকার ছাড়া বাকি সব ক্ষেত্রে 231 নিয়ম অনুসারে প্রত্যেকটির Object form বসে।

"called" একটি সাধারণ action verb (to be নয়), তাই এর পরে pronoun Object form-এ বসবে — "we"-এর Object form "us"।

বিভ্রান্তিকর অপশন এড়িয়ে চলুন:
— "we" — Subjective form; verb-এর পরে Object form দরকার, তাই ভুল
— "they" — Subjective form এবং অর্থগতভাবেও Subject-এর পুনরাবৃত্তি হয়ে যায়, তাই ভুল
— "hers" — Possessive pronoun ("তার জিনিস" অর্থ বোঝায়); verb-এর Object হিসেবে অর্থহীন, তাই ভুল

মনে রাখার কৌশল: "to be" না হলে verb-এর পরে সবসময় Object form (me/us/him/her/them) — শুধু be-verb-এর পরেই Subject form বসে, এটাই মূল পার্থক্য।`,
        subject: 'English Grammar',
        topic: 'Pronoun',
        subTopic: 'Object Form of Pronoun — After a Verb',
        sortOrder: 6,
      },

      {
        questionSetId,
        slug: 'pronoun-object-form-let-01',
        questionText: 'Choose the correct sentence.',
        optionA: 'Let you and I go together',
        optionB: 'Let I and you go together',
        optionC: 'Let me and you go together',
        optionD: 'Let you and me go together',
        correctAnswer: 'D',
        explanation: `"Let" নিজেই একটি verb, তাই এর পরে pronoun-এর Object form বসে। একাধিক Object form থাকলে দোষ/অপরাধ স্বীকার ছাড়া বাকি ক্ষেত্রে 231 নিয়ম অনুযায়ী ক্রম ও Object form দুটোই বজায় থাকে (এখানে শুধু 2nd ও 1st person থাকায় ক্রম হবে you-me)।

এই প্রশ্নটি প্রাথমিক ও গণশিক্ষা অধিদপ্তরের সহকারী পরিচালক নিয়োগ পরীক্ষা এবং বেগম রোকেয়া বিশ্ববিদ্যালয় (D ইউনিট) ভর্তি পরীক্ষা — দুই ভিন্ন প্রেক্ষাপটে এসেছে।

"you and me" — উভয়ই Object form এবং ক্রমও ঠিক (2nd person "you" আগে, 1st person "me" পরে), তাই এটি নিয়ম মেনে চলে।

বিভ্রান্তিকর অপশন এড়িয়ে চলুন:
— "Let you and I" — "I" Subjective form; "Let"-এর পরে Object form "me" দরকার ছিল, তাই ভুল
— "Let I and you" — "I" Subjective form হওয়ার পাশাপাশি ক্রমও ভুল (1st person আগে বসেছে), দুই ভুল একসাথে
— "Let me and you" — "me and you" — উভয়ই Object form ঠিক থাকলেও ক্রম উল্টো; নিয়ম অনুযায়ী 2nd person আগে (you), 1st person পরে (me) বসতে হবে

মনে রাখার কৌশল: "Let" মানে verb — verb এর পরে সবসময় Object form; "Let you and me" মুখস্থ বাক্য হিসেবে মনে রাখুন।`,
        subject: 'English Grammar',
        topic: 'Pronoun',
        subTopic: "Object Form of Pronoun — After 'Let'",
        sortOrder: 7,
      },

      {
        questionSetId,
        slug: 'pronoun-object-form-preposition-between-01',
        questionText: 'Choose the correct sentence.',
        optionA: 'Between you and I, I doubt that he will come.',
        optionB: 'Between you and I, I doubt that he would come.',
        optionC: 'Between you and me, I doubt that he will come.',
        optionD: 'Between you and me, I doubt that he would come.',
        correctAnswer: 'C',
        explanation: `Preposition-এর পরে pronoun-এর Object form বসে। দুটি ব্যক্তি/বস্তুর ক্ষেত্রে "between" ব্যবহৃত হয় বলে "me" হবে, "them" নয়। এছাড়া প্রধান বাক্য বর্তমান কালে (I doubt) থাকলে অধীনস্থ বাক্যেও স্বাভাবিক ভবিষ্যৎ কাল (will) বসে, শর্তহীন প্রসঙ্গে "would" নয়।

এই প্রশ্নটি অগ্রণী ব্যাংক লি. সিনিয়র অফিসার, সোনালী ব্যাংক লি. অফিসার এবং সাউথইস্ট ব্যাংক লি. প্রবেশনারী অফিসার — মোট তিনটি ভিন্ন ব্যাংক নিয়োগ পরীক্ষায় এসেছে, যা এটিকে একটি অত্যন্ত পুনরাবৃত্ত ভুল-ধরার প্রশ্ন করে তুলেছে।

"Between you and me" — Preposition "Between"-এর পরে Object form "me" সঠিক; এবং "I doubt that he will come" — বর্তমান কালের সাথে স্বাভাবিক future "will" মানানসই।

বিভ্রান্তিকর অপশন এড়িয়ে চলুন:
— "Between you and I" (will) — Preposition-এর পরে Subjective form "I" ব্যবহার করা ভুল, Object form "me" দরকার ছিল
— "Between you and I" (would) — "I" ভুল case-এর পাশাপাশি "would come" ব্যবহৃত হয়েছে, যা কোনো condition/reported speech প্রসঙ্গ ছাড়া অপ্রাসঙ্গিক — দুই ভুল একসাথে
— "Between you and me" (would) — "you and me" ঠিক থাকলেও "would come" ভুল — বর্তমান কালের "I doubt"-এর সাথে সরল ভবিষ্যৎ "will come" প্রয়োজন, "would" নয়

মনে রাখার কৌশল: "Between you and me" — কখনো "Between you and I" লিখবেন না; Preposition-এর পরে সবসময় Object form, এটি সবচেয়ে বেশি ভুল হওয়া একটি জায়গা।`,
        subject: 'English Grammar',
        topic: 'Pronoun',
        subTopic: "Object Form of Pronoun — After a Preposition ('between')",
        sortOrder: 8,
      },

      {
        questionSetId,
        slug: 'pronoun-object-form-except-01',
        questionText: 'Every student in the classroom understands the lecture — .',
        optionA: 'except me',
        optionB: 'except I',
        optionC: 'excepting I',
        optionD: 'excepting me',
        correctAnswer: 'A',
        explanation: `"ব্যতীত" অর্থে "except" একটি Preposition হিসেবে ব্যবহৃত হয়, এবং Preposition-এর পরে pronoun-এর Object form বসে।

"except" এখানে Preposition (ব্যতীত অর্থে); তাই এর পরে Object form "me" বসবে — "except me" সঠিক।

বিভ্রান্তিকর অপশন এড়িয়ে চলুন:
— "except I" — Preposition-এর পরে Subjective form ব্যবহার করা ভুল
— "excepting I" — "excepting" এই প্রমিত বাক্যাংশে ব্যবহৃত হয় না, উপরন্তু Subjective form "I" — দুটো ভুল একসাথে
— "excepting me" — Case ("me") ঠিক থাকলেও "excepting" এখানে প্রচলিত/প্রমিত শব্দচয়ন নয়; নিয়মিত ব্যবহারে "except" + object form-ই কাঙ্ক্ষিত

মনে রাখার কৌশল: "except" = Preposition ("ব্যতীত") → এর পরেও অন্য সব Preposition-এর মতোই Object form বসবে (except me, except him)।`,
        subject: 'English Grammar',
        topic: 'Pronoun',
        subTopic: "Object Form of Pronoun — After 'Except' (as Preposition)",
        sortOrder: 9,
      },

      {
        questionSetId,
        slug: 'pronoun-relative-who-subject-01',
        questionText: 'Choose the correct sentence.',
        optionA: 'The man that said that was a fool.',
        optionB: 'The man whom said that was a fool.',
        optionC: 'The man who said that was a fool.',
        optionD: 'The man which said was a fool.',
        correctAnswer: 'C',
        explanation: `ব্যক্তিবাচক Relative pronoun যখন নিজের Clause-এর Verb-এর Subject হয়, তখন তা অবশ্যই "who" হবে (কখনো "whom" বা "which" নয়)।

"The man" (person) হলো antecedent এবং সে-ই পরের clause-এ verb "said"-এর Subject; তাই ব্যক্তিবাচক Subject-relative হিসেবে "who" সঠিক।

এই প্রশ্নটি একাধিক বছর ও প্রতিষ্ঠানে বারবার এসেছে — ১০ম বিসিএস, ঢাকা বিশ্ববিদ্যালয় (D ইউনিট), গৃহায়ন ও গণপূর্ত মন্ত্রণালয়ের আবাসন পরিদপ্তরের সহকারী পরিচালক, রাজশাহী বিশ্ববিদ্যালয় (হিসাববিজ্ঞান, তিনটি ভিন্ন বছরে) এবং ইসলামী বিশ্ববিদ্যালয় (চ ইউনিট) — মোট ৫টিরও বেশি citation, যা একে এই সংকলনের সর্বোচ্চ পুনরাবৃত্ত প্রশ্নগুলোর একটি করে তোলে।

বিভ্রান্তিকর অপশন এড়িয়ে চলুন:
— "The man that" — "that" সাধারণভাবে who-এর বিকল্প হিসেবে ব্যবহারযোগ্য হলেও, এই MCQ-তে স্পষ্ট "who" অপশন থাকায় ব্যাকরণ-বইয়ের প্রমিত নিয়ম অনুযায়ী "who"-কেই একক সঠিক উত্তর ধরা হয়েছে
— "The man whom" — "whom" Object form; কিন্তু এখানে pronoun-টি নিজের clause-এর Subject (verb "said"-এর কর্তা), Object নয়, তাই "whom" ভুল
— "The man which" — "which" শুধু বস্তু/প্রাণীর জন্য ব্যবহৃত হয়, ব্যক্তির (the man) জন্য নয়, তাই ভুল

মনে রাখার কৌশল: ব্যক্তি + Subject role = who (সবসময়)। ব্যক্তি + Object role = whom। বস্তু/প্রাণী = which/that।`,
        subject: 'English Grammar',
        topic: 'Pronoun',
        subTopic: "Relative Pronoun — 'who' as Subject of the Clause",
        sortOrder: 10,
      },

      {
        questionSetId,
        slug: 'pronoun-relative-who-whom-clause-02',
        questionText: 'Please vote for the member — has done the most for our village.',
        optionA: 'whom you believe',
        optionB: 'who you believed',
        optionC: 'that you believe',
        optionD: 'who you believe',
        correctAnswer: 'D',
        explanation: `তিন-clause বিশিষ্ট বাক্যে Gap-এর পরে "subject + say/know/think/want/consider/believe" জাতীয় verb-বিশিষ্ট একটি clause থাকতে পারে। সেই clause (subject+verb) বাদ দেওয়ার পর যদি আরেকটি verb অবশিষ্ট থাকে, তাহলে Gap-এ "who" বসে; আর যদি শুধু noun/pronoun অবশিষ্ট থাকে, তাহলে "whom" বসে।

"you believe" বাদ দিলে থেকে যায় "...has done the most..." — অর্থাৎ একটি verb অবশিষ্ট থাকে, তাই Gap-এ "who" বসবে; আর মূল verb "has done" বর্তমানকালীন হওয়ায় "believe" (present) কাল মিলে যায়, past "believed" নয়।

প্রশ্নটি জনতা ব্যাংকের AEO নিয়োগ পরীক্ষা এবং জাতীয় কবি কাজী নজরুল ইসলাম বিশ্ববিদ্যালয় (ঘ ইউনিট) ভর্তি পরীক্ষা — উভয় জায়গাতেই এসেছে।

বিভ্রান্তিকর অপশন এড়িয়ে চলুন:
— "whom you believe" — "whom" ভুল, কারণ "you believe" বাদ দেওয়ার পরও একটি verb ("has done") অবশিষ্ট থাকে — নিয়ম অনুযায়ী তখন "whom" নয়, "who" বসতে হয়
— "who you believed" — pronoun "who" ঠিক থাকলেও কাল ভুল — "believed" (past) মূল বাক্যের বর্তমান কাল "has done"-এর সাথে সামঞ্জস্যপূর্ণ নয়
— "that you believe" — "that" এই নির্দিষ্ট who/whom-নির্ণায়ক প্যাটার্নের কাঙ্ক্ষিত উত্তর নয়; এই ধরনের বাক্যে চর্চিত নিয়ম অনুযায়ী who/whom নির্বাচনই মূল লক্ষ্য

মনে রাখার কৌশল: "you believe/think/know" বাদ দিয়ে দেখুন — verb থাকলে who, শুধু noun/pronoun থাকলে whom। ছোট্ট কৌশল: "বাদ দাও, verb থাকলে who"।`,
        subject: 'English Grammar',
        topic: 'Pronoun',
        subTopic: 'Relative Pronoun — Who/Whom in "Subject + believe/think/know" Clauses',
        sortOrder: 11,
      },

      {
        questionSetId,
        slug: 'pronoun-relative-which-thing-03',
        questionText: 'Life is a succession of lessons — must be lived to be understood.',
        optionA: 'then',
        optionB: 'which',
        optionC: 'those',
        optionD: 'these',
        correctAnswer: 'B',
        explanation: `Antecedent বস্তুবাচক (thing) হলে Relative pronoun হিসেবে সাধারণত "which" অথবা "that" ব্যবহৃত হয়, এরা দুটি clause-কে সংযুক্ত করে।

Antecedent "lessons" একটি বস্তুবাচক noun; দুটি clause যুক্ত করতে Relative pronoun দরকার, তাই "which" সঠিক।

বিভ্রান্তিকর অপশন এড়িয়ে চলুন:
— "then" — একটি Adverb (সময়বাচক); এটি Relative pronoun নয় এবং দুটি clause-কে সংযুক্ত করতে পারে না
— "those" — একটি Demonstrative pronoun; এটি connective হিসেবে কাজ করে না, তাই Relative clause গঠন করতে পারে না
— "these" — এটিও Demonstrative pronoun, "those"-এর মতোই সংযোগকারী (connective) নিয়ে কাজ করে না

মনে রাখার কৌশল: Antecedent বস্তু/প্রাণী → which/that; ব্যক্তি → who/whom। "then/those/these" কখনো দুই clause জোড়া লাগাতে পারে না।`,
        subject: 'English Grammar',
        topic: 'Pronoun',
        subTopic: "Relative Pronoun — 'which/that' for Things",
        sortOrder: 12,
      },

      {
        questionSetId,
        slug: 'pronoun-relative-whoever-04',
        questionText: 'Choose the correct option. (যাকে অলস মনে হয় তাকেই কাজটা দাও)',
        optionA: 'Give the work to whichever looks idle.',
        optionB: 'Give the work to whom looks idle.',
        optionC: 'Give the work to whomsoever looks idle.',
        optionD: 'Give the work to whoever looks idle.',
        correctAnswer: 'D',
        explanation: `Gap-এর পরে verb থাকলে এবং Gap-এর পূর্বে নির্দিষ্ট কোনো person (antecedent) না থাকলে Gap-এ "whoever" বসে। Preposition-এর পরে noun clause বসায় verb-এর পূর্বে Subject form (whoever) প্রয়োজন হয়।

এই প্রশ্নটি ঢাকা বিশ্ববিদ্যালয় (B ইউনিট) ও রাজশাহী বিশ্ববিদ্যালয় — দুটি ভিন্ন বছরে/প্রতিষ্ঠানে এসেছে।

কোনো নির্দিষ্ট ব্যক্তিকে বোঝানো হয়নি (অনির্দিষ্ট অর্থে "যে কেউ"), এবং Gap-এর পরে verb "looks" আছে — তাই Subjective, অনির্দিষ্ট-অর্থবোধক "whoever" সঠিক।

বিভ্রান্তিকর অপশন এড়িয়ে চলুন:
— "whichever" — বস্তু/বিকল্প নির্বাচনের জন্য ব্যবহৃত হয় (কোনটি), ব্যক্তির জন্য নয়
— "whom" — Object form; কিন্তু এখানে pronoun-টি "looks"-এর Subject হিসেবে কাজ করছে, তাই Subject form দরকার
— "whomsoever" — "whom"-এরই Object-form সংস্করণ; একই কারণে ভুল — Subject role-এ Object form বসতে পারে না

মনে রাখার কৌশল: নির্দিষ্ট কেউ না থাকলে, verb-এর ঠিক আগে "whoever" (Subject) — "whomever/whomsoever" তখনই আসে যখন pronoun-টি Object হয়।`,
        subject: 'English Grammar',
        topic: 'Pronoun',
        subTopic: "Relative Pronoun — 'whoever' with No Definite Antecedent",
        sortOrder: 13,
      },

      {
        questionSetId,
        slug: 'pronoun-relative-whose-possession-05',
        questionText: 'Salma could not tell — books were left on the table.',
        optionA: 'whose',
        optionB: "who's",
        optionC: 'who',
        optionD: 'who is',
        correctAnswer: 'A',
        explanation: `কোনো noun যদি possession (স্বত্ব) অথবা connection (সম্বন্ধ) বোঝায়, তবে তার পূর্বে Relative possessive "whose" বসে।

"books" কার — এই মালিকানা/সম্বন্ধ প্রশ্ন বোঝাতে noun "books"-এর আগে "whose" বসবে।

বিভ্রান্তিকর অপশন এড়িয়ে চলুন:
— "who's" — আসলে "who is/has"-এর সংক্ষিপ্ত রূপ, Possessive নয়; noun-এর আগে বসে মালিকানা বোঝাতে পারে না
— "who" — Subjective Relative pronoun, Possession বোঝায় না, তাই noun-এর সাথে সরাসরি বসতে পারে না
— "who is" — একটি verb-phrase; noun "books"-এর আগে ব্যাকরণগতভাবে বসতে পারে না

মনে রাখার কৌশল: "whose + noun" = কার + জিনিস (Possession)। "who's" মানে who is/has — কখনো গুলিয়ে ফেলবেন না।`,
        subject: 'English Grammar',
        topic: 'Pronoun',
        subTopic: "Relative Pronoun — 'whose' for Possession/Connection",
        sortOrder: 14,
      },

      {
        questionSetId,
        slug: 'pronoun-one-of-superlative-plural-verb-01',
        questionText: 'Which of the following sentences is correct?',
        optionA: 'One of my friends are lawyers.',
        optionB: 'One of my friend is a lawyer.',
        optionC: 'One of my friends is a lawyer.',
        optionD: 'One of my friends are a lawyer.',
        correctAnswer: 'C',
        explanation: `"One of, No one of, Everyone of, Anyone of, Someone of" ইত্যাদির পরে সর্বদা Plural noun/pronoun বসে, কিন্তু verb হয় Singular — কারণ "One" নিজেই মূল Subject, যা সবসময় Singular।

এই প্রশ্নটির প্যাটার্ন বাংলাদেশের সরকারি নিয়োগ পরীক্ষায় সম্ভবত সবচেয়ে বেশি পুনরাবৃত্ত ব্যাকরণ-নিয়ম — ১৬তম বিসিএস, ঢাকা বিশ্ববিদ্যালয় (B ইউনিট, একাধিক বছর), সাউথইস্ট ব্যাংক, রাজশাহী বিশ্ববিদ্যালয় (Law), জাহাঙ্গীরনগর বিশ্ববিদ্যালয় (E ইউনিট), বেগম রোকেয়া বিশ্ববিদ্যালয় (F ইউনিট), সহকারী রাজস্ব কর্মকর্তা, ইসলামী বিশ্ববিদ্যালয় (একাধিক ইউনিট), NSI-এর সহকারী পরিচালক, প্রাথমিক ও মাধ্যমিক সহকারী শিক্ষক নিয়োগ, এবং চট্টগ্রাম বিশ্ববিদ্যালয় (A ইউনিট) — মোট ১৫টিরও বেশি ভিন্ন citation।

"One of my friends" — "friends" Plural noun ঠিক আছে; মূল Subject "One" Singular বলে verb "is" এবং complement "a lawyer" (singular) — সবকিছু সামঞ্জস্যপূর্ণ।

বিভ্রান্তিকর অপশন এড়িয়ে চলুন:
— "One of my friends are lawyers" — verb "are" এবং complement "lawyers" (plural) — দুটোই Singular Subject "One"-এর সাথে সাংঘর্ষিক, তাই ভুল
— "One of my friend is a lawyer" — "my friend" Singular noun ব্যবহৃত হয়েছে; কিন্তু "One of" এর পরে অবশ্যই Plural noun ("friends") প্রয়োজন, তাই ভুল
— "One of my friends are a lawyer" — noun "friends" Plural ঠিক থাকলেও verb "are" Plural — "One" (Singular) Subject-এর সাথে না মিলে ভুল হয়েছে

মনে রাখার কৌশল: "One of" দেখলেই মনে করুন — পরের noun Plural (s যুক্ত), কিন্তু verb Singular। "One" নিজে সবসময় একবচন।`,
        subject: 'English Grammar',
        topic: 'Pronoun',
        subTopic: "Indefinite Pronoun — 'One of' + Plural Noun + Singular Verb",
        sortOrder: 15,
      },

      {
        questionSetId,
        slug: 'pronoun-one-of-superlative-degree-02',
        questionText: 'One of the — his ability to lecture.',
        optionA: 'greater attribute of a professor is',
        optionB: 'greatest attributes of a professor are',
        optionC: 'greatest attributes of a professor is',
        optionD: 'greatest attribute of a professor is',
        correctAnswer: 'C',
        explanation: `গঠন: "One of the + Superlative degree + Plural noun + Singular verb"। অর্থাৎ তিনটি শর্তই একসাথে পূরণ হতে হবে — Superlative form (greatest, not greater), noun Plural, এবং verb Singular।

"greatest attributes of a professor is" — Superlative "greatest", Plural noun "attributes", এবং Singular verb "is" (Subject "One"-এর সাথে মিলিয়ে) — তিনটি শর্তই পূরণ হয়েছে।

বিভ্রান্তিকর অপশন এড়িয়ে চলুন:
— "greater attribute...is" — "greater" Comparative form, কিন্তু নিয়মে Superlative ("greatest") প্রয়োজন; এছাড়া "attribute" Singular, যা Plural noun-এর শর্তও ভঙ্গ করে — দুটি ভুল একসাথে
— "greatest attributes...are" — Superlative ও Plural noun ঠিক থাকলেও verb "are" Plural, যা "One" (Singular Subject)-এর সাথে অসামঞ্জস্যপূর্ণ
— "greatest attribute...is" — Superlative ও verb ঠিক থাকলেও noun "attribute" Singular, নিয়মে Plural noun ("attributes") আবশ্যক

মনে রাখার কৌশল: তিনটি চেকপয়েন্ট মনে রাখুন — Superlative (est/most) + Plural noun (s) + Singular verb (is/was/has) — একটাও বাদ গেলে ভুল।`,
        subject: 'English Grammar',
        topic: 'Pronoun',
        subTopic: "Indefinite Pronoun — 'One of the' + Superlative + Plural Noun + Singular Verb",
        sortOrder: 16,
      },

      {
        questionSetId,
        slug: 'pronoun-comparative-that-of-01',
        questionText: 'Choose the correct sentence.',
        optionA: 'The sceneries of Chittagong are better than Dhaka.',
        optionB: 'The sceneries of Chittagong are better than that of Dhaka.',
        optionC: 'The scenery of Chittagong is better than that of Dhaka.',
        optionD: 'The scenery of Chittagong is better than Dhaka.',
        correctAnswer: 'C',
        explanation: `তুলনা করার সময় দুটি noun-এর প্রথমটি Possessive case-এ (of) থাকলে দ্বিতীয়টিও Possessive case-এ থাকে। একই noun দ্বিতীয়বার না লিখে সেখানে Uncountable noun-এর ক্ষেত্রে "that of" এবং Plural countable noun-এর ক্ষেত্রে "those of" বসে।

"scenery" একবচন/অগণনীয় (uncountable) হিসেবে গণ্য হয়, তাই Subject "The scenery ... is" এবং তুলনায় "that of Dhaka" (scenery-এর repetition এড়িয়ে) সঠিক।

বিভ্রান্তিকর অপশন এড়িয়ে চলুন:
— "The sceneries...are better than Dhaka" — noun ও verb উভয়ই ভুল Plural ফর্মে, এবং "that of" ছাড়া সরাসরি "Dhaka"-র সাথে তুলনা যুক্তিহীন (একটি স্থান বনাম দৃশ্য তুলনা করা যায় না)
— "The sceneries...are better than that of Dhaka" — "that of" ঠিক থাকলেও "sceneries...are" Plural ফর্ম ব্যবহৃত হয়েছে, যা এই প্রমিত পরীক্ষা-উত্তরে গৃহীত singular "scenery...is"-এর বিপরীত
— "The scenery...is better than Dhaka" — "that of" নেই — সরাসরি "scenery... better than Dhaka" বললে দৃশ্যের সাথে শহরের তুলনা হয়ে যায়, যা যুক্তিহীন তুলনা (illogical comparison)

মনে রাখার কৌশল: Uncountable/একবচন noun তুলনায় → "that of"; Plural countable noun তুলনায় → "those of"। মনে রাখুন: "that" একা, "those" অনেক।`,
        subject: 'English Grammar',
        topic: 'Pronoun',
        subTopic: "Demonstrative Pronoun — 'that of' for Uncountable/Singular Nouns",
        sortOrder: 17,
      },

      {
        questionSetId,
        slug: 'pronoun-comparative-those-of-01',
        questionText: 'The roads of Rajshahi are wider — .',
        optionA: 'than those of Dhaka',
        optionB: 'than Dhaka',
        optionC: 'than that of Dhaka',
        optionD: "than Dhaka's roads",
        correctAnswer: 'A',
        explanation: `একই নিয়ম — noun Plural countable (roads) হলে repetition এড়াতে "those of" ব্যবহৃত হয়, "that of" নয়।

এই প্রশ্নটি ১৫তম শিক্ষক নিবন্ধন, পল্লী বিদ্যুতায়ন বোর্ডের সহকারী সচিব এবং চট্টগ্রাম বিশ্ববিদ্যালয় (E ইউনিট) — তিনটি ভিন্ন পরীক্ষায় এসেছে।

"roads" Plural countable noun; তুলনায় "those of Dhaka" (= the roads of Dhaka) সঠিক প্রতিস্থাপন।

বিভ্রান্তিকর অপশন এড়িয়ে চলুন:
— "than Dhaka" — সরাসরি "roads...than Dhaka" — রাস্তা বনাম একটি শহরের তুলনা যুক্তিহীন, প্রতিস্থাপনকারী শব্দ অনুপস্থিত
— "than that of Dhaka" — "that of" শুধু Singular/Uncountable noun-এর জন্য; "roads" Plural হওয়ায় "those of" প্রয়োজন ছিল, তাই ভুল
— "than Dhaka's roads" — অর্থগতভাবে সম্ভব হলেও এই নির্দিষ্ট পরীক্ষা-নিয়মে (noun পুনরাবৃত্তি এড়িয়ে "those of" ব্যবহারের নিয়ম) কাঙ্ক্ষিত প্রমিত ফর্ম নয় এবং "roads" শব্দটি অপ্রয়োজনীয়ভাবে পুনরাবৃত্তি করে, যা নিয়মটির মূল উদ্দেশ্যের বিপরীত

মনে রাখার কৌশল: Plural noun (roads, houses, streets) তুলনায় সবসময় "those of" — শেষে "s" থাকা noun দেখলেই "those of" মনে করবেন।`,
        subject: 'English Grammar',
        topic: 'Pronoun',
        subTopic: "Demonstrative Pronoun — 'those of' for Plural Countable Nouns",
        sortOrder: 18,
      },

      {
        questionSetId,
        slug: 'pronoun-be-verb-subjective-01',
        questionText: 'It was — who first raised the issue in the meeting.',
        optionA: 'I',
        optionB: 'me',
        optionC: 'myself',
        optionD: 'himself',
        correctAnswer: 'A',
        explanation: `Be-verb (am, is, are, was, were ইত্যাদি)-এর পরে pronoun-এর Subjective form বসে, Object form বা Reflexive pronoun নয়।

এই প্রশ্নটি ঢাকা বিশ্ববিদ্যালয় (C ইউনিট), চট্টগ্রাম বিশ্ববিদ্যালয় (ঘ ইউনিট) এবং জাতীয় বিশ্ববিদ্যালয় — তিন জায়গায় এসেছে।

"was" একটি Be-verb, তাই এর পরে Subjective form "I" বসবে — "It was I who first raised..."।

বিভ্রান্তিকর অপশন এড়িয়ে চলুন:
— "me" — Object form; Be-verb-এর পরে Object form নয়, Subjective form দরকার
— "myself" — Reflexive pronoun; এখানে Subject-Object একই ব্যক্তি নয় (কোনো verb-এর object হিসেবে নিজেকে ফিরিয়ে দেওয়া হচ্ছে না), তাই Reflexive বসার প্রয়োজন নেই — সাধারণ Subjective form-ই দরকার
— "himself" — সম্পূর্ণ ভুল Person — বাক্যের অর্থ ও পরবর্তী গঠনের সাথে মেলে না, এবং একই কারণে Reflexive-ও অপ্রাসঙ্গিক

মনে রাখার কৌশল: "It is/was ___ who..." — এই কাঠামো দেখলেই Be-verb-এর পরে Subjective form বসান: "It is I", "It was she", "It is they"।`,
        subject: 'English Grammar',
        topic: 'Pronoun',
        subTopic: 'Personal Pronoun — After a Be-verb (Subjective Form)',
        sortOrder: 19,
      },

      {
        questionSetId,
        slug: 'pronoun-distributive-each-possessive-01',
        questionText: "Each of the sons followed — father's trade.",
        optionA: 'their',
        optionB: 'her',
        optionC: 'whose',
        optionD: 'his',
        correctAnswer: 'D',
        explanation: `Each, Either, Neither, Everyone-এর Possessive case সর্বদা Singular হয় (his, her, its) — যেহেতু এগুলো একটি group-কে একত্রে না বুঝিয়ে প্রত্যেককে আলাদাভাবে নির্দেশ করে।

এই প্রশ্নটি ৩৩তম বিসিএস-এ এসেছিল।

"Each" প্রত্যেক ছেলেকে আলাদাভাবে নির্দেশ করছে (একজন একজন করে); ছেলেরা পুরুষ, তাই Singular masculine possessive "his" সঠিক।

বিভ্রান্তিকর অপশন এড়িয়ে চলুন:
— "their" — Plural possessive; কিন্তু "Each" সবসময় Singular possessive দাবি করে (গোষ্ঠীগতভাবে নয়, একে একে), তাই ভুল
— "her" — Singular ঠিক থাকলেও ভুল লিঙ্গ — "sons" পুরুষবাচক, তাই "his" প্রয়োজন
— "whose" — একটি Interrogative/Relative possessive pronoun, এখানে সাধারণ Possessive adjective হিসেবে বসতে পারে না — গঠনগতভাবে অমিল

মনে রাখার কৌশল: Each/Either/Neither/Everyone → সবসময় "his/her/its" (Singular) — মনে রাখুন "each" মানেই "একজন একজন করে", তাই possessive-ও একবচন।`,
        subject: 'English Grammar',
        topic: 'Pronoun',
        subTopic: "Distributive Pronoun — 'Each' Takes a Singular Possessive",
        sortOrder: 20,
      },

      {
        questionSetId,
        slug: 'pronoun-distributive-neither-of-verb-02',
        questionText: 'Choose the correct sentence.',
        optionA: 'Neither of the roads lead to the railway station.',
        optionB: 'Neither of the roads leads to the railway station.',
        optionC: 'Neither of the roads are leading to the railway station.',
        optionD: 'Neither roads are led to the railway station.',
        correctAnswer: 'B',
        explanation: `"Each of, Either of, Neither of"-এর পরে Plural noun/pronoun বসে, কিন্তু verb হয় Singular (কারণ প্রতিটি ক্ষেত্রেই মূল ভাব "প্রত্যেকে আলাদাভাবে" — একবচন)।

এই প্রশ্নটি জগন্নাথ বিশ্ববিদ্যালয় (B ইউনিট), প্রাক-প্রাথমিক সহকারী শিক্ষক নিয়োগ (একাধিক জেলা) এবং অগ্রণী ব্যাংক লি. সিনিয়র অফিসার নিয়োগ পরীক্ষায় এসেছে।

"the roads" Plural noun ঠিক আছে, এবং "Neither" (দুটির কোনোটিই নয়) ধারণাগতভাবে Singular হওয়ায় verb "leads" (Singular) সঠিক।

বিভ্রান্তিকর অপশন এড়িয়ে চলুন:
— "Neither of the roads lead..." — verb "lead" Plural; কিন্তু "Neither of" সবসময় Singular verb দাবি করে, তাই ভুল
— "Neither of the roads are leading..." — "are leading" Plural auxiliary + Continuous aspect — উভয়ই ভুল; verb Agreement এর পাশাপাশি সাধারণ সত্য/অভ্যাসগত বাক্যে Continuous form-ও অনুপযুক্ত
— "Neither roads are led..." — "of the" বাদ পড়েছে, যা Distributive গঠনের জন্য আবশ্যক ("Neither of the roads"); গঠনগতভাবে অসম্পূর্ণ ও ভুল

মনে রাখার কৌশল: Each of / Either of / Neither of + Plural noun + Singular verb — "of" এর আগে Distributive শব্দ, পরে Plural noun, কিন্তু verb সবসময় is/was/leads-জাতীয় Singular।`,
        subject: 'English Grammar',
        topic: 'Pronoun',
        subTopic: "'Each of / Either of / Neither of' + Plural Noun + Singular Verb",
        sortOrder: 21,
      },

      {
        questionSetId,
        slug: 'pronoun-distributive-either-neither-two-02',
        questionText: 'I had two eggs for breakfast and — of them was fresh.',
        optionA: 'neither',
        optionB: 'either',
        optionC: 'both',
        optionD: 'not one',
        correctAnswer: 'A',
        explanation: `"Either" দ্বারা দুইয়ের প্রত্যেকটি (each of the two) এবং "Neither" দ্বারা দুইয়ের কোনোটিই নয় (not either) বোঝানো হয়। এই দুটি শব্দ শুধু ঠিক দুটি বস্তু/ব্যক্তির ক্ষেত্রে ব্যবহৃত হয়।

এই প্রশ্নটি শেরেবাংলা কৃষি বিশ্ববিদ্যালয়, ঢাকা বিশ্ববিদ্যালয় (D ইউনিট), রাজশাহী বিশ্ববিদ্যালয় (মার্কেটিং) এবং জাহাঙ্গীরনগর বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় (B ইউনিট) — চারটি ভিন্ন প্রতিষ্ঠানে এসেছে।

বাক্যের অর্থ — দুটি ডিমের একটিও তাজা ছিল না (নেতিবাচক ভাব); এই "কোনোটিই না" অর্থ বোঝাতে "neither" সঠিক।

বিভ্রান্তিকর অপশন এড়িয়ে চলুন:
— "either" — মানে "দুটির প্রত্যেকটি/যেকোনো একটি" (ইতিবাচক ভাব); এখানে নেতিবাচক অর্থ ("কোনোটিই তাজা ছিল না") বোঝানো হয়েছে, তাই "either" ভুল
— "both" — মানে "দুটোই একসাথে", যা এই Distributive (আলাদা আলাদাভাবে বিচার করা, singular verb "was"-যুক্ত) গঠনের সাথে খাপ খায় না; অর্থও বদলে যায়
— "not one" — ব্যাকরণগতভাবে অপ্রচলিত/আড়ষ্ট গঠন; পাঠ্যবইয়ে নির্দিষ্টভাবে either/neither শব্দচয়নই অনুশীলন করানো হয়, তাই এটি প্রমিত উত্তর নয়

মনে রাখার কৌশল: Either = দুটির যেকোনো একটি (হ্যাঁ-বোধক); Neither = দুটির কোনোটিই না (না-বোধক)। নেতিবাচক ভাব থাকলে সরাসরি Neither বেছে নিন।`,
        subject: 'English Grammar',
        topic: 'Pronoun',
        subTopic: "Distributive Pronoun — 'Either' vs 'Neither' (exactly two items)",
        sortOrder: 22,
      },

      {
        questionSetId,
        slug: 'pronoun-ones-possessive-01',
        questionText: 'One should be careful about — duty.',
        optionA: 'her',
        optionB: 'his',
        optionC: 'the',
        optionD: "one's",
        correctAnswer: 'D',
        explanation: `"One" যদি বাক্যের Subject হিসেবে ব্যবহৃত হয়, তাহলে তার Possessive case সর্বদাই "one's" হবে — his/her/their নয় (ব্যতিক্রম শুধু তখনই, যখন গঠনটি "One of the + plural noun + his/her" হয়)।

এই নিয়মটি বাংলাদেশের নিয়োগ পরীক্ষায় অন্যতম সর্বাধিক পুনরাবৃত্ত pronoun-নিয়ম — ২৩তম বিসিএস, খুলনা বিশ্ববিদ্যালয় (জীববিজ্ঞান স্কুল), রাজশাহী বিশ্ববিদ্যালয়, জাতীয় সংসদ সচিবালয়ের সহকারী পরিচালক, ইসলামী ব্যাংকের সহকারী অফিসার, বাংলাদেশ ব্যাংক, জাহাঙ্গীরনগর বিশ্ববিদ্যালয় (A3 ইউনিট), উপজেলা মহিলা বিষয়ক কর্মকর্তা, জাতীয় কবি কাজী নজরুল ইসলাম বিশ্ববিদ্যালয় (গ ইউনিট) এবং সোনালী ব্যাংক অফিসার (ক্যাশ) — মোট ১০টি ভিন্ন পরীক্ষায় এসেছে।

"One" এখানে বাক্যের Subject; তাই Possessive হবে "one's" — "One should be careful about one's duty"।

বিভ্রান্তিকর অপশন এড়িয়ে চলুন:
— "her" — নির্দিষ্ট লিঙ্গবাচক; কিন্তু "One" লিঙ্গনিরপেক্ষ (generic), এবং নিয়মে স্পষ্টভাবে "one's" ব্যবহারের কথা বলা আছে, "her" নয়
— "his" — সাধারণভাবে generic possessive হিসেবে কোথাও কোথাও ব্যবহৃত হলেও, "One" Subject থাকা এই নির্দিষ্ট নিয়মে exam-এর প্রমিত উত্তর কঠোরভাবে "one's", "his" নয়
— "the" — একটি Article, Possessive নয়; noun "duty"-এর মালিকানা বোঝাতে পারে না, তাই সম্পূর্ণ অপ্রাসঙ্গিক

মনে রাখার কৌশল: "One" Subject-এ থাকলে সবসময় "one's" — এটি ব্যতিক্রমহীন নিয়ম, his/her/their কখনোই নয়।`,
        subject: 'English Grammar',
        topic: 'Pronoun',
        subTopic: "Indefinite Pronoun — 'One's' as the Only Possessive When 'One' is Subject",
        sortOrder: 23,
      },

      {
        questionSetId,
        slug: 'pronoun-reflexive-imperative-01',
        questionText: "Control —, Sabah! Everything is fine, so don't start crying.",
        optionA: 'yourself',
        optionB: 'you',
        optionC: 'me',
        optionD: 'herself',
        correctAnswer: 'A',
        explanation: `বাক্যের Subject এবং Object দুটোই একই ব্যক্তি হলে Object-এ Reflexive pronoun বসে। Imperative (আদেশসূচক) বাক্যে Subject "you" উহ্য থাকে, তাই সেই লুকানো "you"-এর সাথে মিলিয়ে Object-এ "yourself" বসে।

এটি একটি Imperative বাক্য (Sabah-কে সরাসরি সম্বোধন করা হচ্ছে), উহ্য Subject "you"; Sabah নিজেকেই নিয়ন্ত্রণ করবে বলে Subject=Object, তাই 2nd person Reflexive "yourself" সঠিক।

বিভ্রান্তিকর অপশন এড়িয়ে চলুন:
— "you" — সাধারণ Object pronoun, Reflexive নয়; কিন্তু নিয়ম অনুযায়ী Subject=Object হলে অবশ্যই Reflexive form দরকার
— "me" — সম্পূর্ণ ভুল Person — বক্তা নিজেকে বোঝাচ্ছেন না, Sabah-কে (2nd person) বোঝানো হচ্ছে
— "herself" — 3rd person Reflexive, কিন্তু Imperative বাক্যের উহ্য Subject সবসময় 2nd person "you", তাই 2nd person Reflexive "yourself" দরকার, 3rd person নয়

মনে রাখার কৌশল: Imperative বাক্য (আদেশ) দেখলেই বুঝবেন উহ্য Subject "you" — তাই Object-এ সবসময় "yourself/yourselves" বসবে, অন্য কোনো Reflexive নয়।`,
        subject: 'English Grammar',
        topic: 'Pronoun',
        subTopic: 'Reflexive Pronoun — Subject and Object Refer to the Same Person',
        sortOrder: 24,
      },

      {
        questionSetId,
        slug: 'pronoun-reflexive-avail-02',
        questionText: 'Choose the correct sentence.',
        optionA: 'I shall avail this opportunity.',
        optionB: 'I shall avail myself of this opportunity.',
        optionC: 'I will avail this opportunity.',
        optionD: 'I would avail this opportunity.',
        correctAnswer: 'B',
        explanation: `Absent, avail, enjoy, pride (গর্ব করা), exert (সচেষ্ট থাকা) ইত্যাদি নির্দিষ্ট verb-এর পরে Subject অনুযায়ী বাধ্যতামূলকভাবে Reflexive pronoun বসাতে হয়; "avail" বিশেষভাবে "avail oneself of" কাঠামোতে ব্যবহৃত হয়।

এই প্রশ্নটি উপজেলা/থানা শিক্ষা অফিসার, টেলিফোন বোর্ডের সহকারী পরিচালক, শেখ হাসিনা বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় (F ইউনিট) এবং ১৪তম প্রভাষক নিবন্ধন পরীক্ষা — চারটি ভিন্ন পরীক্ষায় এসেছে।

Subject "I" হওয়ায় Reflexive হবে "myself", এবং "avail" verb-টি "myself of" কাঠামোয় বসে — "I shall avail myself of this opportunity" সম্পূর্ণ সঠিক ও প্রমিত গঠন।

বিভ্রান্তিকর অপশন এড়িয়ে চলুন:
— "I shall avail this opportunity" — Reflexive pronoun ও "of" অনুপস্থিত; নিয়ম অনুযায়ী "avail" নিজে থেকে সরাসরি object নিতে পারে না, তাই ভুল গঠন
— "I will avail this opportunity" — একই কারণে Reflexive/"of" অনুপস্থিত থাকায় গঠন ভুল; এছাড়া "will" এখানে আনুষ্ঠানিক প্রথম-পুরুষ ইচ্ছা প্রকাশে কম উপযোগী
— "I would avail this opportunity" — Reflexive/"of" অনুপস্থিত থাকার মূল ভুলটি এখানেও বিদ্যমান, উপরন্তু "would" কোনো শর্ত বা প্রসঙ্গ ছাড়া ব্যবহার করা অস্বাভাবিক

মনে রাখার কৌশল: মনে রাখুন সংক্ষেপে — "Avail Enjoy Pride Exert" → পরে সবসময় myself/himself/herself + (প্রয়োজনে) of। যেমন: avail oneself of, pride oneself on।`,
        subject: 'English Grammar',
        topic: 'Pronoun',
        subTopic: 'Reflexive Pronoun — Fixed Verbs (Avail/Enjoy/Pride/Exert)',
        sortOrder: 25,
      },

      {
        questionSetId,
        slug: 'pronoun-reciprocal-one-another-01',
        questionText: 'Which of the following sentence is correct?',
        optionA: 'The three sisters love each other.',
        optionB: 'The three sisters love one another.',
        optionC: 'The three sisters loves one another.',
        optionD: 'The three sisters loved each other.',
        correctAnswer: 'B',
        explanation: `দুইজনের মধ্যে পারস্পরিক সম্পর্ক বোঝাতে "each other", আর দুইজনের বেশি হলে "one another" ব্যবহৃত হয়। Reciprocal pronoun কখনো Subject হয় না, সর্বদা Object হিসেবে বসে।

"The three sisters" — তিনজন, অর্থাৎ দুইয়ের বেশি; তাই "one another" সঠিক, এবং verb "love" Plural Subject "sisters"-এর সাথে সামঞ্জস্যপূর্ণ।

বিভ্রান্তিকর অপশন এড়িয়ে চলুন:
— "The three sisters love each other" — "each other" শুধু দুইজনের ক্ষেত্রে ব্যবহৃত হয়; এখানে তিনজন বোনের কথা বলা হয়েছে, তাই ভুল
— "The three sisters loves one another" — "loves" Singular verb; কিন্তু Subject "three sisters" Plural, তাই verb agreement ভুল হয়েছে (each other/one another নির্বিশেষে এই ভুলটি স্বতন্ত্র)
— "The three sisters loved each other" — "each other" এখানে আবারও ভুল (তিনজনের জন্য one another প্রয়োজন), যদিও verb tense "loved" নিজে ব্যাকরণগতভাবে ঠিক আছে

মনে রাখার কৌশল: দুইজন = each other; দুইয়ের বেশি = one another। মনে রাখুন "each" মানে "দুটির প্রত্যেকটি" (শুধু ২), "one" মানে "একজন অন্যজনকে" (২-এর বেশি হলেও চলে)।`,
        subject: 'English Grammar',
        topic: 'Pronoun',
        subTopic: "Reciprocal Pronoun — 'Each Other' (2) vs 'One Another' (>2)",
        sortOrder: 26,
      },

      {
        questionSetId,
        slug: 'pronoun-its-vs-apostrophe-01',
        questionText:
          'I really like the way that car looks, but — price is more than I can afford.',
        optionA: 'its',
        optionB: "it's",
        optionC: 'it has',
        optionD: 'it',
        correctAnswer: 'A',
        explanation: `Noun-এর পূর্বে Possessive adjective (my, your, his, her, its, our, their) বসে। সাধারণত noun-এর Possessive-এ 's যুক্ত হয়, কিন্তু "it"-এর ক্ষেত্রে ব্যতিক্রমভাবে apostrophe ছাড়া শুধু "its" যুক্ত হয় — "it's" নয় ("it's" = it is/has)।

noun "price"-এর আগে Possessive adjective প্রয়োজন — "its" (গাড়িটির) সঠিক, কোনো apostrophe নেই।

বিভ্রান্তিকর অপশন এড়িয়ে চলুন:
— "it's" — মানে "it is" বা "it has" — Possessive নয়; বসালে বাক্য হয় "it is price", যা অর্থহীন
— "it has" — একটি verb-phrase, noun "price"-এর আগে বসে Possessive অর্থ দিতে পারে না; বাক্যটি ব্যাকরণগতভাবে ভেঙে যায়
— "it" — কোনো Possessive marker ছাড়া noun-এর আগে সরাসরি বসে মালিকানা বোঝাতে পারে না

মনে রাখার কৌশল: "its" (apostrophe নেই) = possessive (তার/এর)। "it's" (apostrophe আছে) = it is/it has। মনে রাখুন: "his", "her"-এও তো apostrophe থাকে না — "its"-ও তেমনি।`,
        subject: 'English Grammar',
        topic: 'Pronoun',
        subTopic: "Possessive Adjective — 'its' vs 'it's'",
        sortOrder: 27,
      },

      {
        questionSetId,
        slug: 'pronoun-possessive-gerund-01',
        questionText:
          'We insist on — leaving the room. (আমরা তোমার রুম ত্যাগের ব্যাপারে জোর দিয়ে বলছি)',
        optionA: 'you',
        optionB: 'yours',
        optionC: "you're",
        optionD: 'your',
        correctAnswer: 'D',
        explanation: `Gerund (verb+ing)-এর পূর্বে Possessive adjective বসে। বিশেষত Preposition ও Gerund-এর মাঝে Possessive adjective বসে — গঠন: Preposition + Possessive adjective + Gerund।

"on" (preposition) এবং "leaving" (gerund)-এর মাঝে Possessive adjective দরকার — "your" সঠিক ("your leaving" = তোমার চলে যাওয়া)।

বিভ্রান্তিকর অপশন এড়িয়ে চলুন:
— "you" — Object pronoun; কিন্তু Gerund-এর আগে Possessive adjective দরকার, Object form নয়
— "yours" — Possessive pronoun, যা একা দাঁড়ায় (noun/gerund-এর আগে বসে না); এখানে gerund "leaving"-কে modify করতে Possessive adjective দরকার, Possessive pronoun নয়
— "you're" — "you are"-এর সংক্ষিপ্ত রূপ, সম্পূর্ণ ভিন্ন অর্থ এবং গঠন — এখানে অর্থহীন

মনে রাখার কৌশল: Gerund (verb+ing) দেখলেই তার ঠিক আগে Possessive adjective (my/your/his/her/our/their) খুঁজুন — "your leaving", "his coming", "their winning"।`,
        subject: 'English Grammar',
        topic: 'Pronoun',
        subTopic: 'Possessive Adjective — Before a Gerund (Preposition + Possessive + Gerund)',
        sortOrder: 28,
      },

      {
        questionSetId,
        slug: 'pronoun-possessive-pronoun-idiom-01',
        questionText: 'You should not say nasty things about Jessica. She is a friend of — .',
        optionA: 'her',
        optionB: 'you',
        optionC: 'ours',
        optionD: 'me',
        correctAnswer: 'C',
        explanation: `Possessive adjective+noun-এর পরিবর্তে Possessive pronoun (mine/his/hers/ours/theirs) ব্যবহৃত হয়। "a relative/friend/habit/favourite game of"-এর পরে mine/his/hers/theirs/ours বসে, কারণ এটি আসলে "one of + possessive adjective + plural noun"-এরই সংক্ষিপ্ত রূপ (one of my friends = a friend of mine)।

প্রসঙ্গ অনুযায়ী বক্তা ও শ্রোতা উভয়ে মিলে Jessica-র পরিচিত (আমাদের বন্ধু); তাই "a friend of ours" = "one of our friends" গঠনে Possessive pronoun "ours" সঠিক।

বিভ্রান্তিকর অপশন এড়িয়ে চলুন:
— "her" — Object/Possessive adjective form; কিন্তু "a friend of" এর পরে খাঁটি Possessive pronoun (standalone) দরকার, "her" এখানে ব্যাকরণগতভাবে অসম্পূর্ণ
— "you" — Object pronoun; "of" এর পরে বসে মালিকানা/সম্পর্ক বোঝাতে পারে না
— "me" — Object pronoun, অর্থগতভাবেও ভুল (একবচন, অথচ বাক্যের ভাব যৌথ "আমাদের বন্ধু"), এবং গঠনগতভাবেও Possessive pronoun দরকার এখানে

মনে রাখার কৌশল: "a friend/relative of + mine/his/hers/ours/theirs" — এই idiom মুখস্থ রাখুন; "a friend of mine" = "আমার এক বন্ধু" (আমার অনেক বন্ধুর একজন)।`,
        subject: 'English Grammar',
        topic: 'Pronoun',
        subTopic: "Possessive Pronoun — Idiom 'a friend of + Possessive Pronoun'",
        sortOrder: 29,
      },

      {
        questionSetId,
        slug: 'pronoun-clause-subject-that-01',
        questionText: '— man is mortal is a universal truth.',
        optionA: 'Which',
        optionB: 'That',
        optionC: 'What',
        optionD: 'This',
        correctAnswer: 'B',
        explanation: `কোনো সম্পূর্ণ ও স্বয়ংসম্পূর্ণ সাধারণ বিবৃতি (statement) যদি বাক্যের Subject বা Object হিসেবে কাজ করে (Noun clause), তাহলে সেই clause-কে যুক্ত করতে "that" ব্যবহৃত হয় — নির্দিষ্ট antecedent-নির্ভর Relative pronoun নয়।

এই প্রশ্নটি DPE-এর সহকারী লাইব্রেরিয়ান কাম ক্যাটালগার কাম হিসাবরক্ষক নিয়োগ পরীক্ষা এবং ঢাকা বিশ্ববিদ্যালয় (D ইউনিট) — উভয় জায়গাতেই এসেছে।

"___ man is mortal" পুরো clause-টি মূল verb "is"-এর Subject হিসেবে কাজ করছে (একটি সম্পূর্ণ সাধারণ সত্য বিবৃতি); এই ধরনের Noun clause গঠনে "That" সঠিক clause-maker।

বিভ্রান্তিকর অপশন এড়িয়ে চলুন:
— "Which" — একটি নির্দিষ্ট antecedent বা প্রশ্নের প্রেক্ষাপট দাবি করে; এখানে কোনো নির্দিষ্ট পূর্বপদ নেই, একটি সাধারণ সত্য বিবৃতি Subject হিসেবে বসেছে, তাই "Which" অনুপযুক্ত
— "What" — মানে "the thing that" — এটি বসালে অর্থ ও গঠন বদলে যেত ("What man is mortal" এখানে ভিন্ন/অসম্পূর্ণ অর্থ দেয়), সরাসরি সম্পূর্ণ বিবৃতি সংযোগে ব্যবহৃত হয় না
— "This" — একটি Demonstrative pronoun, দুটি অংশকে clause হিসেবে সংযুক্ত করার কাজ (connective role) করতে পারে না

মনে রাখার কৌশল: সম্পূর্ণ একটি সত্য বিবৃতি (যেমন: "Man is mortal") নিজেই Subject/Object হলে সামনে "That" বসান — এটি একধরনের "clause-introducer", Relative pronoun নয়।`,
        subject: 'English Grammar',
        topic: 'Pronoun',
        subTopic: "Clause as Subject — 'That' as a Noun-Clause Maker",
        sortOrder: 30,
      },
    ],

    /*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
সারসংক্ষেপ:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
মোট প্রশ্ন সংগৃহীত: ৩০টি (English Grammar — Pronoun অংশ)

নিয়ম-ভিত্তিক বিভাজন (sortOrder অনুযায়ী):
  ১. 231 Order Rule                                    ৩টি (প্রশ্ন ১-৩)
  ২. 123 Order Rule (guilt/blame)                       ২টি (প্রশ্ন ৪-৫)
  ৩. Object Form Rule                                   ৪টি (প্রশ্ন ৬-৯)
  ৪. Relative Pronoun Selection                         ৫টি (প্রশ্ন ১০-১৪)
  ৫. One of the + Superlative + Plural noun + Sing verb ২টি (প্রশ্ন ১৫-১৬)
  ৬. Comparative Substitution (that of / those of)      ২টি (প্রশ্ন ১৭-১৮)
  ৭. Be-verb + Subjective Form                          ১টি (প্রশ্ন ১৯)
  ৮. Distributive Pronoun                               ৩টি (প্রশ্ন ২০-২২)
  ৯. One's Possessive Rule                              ১টি (প্রশ্ন ২৩)
 ১০. Reflexive Pronoun                                  ২টি (প্রশ্ন ২৪-২৫)
 ১১. Reciprocal Pronoun                                 ১টি (প্রশ্ন ২৬)
 ১২. Possessive Adjective/Gerund/Idiom                  ৩টি (প্রশ্ন ২৭-২৯)
 ১৩. Clause as Subject → "That"                         ১টি (প্রশ্ন ৩০)

পুনরাবৃত্তি-ভিত্তিক অগ্রাধিকার (সবচেয়ে বেশি exam-repeat পাওয়া প্রশ্ন/নিয়ম):
  সর্বোচ্চ (১০+ citation): প্রশ্ন ২৩ ("One's" possessive rule — ১০টি ভিন্ন পরীক্ষা)
  অত্যন্ত উচ্চ (১৫+ citation): প্রশ্ন ১৫ ("One of" + plural noun + singular verb — ১৫টিরও বেশি পরীক্ষা)
  উচ্চ (৫+ citation): প্রশ্ন ১০ (Relative pronoun "who" as subject)
  মাঝারি-উচ্চ (৩-৪ citation): প্রশ্ন ২, ৭, ৮, ১৩, ১৮, ১৯, ২১, ২২, ২৫
  বাকি প্রশ্নগুলো ১-২টি নির্দিষ্ট পরীক্ষায় এসেছে, তবে প্রতিটিই একটি
  উচ্চ-গুরুত্বপূর্ণ ও পুনরাবৃত্তিযোগ্য pronoun-নিয়মের প্রতিনিধিত্ব করে।

উৎস: "MASTER" ইংরেজি ব্যাকরণ গাইড — Pronoun অধ্যায় (পৃষ্ঠা ৫০-৬৯)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/

    skipDuplicates: true,
  });
  console.log('✓ English Grammar — Pronoun (সর্বাধিক পুনরাবৃত্ত প্রশ্ন) seeded');
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
