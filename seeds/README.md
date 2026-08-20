# নতুন ডাটাবেসে Question Set ও Question সিড করা

হ্যাঁ — লাইভ ডাটাবেস থেকে ডাউনলোড **ঠিকমতো সম্পন্ন** হয়েছে।

| কী | ফোল্ডার | সংখ্যা |
| --- | --- | --- |
| Question set (সাব-ক্যাটাগরি অনুযায়ী) | `seeds/question-sets/` | ১১টি ফাইল, **৮০**টি সেট |
| Question (সেট অনুযায়ী) | `seeds/questions/` | **৮০**টি ফাইল, **৮০৮১**টি প্রশ্ন |

তালিকা দেখতে: `seeds/question-sets/_manifest.json` এবং `seeds/questions/_manifest.json`।

কিছু সাব-ক্যাটাগরিতে সেট ছিল না (`samajseba-odhidoptor`, `ntrca-teacher-school-college`, `only-ict` — ০ সেট)। একটি সেটে প্রশ্ন ছিল না (`বাগধারা, MS Word বেসিক, Article`)। এগুলো খালি ফাইল, ত্রুটি নয়।

পুরনো ডাটাবেসের ID নতুন ডাটাবেসে **বসবে না**। সিড করার সময় আপনি নতুন ID দিবেন।

---

## ধাপ ১ — নতুন ডাটাবেস প্রস্তুত করুন

`.env` ফাইলে `DATABASE_URL` যেন **নতুন** ডাটাবেসের হয়।

```bash
npx prisma generate
npx prisma migrate deploy
```

লোকাল ডেভেলপমেন্টে স্কিমা পুশ করতে চাইলে:

```bash
npm run db:push
```

---

## ধাপ ২ — Exam category ও Sub-exam category তৈরি করুন

Question set সিড করতে **আগে** নতুন ডাটাবেসে একই স্লাগের সাব-ক্যাটাগরি থাকতে হবে।

```bash
npx tsx --env-file=.env prisma/seed.ts
```

অথবা অ্যাডমিন প্যানেল থেকে ক্যাটাগরি তৈরি করুন। তারপর নতুন সাব-ক্যাটাগরির ID নিন:

```bash
npm run db:studio
```

`sub_exam_categories` টেবিলে গিয়ে মিলিয়ে নিন — স্লাগ পুরনো ডাম্পের সাথে একই (যেমন `bcs-job-solution`)। **নতুন ID** কপি করুন। পুরনো ID ফাইলের `source.subExamCategoryId` এ আছে, সেটা ব্যবহার করবেন না।

---

## ধাপ ৩ — Question set সিড করুন (সাব-ক্যাটাগরি ID দিয়ে)

**আগে সেট, পরে প্রশ্ন।** একবারে এক সাব-ক্যাটাগরি।

ফাইল ↔ স্লাগ:

| ফাইল | স্লাগ | সেট সংখ্যা |
| --- | --- | ---: |
| `seeds/question-sets/bcs-job-solution.json` | `bcs-job-solution` | ৪০ |
| `seeds/question-sets/ntrca-job-solution.json` | `ntrca-job-solution` | ২৭ |
| `seeds/question-sets/daily-20-gk.json` | `daily-20-gk` | ৫ |
| `seeds/question-sets/19th-ntrca-preparation.json` | `19th-ntrca-preparation` | ৩ |
| `seeds/question-sets/somajseba-job-solution.json` | `somajseba-job-solution` | ২ |
| `seeds/question-sets/recent-job-solution-2026.json` | `recent-job-solution-2026` | ১ |
| `seeds/question-sets/bangla.json` | `bangla` | ১ |
| `seeds/question-sets/computer-operator.json` | `computer-operator` | ১ |

উদাহরণ — বিসিএস জব সল্যুশন:

