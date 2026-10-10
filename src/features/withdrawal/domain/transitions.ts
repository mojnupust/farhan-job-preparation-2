import { ConflictError } from '../../../shared/errors/http-errors.js';

import type { WithdrawalStatus } from './types.js';

const ALLOWED: Record<WithdrawalStatus, WithdrawalStatus[]> = {
  REQUESTED: ['APPROVED', 'REJECTED'],
  APPROVED: ['PAID', 'REJECTED'],
  PAID: [],
  REJECTED: [],
};

export function canTransition(from: WithdrawalStatus, to: WithdrawalStatus): boolean {
  return ALLOWED[from].includes(to);
}

export function assertTransition(from: WithdrawalStatus, to: WithdrawalStatus): void {
  if (!canTransition(from, to)) {
    throw new ConflictError(`Cannot move withdrawal from ${from} to ${to}`);
  }
}
