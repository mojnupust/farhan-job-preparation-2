import type { PrismaClient } from '@prisma/client';

import { rewardConfigMapper } from '../domain/mapper.js';
import type { RewardConfigRepository } from '../domain/repository.contract.js';
import type { RewardConfigDto, UpdateRewardConfigInput } from '../domain/types.js';

export class RewardConfigPrismaRepository implements RewardConfigRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getOrCreate(): Promise<RewardConfigDto> {
    const config = await this.prisma.rewardConfig.upsert({
      where: { isSingleton: true },
      create: { isSingleton: true },
      update: {},
    });
    return rewardConfigMapper.toDto(config);
  }

  async update(input: UpdateRewardConfigInput, updatedBy: string): Promise<RewardConfigDto> {
    const current = await this.getOrCreate();
    const updated = await this.prisma.rewardConfig.update({
      where: { id: current.id },
      data: { ...input, updatedBy },
    });
    return rewardConfigMapper.toDto(updated);
  }
}
