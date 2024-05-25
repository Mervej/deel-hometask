import { Router } from "express";
import AdminController from "./../controllers/adminController";

const adminRouter: Router = Router();

adminRouter
  .route("/best-profession")
  .get(AdminController.fetchBestProfession);

adminRouter
  .route("/best-clients")
  .get(AdminController.fetchBestClient);
  

export default adminRouter;