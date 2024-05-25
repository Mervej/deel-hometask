import { Router } from "express";
import JobController from "./../controllers/jobController";
import Middleware from "./../middleware";

const jobRouter: Router = Router();

jobRouter
  .route("/unpaid")
  .get(Middleware.getProfile, JobController.getAllUnpaidJobs);

  jobRouter
  .route("/:job_id/pay")
  .post(JobController.payForJob);

export default jobRouter;
