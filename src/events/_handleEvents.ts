import { ExtendedClient } from "../interface/ExtendedClient";

import { onReady } from "./onReady";

/**
 * Bootstraps the bot's gateway event listeners.
 *
 * @param {ExtendedClient} bot The bot's Discord instance.
 */
export const handleEvents = (bot: ExtendedClient) => {
  bot.on("ready", async () => {
    await onReady(bot);
  });
};
