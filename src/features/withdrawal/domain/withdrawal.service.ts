import { randomUUID } from 'node:crypto';

import { NotFoundError } from '../../../shared/errors/http-errors.js';
import type { PaginatedResponse } from '../../../shared/types/pagination.types.js';
import type { RewardConfigService } from '../../reward-config/domain/reward-config.service.js';
import { normalizeMobile, validateWithdrawalRequest } from './validate-request.js';
import type { WithdrawalRepository } from './repository.contract.js';
import type {
  AdminPayInput,
  AdminReviewInput,
  CreateWithdrawalInput,
  WithdrawalEligibility,
  WithdrawalRequestDto,
  WithdrawalStatus,
} from './types.js';

export class WithdrawalService {
  constructor(
    private readonly repository: WithdrawalRepository,
    private readonly rewardConfig: RewardConfigService,
  ) {}

  async getEligibility(userId: string): Promise<WithdrawalEligibility> {
    const [config, contact, wallet, pending] = await Promise.all([
      this.rewardConfig.getConfig(),
      this.requireContact(userId),
      this.repository.getWalletSnapshot(userId),
      this.repository.findPendingByUserId(userId),
    ]);
    return {
      minMinorUnits: config.withdrawalMinMinorUnits,
      requiresVerifiedPhone: config.withdrawalRequiresVerifiedPhone,
      userMobile: contact.mobile,
      availableMinorUnits: wallet.availableMinorUnits,
      lockedMinorUnits: wallet.lockedMinorUnits,
      hasPending: pending !== null,
    };
  }

  async request(userId: string, input: CreateWithdrawalInput): Promise<WithdrawalRequestDto> {
    const [config, contact, wallet, pending] = await Promise.all([
      this.rewardConfig.getConfig(),
      this.requireContact(userId),
      this.repository.getWalletSnapshot(userId),
      this.repository.findPendingByUserId(userId),
    ]);

    const validated = validateWithdrawalRequest({
      amountMinorUnits: input.amountMinorUnits,
      availableMinorUnits: wallet.availableMinorUnits,
      minMinorUnits: config.withdrawalMinMinorUnits,
      method: input.method,
      destinationNumber: input.destinationNumber,
      userMobile: contact.mobile,
      requiresVerifiedPhone: config.withdrawalRequiresVerifiedPhone,
      hasPending: pending !== null,
    });

    const destinationNumber = validated.destinationNumber;
    const fraud = destinationNumber !== normalizeMobile(contact.mobile);

    return this.repository.createAndLock({
      userId,
      amountMinorUnits: input.amountMinorUnits,
      method: validated.method,
      destinationNumber,
      idempotencyKey: input.idempotencyKey ?? `withdraw:${userId}:${randomUUID()}`,
      fraudFlag: fraud,
      fraudReason: fraud ? 'DESTINATION_MISMATCH' : null,
    });
  }

  async listMine(
    userId: string,
    page?: number,
    pageSize?: number,
  ): Promise<PaginatedResponse<WithdrawalRequestDto>> {
    return this.repository.list({ userId, page, pageSize });
  }

  async listAdmin(
    status?: WithdrawalStatus,
    page?: number,
    pageSize?: number,
  ): Promise<PaginatedResponse<WithdrawalRequestDto>> {
    return this.repository.list({ status, page, pageSize });
  }

  async getAdmin(id: string): Promise<WithdrawalRequestDto> {
    const row = await this.repository.findById(id);
    if (!row) throw new NotFoundError('Withdrawal request not found');
    return row;
  }

  async approve(id: string, adminId: string, input: AdminReviewInput): Promise<WithdrawalRequestDto> {
    return this.repository.approve(id, adminId, input.adminNote ?? null);
  }

  async reject(id: string, adminId: string, input: AdminReviewInput): Promise<WithdrawalRequestDto> {
    return this.repository.reject(id, adminId, input.adminNote ?? null);
  }

  async pay(id: string, adminId: string, input: AdminPayInput): Promise<WithdrawalRequestDto> {
    const current = await this.getAdmin(id);
    return this.repository.pay(id, adminId, input.paidTrxId, input.adminNote ?? null, {
      userId: current.userId,
      type: 'WITHDRAWAL_PAID',
      direction: 'DEBIT',
      amountMinorUnits: current.amountMinorUnits,
      referenceType: 'WITHDRAWAL',
      referenceId: id,
      idempotencyKey: `withdraw-paid:${id}`,
      note: input.adminNote,
      createdBy: adminId,
    });
  }

  private async requireContact(userId: string) {
    const contact = await this.repository.findUserContact(userId);
    if (!contact) throw new NotFoundError('User not found');
    return contact;
  }
}
