const { Client, GatewayIntentBits, Guild } = require("discord.js");
const util = require("util");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.on("ready", () => {
  console.log("Logged in as " + client.user.tag);

  const Guilds = client.guilds.cache.map((guild) => {
    const guildId = guild.id;

    const memewallChannel = guild.channels.cache.find(
      (channel) => channel.name === "memewall"
    );
    memewallChannel
      .send("Martin Ouellet feed en IRON")
      .then((message) => {
        // Choisi si je fais quelques choses avec ce message ou non
      })
      .catch(console.error);
  });
});

client.login(
  "ODkwNjA4OTM3NTkyODE1NjM4.GX-lW5.03ORPNy7tIh7CQK9wa1dM7yWKV_-l8mRvAgixU"
);

// sendMessage(channel);
