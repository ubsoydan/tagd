/**
 * This is for being able to mutate req.session property of express-session
 * REF. https://github.com/DefinitelyTyped/DefinitelyTyped/issues/49941#issuecomment-748513261
 */

import session from "express-session";
export = session;

declare module "express-session" {
    interface Session {
        userID: string;
    }
}
