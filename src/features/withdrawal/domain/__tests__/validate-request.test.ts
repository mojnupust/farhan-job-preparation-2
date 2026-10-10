import { describe, expect, it } from 'vitest';

import { BadRequestError, ConflictError, ForbiddenError } from '../../../../shared/errors/http-errors.js';
import { validateWithdrawalRequest } from '../validate-request.js';

const base = {
  amountMinorUnits: 10000,
  availableMinorUnits: 50000,
  minMinorUnits: 10000,
  method: 'BKASH',
  destinationNumber: '01788262430',
  userMobile: '01788262430',
  requiresVerifiedPhone: true,
  hasPending: false,
};

describe('validateWithdrawalRequest', () => {
  it('accepts a valid request and normalizes the number', () => {
    const result = validateWithdrawalRequest({
      ...base,
      destinationNumber: '017-8826-2430',
    });
    expect(result.destinationNumber).toBe('01788262430');
    expect(result.method).toBe('BKASH');
  });

  it('rejects amounts below the configured minimum', () => {
    expect(() =>
      validateWithdrawalRequest({ ...base, amountMinorUnits: 9999 }),
    ).toThrow(BadRequestError);
  });

  it('rejects when a pending request already exists', () => {
    expect(() => validateWithdrawalRequest({ ...base, hasPending: true })).toThrow(
      ConflictError,
    );
  });

  it('rejects when available balance is too low', () => {
    expect(() =>
      validateWithdrawalRequest({ ...base, availableMinorUnits: 5000 }),
    ).toThrow(ConflictError);
  });

  it('requires destination to match the verified account mobile', () => {
    expect(() =>
      validateWithdrawalRequest({ ...base, destinationNumber: '01812345678' }),
    ).toThrow(ForbiddenError);
  });

  it('allows a different destination when verified phone is not required', () => {
    const result = validateWithdrawalRequest({
      ...base,
      requiresVerifiedPhone: false,
      destinationNumber: '01812345678',
    });
    expect(result.destinationNumber).toBe('01812345678');
  });
});
