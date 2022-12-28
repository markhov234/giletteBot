const { InteractionCollector } = require("discord.js");

module.exports = {
  data: {
    name: `sub-yt`,
  },
  async execute(Interaction, client) {
    await Interaction.reply({
      content: `https://www.youtube.com/@StimpeeYT`,
    });
  },
};
