/**
 * Upload question-set PDFs to the live job-preparation API.
 * Usage: node scripts/upload-pdfs-to-live.mjs
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const BASE_URL = process.env.API_BASE_URL ?? 'https://job-preparation-66yp.onrender.com';
const MOBILE = process.env.ADMIN_MOBILE ?? '01788262430';
const PASSWORD = process.env.ADMIN_PASSWORD ?? 'admin1234';
const PDF_DIR = path.resolve('upload_question_sets_pdf_automate');

const BCS_SUB_ID = 'cmszq9dw90003ed01dlfcid5v';
const NTRCA_SUB_ID = 'cmszquu230009ed01tu5agn3f';

function metaFromFileName(fileName) {
  const title = fileName.replace(/\.pdf$/i, '').trim();
  const isNtrca = /শিক্ষক|ntrca/i.test(title);
  const isBcs = /বিসিএস|bcs/i.test(title);

  const banglaOrd = title.match(
    /([০১২৩৪৫৬৭৮৯]+)\s*তম|[০১২৩৪৫৬৭৮৯]+\s*ত\s*ম/,
  );
  const enOrd = title.match(/(\d+)\s*(?:th|st|nd|rd)?\s*(?:BCS|NTRCA)/i);
  const ordinalBn = banglaOrd?.[1]
    ? `${banglaOrd[1]}তম`
    : title.includes('১০ত ম')
      ? '১০তম'
      : null;

  let level = '';
  if (/কলেজ/.test(title)) level = 'কলেজ পর্যায়';
  else if (/স্কুল\s*(পর্যায়)?\s*[–-]?\s*২|স্কুল ২/.test(title)) level = 'স্কুল পর্যায়-২';
  else if (/স্কুল/.test(title)) level = 'স্কুল পর্যায়';

  const bcsOrdinal = ordinalBn ?? (enOrd?.[1] ? `${enOrd[1]}তম` : '');
  const examName = isNtrca
    ? `${ordinalBn ?? 'NTRCA'} শিক্ষক নিবন্ধন/নিয়োগ${level ? ` (${level})` : ''}`
    : `${bcsOrdinal} বিসিএস প্রিলিমিনারি`.trim();

  const subject = isNtrca
    ? 'বাংলা, ইংরেজি, গণিত, সাধারণ জ্ঞান'
    : 'বাংলা, ইংরেজি, গণিত, সাধারণ জ্ঞান, বাংলাদেশ বিষয়াবলি, আন্তর্জাতিক বিষয়াবলি';

  const description = isNtrca
    ? `${title} — NTRCA শিক্ষক নিবন্ধন/নিয়োগ পরীক্ষার বিগত প্রশ্নের সমাধান। ${level ? `${level}ের` : ''} প্রার্থীদের প্রস্তুতির জন্য ফ্রি PDF।`
    : `${title} — বিসিএস প্রিলিমিনারি পরীক্ষার বিগত সালের প্রশ্নের সম্পূর্ণ সমাধান। বাংলা, ইংরেজি, গণিত ও সাধারণ জ্ঞানের প্রশ্ন অন্তর্ভুক্ত। ফ্রি ডাউনলোড।`;

  const tags = [
    isBcs ? 'BCS' : null,
    isNtrca ? 'NTRCA' : null,
    'প্রশ্ন সমাধান',
    'বিগত প্রশ্ন',
    'ফ্রি',
    ordinalBn,
    level,
  ]
    .filter(Boolean)
    .join(', ');

  return {
    title,
    description,
    docType: 'PREVIOUS_QUESTIONS',
    subExamCategoryId: isNtrca ? NTRCA_SUB_ID : BCS_SUB_ID,
    subject,
    examName,
    tags,
    isFree: 'true',
    isActive: 'true',
    isFeatured: 'false',
  };
}

async function login() {
  const res = await fetch(`${BASE_URL}/api/v1/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mobile: MOBILE, password: PASSWORD }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`Login failed: ${JSON.stringify(json)}`);
  return json.data.token;
}

async function existingTitles(token) {
  const titles = new Set();
  let page = 1;
  for (;;) {
    const url = new URL(`${BASE_URL}/api/v1/pdfs/admin/list`);
    url.searchParams.set('page', String(page));
    url.searchParams.set('limit', '48');
    url.searchParams.set('includeInactive', 'true');
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    const json = await res.json();
    if (!res.ok) break;
    for (const row of json.data ?? []) titles.add(row.title);
    const totalPages = json.totalPages ?? 1;
    if (page >= totalPages) break;
    page += 1;
  }
  return titles;
}

async function sleep(ms) {
  await new Promise((r) => setTimeout(r, ms));
}

async function uploadOne(token, filePath, fileName) {
  const fields = metaFromFileName(fileName);
  const buf = await readFile(filePath);
  const form = new FormData();
  form.append('file', new Blob([buf], { type: 'application/pdf' }), fileName);
  for (const [k, v] of Object.entries(fields)) form.append(k, v);

  const res = await fetch(`${BASE_URL}/api/v1/pdfs/admin`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(`HTTP ${res.status}: ${JSON.stringify(json)}`);
    err.status = res.status;
    throw err;
  }
  return { id: json.data?.id, title: json.data?.title };
}

async function main() {
  let token = await login();
  console.log('Logged in as ADMIN');
  const already = await existingTitles(token);
  console.log(`Existing PDFs on server: ${already.size}`);

  const names = (await readdir(PDF_DIR)).filter((n) => n.toLowerCase().endsWith('.pdf'));
  const results = [];
  let ok = 0;
  let skipped = 0;
  let failed = 0;

  for (let i = 0; i < names.length; i += 1) {
    const fileName = names[i];
    const title = fileName.replace(/\.pdf$/i, '').trim();
    const n = `${i + 1}/${names.length}`;
    if (already.has(title)) {
      skipped += 1;
      console.log(`[${n}] skip (exists) ${fileName}`);
      results.push({ file: fileName, status: 'skipped' });
      continue;
    }
    let lastError = null;
    for (let attempt = 1; attempt <= 3; attempt += 1) {
      try {
        process.stdout.write(`[${n}] uploading ${fileName} (try ${attempt}) ... `);
        const out = await uploadOne(token, path.join(PDF_DIR, fileName), fileName);
        ok += 1;
        console.log(`ok ${out.id}`);
        results.push({ file: fileName, status: 'ok', id: out.id });
        lastError = null;
        break;
      } catch (err) {
        lastError = err;
        if (err.status === 401) {
          token = await login();
        }
        console.log(`FAILED ${err.message}`);
        await sleep(2000 * attempt);
      }
    }
    if (lastError) {
      failed += 1;
      results.push({ file: fileName, status: 'failed', error: lastError.message });
    }
  }

  const summary = {
    generatedAt: new Date().toISOString(),
    ok,
    skipped,
    failed,
    results,
  };
  await writeFile(
    path.join(PDF_DIR, '_upload-result.json'),
    `${JSON.stringify(summary, null, 2)}\n`,
  );
  console.log(`\nDone. ok=${ok} skipped=${skipped} failed=${failed}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
