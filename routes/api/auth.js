import express from "express";
// import { userJoiSchema } from "../../schemas/users-schemas.js";
import authController from "../../controllers/auth/index.js";
import { authentication } from "../../middlewars/index.js";

const authRouter = express.Router();

authRouter.post("/users/register", authController.register);

authRouter.post("/users/login", authController.login);

authRouter.get("/users/current", authentication, authController.getCurrent);

authRouter.post("/users/logout", authentication, authController.logout);

export default authRouter;
