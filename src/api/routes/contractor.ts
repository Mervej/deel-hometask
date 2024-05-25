import { Router } from "express";
import ContractController from "./../controllers/contractController";
import Middleware from "./../middleware";

const contractRouter: Router = Router();

contractRouter
  .route("/:id")
  .get(Middleware.getProfile, ContractController.getContractById);

contractRouter
  .route("/")
  .get(Middleware.getProfile, ContractController.getContracts);

export default contractRouter;
