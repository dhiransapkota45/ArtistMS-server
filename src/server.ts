import { App } from "./app";
import { connectToDatabase } from "./database";

const main = async () => {
  await connectToDatabase();
  const app = new App();
  app.listen();

  process.on("SIGINT", () => {
    app.close();
  });
};

main();
