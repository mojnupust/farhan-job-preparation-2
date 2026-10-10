import type { RewardConfigDto, UpdateRewardConfigInput } from './types.js';

export interface RewardConfigRepository {
  /** Lazily creates the single config row with defaults on first access. */
  getOrCreate(): Promise<RewardConfigDto>;
  update(input: UpdateRewardConfigInput, updatedBy: string): Promise<RewardConfigDto>;
}
