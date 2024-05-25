import { Router } from "express";
import contractRouter from "./contractor";
import jobRouter from "./job";
import balanceRouter from "./balance";
import adminRouter from "./admin";

const router: Router = Router();
router.use("/contracts", contractRouter);
router.use("/jobs", jobRouter);
router.use("/balances", balanceRouter);
router.use("/admin", adminRouter);

export default router;
