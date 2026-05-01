import { Router } from "express";
import {
  registerUserController,
  loginUserController,
  logoutUserController,
  getMeController,
} from "../controllers/auth.controllers.js";

const authRouter = Router();

/**
 * @route - POST /api/auth/register
 * @description Register the user
 * @access public
 */
authRouter.post("/register", registerUserController);

/**
 * @route - POST /api/auth/login
 * @description login existing user
 * @access public
 */
authRouter.post("/login", loginUserController);

/**
 * @route - GET /api/auth/logout
 * @description Clear the token from the user's cookie and add it to blacklist model
 * @access public
 */
authRouter.get("/logout", logoutUserController);

/**
 * @route - GET /api/auth/get-me
 * @description Get the current logged-in user information
 * @access private
 */
authRouter.get("/get-me", getMeController);

export default authRouter;
