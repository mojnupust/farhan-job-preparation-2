export type WithdrawalStatus = 'REQUESTED' | 'APPROVED' | 'PAID' | 'REJECTED';
export type PaymentMethod = 'BKASH' | 'NAGAD' | 'ROCKET';

export interface WithdrawalRequestDto {
  id: string;
  userId: string;
  amountMinorUnits: number;
  method: PaymentMethod;
  destinationNumber: string;
  status: WithdrawalStatus;
  fraudFlag: boolean;
  fraudReason: string | null;
  paidTrxId: string | null;
  adminNote: string | null;
  reviewedBy: string | null;
  reviewedAt: Date | null;
  idempotencyKey: string;
  createdAt: Date;
  updatedAt: Date;
  user?: {
    name: string | null;
    mobile: string;
  };
}

export interface WithdrawalEligibility {
  minMinorUnits: number;
  requiresVerifiedPhone: boolean;
  userMobile: string;
  availableMinorUnits: number;
  lockedMinorUnits: number;
  hasPending: boolean;
}

export interface CreateWithdrawalInput {
  amountMinorUnits: number;
  method: PaymentMethod;
  destinationNumber: string;
  idempotencyKey?: string;
}

export interface AdminReviewInput {
  adminNote?: string;
}

export interface AdminPayInput {
  paidTrxId: string;
  adminNote?: string;
}
