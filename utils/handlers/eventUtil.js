const fs = require('node:fs');
const path = require('node:path');
const foldersPath = path.join(__dirname, '../../events');
const commandFolders = fs.readdirSync(foldersPath);
const Logger = require('../Logger');

module.exports = async client => {

    for (const folder of commandFolders) {
        const commandsPath = path.join(foldersPath, folder);
	    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
		    const event = require(filePath);

            if (!event.name) return Logger.warn(`Evènement non chargé: ajouter un nom à votre évènement\n Fichier -> ${filePath}`);

            if (event.once) {
                client.once(event.name, (...args) => event.execute(client, ...args));
            }
            else {
                client.on(event.name, (...args) => event.execute(client, ...args));
            }

            Logger.event(`- ${event.name} `);
            
        }
    }

}