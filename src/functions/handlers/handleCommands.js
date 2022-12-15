const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync("./src/commands");
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandArray } = client;
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
        console.log(`Command : ${command.data.name} has been passed`);
      }
    }
    const clientId = "890608937592815638";
    const guildId = "179935908089298944";
    const rest = new REST({ version: "9" }).setToken(process.env.token);
    try {
      console.log("Started refreshing application (/) commands.");
      await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
        body: client.commandArray,
      });
      console.log("Sucessfully reloaded application (/) commands.");
    } catch (error) {
      console.error(error);
    }
  };
};
