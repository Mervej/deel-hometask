import { NextFunction, Request, Response } from "express";
import AdminRepository from "./../repositories/adminRepository";

class AdminController {
  async fetchBestProfession(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      let start = req.query.start;
      let end = req.query.end;

      // check if valid date is present
      if (isNaN(Date.parse(`${start}`)) || isNaN(Date.parse(`${end}`))) {
        res.status(401).send({
          message: "Invalid date time",
        });
      }

      // check if valid date is present
      const response = await AdminRepository.fetchBestProfession(start, end);
      res.status(200).send({
        message: "Successful",
        data: response,
      });
    } catch (error) {
      res.status(501).send({
        message: error || "Something went wrong, please try again later"
      });
    }
  }

  async fetchBestClient(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      let start = req.query.start;
      let end = req.query.end;

      if (isNaN(Date.parse(`${start}`)) || isNaN(Date.parse(`${end}`))) {
        res.status(401).send({
          message: "Invalid date time",
        });
      }

      const response = await AdminRepository.fetchBestClient(start, end);
      res.status(200).send({
        message: "Successful",
        data: response,
      });
    } catch (error) {
      res.status(501).send({
        message: error || "Something went wrong, please try again later"
      });
    }
  }
}

export default new AdminController();
