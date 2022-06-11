import { ExtendedClient } from "../interface/ExtendedClient";

import { logHandler } from "./logHandler";

/**
 * Validates the environment variables and generates the bot's config object.
 *
 * @see interface/ExtendedClient.ts
 * @returns {ExtendedClient[config]} The bot's config object.
 */
export const validateEnv = (): ExtendedClient["config"] => {
  if (
    !process.env.BOT_TOKEN ||
    !process.env.MONGO_URI ||
    !process.env.GUILD_ID ||
    !process.env.CHANNEL_ID ||
    !process.env.DEBUG_HOOK ||
    !process.env.CRON
  ) {
    logHandler.log("error", "Missing environment variables!");
    process.exit(1);
  }

  return {
    token: process.env.BOT_TOKEN,
    dbUri: process.env.MONGO_URI,
    guildId: process.env.GUILD_ID,
    channelId: process.env.CHANNEL_ID,
    debug: process.env.DEBUG_HOOK,
    cron: process.env.CRON,
  };
};
