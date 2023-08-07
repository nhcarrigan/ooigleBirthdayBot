import { REST, Routes } from "discord.js";

import { ExtendedClient } from "../interface/ExtendedClient";

import { errorHandler } from "./errorHandler";
import { logHandler } from "./logHandler";

/**
 * Registers the commands for the bot.
 *
 * @param {ExtendedClient} bot The bot's Discord instance.
 */
export const registerCommands = async (bot: ExtendedClient) => {
  try {
    if (!bot.user?.id) {
      logHandler.log(
        "error",
        "Cannot register commands as bot has not authenticated to Discord."
      );
      return;
    }
    const rest = new REST({ version: "10" }).setToken(bot.config.token);
    const commandData = bot.commands.map((command) => command.data.toJSON());

    if (!commandData.length) {
      logHandler.log("warn", "No commands found to register.");
      return;
    }

    logHandler.log("info", "Registering to home guild only!");
    await rest.put(
      Routes.applicationGuildCommands(bot.user.id, bot.config.guildId),
      { body: commandData }
    );
  } catch (err) {
    await errorHandler(bot, err, "register commands");
  }
};
