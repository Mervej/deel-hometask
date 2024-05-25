import { Router } from "express";
import BalanceController from "./../controllers/balanceController";

const balanceRouter: Router = Router();

balanceRouter
  .route("/deposit/:userId")
  .post(BalanceController.addBalance);

export default balanceRouter;