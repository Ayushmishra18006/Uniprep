import express from "express";

import {
  createCourseSubject,
  getCourseSubjects,
} from "../controllers/courseSubject.controllers.js";

const courseSubjectRouter = express.Router();

courseSubjectRouter.post("/", createCourseSubject);

courseSubjectRouter.get("/", getCourseSubjects);

export default courseSubjectRouter;