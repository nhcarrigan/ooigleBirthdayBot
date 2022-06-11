import { readdir } from "fs/promises";
import { join } from "path";

import { Command } from "../interface/Command";
import { ExtendedClient } from "../interface/ExtendedClient";

import { errorHandler } from "./errorHandler";

/**
 * Loads the commands into dynamic imports so the bot can cache them.
 *
 * @param {ExtendedClient} bot The bot's Discord instance.
 * @returns {Command} An array of imported command objects.
 */
export const loadCommands = async (bot: ExtendedClient): Promise<Command[]> => {
  try {
    const result: Command[] = [];
    const files = await readdir(
      join(process.cwd(), "prod", "commands"),
      "utf-8"
    );
    for (const file of files) {
      const name = file.split(".")[0];
      const command = await import(
        join(process.cwd(), "prod", "commands", file)
      );
      result.push(command[name] as Command);
    }
    return result;
  } catch (err) {
    await errorHandler(bot, err, "command loader");
    return [];
  }
};
