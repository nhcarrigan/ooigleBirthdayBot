import { ExtendedClient } from "../interface/ExtendedClient";
import { onGuildMemberDelete } from "./onGuildMemberDelete";

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

  bot.on("interaction", async (interaction) => {
    if (interaction.isCommand()) {
      for (const command of bot.commands) {
        if (command.data.name === interaction.commandName) {
          await command.run(bot, interaction);
          break;
        }
      }
    }
  });
};
