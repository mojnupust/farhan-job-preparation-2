import { BadRequestError, ConflictError, ForbiddenError } from '../../../shared/errors/http-errors.js';

import type { PaymentMethod } from './types.js';

export const BD_MOBILE_RE = /^01[3-9]\d{8}$/;

const METHODS: PaymentMethod[] = ['BKASH', 'NAGAD', 'ROCKET'];

export function normalizeMobile(value: string): string {
  return value.replace(/\D/g, '').slice(-11);
}

export interface ValidateWithdrawalRequestInput {
  amountMinorUnits: number;
  availableMinorUnits: number;
  minMinorUnits: number;
  method: string;
  destinationNumber: string;
  userMobile: string;
  requiresVerifiedPhone: boolean;
  hasPending: boolean;
}

export function validateWithdrawalRequest(input: ValidateWithdrawalRequestInput): {
  destinationNumber: string;
  method: PaymentMethod;
} {
  if (!Number.isInteger(input.amountMinorUnits) || input.amountMinorUnits <= 0) {
    throw new BadRequestError('পরিমাণ পয়সায় ধনাত্মক পূর্ণসংখ্যা হতে হবে');
  }
  if (input.amountMinorUnits < input.minMinorUnits) {
    throw new BadRequestError('উইথড্রয়ালের পরিমাণ সর্বনিম্ন সীমার নিচে');
  }
  if (input.hasPending) {
    throw new ConflictError('আগের উইথড্রয়াল সম্পন্ন না হওয়া পর্যন্ত নতুন রিকোয়েস্ট করা যাবে না');
  }
  if (input.amountMinorUnits > input.availableMinorUnits) {
    throw new ConflictError('ওয়ালেটে পর্যাপ্ত ব্যালেন্স নেই');
  }
  if (!METHODS.includes(input.method as PaymentMethod)) {
    throw new BadRequestError('অবৈধ পেমেন্ট মেথড');
  }
  const destinationNumber = normalizeMobile(input.destinationNumber);
  if (!BD_MOBILE_RE.test(destinationNumber)) {
    throw new BadRequestError('সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন');
  }
  if (input.requiresVerifiedPhone && destinationNumber !== normalizeMobile(input.userMobile)) {
    throw new ForbiddenError('উইথড্রয়াল শুধু অ্যাকাউন্টের ভেরিফায়েড মোবাইলে করা যাবে');
  }
  return { destinationNumber, method: input.method as PaymentMethod };
}
