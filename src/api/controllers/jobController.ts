import { NextFunction, Request, Response } from "express";
import JobRepository from "./../repositories/jobRepository";

class JobController {
  async getAllUnpaidJobs(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      let profileData = req.params.profile;
      const response = await JobRepository.getAllUnpaidJobs(profileData);
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

  async payForJob(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      let jobId = req.params.job_id;
      const response = await JobRepository.payForJob(jobId);
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

export default new JobController();
