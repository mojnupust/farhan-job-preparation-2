import type { Logger } from 'pino';

export interface SmsConfig {
  nodeEnv: string;
  mimApiKey?: string;
  mimUserName?: string;
  mimSenderName?: string;
  bulkApiKey?: string;
  bulkSenderId?: string;
}

export interface SmsService {
  send(mobile: string, message: string): Promise<void>;
}

type FetchFn = typeof fetch;

const MIMSMS_API_URL = 'https://api.mimsms.com/api/SmsSending/SMS';
const BULKSMS_API_URL = 'https://bulksmsbd.net/api/smsapi';
const SMS_TIMEOUT_MS = 12_000;
const BULKSMS_SUCCESS_CODE = 202;

export function toInternationalBdNumber(mobile: string): string {
  const digits = mobile.replace(/\D/g, '');
  if (digits.startsWith('88')) return digits;
  return `88${digits}`;
}

export function createSmsService(
  logger: Logger,
  smsConfig: SmsConfig,
  fetchFn: FetchFn = fetch,
): SmsService {
  return {
    async send(mobile: string, message: string): Promise<void> {
      const number = toInternationalBdNumber(mobile);
      const mimReady = Boolean(
        smsConfig.mimApiKey && smsConfig.mimUserName && smsConfig.mimSenderName,
      );
      const bulkReady = Boolean(smsConfig.bulkApiKey && smsConfig.bulkSenderId);

      if (smsConfig.nodeEnv !== 'production') {
        console.log(`[DEV SMS] To: ${number} | Message: ${message}`);
        logger.info({ mobile: number }, '[SMS] Dev mode — OTP logged to console, not sent');
        return;
      }

      if (!mimReady && !bulkReady) {
        throw new Error('SMS credentials are required in production');
      }

      const attempts: Array<{ name: 'mimsms' | 'bulksms'; run: () => Promise<void> }> = [];
      if (mimReady) {
        attempts.push({ name: 'mimsms', run: () => sendViaMimSms(fetchFn, smsConfig, number, message) });
      }
      if (bulkReady) {
        attempts.push({ name: 'bulksms', run: () => sendViaBulkSms(fetchFn, smsConfig, number, message) });
      }
      // If MimSMS failed and BulkSMS also failed, retry MimSMS once (transient gateway blips).
      if (mimReady && bulkReady) {
        attempts.push({
          name: 'mimsms',
          run: () => sendViaMimSms(fetchFn, smsConfig, number, message),
        });
      }

      const errors: string[] = [];
      for (const attempt of attempts) {
        try {
          logger.info({ mobile: number, provider: attempt.name }, '[SMS] Sending OTP');
          await attempt.run();
          logger.info({ mobile: number, provider: attempt.name }, '[SMS] OTP sent');
          return;
        } catch (err) {
          const reason = err instanceof Error ? err.message : String(err);
          errors.push(`${attempt.name}: ${reason}`);
          logger.warn(
            { mobile: number, provider: attempt.name, reason },
            '[SMS] Provider failed — trying next gateway',
          );
        }
      }

      throw new Error(`SMS sending failed via all gateways (${errors.join(' | ')})`);
    },
  };
}

async function sendViaMimSms(
  fetchFn: FetchFn,
  smsConfig: SmsConfig,
  number: string,
  message: string,
): Promise<void> {
  const response = await fetchWithTimeout(fetchFn, MIMSMS_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ApiKey: smsConfig.mimApiKey,
      UserName: smsConfig.mimUserName,
      MobileNumber: number,
      SenderName: smsConfig.mimSenderName,
      CampaignName: '',
      TransactionType: 'T',
      MessageId: '',
      Message: message,
      CampaignId: 'null',
      SmsData: null,
    }),
  });

  const payload = await readPayload(response);
  const rejection = mimSmsRejection(response.ok, payload);
  if (rejection) {
    throw new Error(rejection);
  }
}

async function sendViaBulkSms(
  fetchFn: FetchFn,
  smsConfig: SmsConfig,
  number: string,
  message: string,
): Promise<void> {
  const body = new URLSearchParams({
    api_key: smsConfig.bulkApiKey!,
    senderid: smsConfig.bulkSenderId!,
    number,
    message,
    type: 'text',
  });

  const response = await fetchWithTimeout(fetchFn, BULKSMS_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  const payload = await readPayload(response);
  const rejection = bulkSmsRejection(response.ok, payload);
  if (rejection) {
    throw new Error(rejection);
  }
}

async function fetchWithTimeout(
  fetchFn: FetchFn,
  url: string,
  init: RequestInit,
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SMS_TIMEOUT_MS);
  try {
    return await fetchFn(url, { ...init, signal: controller.signal });
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      throw new Error('SMS gateway timed out');
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

async function readPayload(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text.trim()) return null;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

function mimSmsRejection(httpOk: boolean, payload: unknown): string | null {
  if (!httpOk) {
    return `MimSMS HTTP error: ${describePayload(payload)}`;
  }
  if (!payload || typeof payload !== 'object') return null;
  const row = payload as Record<string, unknown>;
  const status = String(row.status ?? row.Status ?? '').toLowerCase();
  if (['error', 'failed', 'fail', 'false'].includes(status)) {
    return `MimSMS error: ${describePayload(payload)}`;
  }
  const statusCode = row.statusCode ?? row.StatusCode;
  if (statusCode !== undefined && !isHttpishSuccess(statusCode)) {
    return `MimSMS statusCode ${String(statusCode)}: ${describePayload(payload)}`;
  }
  const errMsg = stringField(row, ['error_message', 'errorMessage', 'Error', 'message']);
  if (errMsg && /fail|error|invalid|denied/i.test(errMsg) && status !== 'success') {
    return `MimSMS error: ${errMsg}`;
  }
  return null;
}

function bulkSmsRejection(httpOk: boolean, payload: unknown): string | null {
  if (!httpOk) {
    return `BulkSMS HTTP error: ${describePayload(payload)}`;
  }
  if (!payload || typeof payload !== 'object') {
    const text = typeof payload === 'string' ? payload : '';
    if (text && /success/i.test(text)) return null;
    return text ? `BulkSMS unexpected body: ${text.slice(0, 180)}` : 'BulkSMS empty response';
  }
  const row = payload as Record<string, unknown>;
  const code = Number(row.response_code);
  if (code === BULKSMS_SUCCESS_CODE) return null;
  const errMsg = stringField(row, ['error_message', 'success_message', 'message']);
  return `BulkSMS response_code ${Number.isFinite(code) ? code : 'unknown'}${errMsg ? `: ${errMsg}` : ''}`;
}

function isHttpishSuccess(value: unknown): boolean {
  const n = Number(value);
  return n === 200 || n === 0 || n === 202;
}

function stringField(row: Record<string, unknown>, keys: string[]): string | null {
  for (const key of keys) {
    const value = row[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return null;
}

function describePayload(payload: unknown): string {
  if (payload == null) return '(empty)';
  if (typeof payload === 'string') return payload.slice(0, 180);
  try {
    return JSON.stringify(payload).slice(0, 180);
  } catch {
    return '[unserializable]';
  }
}
