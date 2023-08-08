import express from "express";

import authController from "../../controllers/auth/index.js";
import { authentication, upload } from "../../middlewars/index.js";

const authRouter = express.Router();

authRouter.post("/users/register", authController.register);

authRouter.post("/users/login", authController.login);

authRouter.get("/users/current", authentication, authController.getCurrent);

authRouter.post("/users/logout", authentication, authController.logout);

authRouter.patch("/users", authentication, authController.subscriptionUpdate);

authRouter.patch(
  "/users/avatars",
  authentication,
  upload.single("avatar"),

  authController.avatarUpdate
);

export default authRouter;
