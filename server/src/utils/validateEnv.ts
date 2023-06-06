/* VALIDATION FOR ENV WITH TYPES */

import { cleanEnv } from "envalid";
import { port, str } from "envalid/dist/validators";

export default cleanEnv(process.env, {
    DATABASE_URL: str(),
    PORT: port(),
});
