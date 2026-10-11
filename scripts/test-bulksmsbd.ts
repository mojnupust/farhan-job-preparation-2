/**
 * Live check of BulkSMSBD credentials: balance, then a short OTP SMS.
 * Usage: npx tsx --env-file=.env scripts/test-bulksmsbd.ts [01XXXXXXXXX]
 */
const apiKey = process.env.BULKSMSBD_API_KEY;
const senderId = process.env.BULKSMSBD_SENDER_ID ?? '8809617613537';
const mobileArg = process.argv[2] ?? '';

if (!apiKey) {
  console.error('BULKSMSBD_API_KEY is missing');
  process.exit(1);
}

function to88(mobile: string): string {
  const digits = mobile.replace(/\D/g, '');
  return digits.startsWith('88') ? digits : `88${digits}`;
}

async function main() {
  const balanceUrl = new URL('https://bulksmsbd.net/api/getBalanceApi');
  balanceUrl.searchParams.set('api_key', apiKey);
  const balanceRes = await fetch(balanceUrl);
  const balanceText = await balanceRes.text();
  console.log('balance_http', balanceRes.status);
  console.log('balance_body', balanceText.slice(0, 300));

  if (!mobileArg) {
    console.log('skip_send (pass a 01XXXXXXXXX number to send a test OTP SMS)');
    return;
  }

  const number = to88(mobileArg);
  const body = new URLSearchParams({
    api_key: apiKey,
    senderid: senderId,
    number,
    message: 'Your Farhan MCQ OTP is 0000',
    type: 'text',
  });
  const sendRes = await fetch('https://bulksmsbd.net/api/smsapi', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  const sendText = await sendRes.text();
  console.log('send_http', sendRes.status);
  console.log('send_to', number);
  console.log('send_body', sendText.slice(0, 300));
}

main().catch((err) => {
  console.error('TEST_FAIL', err instanceof Error ? err.message : err);
  process.exit(1);
});
