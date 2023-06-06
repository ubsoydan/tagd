import app from "./app";
import env from "./utils/validateEnv";

const PORT = env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
