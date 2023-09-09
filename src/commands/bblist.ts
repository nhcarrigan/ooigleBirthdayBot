import { EmbedBuilder, SlashCommandBuilder } from "discord.js";

import BirthdayModel from "../database/models/Birthday";
import { Command } from "../interface/Command";
import { errorHandler } from "../utils/errorHandler";
import { generateDateString } from "../utils/generateDateString";

export const bblist: Command = {
  data: new SlashCommandBuilder()
    .setName("bblist")
    .setDescription("List recent and upcoming birthdays!"),
  run: async (bot, interaction) => {
    try {
      await interaction.deferReply();
      const today = new Date();
      const queryPoint = new Date(
        `${today.getMonth() + 1}-${today.getDate()}-2000`
      ).getTime();

      const results = await BirthdayModel.find({
        birthday: {
          // go two days early and eight days ahead
          $gte: queryPoint - 172800000,
          $lte: queryPoint + 691200000,
        },
      });

      if (!results.length) {
        await interaction.editReply({
          content: "It looks like there are no nearby birthdays!",
        });
        return;
      }

      const embed = new EmbedBuilder();
      embed.setTitle("Recent and upcoming birthdays!");
      embed.setDescription(
        results
          .map((el) => `<@!${el.userId}>: ${generateDateString(el.birthday)}`)
          .join("\n")
      );
      embed.setFooter({
        text: "Join our server: https://chat.nhcarrigan.com",
        iconURL: "https://cdn.nhcarrigan.com/profile.png",
      });
      await interaction.editReply({ embeds: [embed] });
    } catch (err) {
      await errorHandler(bot, err, "bblist command");
    }
  },
};
