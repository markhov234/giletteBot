const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  VoiceChannel,
  GuildEmoji,
} = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Stop the queue !"),

  async execute(interaction, client) {
    const { member, guild } = interaction;

    const voiceChannel = member.voice.channel;

    const embed = new EmbedBuilder();

    if (!VoiceChannel) {
      embed
        .setColor("Red")
        .setDescription(
          "You must be in a voice channel to excute a music commands."
        );
      return interaction.reply({
        embed: [embed],
        ephemeral: true,
      });
    }
    if (!member.voice.channelId == guild.members.me.voice.channelId) {
      embed
        .setColor("Red")
        .setDescription(
          `You can't use the music player as it is alerady active in ${guild.members.me.voice.channelId}`
        );
      return interaction.reply({
        embed: [embed],
        ephemeral: true,
      });
    }

    try {
      const queue = await client.distube.getQueue(voiceChannel);

      if (!queue) {
        embed.setColor("Red").setDescription("There is no active queue");
        return interaction.reply({ embeds: [embed], ephemeral: true });
      }
      await queue.stop(voiceChannel);
      embed.setColor("Green").setDescription("The queue has been stop");
      return interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (err) {
      console.error(err);
      embed.setColor("Red").setDescription("Something went wrong");
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }
  },
};
