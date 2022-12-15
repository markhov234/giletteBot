const { SlashCommandBuilder } = require("discord.js");
const { execute } = require("../../events/client/ready");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Return my ping !"),
  async execute(interaction, client) {
    const message = await interaction.deferReply({
      fetchReply: true,
    });
    const newMessage = `Api latency : ${client.ws.ping}\n Client Ping : ${
      message.createdTimestamp - interaction.createdTimestamp
    }`;
    await interaction.editReply({
      content: newMessage,
    });
  },
};
