import {
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
} from "@discordjs/builders";
import { ChatInputCommandInteraction } from "discord.js";

import { ExtendedClient } from "./ExtendedClient";

export interface Command {
  data:
    | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">
    | SlashCommandSubcommandBuilder;
  run: (
    bot: ExtendedClient,
    interaction: ChatInputCommandInteraction
  ) => Promise<void>;
}
