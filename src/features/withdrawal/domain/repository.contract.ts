import type { PaginatedResponse } from '../../../shared/types/pagination.types.js';
import type { WriteLedgerEntryInput } from '../../wallet/domain/types.js';

import type {
  PaymentMethod,
  WithdrawalRequestDto,
  WithdrawalStatus,
} from './types.js';

export interface UserContact {
  id: string;
  name: string | null;
  mobile: string;
}

export interface WithdrawalListFilter {
  userId?: string;
  status?: WithdrawalStatus;
  page?: number;
  pageSize?: number;
}

export interface CreateWithdrawalRecordInput {
  userId: string;
  amountMinorUnits: number;
  method: PaymentMethod;
  destinationNumber: string;
  idempotencyKey: string;
  fraudFlag: boolean;
  fraudReason: string | null;
}

export interface WithdrawalRepository {
  findById(id: string): Promise<WithdrawalRequestDto | null>;
  findByIdempotencyKey(key: string): Promise<WithdrawalRequestDto | null>;
  findPendingByUserId(userId: string): Promise<WithdrawalRequestDto | null>;
  findUserContact(userId: string): Promise<UserContact | null>;
  getWalletSnapshot(userId: string): Promise<{
    availableMinorUnits: number;
    lockedMinorUnits: number;
    version: number;
  }>;
  list(filter: WithdrawalListFilter): Promise<PaginatedResponse<WithdrawalRequestDto>>;
  createAndLock(input: CreateWithdrawalRecordInput): Promise<WithdrawalRequestDto>;
  approve(id: string, adminId: string, adminNote: string | null): Promise<WithdrawalRequestDto>;
  reject(id: string, adminId: string, adminNote: string | null): Promise<WithdrawalRequestDto>;
  pay(
    id: string,
    adminId: string,
    paidTrxId: string,
    adminNote: string | null,
    ledgerInput: WriteLedgerEntryInput,
  ): Promise<WithdrawalRequestDto>;
}
