require("dotenv").config();
const { token } = process.env;
const {
  Client,
  Collection,
  GatewayIntentBits,
  Intents,
} = require("discord.js");
const fs = require("fs");
const { Player } = require("discord-player");

// Ajouter les commentaires sur ce que les fonctions fait

// const client = new Client({ intents: GatewayIntentBits.Guilds });
const client = new Client({
  intents: ["Guilds", "GuildMessages", "GuildVoiceStates", "MessageContent"],
});
client.commands = new Collection();
client.selectMenus = new Collection();
client.buttons = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync("./src/functions");
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((filer) => filer.endsWith(".js"));
  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}

// console.log(client.handleEvents());
client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login(token);
client.player = new Player(client, {
  ytdlOptions: {
    quality: "highestaudio",
    highWaterMark: 1 << 25,
  },
});
