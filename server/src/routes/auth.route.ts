import express from "express";
import * as AuthController from "../controllers/auth.controller";

const router = express.Router();

router.get("/", AuthController.getAuthenticatedUser);

router.post("/signup", AuthController.signup);

router.post(
    "/login",
    express.urlencoded({ extended: false }),
    AuthController.login
);

router.post("/logout", AuthController.logout);

export default router;
