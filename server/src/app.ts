import "module-alias/register";
import "dotenv/config"; // automatically imports and invokes dotenv/config
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/auth.route";
import usersRoutes from "./routes/users.route";
import listsRoutes from "./routes/lists.route";
import bookmarkRoutes from "./routes/bookmarks.route";
// import tagsRoutes from "./routes/tags.route";
import createHttpError, { isHttpError } from "http-errors";
import session from "express-session";
import env from "./utils/validateEnv";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { db } from "../prisma/client";

declare module "express-session" {
    interface SessionData {
        user: string;
    }
}
const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(morgan("dev"));

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(
    session({
        secret: env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60 * 60 * 1000,
        },
        rolling: true,
        store: new PrismaSessionStore(db, {
            checkPeriod: 60 * 60 * 1000, //ms
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }),
    })
);
// function isAuth(req: Request, res: Response, next: NextFunction) {
//     if (req.session.user) {
//         console.log("kullanici BULUNDU!");
//         next();
//     } else {
//         console.log("AAAAAWWWWWW");
//     }
// }

// app.get("/", isAuth, function (req: Request, res: Response) {
//     res.send(`hosgeldin ${req.session.user}`);
// });

/* ROUTES */
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/lists", listsRoutes);
app.use("/api/v1/bookmarks", bookmarkRoutes);
// app.use("/api/v1/tags", tagsRoutes);

/* ERROR HANDLER FOR NON-EXISTENT ENDPOINTS */
app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found!"));
});

/* ERROR HANDLER */
//'error:unknown' is specified for TypeScript
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
