import { Client } from "discord.js";

import { Command } from "./Command";

export interface ExtendedClient extends Client {
  config: {
    token: string;
    dbUri: string;
    guildId: string;
    channelId: string;
    roleId: string;
    debug: string;
    cron: string;
  };
  commands: Command[];
}
