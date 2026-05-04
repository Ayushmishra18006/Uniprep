import express from "express";
import { getSubject } from "../controllers/subject.controllers.js";

const router = express.Router();

router.get("/:name", getSubject);

export default router;