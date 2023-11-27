import chalk from "chalk";
import mongoose from "mongoose";
import createDebug from "debug";

const debug = createDebug("hotels:database");

export const connectToDatabase = async (mongoUrl: string) => {
  try {
    await mongoose.connect(mongoUrl);
    mongoose.set("debug", true);
    debug(chalk.green("Connected to database."));
  } catch (error) {
    debug(chalk.red("Impossible to connect to database."));
  }
};
