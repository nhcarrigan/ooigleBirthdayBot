import { Client } from "discord.js";

import { IntentOptions } from "./config/IntentOptions";
import { connectDb } from "./database/connectDb";
import { handleEvents } from "./events/_handleEvents";
import { ExtendedClient } from "./interface/ExtendedClient";
import { loadCommands } from "./utils/loadCommands";
import { registerCommands } from "./utils/registerCommands";
import { validateEnv } from "./utils/validateEnv";

(async () => {
  const bot = new Client({ intents: IntentOptions }) as ExtendedClient;
  bot.config = validateEnv();
  bot.commands = await loadCommands(bot);

  handleEvents(bot);
  await connectDb(bot);

  await bot.login(bot.config.token);
  await registerCommands(bot);
})();
