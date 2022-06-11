import { MessageEmbed, WebhookClient } from "discord.js";

import { ExtendedClient } from "../interface/ExtendedClient";

import { logHandler } from "./logHandler";

/**
 * Module for logging errors and piping them to a Discord webhook.
 *
 * @param {ExtendedClient} bot The bot's Discord instance.
 * @param {unknown} err The error object.
 * @param {string} context Description of where the error occurred.
 */
export const errorHandler = async (
  bot: ExtendedClient,
  err: unknown,
  context: string
) => {
  const error = err as Error;

  logHandler.log("error", `${context}: ${error.message}`);
  logHandler.log(
    "error",
    `Stack trace:\n${JSON.stringify(
      error.stack || { stack: "not found" },
      null,
      2
    )}`
  );

  if (bot.config.debug) {
    const embed = new MessageEmbed();
    embed.setTitle(`There was an error message in the ${context}!`);
    embed.setDescription(
      `\`\`\`\n${JSON.stringify(
        error.stack || { stack: "not found" },
        null,
        2
      )}\n\`\`\``
    );
    embed.addField(`Error message`, error.message);

    const debugHook = new WebhookClient({ url: bot.config.debug });
    await debugHook.send({ embeds: [embed] });
  }
};
