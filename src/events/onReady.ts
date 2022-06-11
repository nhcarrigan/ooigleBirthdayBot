import { TextBasedChannel } from "discord.js";
import { scheduleJob } from "node-schedule";

import BirthdayModel from "../database/models/Birthday";
import { ExtendedClient } from "../interface/ExtendedClient";
import { errorHandler } from "../utils/errorHandler";
import { logHandler } from "../utils/logHandler";

/**
 * Module to listen to the `ready` event from Discord. Mounts the daily
 * birthday message scheduler.
 *
 * @param {ExtendedClient} bot The bot's Discord instance.
 */
export const onReady = async (bot: ExtendedClient) => {
  try {
    logHandler.log("info", "Connected to Discord!");

    scheduleJob(bot.config.cron, async () => {
      try {
        //TODO: fetch today's birthdays from database
        const today = new Date();
        const birthday = new Date(
          `${today.getMonth() + 1}-${today.getDate()}-2000`
        ).getTime();
        const birthdays = await BirthdayModel.find({ birthday });

        const ids = birthdays.map((doc) => `<@!${doc.userId}>`);

        const guild =
          bot.guilds.cache.get(bot.config.guildId) ||
          (await bot.guilds.fetch(bot.config.guildId));

        const channel =
          guild.channels.cache.get(bot.config.channelId) ||
          (await guild.channels.fetch(bot.config.channelId));

        if (!ids.length) {
          await (channel as TextBasedChannel).send({
            content: `Oh no! There are no birthdays today. Don't forget you can use the \`/bbset\` command to set your birthday!`,
          });
        }

        await (channel as TextBasedChannel).send({
          content: `Happy birthday to the following users!\n${ids.join(
            ", "
          )}\nThis message pings them, so no need to ping them again - but feel free to share your birthday wishes!`,
        });
      } catch (err) {
        await errorHandler(bot, err, "scheduled birthday post");
      }
    });
  } catch (err) {
    await errorHandler(bot, err, "on ready event");
  }
};
