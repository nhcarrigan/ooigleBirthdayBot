import { connect } from "mongoose";

import { ExtendedClient } from "../interface/ExtendedClient";
import { errorHandler } from "../utils/errorHandler";
import { logHandler } from "../utils/logHandler";

/**
 * Instantiates the database connection.
 *
 * @param {ExtendedClient} bot The bot's Discord instance.
 */
export const connectDb = async (bot: ExtendedClient) => {
  try {
    await connect(bot.config.dbUri);
    logHandler.log("info", "Connected to MongoDB!");
  } catch (err) {
    await errorHandler(bot, err, "database connection");
  }
};
