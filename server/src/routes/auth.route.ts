import express from "express";
import * as AuthController from "../controllers/auth.controller";

const router = express.Router();

router.get("/", AuthController.getAuthenticatedUser);

router.post("/signup", AuthController.signup);

router.post("/login", AuthController.login);

router.post("/logout", AuthController.logout);

export default router;
