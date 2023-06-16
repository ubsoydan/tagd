import express from "express";
import * as ListsController from "../controllers/lists.controller";

const router = express.Router();

/***** LIST ROUTES *****/

/* READ */
router.get("/:userId", ListsController.getAllUserLists);

router.get("/:userId/:listId", ListsController.getUserList);

/* CREATE */
router.post("/:userId", ListsController.createList);

/* UPDATE */
router.patch("/:userId/:listId", ListsController.updateList);

/* DELETE */
router.delete("/:userId/:listId", ListsController.deleteList);
export default router;
