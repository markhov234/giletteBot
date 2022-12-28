const fs = require("fs");

// Cette partie défine une function qui prends comme argument client de bot.js. Quand la function est callé, elle définit une méthode sur l'objet client nommé handleEvents
module.exports = (client) => {
  client.handleEvents = async () => {
    // Lis le contenu dans le dossier events, utilisant readdirSync
    const eventFolders = fs.readdirSync(`./src/events`);
    // Utilise une loop pour faire le tours des folder dans le dossier events
    for (const folder of eventFolders) {
      // Pour chaque folder dans dans event, fabrique une constante avec seulement les fichiers qui se termine en .js
      const eventFiles = fs
        .readdirSync(`./src/events/${folder}`)
        .filter((file) => file.endsWith(".js"));

      switch (folder) {
        // Utilise une switch pour regarder la valeur de folder et regarde si celui-ci est client.
        case "client":
          // Utilise une loop pour définir chaque file dans les files recu en array
          for (const file of eventFiles) {
            // pour chaque event file, utilise le require function pour importe le file en tant que module
            const event = require(`../../events/${folder}/${file}`);
            // Regarde si le module importé a une propriété nommé once, si oui setup un listener pour L'event
            if (event.once)
              client.once(event.name, (...args) =>
                event.execute(...args, client)
              );
            else
              client.on(event.name, (...args) =>
                event.execute(...args, client)
              );
          }
          break;

        default:
          break;
      }
    }
  };
};
