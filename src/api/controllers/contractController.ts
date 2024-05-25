import { NextFunction, Request, Response } from "express";
import ContractRepository from "./../repositories/contractRepository";

class ContractController {
  async getContractById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      let contractId = req.params.id;
      let profileData = req.params.profile;

      const response = await ContractRepository.getContractById(
        contractId,
        profileData
      );
      res.status(200).send({
        message: "Successful",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  async getContracts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      let profileData = req.params.profile;
      const response = await ContractRepository.getContracts(
        profileData
      );
      res.status(200).send({
        message: "Successful",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ContractController();
