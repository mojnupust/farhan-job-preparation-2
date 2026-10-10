import type { Request, Response } from 'express';

import { HttpStatus } from '../../../../shared/constants/http-status.js';
import type { StreakService } from '../../domain/streak.service.js';

export class StreakController {
  constructor(private readonly service: StreakService) {}

  async checkIn(req: Request, res: Response): Promise<void> {
    const outcome = await this.service.checkIn(req.userId!);
    if (outcome.kind === 'activity_required') {
      res.status(HttpStatus.FORBIDDEN).json({
        error: {
          code: 'ACTIVITY_REQUIRED',
          message: "আজকের কুইজ সম্পন্ন করুন তারপর চেক-ইন করুন",
        },
        progress: outcome.progress,
      });
      return;
    }
    res.status(HttpStatus.OK).json({ data: outcome.result });
  }

  async getStatus(req: Request, res: Response): Promise<void> {
    const status = await this.service.getStatus(req.userId!);
    res.status(HttpStatus.OK).json({ data: status });
  }
}
