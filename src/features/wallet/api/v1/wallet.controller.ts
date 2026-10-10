import type { Request, Response } from 'express';

import { HttpStatus } from '../../../../shared/constants/http-status.js';
import type { WalletService } from '../../domain/wallet.service.js';
import type { AdminAdjustWalletInput } from '../../domain/types.js';

export class WalletController {
  constructor(private readonly service: WalletService) {}

  async getMyWallet(req: Request, res: Response): Promise<void> {
    const wallet = await this.service.getOrCreateWallet(req.userId!);
    res.status(HttpStatus.OK).json({ data: wallet });
  }

  async getMyLedger(req: Request, res: Response): Promise<void> {
    const { page, pageSize } = req.query as { page?: number; pageSize?: number };
    const result = await this.service.listLedger({
      userId: req.userId!,
      ...(page !== undefined && { page }),
      ...(pageSize !== undefined && { pageSize }),
    });
    res.status(HttpStatus.OK).json({ data: result });
  }

  async adminGetWallet(req: Request, res: Response): Promise<void> {
    const wallet = await this.service.getOrCreateWallet(req.params.userId!);
    res.status(HttpStatus.OK).json({ data: wallet });
  }

  async adminAdjustWallet(req: Request, res: Response): Promise<void> {
    const input: AdminAdjustWalletInput = {
      userId: req.params.userId!,
      adminId: req.userId!,
      ...req.body,
    };
    const entry = await this.service.adjustByAdmin(input);
    res.status(HttpStatus.CREATED).json({ data: entry });
  }
}
