import { Interaction } from "discord.js";

import { ExtendedClient } from "../interface/ExtendedClient";
import { errorHandler } from "../utils/errorHandler";

/**
 * Handles the `interaction` event from Discord.
 *
 * @param {ExtendedClient} bot The bot's Discord instance.
 * @param {Interaction} interaction The interaction payload from Discord.
 */
export const onInteraction = async (
  bot: ExtendedClient,
  interaction: Interaction
) => {
  try {
    if (interaction.isCommand()) {
      for (const command of bot.commands) {
        if (command.data.name === interaction.commandName) {
          await command.run(bot, interaction);
          break;
        }
      }
    }
  } catch (err) {
    await errorHandler(bot, err, "on interaction");
  }
};
