const {
  SlashCommandBuilder,
  EmbedBuilder,
  VoiceChannel,
} = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder().setName("skip").setDescription("Skip a song"),

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
          `You a big bozo, the best bot is already playing in ${guild.members.me.voice.channelId}`
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
      await queue.skip(voiceChannel);
      embed.setColor("Blue").setDescription("The song has been skipped");
      return interaction.reply({ embeds: [embed] });
    } catch (err) {
      console.error(err);
      embed.setColor("Red").setDescription("Something went wrong");
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }
  },
};
