const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("martinouellet")
    .setDescription("Sent mes doigts."),
  async execute(interaction, client) {
    const message = await interaction.deferReply({
      fetchReply: true,
    });
    const user = client.users.cache.get("141609951989727232");
    console.log(user);
    const newMessage = `<@${user.id}> is still fedding even in iron`;
    await interaction.editReply({
      content: newMessage,
    });
  },
};
