import express from "express";
import * as BookmarksController from "../controllers/bookmarks.controller";

const router = express.Router();

/***** BOOKMARK ROUTES *****/

/* READ */
router.get("/:userId/:listId", BookmarksController.getAllListBookmarks);

router.get("/:userId/:listId/:bookmarkId", BookmarksController.getBookmark);

/* CREATE */
router.post("/:userId/:listId", BookmarksController.createBookmark);

/* UPDATE */
router.patch(
    "/:userId/:listId/:bookmarkId",
    BookmarksController.updateBookmark
);

/* DELETE */
router.delete(
    "/:userId/:listId/:bookmarkId",
    BookmarksController.deleteBookmark
);

export default router;
