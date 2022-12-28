const {
  SlashCommandBuilder,
  EmbedBuilder,
  VoiceChannel,
} = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Play a song")
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription("Provide the name or the url of the song")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const { options, member, guild, channel } = interaction;

    const query = options.getString("query");
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
      client.distube.play(voiceChannel, query, {
        textChannel: channel,
        member: member,
      });
      embed.setColor("Green").setDescription(`${query} is now blasting !!`);
      return interaction.reply({
        content: " Request received",
      });
    } catch (err) {
      console.error(err);
      embed.setColor("Red").setDescription("Something went wrong");
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }
  },
};
