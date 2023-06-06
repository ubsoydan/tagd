import "dotenv/config"; // automatically imports and invokes dotenv/config
import express, { NextFunction, Request, Response } from "express";
import { db } from "../prisma/client";
const app = express();

app.get("/", async (req, res, next) => {
    try {
        throw Error("yoook");
        const test = await db.user.findMany();
        res.status(200).json(test);
    } catch (error) {
        next(error);
    }
});

app.use((req, res, next) => {
    next(Error("Endpoint NOT FOUND"));
});

/** ERROR HANDLER, 'error:unknown' is specified for TypeScript  */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errMsg = "Unknown error occurred!";
    if (error instanceof Error) errMsg = error.message;
    res.status(500).json({ error: errMsg });
});

export default app;
