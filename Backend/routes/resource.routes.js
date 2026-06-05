import express from "express";

import {
  getResources,
  createResource,
} from "../controllers/resource.controllers.js";

const resourceRouter = express.Router();

resourceRouter.get("/:subject", getResources);

resourceRouter.post("/createResource", createResource);

export default resourceRouter;