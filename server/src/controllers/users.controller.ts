import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { db } from "../../prisma/client";

export const getAllUsers: RequestHandler = async (req, res, next) => {
    try {
        const allUsers = await db.user.findMany();
        res.status(200).json(allUsers);
    } catch (error) {
        next(error);
    }
};

export const getUser: RequestHandler = async (req, res, next) => {
    const userId = req.params.userId;

    try {
        const user = await db.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (!user) {
            throw createHttpError(404, "No such user found!");
        }

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

interface CreateUserBody {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export const createUser: RequestHandler<
    unknown,
    unknown,
    CreateUserBody,
    unknown
> = async (req, res, next) => {
    const { username, email, password, firstName, lastName } = req.body;

    try {
        if (!username || !email || !password || !firstName || !lastName) {
            throw createHttpError(
                400,
                "User must have all credentials. Make sure all are provided."
            );
        }

        const createUser = await db.user.create({
            data: {
                username,
                email,
                password,
                firstName,
                lastName,
            },
        });

        res.status(201).json(createUser);
    } catch (error) {
        next(error);
    }
};

interface UpdateUserParams {
    userId: string;
}
interface UpdateUserBody {
    username?: string;
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
}

export const updateUser: RequestHandler<
    UpdateUserParams,
    unknown,
    UpdateUserBody,
    unknown
> = async (req, res, next) => {
    const userId = req.params.userId;

    const updatedUsername = req.body.username;
    const updatedEmail = req.body.email;
    const updatedPassword = req.body.password;
    const updatedFirstName = req.body.firstName;
    const updatedLastName = req.body.lastName;

    try {
        const updateUser = await db.user.update({
            where: {
                id: userId,
            },
            data: {
                // undefined ignores the variable if it does not bear payload
                username: updatedUsername || undefined,
                email: updatedEmail || undefined,
                password: updatedPassword || undefined,
                firstName: updatedFirstName || undefined,
                lastName: updatedLastName || undefined,
            },
        });

        if (!updateUser) {
            throw createHttpError(
                404,
                "No such user found! Couldn't update it."
            );
        }

        res.status(200).json(updateUser);
    } catch (error) {
        next(error);
    }
};

export const deleteUser: RequestHandler = async (req, res, next) => {
    const userId = req.params.userId;

    try {
        const user = await db.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw createHttpError(
                404,
                "No such user found! Couldn't delete it."
            );
        }

        const deleteUser = await db.user.delete({
            where: { id: userId },
        });

        // res.sendStatus(204);
        res.status(204).json(deleteUser);
    } catch (error) {
        next(error);
    }
};
