import { SlashCommandBuilder } from "@discordjs/builders";

import BirthdayModel from "../database/models/Birthday";
import { Command } from "../interface/Command";
import { errorHandler } from "../utils/errorHandler";

export const bbview: Command = {
  data: new SlashCommandBuilder()
    .setName("bbview")
    .setDescription("View your set birthday"),
  run: async (bot, interaction) => {
    try {
      await interaction.deferReply();

      const data = await BirthdayModel.findOne({ userId: interaction.user.id });

      if (!data) {
        await interaction.editReply({
          content:
            "You haven't set your birthday yet! Use the `/bbset` command to set it.",
        });
        return;
      }

      await interaction.editReply({
        content: `Your birthday is set to ${data.birthday}!`,
      });
    } catch (err) {
      await errorHandler(bot, err, "bbview command");
    }
  },
};
