import type { RewardConfigRepository } from './repository.contract.js';
import type { RewardConfigDto, UpdateRewardConfigInput } from './types.js';

export class RewardConfigService {
  constructor(private readonly repository: RewardConfigRepository) {}

  async getConfig(): Promise<RewardConfigDto> {
    return this.repository.getOrCreate();
  }

  async updateConfig(input: UpdateRewardConfigInput, updatedBy: string): Promise<RewardConfigDto> {
    return this.repository.update(input, updatedBy);
  }
}
