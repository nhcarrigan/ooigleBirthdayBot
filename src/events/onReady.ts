import { EmbedBuilder } from "@discordjs/builders";
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
        const rawIds = birthdays.map((doc) => doc.userId);

        const guild =
          bot.guilds.cache.get(bot.config.guildId) ||
          (await bot.guilds.fetch(bot.config.guildId));

        const channel =
          guild.channels.cache.get(bot.config.channelId) ||
          (await guild.channels.fetch(bot.config.channelId));

        const birthdayRole = await guild.roles.fetch(bot.config.roleId);

        if (birthdayRole) {
          for (const memberId of bot.cache) {
            const member = await guild.members
              .fetch(memberId)
              .catch(() => null);
            if (member) {
              await member.roles.remove(birthdayRole);
            }
          }
          bot.cache = [];
          if (ids.length) {
            for (const id of rawIds) {
              const member = await guild.members.fetch(id).catch(() => null);
              if (member) {
                await member.roles.add(birthdayRole);
                bot.cache.push(id);
              }
            }
          }
        }

        if (!ids.length) {
          const noEmbed = new EmbedBuilder();
          noEmbed.setTitle("Oh no! 🙁");
          noEmbed.setDescription(
            "There are no birthdays today. 😭\n\nDon't forget you can use the `/bbset` command to set your birthday!"
          );
          noEmbed.setFooter({
            text: "Join our server: https://discord.gg/nhcarrigan",
            iconURL: "https://cdn.nhcarrigan.com/profile.png",
          });
          noEmbed.setImage(
            "https://media.tenor.com/h2RyGfmdvXEAAAAC/mushoku-tensei-eris.gif"
          );

          await (channel as TextBasedChannel).send({
            embeds: [noEmbed],
          });
          return;
        }

        const embed = new EmbedBuilder();
        embed.setTitle("Happy Birthday~! 🎉🥳🎊");
        embed.setDescription(
          "We hope you have an absolutely stupendous and wonderful day! 🎂🎈🎁\n\nFriends, feel free to share your birthday wishes! But this message does ping them, so no need to ping them again. 💜"
        );
        embed.setImage("https://media.tenor.com/g4LQl7KK1XcAAAAC/party.gif");
        embed.setFooter({
          text: "Join our server: https://discord.gg/nhcarrigan",
          iconURL: "https://cdn.nhcarrigan.com/profile.png",
        });

        await (channel as TextBasedChannel).send({
          content: `${ids.join(", ")}`,
          embeds: [embed],
        });
      } catch (err) {
        await errorHandler(bot, err, "scheduled birthday post");
      }
    });
  } catch (err) {
    await errorHandler(bot, err, "on ready event");
  }
};
