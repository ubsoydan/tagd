import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { db } from "../../prisma/client";

interface GetAllListBookmarksParams {
    userId: string;
    listId: string;
}

export const getAllListBookmarks: RequestHandler<
    GetAllListBookmarksParams,
    unknown,
    unknown,
    unknown
> = async (req, res, next) => {
    const { userId, listId } = req.params;

    try {
        const list = await db.list.findUnique({
            where: {
                id_userId: {
                    id: listId,
                    userId: userId,
                },
            },
            include: { bookmarks: true },
        });

        if (!list) {
            throw createHttpError(404, "No such list found!");
        }

        const listBookmarks = list.bookmarks;

        // if (listBookmarks === undefined) {
        //     res.status(204).json({
        //         message: "This list do not have any bookmark yet!",
        //     });
        // }

        res.status(200).json(listBookmarks);
    } catch (error) {
        next(error);
    }
};

interface GetBookmarkParams {
    userId: string;
    listId: string;
    bookmarkId: string;
}

export const getBookmark: RequestHandler<
    GetBookmarkParams,
    unknown,
    unknown,
    unknown
> = async (req, res, next) => {
    const { userId, listId, bookmarkId } = req.params;

    try {
        const list = await db.list.findUnique({
            where: {
                id_userId: {
                    id: listId,
                    userId: userId,
                },
            },
            include: { bookmarks: { where: { id: bookmarkId } } },
        });

        if (!list) {
            throw createHttpError(404, "No such list found! ");
        }

        const bookmark = list.bookmarks[0];

        if (!bookmark) {
            throw createHttpError(404, "No such bookmark found!");
        }
        res.status(200).json(bookmark);
    } catch (error) {
        next(error);
    }
};

interface CreateBookmarkParams {
    userId: string;
    listId: string;
}

interface CreateBookmarkBody {
    bookmarkTitle: string;
    bookmarkUrl: string;
    listId: string;
}

export const createBookmark: RequestHandler<
    CreateBookmarkParams,
    unknown,
    CreateBookmarkBody,
    unknown
> = async (req, res, next) => {
    // const { userId, listId } = req.params;
    const { bookmarkTitle, bookmarkUrl, listId } = req.body;

    try {
        if (!listId) {
            throw createHttpError(400, "listId is needed to create a bookmark");
        }

        if (!bookmarkTitle || !bookmarkUrl) {
            throw createHttpError(
                400,
                "One or multiple fields are invalid/missing. Make sure bookmarkTitle, bookmarkUrl are all valid."
            );
        }
        const createBookmark = await db.bookmark.create({
            data: { bookmarkTitle, bookmarkUrl, listId },
        });

        res.status(201).json(createBookmark);
    } catch (error) {
        next(error);
    }
};

interface UpdateBookmarkParams {
    listId: string;
}

interface UpdateBookmarkBody {
    bookmarkTitle: string;
    bookmarkUrl: string;
}

export const updateBookmark: RequestHandler<
    UpdateBookmarkParams,
    unknown,
    UpdateBookmarkBody,
    unknown
> = async (req, res, next) => {
    const {
        bookmarkTitle: updatedBookmarkTitle,
        bookmarkUrl: updatedBookmarkUrl,
    } = req.body;
    const { listId } = req.params;
    try {
        if (!updatedBookmarkTitle || !updatedBookmarkUrl) {
            throw createHttpError(
                400,
                "bookmarkTitle or/both bookmarkUrl is needed to update the bookmark"
            );
        }

        const updateBookmark = await db.bookmark.update({
            where: {
                id: listId,
            },
            data: {
                bookmarkTitle: updatedBookmarkTitle || undefined,
                bookmarkUrl: updatedBookmarkUrl || undefined,
            },
        });

        res.status(200).json(updateBookmark);
    } catch (error) {
        next(error);
    }
};

interface DeleteBookmarkParams {
    listId: string;
    bookmarkId: string;
}

export const deleteBookmark: RequestHandler<
    DeleteBookmarkParams,
    unknown,
    unknown,
    unknown
> = async (req, res, next) => {
    const { listId, bookmarkId } = req.params;

    try {
        const bookmark = await db.bookmark.findUnique({
            where: {
                id_listId: {
                    id: bookmarkId,
                    listId: listId,
                },
            },
        });

        if (!bookmark) {
            throw createHttpError(
                404,
                "No such bookmark found! Couldn't delete it."
            );
        }

        const deleteList = await db.bookmark.delete({
            where: {
                id_listId: {
                    id: bookmarkId,
                    listId: listId,
                },
            },
        });

        res.status(204).json(deleteList);
    } catch (error) {
        next(error);
    }
};
