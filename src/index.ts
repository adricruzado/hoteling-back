import "dotenv/config";
import chalk from "chalk";
import createDebug from "debug";
import "./server/index.js";
import { startServer } from "./server/app.js";
import { connectToDatabase } from "./database/index.js";

const debug = createDebug("hotels:port");

const port = process.env.PORT ?? 4000;

if (!process.env.MONGODB_URL) {
  debug(chalk.red("Missing MongoDB connection"));
  process.exit();
}

const mongoUrl = process.env.MONGODB_URL;

await connectToDatabase(mongoUrl);

startServer(+port);
