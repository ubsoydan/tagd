import express from "express";
import * as UsersController from "../controllers/users.controller";

const router = express.Router();

/***** USER ROUTES *****/

/* READ */
router.get("/", UsersController.getAllUsers);

router.get("/:userId", UsersController.getUser);

/* CREATE */
router.post("/", UsersController.createUser);

/* UPDATE */
router.patch("/:userId", UsersController.updateUser);

/* DELETE */
router.delete("/:userId", UsersController.deleteUser);

export default router;