```bash
npm run db:seed-exported-question-sets -- --file=seeds/question-sets/bcs-job-solution.json --sub-exam-category-id=এখানে_নতুন_সাব_ক্যাটাগরি_ID
```

সফল হলে টার্মিনালে দেখাবে কতগুলো সেট তৈরি হয়েছে। বাকি ফাইলগুলোর জন্য `--file` ও `--sub-exam-category-id` বদলে একই কমান্ড চালান।

---

## ধাপ ৪ — নতুন Question set ID বের করুন

প্রশ্ন সিড করতে **নতুন** `question_sets.id` লাগবে। Prisma Studio খুলুন:

```bash
npm run db:studio
```

`question_sets` টেবিলে `title` দিয়ে খুঁজুন। ফাইলের নাম পুরনো ID — মিলাতে:

1. `seeds/questions/_manifest.json` এ `title` দেখুন।
2. নতুন ডাটাবেসে একই `title` এর সেট খুঁজুন।
3. সেই সেটের **নতুন** `id` কপি করুন।

ফাইলের ভিতরেও `source.title` ও `source.questionSetId` (পুরনো) আছে। সিডে পুরনো ID দিবেন না।

---

## ধাপ ৫ — Question সিড করুন (question set ID দিয়ে)

এক ফাইল = এক সেটের সব প্রশ্ন (সাবজেক্ট / টপিক / সাব-টপিক সহ)।

```bash
npm run db:seed-exported-questions -- --file=seeds/questions/cmp6hn3740003uxosqiw7wpv2.json --question-set-id=এখানে_নতুন_QUESTION_SET_ID
```

প্রতিটি সেটের জন্য আলাদা করে চালান। `_manifest.json` এ ৮০টি ফাইলের তালিকা আছে।

`skipDuplicates` চালু আছে — একই `slug` আগে থেকে থাকলে সেই প্রশ্ন স্কিপ হবে।

---

## ছোট উদাহরণ (এক সাব-ক্যাটাগরি শেষ করা)

সমাজসেবা জব সল্যুশন — ২টি সেট।

1. নতুন DB-তে `somajseba-job-solution` সাব-ক্যাটাগরির ID নিন।
2. সেট সিড:

```bash
npm run db:seed-exported-question-sets -- --file=seeds/question-sets/somajseba-job-solution.json --sub-exam-category-id=NEW_SUB_ID
```

3. Studio থেকে দুটি সেটের নতুন ID নিন, তারপর:

```bash
npm run db:seed-exported-questions -- --file=seeds/questions/cmq94rdxl000pf701qqsagh8u.json --question-set-id=NEW_SET_ID_2010
npm run db:seed-exported-questions -- --file=seeds/questions/cmq801kai000nf7019tv741i5.json --question-set-id=NEW_SET_ID_2022
```

---

## আবার সোর্স থেকে ডাউনলোড (ঐচ্ছিক)

`.env` এর `DATABASE_URL` যেন **সোর্স** ডাটাবেস হয়।

সব সাব-ক্যাটাগরির সেট:

```bash
npm run export:question-sets
```

একটি সাব-ক্যাটাগরি:

```bash
npm run export:question-sets -- --sub-exam-category-id=পুরনো_সাব_ক্যাটাগরি_ID
```

সব সেটের প্রশ্ন:

```bash
npm run export:questions
```

একটি সেট:

```bash
npm run export:questions -- --question-set-id=পুরনো_QUESTION_SET_ID
```

---

## মনে রাখবেন

1. সিডের আগে `.env` → নতুন ডাটাবেস। এক্সপোর্টের আগে `.env` → সোর্স ডাটাবেস।
2. ক্রম: ক্যাটাগরি → question set → question।
3. ফাইলের ভিতরের `sourceId` শুধু রেফারেন্স; নতুন টেবিলে নতুন ID তৈরি হয়।
4. খালি সাব-ক্যাটাগরি/সেট সিড করলে ০ রো ইনসার্ট হবে — সমস্যা নয়।
