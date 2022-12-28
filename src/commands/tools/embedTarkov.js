const { EmbedBuilder } = require("@discordjs/builders");
const { SlashCommandBuilder, Embed } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("tarkovinfo")
    .setDescription("Return information for tarkov !"),
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setTitle(`Informations for Escape From Tarkov (EFT)`)
      .setDescription(
        `There is a link to the wikipedia of tarkov to get some help.`
      )
      .setColor(0xfdac87)
      .setImage(
        `https://imgs.search.brave.com/tRchRcC6rwTzByTIv2jC9fEiXkW1CSG2ywpoUYnUKT0/rs:fit:984:984:1/g:ce/aHR0cHM6Ly9pLnJl/ZGQuaXQvM3I1MmZw/aXpwZTEyMS5wbmc`
      )
      .setThumbnail(
        `https://gumlet.assettype.com/afkgaming/import/media/images/79686-b55a0df2bf7ad515a29a68f8fd3e2712.jpeg?w=1200&auto=format%2Ccompress&ogImage=true`
      )
      .setTimestamp(Date.now())
      .setAuthor({
        iconURL: interaction.user.displayAvatarURL(),
        name: interaction.user.tag,
      })
      .setFooter({
        iconURL: client.user.displayAvatarURL(),
        text: client.user.tag,
      })
      .setURL(
        `https://escapefromtarkov.fandom.com/wiki/Escape_from_Tarkov_Wiki`
      )
      .addFields([
        {
          name: `Pestily's video`,
          value: `Best guy you can watch to get some help`,
          // url: `https://www.youtube.com/watch?v=TkpwFfAqV8Q&list=PLZJoJ7H5ZfosAtkZzjr7e4YyG6jTb530F`,
          inline: true,
        },
        {
          name: `Pestily youtube `,
          value: `https://www.youtube.com/watch?v=TkpwFfAqV8Q&list=PLZJoJ7H5ZfosAtkZzjr7e4YyG6jTb530F`,
          inline: true,
        },
      ]);
    await interaction.reply({
      embeds: [embed],
    });
  },
};
