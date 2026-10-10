import type { Request, Response } from 'express';

import { HttpStatus } from '../../../../shared/constants/http-status.js';
import type { WithdrawalStatus } from '../../domain/types.js';
import type { WithdrawalService } from '../../domain/withdrawal.service.js';

export class WithdrawalController {
  constructor(private readonly service: WithdrawalService) {}

  async eligibility(req: Request, res: Response): Promise<void> {
    res.status(HttpStatus.OK).json({ data: await this.service.getEligibility(req.userId!) });
  }

  async request(req: Request, res: Response): Promise<void> {
    const data = await this.service.request(req.userId!, req.body);
    res.status(HttpStatus.CREATED).json({ data });
  }

  async listMine(req: Request, res: Response): Promise<void> {
    const { page, pageSize } = req.query as { page?: number; pageSize?: number };
    const data = await this.service.listMine(req.userId!, page, pageSize);
    res.status(HttpStatus.OK).json({ data });
  }

  async listAdmin(req: Request, res: Response): Promise<void> {
    const { page, pageSize, status } = req.query as {
      page?: number;
      pageSize?: number;
      status?: WithdrawalStatus;
    };
    const data = await this.service.listAdmin(status, page, pageSize);
    res.status(HttpStatus.OK).json({ data });
  }

  async getAdmin(req: Request, res: Response): Promise<void> {
    res.status(HttpStatus.OK).json({ data: await this.service.getAdmin(req.params.id!) });
  }

  async approve(req: Request, res: Response): Promise<void> {
    const data = await this.service.approve(req.params.id!, req.userId!, req.body);
    res.status(HttpStatus.OK).json({ data });
  }

  async reject(req: Request, res: Response): Promise<void> {
    const data = await this.service.reject(req.params.id!, req.userId!, req.body);
    res.status(HttpStatus.OK).json({ data });
  }

  async pay(req: Request, res: Response): Promise<void> {
    const data = await this.service.pay(req.params.id!, req.userId!, req.body);
    res.status(HttpStatus.OK).json({ data });
  }
}
