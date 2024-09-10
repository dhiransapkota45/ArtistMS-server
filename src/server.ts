import http from "http";
import app from "./app";
import env from "./config/env";
import { connectToDatabase } from "./database";

const server = http.createServer(app);

const bootstrap = async () => {
    await connectToDatabase();
    server.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT}`);
    });

    process.on("SIGINT", () => {
      server.close(() => {
        console.log("Server closed");
        process.exit(0);
      });
    });
};

bootstrap()
