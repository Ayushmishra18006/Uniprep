import express from "express";
import { getSubject, createSubject } from "../controllers/subject.controllers.js";

const subjectRouter = express.Router();

/**
 * @route - GET /api/subjects/dbms
 * @description Get a subject
 * @access public
 */
subjectRouter.get("/:name", getSubject);


/**
 * @route - POST /api/subjects/createSubject
 * @description Get a subject
 * @access public
 */
subjectRouter.post("/createSubject", createSubject)

export default subjectRouter;