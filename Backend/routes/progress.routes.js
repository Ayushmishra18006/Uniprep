import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { markVideoComplete } from "../controllers/progress.controller.js";

const router = express.Router();

router.post("/:resourceId", authMiddleware, markVideoComplete);

export default router;
