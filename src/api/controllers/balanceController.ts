import { NextFunction, Request, Response } from "express";
import BalanceRepository from "./../repositories/balanceRepository";

class BalanceController {
  async addBalance(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      let profileId: any = req.params.userId;
      let amount: number = req.body.amount;
      const response = await BalanceRepository.addBalance(profileId, amount);
      res.status(200).send({
        message: "Successful",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new BalanceController();
