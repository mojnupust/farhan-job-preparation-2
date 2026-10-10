import type { Request, Response } from 'express';

import { HttpStatus } from '../../../../shared/constants/http-status.js';
import type { RewardConfigService } from '../../domain/reward-config.service.js';
import type { UpdateRewardConfigInput } from '../../domain/types.js';

export class RewardConfigController {
  constructor(private readonly service: RewardConfigService) {}

  async getConfig(_req: Request, res: Response): Promise<void> {
    res.status(HttpStatus.OK).json({ data: await this.service.getConfig() });
  }

  async updateConfig(req: Request, res: Response): Promise<void> {
    const input: UpdateRewardConfigInput = req.body;
    const config = await this.service.updateConfig(input, req.userId!);
    res.status(HttpStatus.OK).json({ data: config });
  }
}
