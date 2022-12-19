const {
  SlashCommandBuilder,
  MessageEmbed,
  SlashCommandSubcommandBuilder,
  SlashCommandStringOption,
} = require("discord.js");
const { QueryType } = require("discord-player");
const { isGuildInteraction } = require("discord-api-types/utils/v10");
const { execute } = require("./ping");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Play a song !")
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName("search")
        .setDescription("Searches for a song.")
        .addStringOption(
          new SlashCommandStringOption()
            .setName("searchterms")
            .setDescription("Search keywords")
            .setRequired(true)
        )
    ),

  async execute(client, interaction) {
    // console.log(client.member.voice.channel);
    if (!client.member.voice.channel) {
      await interaction.reply(
        "You must be in a voice channel to use this command."
      );
      return;
    }
    // const queue = await client.player.createQueue(interaction.guild);
    // if (!queue.connection)
    //   await queue.connect(interaction.memeber.voice.channel);
    // let embed = new MessageEmbed();
    // if (interaction.options.getSubcommand() === "song") {
    //   let url = interaction.otpions.getString("url");
    //   const result = await client.player.search(url, {
    //     requestedBy: interaction.user,
    //     searchEngine: QueryType.YOUTUBE_VIDEO,
    //   });
    //   if (result.tracks.length === 0) {
    //     await interaction.reply("No results found");
    //     return;
    //   }
    //   const song = result.tracks[0];
    //   await queue.addTrack(song);
    //   embed
    //     .setDescription(`Added ${song.title}(${song.url}) to the queue`)
    //     .setThumbnail(song.thumbnail)
    //     .setFooter({ text: `Duration : ${song.duration}` });
    // } else if (interaction.options.getSubcommand() === "playlist") {
    //   let url = interaction.otpions.getString("url");
    //   const result = await client.player.search(url, {
    //     requestedBy: interaction.user,
    //     searchEngine: QueryType.YOUTUBE_PLAYLIST,
    //   });
    //   if (result.tracks.length === 0) {
    //     await interaction.reply("No playlist found");
    //     return;
    //   }
    //   const playlist = result.playlist;
    //   await queue.addTrack(playlist);
    //   embed
    //     .setDescription(`Added ${playlist.title}(${playlist.url}) to the queue`)
    //     .setThumbnail(playlist.thumbnail)
    //     .setFooter({ text: `Duration : ${playlist.duration}` });
    // } else if (interaction.options.getSubcommand() === "search") {
    //   let url = interaction.otpions.getString("searchterms");
    //   const result = await client.player.search(url, {
    //     requestedBy: interaction.user,
    //     searchEngine: QueryType.AUTO,
    //   });
    //   if (result.tracks.length === 0) {
    //     await interaction.reply("No result found");
    //     return;
    //   }
    //   const song = result.tracks[0];
    //   await queue.addTrack(song);
    //   embed
    //     .setDescription(`Added ${song.title}(${song.url}) to the queue`)
    //     .setThumbnail(song.thumbnail)
    //     .setFooter({ text: `Duration : ${song.duration}` });
    // }
    // if (!queue.playing) await queue.play();
    // await interaction.reply({
    //   embeds: [embed],
    // });
  },
};

// module.exports = {
//   data: new SlashCommandBuilder().setName("play"),

//   .setDescription("Play a song !")
//   .addSubcommand((subcommand) => {
//     subcommand
//       .setName("search")
//       .setDescription("Searches for a song.")
//       .addStringOption((option) => {
//         option
//           .setName("searchterms")
//           .setDescription("Search keywords")
//           .setRequired(true);
//       });
//   })
//   .addSubcommand((subcommand) => {
//     subcommand
//       .setName("playlist")
//       .setDescription("Plays playlist from YT")
//       .addStringOption((option) => {
//         option
//           .setName("url")
//           .setDescription("Playlist URL")
//           .setRequired(true);
//       });
//   })
//   .addSubcommand((subcommand) => {
//     subcommand
//       .setName("song")
//       .setDescription("Plays song from youtube.")
//       .addStringOption((option) => {
//         option.setName("url").setDescription("Song URL").setRequired(true);
//       });
//   }),
// execute: async ({ client, interaction }) => {
//   if (!interaction.memeber.voice.channel) {
//     await interaction.reply(
//       "You must be in a voice channel to use this command."
//     );
//     return;
//   }
//   const queue = await client.player.createQueue(interaction.guild);
//   if (!queue.connection)
//     await queue.connect(interaction.memeber.voice.channel);
//   let embed = new MessageEmbed();
//   if (interaction.options.getSubcommand() === "song") {
//     let url = interaction.otpions.getString("url");
//     const result = await client.player.search(url, {
//       requestedBy: interaction.user,
//       searchEngine: QueryType.YOUTUBE_VIDEO,
//     });
//     if (result.tracks.length === 0) {
//       await interaction.reply("No results found");
//       return;
//     }
//     const song = result.tracks[0];
//     await queue.addTrack(song);
//     embed
//       .setDescription(`Added ${song.title}(${song.url}) to the queue`)
//       .setThumbnail(song.thumbnail)
//       .setFooter({ text: `Duration : ${song.duration}` });
//   } else if (interaction.options.getSubcommand() === "playlist") {
//     let url = interaction.otpions.getString("url");
//     const result = await client.player.search(url, {
//       requestedBy: interaction.user,
//       searchEngine: QueryType.YOUTUBE_PLAYLIST,
//     });
//     if (result.tracks.length === 0) {
//       await interaction.reply("No playlist found");
//       return;
//     }
//     const playlist = result.playlist;
//     await queue.addTrack(playlist);
//     embed
//       .setDescription(`Added ${playlist.title}(${playlist.url}) to the queue`)
//       .setThumbnail(playlist.thumbnail)
//       .setFooter({ text: `Duration : ${playlist.duration}` });
//   } else if (interaction.options.getSubcommand() === "search") {
//     let url = interaction.otpions.getString("searchterms");
//     const result = await client.player.search(url, {
//       requestedBy: interaction.user,
//       searchEngine: QueryType.AUTO,
//     });
//     if (result.tracks.length === 0) {
//       await interaction.reply("No result found");
//       return;
//     }
//     const song = result.tracks[0];
//     await queue.addTrack(song);
//     embed
//       .setDescription(`Added ${song.title}(${song.url}) to the queue`)
//       .setThumbnail(song.thumbnail)
//       .setFooter({ text: `Duration : ${song.duration}` });
//   }
//   if (!queue.playing) await queue.play();
//   await interaction.reply({
//     embeds: [embed],
//   });
// },
// };
