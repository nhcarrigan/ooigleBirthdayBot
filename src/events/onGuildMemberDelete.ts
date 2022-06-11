import { GuildMember, PartialGuildMember } from "discord.js";

import BirthdayModel from "../database/models/Birthday";
import { ExtendedClient } from "../interface/ExtendedClient";
import { errorHandler } from "../utils/errorHandler";

/**
 * Handles the `guildMemberRemove` event from Discord. Remove's the member's
 * birthday from the database.
 *
 * @param {ExtendedClient} bot The bot's Discord instance.
 * @param {GuildMember} member The member record from Discord.
 */
export const onGuildMemberDelete = async (
  bot: ExtendedClient,
  member: GuildMember | PartialGuildMember
) => {
  try {
    await BirthdayModel.deleteOne({ userId: member.id });
  } catch (err) {
    await errorHandler(bot, err, "guild member delete event");
  }
};
