import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
// TODO: replace with the actual QuestionSet id for this exam before running
const questionSetId = 'cmtkeo7rc001qah01sx6zcuht';

async function main() {
  await prisma.question.createMany({
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Topic: Parts of Speech — Noun (kinds of noun, Articles, Determiners)
    // Original questions written fresh around the same grammar points,
    // with full explanation / subject / topic / subTopic filled in.
    // সংগৃহীত প্রশ্ন: 27টি (sortOrder 31–57)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    data: [
      // ---------- Kinds of Noun ----------
      {
        questionSetId,
        slug: 'which-of-the-following-is-a-proper-noun',
        questionText: 'Which of the following is an example of a proper noun?',
        optionA: 'River',
        optionB: 'Bangladesh',
        optionC: 'City',
        optionD: 'Country',
        correctAnswer: 'B',
        explanation:
          "'Bangladesh' একটি নির্দিষ্ট দেশের নাম নির্দেশ করে, তাই এটি Proper Noun। Proper Noun সবসময় বড় হাতের অক্ষর দিয়ে শুরু হয় এবং কোনো নির্দিষ্ট ব্যক্তি, স্থান বা বস্তুকে বোঝায়। River, City, Country — এগুলো নির্দিষ্ট কোনো বস্তুকে না বুঝিয়ে সাধারণভাবে একটি শ্রেণিকে বোঝায়, তাই এগুলো Common Noun।",
        subject: 'English',
        topic: 'Parts of Speech',
        subTopic: 'Noun',
        sortOrder: 31,
      },

      {
        questionSetId,
        slug: 'many-rahims-are-born',
        questionText:
          "Every year many Rahims are born in our village, but none of them turn out to be as famous as the original one. Here, the underlined word 'Rahims' is used as a —",
        optionA: 'Proper noun',
        optionB: 'Common noun',
        optionC: 'Collective noun',
        optionD: 'Material noun',
        correctAnswer: 'B',
        explanation:
          "সাধারণত 'Rahim' একটি Proper Noun। কিন্তু এখানে এটিকে বহুবচনে (Rahims) ব্যবহার করে একই ধরনের গুণসম্পন্ন একটি গোটা শ্রেণিকে বোঝানো হয়েছে, তাই এটি এখানে Common Noun হিসেবে কাজ করছে। মনে রাখার কৌশল: Proper Noun বহুবচনে ব্যবহৃত হলে সাধারণত Common Noun-এ পরিণত হয়।",
        subject: 'English',
        topic: 'Parts of Speech',
        subTopic: 'Noun',
        sortOrder: 32,
      },

      {
        questionSetId,
        slug: 'a-of-sheep-was-grazing',
        questionText: 'A ______ of sheep was grazing peacefully on the hillside.',
        optionA: 'herd',
        optionB: 'flock',
        optionC: 'swarm',
        optionD: 'shoal',
        correctAnswer: 'B',
        explanation:
          "ভেড়া বা পাখির দলকে বোঝাতে 'flock' সঠিক Collective Noun। 'Herd' ব্যবহৃত হয় গরু-মহিষের মতো প্রাণীর জন্য, 'swarm' পোকামাকড়ের জন্য এবং 'shoal' মাছের ঝাঁকের জন্য।",
        subject: 'English',
        topic: 'Parts of Speech',
        subTopic: 'Noun',
        sortOrder: 33,
      },

      {
        questionSetId,
        slug: 'the-committee-still-undecided',
        questionText: 'The committee ___________ divided in their opinions regarding the merger.',
        optionA: 'were',
        optionB: 'was',
        optionC: 'is',
        optionD: 'has',
        correctAnswer: 'A',
        explanation:
          "Collective Noun (committee) যখন এর সদস্যদের পৃথক পৃথক মতামত বা কাজকে বোঝায়, তখন Verb বহুবচন (plural) হয়, অর্থাৎ 'were' বসবে। যদি পুরো দলটিকে একটি একক সত্তা হিসেবে বোঝানো হতো, তাহলে 'was' বসত।",
        subject: 'English',
        topic: 'Parts of Speech',
        subTopic: 'Noun',
        sortOrder: 34,
      },

      {
        questionSetId,
        slug: 'her-act-of-extraordinary',
        questionText:
          "Her act of extraordinary bravery during the fire earned her a medal. Here, 'bravery' is a/an —",
        optionA: 'Common noun',
        optionB: 'Proper noun',
        optionC: 'Abstract noun',
        optionD: 'Collective noun',
        correctAnswer: 'C',
        explanation:
          "'Bravery' এমন একটি গুণ বা অনুভূতিকে বোঝায় যা স্পর্শ করা বা দেখা যায় না, শুধু অনুভব করা যায়। তাই এটি Abstract Noun।",
        subject: 'English',
        topic: 'Parts of Speech',
        subTopic: 'Noun',
        sortOrder: 35,
      },

      {
        questionSetId,
        slug: 'the-bracelet-was-made',
        questionText: "The bracelet was made entirely of silver. Here, the word 'silver' is a —",
        optionA: 'Proper noun',
        optionB: 'Common noun',
        optionC: 'Collective noun',
        optionD: 'Material noun',
        correctAnswer: 'D',
        explanation:
          "'Silver' একটি ধাতু বা কাঁচামাল বোঝায় যা দিয়ে অন্য কিছু তৈরি হয়, তাই এটি Material Noun।",
        subject: 'English',
        topic: 'Parts of Speech',
        subTopic: 'Noun',
        sortOrder: 36,
      },

      {
        questionSetId,
        slug: 'the-abstract-noun-form-of-free',
        questionText: "The abstract noun form of the word 'free' is —",
        optionA: 'Freeing',
        optionB: 'Freedom',
        optionC: 'Freely',
        optionD: 'Freer',
        correctAnswer: 'B',
        explanation:
          "'Free' (Adjective) থেকে Abstract Noun হয় 'Freedom'। 'Freeing' হলো Gerund, 'Freely' Adverb এবং 'Freer' হলো Comparative Adjective, এগুলো কোনোটিই Abstract Noun নয়।",
        subject: 'English',
        topic: 'Parts of Speech',
        subTopic: 'Noun',
        sortOrder: 37,
      },

      {
        questionSetId,
        slug: 'which-one-is-a-compound-noun',
        questionText: 'Which one of the following is a compound noun?',
        optionA: 'Classroom',
        optionB: 'Information',
        optionC: 'Attendance',
        optionD: 'Comprehension',
        correctAnswer: 'A',
        explanation:
          "'Classroom' দুটি স্বতন্ত্র শব্দ (class + room) একত্রে যুক্ত হয়ে একটি নতুন Noun গঠন করেছে, তাই এটি Compound Noun। বাকি তিনটি একক শব্দ থেকে Suffix যোগ করে গঠিত Noun, Compound Noun নয়।",
        subject: 'English',
        topic: 'Parts of Speech',
        subTopic: 'Noun',
        sortOrder: 38,
      },

      {
        questionSetId,
        slug: 'choose-the-noun-that-is-countable',
        questionText: 'Choose the noun that is countable from the following.',
        optionA: 'Furniture',
        optionB: 'Chair',
        optionC: 'Advice',
        optionD: 'Information',
        correctAnswer: 'B',
        explanation:
          "'Chair' গণনা করা যায় (one chair, two chairs), তাই এটি Countable Noun। Furniture, Advice ও Information — এই তিনটি Uncountable Noun, এগুলোকে সরাসরি বহুবচন করা যায় না।",
        subject: 'English',
        topic: 'Parts of Speech',
        subTopic: 'Noun',
        sortOrder: 39,
      },

      {
        questionSetId,
        slug: 'which-one-is-not-a-kind-of-noun',
        questionText: 'Which one of the following is NOT a kind of noun?',
        optionA: 'Material',
        optionB: 'Interrogative',
        optionC: 'Collective',
        optionD: 'Abstract',
        correctAnswer: 'B',
        explanation:
          "Material, Collective ও Abstract — এই তিনটি Noun-এর প্রকারভেদ। কিন্তু 'Interrogative' হলো Pronoun-এর একটি প্রকার (who, what, which ইত্যাদি), Noun-এর কোনো প্রকার নয় — তাই এটিই ব্যতিক্রম।",
        subject: 'English',
        topic: 'Parts of Speech',
        subTopic: 'Noun',
        sortOrder: 40,
      },

      // ---------- Articles ----------
      {
        questionSetId,
        slug: 'she-has-completed-an-mba',
        questionText: 'She has completed ______ M.B.A. degree from a reputed university.',
        optionA: 'a',
        optionB: 'an',
        optionC: 'the',
        optionD: 'No article',
        correctAnswer: 'B',
        explanation:
          "Article নির্ধারিত হয় বানান দিয়ে নয়, উচ্চারণ দিয়ে। 'M.B.A.' উচ্চারণ শুরু হয় স্বরধ্বনি 'em' দিয়ে, তাই এর আগে 'an' বসবে।",
        subject: 'English',
        topic: 'Parts of Speech',
        subTopic: 'Article',
        sortOrder: 41,
      },

      {
        questionSetId,
        slug: 'it-took-him-almost-an-hour',
        questionText: 'It took him almost ______ hour to finish the assignment.',
        optionA: 'a',
        optionB: 'an',
        optionC: 'the',
        optionD: 'No article',
        correctAnswer: 'B',
        explanation:
          "'Hour' শব্দে 'h' নীরব (silent), উচ্চারণ শুরু হয় স্বরধ্বনি দিয়ে, তাই এর আগে 'an' বসবে।",
        subject: 'English',
        topic: 'Parts of Speech',
        subTopic: 'Article',
        sortOrder: 42,
      },

      {
        questionSetId,
        slug: 'he-is-studying-at-a-university',
        questionText: 'He is studying at ______ university in Dhaka.',
        optionA: 'a',
        optionB: 'an',
        optionC: 'the',
        optionD: 'No article',
        correctAnswer: 'A',
        explanation:
          "'University' লেখায় স্বরবর্ণ 'u' দিয়ে শুরু হলেও উচ্চারণে ব্যঞ্জনধ্বনি 'yu' দিয়ে শুরু হয়, তাই এর আগে 'a' বসবে, 'an' নয়।",
        subject: 'English',
        topic: 'Parts of Speech',
        subTopic: 'Article',
        sortOrder: 43,
      },

      {
        questionSetId,
        slug: 'sun-rises-in-the-east',
        questionText: '______ sun rises in the east every morning.',
        optionA: 'A',
        optionB: 'An',
        optionC: 'The',
        optionD: 'No article',
        correctAnswer: 'C',
        explanation:
          "পৃথিবীতে একটিমাত্র 'sun' আছে বলে এটি একটি Unique Object, আর পৃথিবীতে একমাত্র বস্তু (unique object) বোঝাতে সবসময় 'the' বসে।",
        subject: 'English',
        topic: 'Parts of Speech',
        subTopic: 'Article',
        sortOrder: 44,
      },

      {
        questionSetId,
        slug: 'everest-is-the-highest-mountain',
        questionText: 'Everest is ______ highest mountain peak in the world.',
        optionA: 'a',
        optionB: 'an',
        optionC: 'the',
        optionD: 'No article',
        correctAnswer: 'C',
        explanation:
          "Superlative Degree Adjective-এর আগে (highest, best, tallest ইত্যাদি) সাধারণত 'the' বসে।",
        subject: 'English',
        topic: 'Parts of Speech',
        subTopic: 'Article',
        sortOrder: 45,
      },

      {
        questionSetId,
        slug: 'patience-is-a-virtue',
        questionText: '______ Patience is a virtue that everyone should cultivate.',
        optionA: 'A',
        optionB: 'An',
        optionC: 'The',
        optionD: 'No article',
        correctAnswer: 'D',
        explanation:
          "Abstract Noun ('Patience') যখন সাধারণ বা ব্যাপক অর্থে (general sense) ব্যবহৃত হয়, তখন তার আগে কোনো Article বসে না।",
        subject: 'English',
        topic: 'Parts of Speech',
        subTopic: 'Article',
        sortOrder: 46,
      },

      {
        questionSetId,
        slug: 'the-is-correctly-used-before',
        questionText: "'The' is correctly used before which of the following?",
        optionA: 'The Himalayas',
        optionB: 'The Maldives',
        optionC: 'The Netherlands',
        optionD: 'All of these',
        correctAnswer: 'D',
        explanation:
          "পর্বতশ্রেণির নাম (the Himalayas), দ্বীপপুঞ্জের নাম (the Maldives) এবং বহুবচন-আকৃতির দেশের নামের (the Netherlands) আগে সবসময় 'the' বসে, তাই সবগুলোই সঠিক।",
        subject: 'English',
        topic: 'Parts of Speech',
        subTopic: 'Article',
        sortOrder: 47,
      },

      {
        questionSetId,
        slug: 'padma-is-one-of-the-rivers',
        questionText: '______ Padma is one of the major rivers of Bangladesh.',
        optionA: 'A',
        optionB: 'An',
        optionC: 'The',
        optionD: 'No article',
        correctAnswer: 'C',
        explanation: "নদীর নামের আগে সবসময় 'the' বসে, যেমন — the Padma, the Meghna, the Jamuna।",
        subject: 'English',
        topic: 'Parts of Speech',
        subTopic: 'Article',
        sortOrder: 48,
      },

      {
        questionSetId,
        slug: 'she-finished-fastest',
        questionText: 'Of all the runners, she finished ______ fastest.',
        optionA: 'a',
        optionB: 'an',
        optionC: 'the',
        optionD: 'No article',
        correctAnswer: 'D',
        explanation:
          "এখানে 'fastest' Adjective নয়, বরং Verb 'finished'-কে বিশেষায়িত করছে বলে এটি Adverb হিসেবে কাজ করছে। Superlative Degree Adverb-এর আগে সাধারণত কোনো Article বসে না।",
        subject: 'English',
        topic: 'Parts of Speech',
        subTopic: 'Article',
        sortOrder: 49,
      },

      {
        questionSetId,
        slug: 'he-was-appointed-as-vice-chancellor',
        questionText: 'He was appointed as ______ Vice-Chancellor of the university last year.',
        optionA: 'a',
        optionB: 'an',
        optionC: 'the',
        optionD: 'No article',
        correctAnswer: 'C',
        explanation:
          "একটি নির্দিষ্ট ও একমাত্র পদ বা পদবি (unique position/title) বোঝাতে তার আগে 'the' বসে, কারণ একটি বিশ্ববিদ্যালয়ে একজনই Vice-Chancellor থাকেন।",
        subject: 'English',
        topic: 'Parts of Speech',
        subTopic: 'Article',
        sortOrder: 50,
      },

      // ---------- Determiners ----------
      {
        questionSetId,
        slug: 'students-turned-up-for-the-early',
        questionText:
          '______ students turned up for the early morning class; most preferred to sleep in.',
        optionA: 'A few',
        optionB: 'Few',
        optionC: 'The few',
        optionD: 'Much',
        correctAnswer: 'B',
        explanation:
          "'Few' নেতিবাচক অর্থ বহন করে, অর্থাৎ 'প্রায় নেই বললেই চলে'। বাক্যের পরের অংশ ('most preferred to sleep in') নেতিবাচক ভাবকেই সমর্থন করছে, তাই 'Few' সঠিক। 'A few' ব্যবহৃত হতো যদি ইতিবাচক অর্থ ('কিছু হলেও ছিল') বোঝানো হতো।",
        subject: 'English',
        topic: 'Parts of Speech',
        subTopic: 'Determiner',
        sortOrder: 51,
      },

      {
        questionSetId,
        slug: 'there-is-hope-left-of-finding',
        questionText: 'There is ______ hope left of finding the missing hikers alive.',
        optionA: 'a little',
        optionB: 'little',
        optionC: 'a few',
        optionD: 'many',
        correctAnswer: 'B',
        explanation:
          "'Little' Uncountable Noun-এর সাথে নেতিবাচক অর্থে ব্যবহৃত হয়, অর্থাৎ 'প্রায় নেই'। এখানে হারিয়ে যাওয়া পর্বতারোহীদের বেঁচে থাকার আশা খুবই কম বোঝানো হয়েছে, তাই 'little' সঠিক উত্তর।",
        subject: 'English',
        topic: 'Parts of Speech',
        subTopic: 'Determiner',
        sortOrder: 52,
      },

      {
        questionSetId,
        slug: 'we-dont-have-information-about',
        questionText: "We don't have ______ information about the new policy yet.",
        optionA: 'many',
        optionB: 'much',
        optionC: 'a few',
        optionD: 'few',
        correctAnswer: 'B',
        explanation:
          "'Information' একটি Uncountable Noun, আর Uncountable Noun-এর সাথে 'much' ব্যবহৃত হয়, 'many' নয় — 'many' শুধু Countable Noun-এর সাথে বসে।",
        subject: 'English',
        topic: 'Parts of Speech',
        subTopic: 'Determiner',
        sortOrder: 53,
      },

      {
        questionSetId,
        slug: 'do-you-have-questions-before',
        questionText: 'Do you have ______ questions before we begin the exam?',
        optionA: 'some',
        optionB: 'any',
        optionC: 'much',
        optionD: 'many',
        correctAnswer: 'B',
        explanation:
          "প্রশ্নবোধক (Interrogative) বাক্যে সাধারণত 'any' ব্যবহৃত হয়, 'some' মূলত ইতিবাচক (affirmative) বাক্যে ব্যবহৃত হয়।",
        subject: 'English',
        topic: 'Parts of Speech',
        subTopic: 'Determiner',
        sortOrder: 54,
      },

      {
        questionSetId,
        slug: 'there-were-people-waiting-outside',
        questionText: 'There were ______ people waiting outside the stadium before the match.',
        optionA: 'much',
        optionB: 'a lot of',
        optionC: 'little',
        optionD: 'an amount of',
        correctAnswer: 'B',
        explanation:
          "'People' একটি Countable Noun। Countable ও Uncountable উভয় Noun-এর সাথেই 'a lot of' ব্যবহার করা যায়, কিন্তু 'much' শুধু Uncountable Noun-এর সাথে বসে, তাই এখানে 'a lot of' সঠিক।",
        subject: 'English',
        topic: 'Parts of Speech',
        subTopic: 'Determiner',
        sortOrder: 55,
      },

      {
        questionSetId,
        slug: 'of-the-two-teams-has-a-captain',
        questionText: '______ of the two teams has a captain to lead them.',
        optionA: 'Each',
        optionB: 'Every',
        optionC: 'All',
        optionD: 'Some',
        correctAnswer: 'A',
        explanation:
          "'Each' নির্দিষ্ট দুই বা তার বেশি সংখ্যক বস্তু/ব্যক্তির মধ্যে প্রত্যেকটিকে আলাদাভাবে বোঝাতে ব্যবহৃত হয় এবং বিশেষত দুইজনের ক্ষেত্রে 'Each' বসে, 'Every' নয় — 'Every' সাধারণত দুইয়ের বেশি সংখ্যার ক্ষেত্রে ব্যবহৃত হয়।",
        subject: 'English',
        topic: 'Parts of Speech',
        subTopic: 'Determiner',
        sortOrder: 56,
      },

      {
        questionSetId,
        slug: 'organizers-wanted-to-include-volunteers',
        questionText:
          'The organizers wanted to include as ______ volunteers as possible for the event.',
        optionA: 'much',
        optionB: 'many',
        optionC: 'a lot',
        optionD: 'little',
        correctAnswer: 'B',
        explanation:
          "'Volunteers' একটি Countable Noun (বহুবচন), তাই এর সাথে 'many' ব্যবহৃত হবে, 'much' শুধু Uncountable Noun-এর সাথে বসে।",
        subject: 'English',
        topic: 'Parts of Speech',
        subTopic: 'Determiner',
        sortOrder: 57,
      },
    ],

    skipDuplicates: true,
  });
  console.log('✓ Seeded 27 questions (parts-of-speech-noun-article-determiner)');
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
