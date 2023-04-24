const Logger = require('../../utils/Logger');
const dotenv = require('dotenv'); dotenv.config();

module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(client, interaction) {
        if (interaction.isCommand()  || interaction.isContextMenuCommand()) {
            const cmd = client.commands.get(interaction.commandName);
            if (!cmd) return interaction.reply("Cette commande n'existe pas!");

            if (!interaction.member.permissions.has([cmd.permissions])) return interaction.reply({ content: `Vous n'avez pas la/les permission(s) requise(s) pour taper cette commande!`, ephemeral: true});


            cmd.run(client, interaction);
        }
        
        else if (interaction.isStringSelectMenu()) {
            const selectMenu = client.selects.get(interaction.customId);
            console.log(selectMenu);
            if (!selectMenu) return interaction.reply("Ce menu n'existe pas!");
            selectMenu.run(client, interaction);
        }
        else if (interaction.isButton) {
            const btn = client.buttons.get(interaction.customId);
            if (!btn) return interaction.reply("Ce boutton n'existe pas!");
            btn.run(client, interaction);
        }
    }
}