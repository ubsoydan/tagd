import { RequestHandler } from "express";
import { db } from "../../prisma/client";
import createHttpError from "http-errors";

interface GetAllUserListsParams {
    userId: string;
}

export const getAllUserLists: RequestHandler<
    GetAllUserListsParams,
    unknown,
    unknown,
    unknown
> = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const user = await db.user.findUnique({
            where: {
                id: userId,
            },
            include: { listsCreatedByUser: true },
        });

        if (!user) {
            throw createHttpError(404, "No such user found!");
        }

        const userLists = user.listsCreatedByUser;
        res.status(200).json(userLists);
    } catch (error) {
        next(error);
    }
};

interface GetUserListParams {
    userId: string;
    listId: string;
}

export const getUserList: RequestHandler<
    GetUserListParams,
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
        });

        if (!list) {
            throw createHttpError(
                404,
                "No such list found that belongs to this account!"
            );
        }

        res.status(200).json(list);
    } catch (error) {
        next(error);
    }
};

interface CreateListParams {
    userId: string;
}

interface CreateListBody {
    listName: string;
    listDescription: string;
    listUrl: string;
}

export const createList: RequestHandler<
    CreateListParams,
    unknown,
    CreateListBody,
    unknown
> = async (req, res, next) => {
    const userId = req.params.userId;
    const { listName, listDescription, listUrl } = req.body;
    try {
        if (!userId) {
            throw createHttpError(400, "userId is needed to create a list");
        }

        if (!listName || !listDescription || !listUrl) {
            throw createHttpError(
                400,
                "One or multiple fields are invalid/missing. Make sure listName, listDescription, listUrl are all valid."
            );
        }
        const newList = await db.list.create({
            data: {
                listName,
                listDescription,
                listUrl,
                userId,
            },
        });

        res.status(201).json(newList);
    } catch (error) {
        next(error);
    }
};

interface UpdateListParams {
    listId: string;
    userId: string;
}

interface UpdateListBody {
    listName: string;
    listDescription: string;
    listUrl: string;
}

export const updateList: RequestHandler<
    UpdateListParams,
    unknown,
    UpdateListBody,
    unknown
> = async (req, res, next) => {
    const { userId, listId } = req.params;
    const {
        listName: updatedListName,
        listDescription: updatedListDescription,
        listUrl: updatedListUrl,
    } = req.body;
    try {
        const updateList = await db.list.update({
            where: {
                id_userId: {
                    id: listId,
                    userId: userId,
                },
            },
            data: {
                listName: updatedListName || undefined,
                listDescription: updatedListDescription || undefined,
                listUrl: updatedListUrl || undefined,
            },
        });

        if (!updateList) {
            throw createHttpError(
                404,
                "No such list found that belongs to this account! Couldn't update it."
            );
        }

        res.status(200).json(updateList);
    } catch (error) {
        next(error);
    }
};

interface DeleteListParams {
    listId: string;
    userId: string;
}

export const deleteList: RequestHandler<
    DeleteListParams,
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
        });

        if (!list) {
            throw createHttpError(
                404,
                "No such list found that belongs to this account! Couldn't delete it."
            );
        }

        const deleteList = await db.list.delete({
            where: { id_userId: { id: listId, userId: userId } },
        });

        res.status(204).json(deleteList);
    } catch (error) {
        next(error);
    }
};
