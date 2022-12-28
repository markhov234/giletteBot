const {
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  ActionRowBuilder,
  StringSelectMenuOptionBuilder,
} = require("discord.js");
const { execute } = require("../../events/client/ready");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("menu")
    .setDescription("Select a menu"),
  async execute(interaction, client) {
    const menu = new StringSelectMenuBuilder()
      .setCustomId(`sub-menu`)
      .setMinValues(1)
      .setMaxValues(1)
      .setOptions(
        new StringSelectMenuOptionBuilder({
          label: `Option 1`,
          value: `Value 1`,
        }),
        new StringSelectMenuOptionBuilder({
          label: `Option 2`,
          value: `Value 2`,
        })
      );
    await interaction.reply({
      components: [new ActionRowBuilder().addComponents(menu)],
    });
  },
};
