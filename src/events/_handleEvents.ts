import { ExtendedClient } from "../interface/ExtendedClient";

import { onGuildMemberDelete } from "./onGuildMemberDelete";
import { onInteraction } from "./onInteraction";
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

  bot.on("guildMemberRemove", async (member) => {
    await onGuildMemberDelete(bot, member);
  });

  bot.on(
    "interaction",
    async (interaction) => await onInteraction(bot, interaction)
  );
};
