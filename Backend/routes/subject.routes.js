import express from "express";

import {
  getSubjects,
  createSubject,
} from "../controllers/subject.controllers.js";

const subjectRouter = express.Router();

subjectRouter.get("/", getSubjects);

subjectRouter.post("/createSubject", createSubject);

export default subjectRouter;