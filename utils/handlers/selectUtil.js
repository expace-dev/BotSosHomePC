const fs = require('node:fs');
const path = require('node:path');
const foldersPath = path.join(__dirname, '../../selects');
const selectFolders = fs.readdirSync(foldersPath);
const Logger = require('../Logger');

module.exports = async client => {

    for (const folder of selectFolders) {
        const selectsPath = path.join(foldersPath, folder);
	    const selectFiles = fs.readdirSync(selectsPath).filter(file => file.endsWith('.js'));
        for (const file of selectFiles) {
            const filePath = path.join(selectsPath, file);
		    const select = require(filePath);


            if (!select.name) return Logger.warn(`SelectMenu non chargé: ajouter un nom à votre selectMenu\n Fichier -> ${filePath}`);

                client.selects.set(select.name, select);
                Logger.command(`- ${select.name}`);
        }
    }

}