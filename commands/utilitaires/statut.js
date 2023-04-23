const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: "statut",
    usage: "/statut <status (optionnel)> <biographie (optionnel)>",
    examples: ["/statut <status> <biographie>"],
    category: "utilitaires",
    permissions: "aucune",
    description: "Permet de modifier le statut du bot",
    options: [
        {
            name: 'status',
            description: 'Quel est le statut du bot',
            type: ApplicationCommandOptionType.String,
            required: false,
            choices: [
                {
                    name: 'online',
                    value: 'online'
                },
                {
                    name: 'dnd',
                    value: 'dnd'
                },
                {
                    name: 'idle',
                    value: 'idle'
                }
            ]
        },
        {
            name: 'bio',
            description: 'Indiquez que fait le bot',
            type: ApplicationCommandOptionType.String,
            required: false,
        }
        
    ],
    async run(client, interaction) {

        const statu = interaction.options.getString('status');
        const biographie = interaction.options.getString('bio');

       client.user?.setStatus(`${statu}`);

       client.user?.setPresence({
            activities: [{
                name: biographie
            }],
       });

       interaction.reply({ content: `J'ai bien changé le startus en ${statu} et la biographie en ${biographie}`});
    }
}