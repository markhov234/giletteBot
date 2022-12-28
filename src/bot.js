require("dotenv").config();

// Est une function qui permet de configurer l’environnement dans l’application de nodejs.
const { token } = process.env;
// Pour y accèder process.env.NOM de la variable voulue. Déconstruit process.env pour que la variable token soit token
const {
  Client, //The Client class represents a Discord client, which is used to interact with the Discord API. You can use the Client class to log in to Discord, send messages, and perform other actions with your bot
  Collection, // The Collection class is a data structure that can be used to store and manipulate a collection of items. It is often used in discord.js to store collections of data, such as users, channels, or guilds.
  GatewayIntentBits, //The GatewayIntentBits class represents a set of gateway intents that can be used to specify which events a bot should receive when connecting to the Discord gateway. Gateway intents are used to control which events are sent to a bot by the Discord API.
  Intents, //The Intents class is a utility class that provides constants for the different types of gateway intents that are available in discord.js. You can use these constants to specify which events your bot should receive when connecting to the Discord gateway.
} = require("discord.js"); // De la classe discordJS

const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { YtDlpPlugin } = require("@distube/yt-dlp");
const fs = require("fs");

// const { DisTube } = require("distube");
// client.DisTube = new DisTube({
//   leaveOnStop: false,
//   emitNewSongOnly: true,
//   emitAddSongWhenCreatingQueue: false,
//   emitAddListWhenCreatingQueue: false,
// });

// Fabrique un nouvelle instance de la classe client de discordjs qui permet d’interagir avec l’API.
const client = new Client({
  intents: [
    "Guilds", // This intent allows the bot to receive guild-related events, such as when a guild is created or deleted, or when a member is banned from a guild.
    "GuildMessages", // This intent allows the bot to receive message-related events in guilds, such as when a message is sent or deleted.
    "GuildVoiceStates", // This intent allows the bot to receive voice state-related events in guilds, such as when a user joins or leaves a voice channel.
    "MessageContent", // This intent allows the bot to receive the content of messages that are sent in guilds.
  ],
});

// Client représente une variable de discord js. new Collection() est structure de data qui store une collection de valeurs. Ceci fabrique une nouvelle collection (object) et l'assigne a la propriété commands.
// Permet de store and access la collection de valeur en utilisant client.commands. (get, set)
// The Collection object also provides other methods for manipulating the collection, such as has for checking if an item exists in the collection, delete for deleting an item from the collection, and forEach for iterating over the items in the collection.
client.commands = new Collection();
client.selectMenus = new Collection();
client.buttons = new Collection();
client.commandArray = [];
client.distube = new DisTube(client, {
  leaveOnStop: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  plugins: [
    new SpotifyPlugin({
      emitEventsAfterFetching: true,
    }),
    new SoundCloudPlugin(),
    new YtDlpPlugin(),
  ],
});
// Donne une collection des valeurs écrites ( command, selectMenus) qui est vide

// Dans cette function, j'utilise le require FS qui permet de lire les différents dossiers que je mentionnes, dans ce cas-ci je lis les fichiers dans les dossiers src->functions
const functionFolders = fs.readdirSync("./src/functions");
// J'effectue une loop avec la constante functionFolders. Cela donne un array des dossiers, dans ce cas-ci, handlers.
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((filer) => filer.endsWith(".js"));
  // La functionFiles va chercher les files qui se siture dans les dossiers données par la loop plus haute(folder) et je ne veux que les dossiers se terminant en .JS
  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}
// Dans cette loop, pour chaque file j'effectue un require pour lancer la function immédiatement avec l'argument client.
client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login(token);
