const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  VoiceChannel,
  GuildEmoji,
} = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("volume")
    .setDescription("Change the volume for the bar gilette")
    .addIntegerOption((option) =>
      option
        .setName("volume")
        .setDescription("10 = 10%")
        .setMinValue(0)
        .setMaxValue(100)
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const { member, guild, options } = interaction;
    const volume = options.getInteger("volume");
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
      client.distube.setVolume(voiceChannel, volume);
      return interaction.reply({
        content: `Volume has been set to ${volume}%`,
      });
    } catch (err) {
      console.error(err);
      embed.setColor("Red").setDescription("Something went wrong");
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }
  },
};
