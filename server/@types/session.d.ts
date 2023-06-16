import { Session } from "express-session";

export interface SessionDataCustom extends Session {
    userID: string;
}

// Extends interface for Session properties of express-session to be able to create a custom property on it
