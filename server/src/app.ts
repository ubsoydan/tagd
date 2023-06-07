import "module-alias/register";
import "dotenv/config"; // automatically imports and invokes dotenv/config
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import usersRoutes from "./routes/users.route";
import createHttpError, { isHttpError } from "http-errors";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found!"));
});

/** ERROR HANDLER, 'error:unknown' is specified for TypeScript  */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errMsg = "Unknown error occurred!";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errMsg = error.message;
    }
    res.status(statusCode).json({ error: errMsg });
});

export default app;
