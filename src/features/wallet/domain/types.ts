export type LedgerEntryType =
  | 'STREAK_REWARD'
  | 'REFERRAL_COMMISSION'
  | 'CONTRIBUTION_REWARD'
  | 'WITHDRAWAL_PAID'
  | 'ADMIN_ADJUSTMENT';

export type LedgerDirection = 'CREDIT' | 'DEBIT';

export interface WalletAccountDto {
  id: string;
  userId: string;
  balanceMinorUnits: number;
  lockedMinorUnits: number;
  availableMinorUnits: number;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface WalletLedgerEntryDto {
  id: string;
  walletAccountId: string;
  userId: string;
  type: LedgerEntryType;
  direction: LedgerDirection;
  amountMinorUnits: number;
  balanceAfterMinorUnits: number;
  referenceType: string;
  referenceId: string;
  idempotencyKey: string;
  note: string | null;
  createdBy: string | null;
  createdAt: Date;
}

export interface WriteLedgerEntryInput {
  userId: string;
  type: LedgerEntryType;
  direction: LedgerDirection;
  amountMinorUnits: number;
  referenceType: string;
  referenceId: string;
  idempotencyKey: string;
  note?: string;
  createdBy?: string;
}

/** Result of a successful append; null return from the repository means a
 * version conflict — the caller (service) must re-fetch and retry. */
export interface AppendLedgerEntryResult {
  entry: WalletLedgerEntryDto;
  account: WalletAccountDto;
  replayed: boolean;
}

export interface WalletLedgerFilter {
  userId: string;
  page?: number;
  pageSize?: number;
}

export interface AdminAdjustWalletInput {
  userId: string;
  direction: LedgerDirection;
  amountMinorUnits: number;
  note: string;
  idempotencyKey: string;
  adminId: string;
}
