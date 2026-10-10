# Python Automation Ingestor

যে কন্টেন্ট আপনার নিজের, বা যেটা বের করার জন্য আপনার স্পষ্ট অনুমতি আছে—সেটা এক্সট্রাক্ট করার জন্য Python + Playwright অটোমেশন ফ্রেমওয়ার্ক।

## ১. ইনস্টল

Windows:

```bat
py -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python -m playwright install chromium
```

`.env.example` কপি করে `.env` বানান।

## ২. অথেন্টিকেশন

### সহজ পদ্ধতি — ম্যানুয়াল লগইন

```bat
python main.py login
```

একটা ভিজিবল Chromium ব্রাউজার খুলবে। নিজে লগইন করুন। টার্মিনালে ENTER চাপুন।

সেশন লোকালে সেভ হয় এখানে:

```text
playwright/auth/storage-state.json
```

### cookies.txt পদ্ধতি

আপনার নিজের Netscape কুকি এক্সপোর্ট এখানে রাখুন:

```text
secrets/cookies.txt
```

তারপর:

```bat
python main.py auth-check
```

কুকির ভ্যালু কখনো প্রিন্ট হয় না।

## ৩. ক্রল

আগে dry-run চালান:

```bat
python main.py crawl --url https://livemcq.com/app/ --dry-run
```

আউটপুট:

```text
output/mcqs.json
```

## ৪. সিলেক্টর কাস্টমাইজ

`main.py` এর ভিতরে `SELECTORS` এডিট করুন:

```python
SELECTORS = {
    "question": ".question-card",
    "question_text": ".question-text",
    "options": ".option",
    "option_text": ".option-text",
    "correct": ".correct",
    "explanation": ".explanation",
}
```

এই সিলেক্টরগুলো ইচ্ছাকৃতভাবে জেনেরিক। অনুমোদিত সাইটের HTML দেখে সেগুলো বদলান।

## ৫. Farhan MCQ ডাটাবেস

ক্রলার নর্মালাইজড JSON দেয়। ফাইনাল ডাটাবেস রাইটার আপনার নিজের Farhan MCQ ব্যাকএন্ড বা Prisma লেয়ার কল করবে।

প্রস্তাবিত ফ্লো:

Browser → discovery → extraction → normalization → SHA-256 dedup → JSON → Farhan MCQ API/Prisma → PostgreSQL

## সিকিউরিটি

- `secrets/cookies.txt` কমিট করবেন না।
- সেশন কুকি চ্যাটে পেস্ট করবেন না।
- কুকি এক্সপোজ হয়ে গেলে রোটেট করুন।
- টার্মস, লাইসেন্স, কপিরাইট, অ্যাক্সেস কন্ট্রোল এবং রেট লিমিট মানুন।
- শুধু সেই কন্টেন্ট এক্সট্রাক্ট করুন যা আপনার নিজের, বা যেটার জন্য স্পষ্ট অনুমতি আছে।
