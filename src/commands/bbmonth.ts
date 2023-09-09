import { EmbedBuilder, SlashCommandBuilder } from "discord.js";

import BirthdayModel, { Birthday } from "../database/models/Birthday";
import { Command } from "../interface/Command";
import { errorHandler } from "../utils/errorHandler";

const generateMonthString = (month: number, data: Birthday[]) => {
  const count = data.filter(
    (el) => new Date(el.birthday).getMonth() === month
  ).length;
  const monthString = new Date(0, month).toLocaleString("default", {
    month: "long",
  });
  return `${monthString}: ${count}`;
};

export const bbmonth: Command = {
  data: new SlashCommandBuilder()
    .setName("bbmonth")
    .setDescription("See a breakdown of birthdays by month."),
  run: async (bot, interaction) => {
    try {
      await interaction.deferReply();

      const results = await BirthdayModel.find();

      if (!results.length) {
        await interaction.editReply({
          content: "It looks like there are no birthdays!",
        });
        return;
      }

      const embed = new EmbedBuilder();
      embed.setTitle("Recent and upcoming birthdays!");
      embed.setDescription(
        [...Array(12).keys()]
          .map((m) => generateMonthString(m, results))
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
