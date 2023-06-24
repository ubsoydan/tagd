import { RequestHandler } from "express";
import { SessionDataCustom } from "../../@types/session";
import createHttpError from "http-errors";
import { db } from "../../prisma/client";
import bcrypt from "bcrypt";

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
    const authenticatedUserID = (req.session as SessionDataCustom).userID;

    try {
        if (!authenticatedUserID) {
            throw createHttpError(401, "User not authenticated!");
        }

        const user = await db.user.findUnique({
            where: {
                id: authenticatedUserID,
            },
            select: { username: true },
        });

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

interface SignupBody {
    username: string;
    email: string;
    password: string;
}

export const signup: RequestHandler<
    unknown,
    unknown,
    SignupBody,
    unknown
> = async (req, res, next) => {
    const { username, email, password: rawPassword } = req.body;

    try {
        if (!username || !email || !rawPassword) {
            throw createHttpError(400, "One or multiple parameters missing!");
        }

        const existingUsername = await db.user.findUnique({
            where: {
                username: username,
            },
        });

        if (existingUsername) {
            throw createHttpError(
                409,
                "Username is already in use. Please try different one."
            );
        }

        const existingEmail = await db.user.findUnique({
            where: { email: email },
        });

        if (existingEmail) {
            throw createHttpError(
                409,
                "A user with this email already exists. Log in if it's yours."
            );
        }

        const hashedPassword = await bcrypt.hash(rawPassword, 7);

        const newUser = await db.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });

        (req.session as SessionDataCustom).userID = newUser.id;

        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

interface LoginBody {
    email: string;
    password: string;
}

export const login: RequestHandler<
    unknown,
    unknown,
    LoginBody,
    unknown
> = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            throw createHttpError(400, "One or both inputs are missing!");
        }

        const user = await db.user.findUnique({
            where: { email },
            select: { id: true, username: true, password: true },
        });

        if (!user) {
            throw createHttpError(401, "Invalid credentials!");
        }

        const matchPassword = await bcrypt.compare(password, user.password);

        if (!matchPassword) {
            throw createHttpError(401, "Invalid credentials!");
        }

        (req.session as SessionDataCustom).userID = user.id;
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

export const logout: RequestHandler = async (req, res, next) => {
    req.session.destroy((error) => {
        if (error) {
            next(error);
        } else {
            res.sendStatus(200);
        }
    });
};
