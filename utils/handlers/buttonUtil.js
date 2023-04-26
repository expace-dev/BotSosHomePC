const fs = require('node:fs');
const path = require('node:path');
const foldersPath = path.join(__dirname, '../../buttons');
const buttonFolders = fs.readdirSync(foldersPath);
const Logger = require('../Logger');

module.exports = async client => {

    
    for (const folder of buttonFolders) {
        const buttonsPath = path.join(foldersPath, folder);
	    const buttonFiles = fs.readdirSync(buttonsPath).filter(file => file.endsWith('.js'));
        for (const file of buttonFiles) {
            const filePath = path.join(buttonsPath, file);
		    const button = require(filePath);

            if (!button.name) return Logger.warn(`Boutton non chargé: ajouter un nom à votre boutton\n Fichier -> ${filePath}`);

            client.buttons.set(button.name, button);
        }
    }

}