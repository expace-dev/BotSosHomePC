const fs = require('node:fs');
const path = require('node:path');
const foldersPath = path.join(__dirname, '../../commands');
const commandFolders = fs.readdirSync(foldersPath);
const Logger = require('../Logger');

module.exports = async client => {

    
    for (const folder of commandFolders) {
        const commandsPath = path.join(foldersPath, folder);
	    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
		    const command = require(filePath);

            if (!command.name) return Logger.warn(`Commande non chargé: ajouter un nom à votre commande\n Fichier -> ${filePath}`);

            if (!command.category) return Logger.warn(`Commande non chargée: ajouter une catégorie à votre commande\nFichier -> ${filePath}`);

            if (!command.permissions) return Logger.warn(`Commande non chargée: ajouter des permissions à votre commande\nFichier -> ${filePath}`);

                client.commands.set(command.name, command);
                Logger.command(`- ${command.name}`);
        }
    }

}