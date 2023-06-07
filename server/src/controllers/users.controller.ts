import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { db } from "../../prisma/client";

export const getAllUsers: RequestHandler = async (req, res, next) => {
    try {
        const test = await db.user.findMany();
        res.status(200).json(test);
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

interface createUserBody {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export const createUser: RequestHandler<
    unknown,
    unknown,
    createUserBody,
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

        const newUser = await db.user.create({
            data: {
                username,
                email,
                password,
                firstName,
                lastName,
            },
        });

        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};
