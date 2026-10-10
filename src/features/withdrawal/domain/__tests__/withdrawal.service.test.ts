import { describe, expect, it, vi } from 'vitest';

import { ConflictError } from '../../../../shared/errors/http-errors.js';
import type { WithdrawalRepository } from '../repository.contract.js';
import type { WithdrawalRequestDto } from '../types.js';
import { WithdrawalService } from '../withdrawal.service.js';

const config = {
  withdrawalMinMinorUnits: 10000,
  withdrawalRequiresVerifiedPhone: true,
};

function dto(overrides: Partial<WithdrawalRequestDto> = {}): WithdrawalRequestDto {
  return {
    id: 'w1',
    userId: 'u1',
    amountMinorUnits: 10000,
    method: 'BKASH',
    destinationNumber: '01788262430',
    status: 'REQUESTED',
    fraudFlag: false,
    fraudReason: null,
    paidTrxId: null,
    adminNote: null,
    reviewedBy: null,
    reviewedAt: null,
    idempotencyKey: 'key-1',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
}

function repo(overrides: Partial<Record<keyof WithdrawalRepository, ReturnType<typeof vi.fn>>> = {}) {
  return {
    findById: vi.fn(),
    findByIdempotencyKey: vi.fn(),
    findPendingByUserId: vi.fn().mockResolvedValue(null),
    findUserContact: vi.fn().mockResolvedValue({ id: 'u1', name: 'Farhan', mobile: '01788262430' }),
    getWalletSnapshot: vi.fn().mockResolvedValue({
      availableMinorUnits: 50000,
      lockedMinorUnits: 0,
      version: 1,
    }),
    list: vi.fn(),
    createAndLock: vi.fn().mockResolvedValue(dto()),
    approve: vi.fn(),
    reject: vi.fn(),
    pay: vi.fn(),
    ...overrides,
  } as unknown as WithdrawalRepository;
}

describe('WithdrawalService.request', () => {
  it('locks funds and creates a REQUESTED row', async () => {
    const repository = repo();
    const service = new WithdrawalService(repository, {
      getConfig: vi.fn().mockResolvedValue(config),
    } as never);

    const result = await service.request('u1', {
      amountMinorUnits: 10000,
      method: 'BKASH',
      destinationNumber: '01788262430',
      idempotencyKey: 'abc12345',
    });

    expect(result.status).toBe('REQUESTED');
    expect(repository.createAndLock).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: 'u1',
        amountMinorUnits: 10000,
        fraudFlag: false,
        idempotencyKey: 'abc12345',
      }),
    );
  });

  it('flags destination mismatch as fraud when phone verification is off', async () => {
    const repository = repo();
    const service = new WithdrawalService(repository, {
      getConfig: vi.fn().mockResolvedValue({ ...config, withdrawalRequiresVerifiedPhone: false }),
    } as never);

    await service.request('u1', {
      amountMinorUnits: 10000,
      method: 'NAGAD',
      destinationNumber: '01812345678',
    });

    expect(repository.createAndLock).toHaveBeenCalledWith(
      expect.objectContaining({
        fraudFlag: true,
        fraudReason: 'DESTINATION_MISMATCH',
        destinationNumber: '01812345678',
      }),
    );
  });

  it('refuses a second request while one is pending', async () => {
    const repository = repo({
      findPendingByUserId: vi.fn().mockResolvedValue(dto()),
    });
    const service = new WithdrawalService(repository, {
      getConfig: vi.fn().mockResolvedValue(config),
    } as never);

    await expect(
      service.request('u1', {
        amountMinorUnits: 10000,
        method: 'BKASH',
        destinationNumber: '01788262430',
      }),
    ).rejects.toBeInstanceOf(ConflictError);
    expect(repository.createAndLock).not.toHaveBeenCalled();
  });
});

describe('WithdrawalService.pay', () => {
  it('debits the wallet with a stable idempotency key', async () => {
    const current = dto({ status: 'APPROVED' });
    const repository = repo({
      findById: vi.fn().mockResolvedValue(current),
      pay: vi.fn().mockResolvedValue(dto({ status: 'PAID', paidTrxId: 'trx1' })),
    });
    const service = new WithdrawalService(repository, {
      getConfig: vi.fn(),
    } as never);

    await service.pay('w1', 'admin1', { paidTrxId: 'trx1' });

    expect(repository.pay).toHaveBeenCalledWith(
      'w1',
      'admin1',
      'trx1',
      null,
      expect.objectContaining({
        type: 'WITHDRAWAL_PAID',
        direction: 'DEBIT',
        amountMinorUnits: 10000,
        idempotencyKey: 'withdraw-paid:w1',
      }),
    );
  });
});
