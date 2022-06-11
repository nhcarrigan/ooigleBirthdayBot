import { SlashCommandBuilder } from "@discordjs/builders";

import BirthdayModel from "../database/models/Birthday";
import { Command } from "../interface/Command";
import { errorHandler } from "../utils/errorHandler";
import { validateDate } from "../utils/validateDate";

export const bbset: Command = {
  data: new SlashCommandBuilder()
    .setName("bbset")
    .setDescription("Set your birthday!")
    .addStringOption((option) =>
      option
        .setName("month")
        .setDescription("Your Birth Month")
        .setRequired(true)
        .setChoices(
          {
            name: "January",
            value: "Jan",
          },
          {
            name: "February",
            value: "Feb",
          },
          {
            name: "March",
            value: "Mar",
          },
          {
            name: "April",
            value: "Apr",
          },
          {
            name: "May",
            value: "May",
          },
          {
            name: "June",
            value: "Jun",
          },
          {
            name: "July",
            value: "Jul",
          },
          {
            name: "August",
            value: "Aug",
          },
          {
            name: "September",
            value: "Sep",
          },
          {
            name: "October",
            value: "Oct",
          },
          {
            name: "November",
            value: "Nov",
          },
          {
            name: "December",
            value: "Dec",
          }
        )
    )
    .addIntegerOption((option) =>
      option
        .setName("day")
        .setDescription("Your Birth Day (1-31)")
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(31)
    ),
  run: async (bot, interaction) => {
    try {
      await interaction.deferReply();
      const month = interaction.options.getString("month", true);
      const day = interaction.options.getInteger("day", true);
      const id = interaction.user.id;

      if (!validateDate(month, day)) {
        await interaction.editReply({
          content: `${month} ${day} is not a valid date!`,
        });
        return;
      }

      const data =
        (await BirthdayModel.findOne({ userId: id })) ||
        (await BirthdayModel.create({ userId: id, birthday: 0 }));

      data.birthday = new Date(`${month}-${day}-2000`).getTime();
      await data.save();

      await interaction.editReply(
        `Your birthday has been set to ${month}-${day}!`
      );
    } catch (err) {
      await errorHandler(bot, err, "bbset command");
    }
  },
};
