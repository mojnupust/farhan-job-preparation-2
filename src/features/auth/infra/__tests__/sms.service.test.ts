import { describe, expect, it, vi } from 'vitest';
import type { Logger } from 'pino';

import { createSmsService, toInternationalBdNumber } from '../sms.service.js';

function silentLogger(): Logger {
  return {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    debug: vi.fn(),
    fatal: vi.fn(),
    trace: vi.fn(),
    child: vi.fn(),
  } as unknown as Logger;
}

const bothGateways = {
  nodeEnv: 'production',
  mimApiKey: 'mim-key',
  mimUserName: 'mim-user',
  mimSenderName: '8801',
  bulkApiKey: 'bulk-key',
  bulkSenderId: '8809617613537',
};

function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

describe('toInternationalBdNumber', () => {
  it('prefixes 88 when missing', () => {
    expect(toInternationalBdNumber('01788262430')).toBe('8801788262430');
  });

  it('keeps an existing 88 prefix', () => {
    expect(toInternationalBdNumber('8801788262430')).toBe('8801788262430');
  });
});

describe('createSmsService failover', () => {
  it('sends via MimSMS and does not call BulkSMS on success', async () => {
    const fetchFn = vi.fn().mockResolvedValue(
      jsonResponse(200, { status: 'success', statusCode: 200 }),
    );
    const sms = createSmsService(silentLogger(), bothGateways, fetchFn);
    await sms.send('01788262430', 'Your Farhan MCQ OTP is 1234');
    expect(fetchFn).toHaveBeenCalledTimes(1);
    expect(String(fetchFn.mock.calls[0]?.[0])).toContain('mimsms.com');
  });

  it('falls back to BulkSMS when MimSMS returns an error body', async () => {
    const fetchFn = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse(200, { status: 'Error', message: 'gateway down' }))
      .mockResolvedValueOnce(
        jsonResponse(200, {
          response_code: 202,
          success_message: 'SMS Submitted Successfully',
          error_message: '',
        }),
      );
    const sms = createSmsService(silentLogger(), bothGateways, fetchFn);
    await sms.send('01788262430', 'Your Farhan MCQ OTP is 1234');
    expect(fetchFn).toHaveBeenCalledTimes(2);
    expect(String(fetchFn.mock.calls[1]?.[0])).toContain('bulksmsbd.net');
  });

  it('retries MimSMS when BulkSMS also returns an error code', async () => {
    const fetchFn = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse(500, { error: 'mim down' }))
      .mockResolvedValueOnce(jsonResponse(200, { response_code: 1007, error_message: 'Balance Insufficient' }))
      .mockResolvedValueOnce(jsonResponse(200, { status: 'success', statusCode: 200 }));
    const sms = createSmsService(silentLogger(), bothGateways, fetchFn);
    await sms.send('01788262430', 'Your Farhan MCQ OTP is 1234');
    expect(fetchFn).toHaveBeenCalledTimes(3);
    expect(String(fetchFn.mock.calls[2]?.[0])).toContain('mimsms.com');
  });

  it('throws after every gateway fails', async () => {
    const fetchFn = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse(500, { status: 'Error' }))
      .mockResolvedValueOnce(
        jsonResponse(200, { response_code: 1002, error_message: 'sender id not correct' }),
      )
      .mockResolvedValueOnce(jsonResponse(503, { status: 'Error' }));
    const sms = createSmsService(silentLogger(), bothGateways, fetchFn);
    await expect(sms.send('01788262430', 'Your Farhan MCQ OTP is 1234')).rejects.toThrow(
      /all gateways/,
    );
    expect(fetchFn).toHaveBeenCalledTimes(3);
  });
});
