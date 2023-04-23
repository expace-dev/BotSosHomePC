const { ApplicationCommandOptionType, EmbedBuilder, PermissionsBitField } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();

module.exports = {
    name: 'clear',
    usage: "/clear <nombre> <utilisateur (optionnel)>",
    examples: ["/clear <25> <@utilisateur>"],
    category: 'moderation',
    permissions: PermissionsBitField.Flags.ManageMessages,
    description: "Permet de supprimer des messages",
    options: [
        {
            name: "message",
            description: "Le nombre de message à supprimer",
            type: ApplicationCommandOptionType.Number,
            required: true,
        },
        {
            name: "membre",
            description: "Sélectionner l'utilisateur pour la suppression des messages",
            type: ApplicationCommandOptionType.User,
            required: false,
        }
    ],
    async run(client, interaction) {

        
        const amountToDelete = interaction.options.getNumber('message');
        if (amountToDelete > 100 || amountToDelete < 2) return interaction.reply({ content: 'Le nombre doit être inférieur à 100 et supérieur à 1!', ephemeral: true });
        
        const target = interaction.options.getMember('membre');
        
        const messagesToDelete = await interaction.channel.messages.fetch();

        if (target) {
            let i = 0;
            const filteredTargetMessages = [];
            (await messagesToDelete).filter(msg => {
                if (msg.author.id == target.id && amountToDelete > i) {
                    filteredTargetMessages.push(msg); i++;
                }
            });

            await interaction.channel.bulkDelete(filteredTargetMessages, true).then(messages => {
                interaction.reply({ content: `J'ai supprimé ${messages.size} messages sur l'utilisateur ${target}`, ephemeral: true });

                const logChannel = client.channels.cache.get(process.env.MODO_LOGS_CHANNEL);

                logChannel.send({ content: `**${interaction.user.username}** a supprimé ${messages.size} messages de ${target} sur le salon <#${interaction.channelId}>` });


            });
        }
        else {
            await interaction.channel.bulkDelete(amountToDelete, true).then(messages => {
                interaction.reply({ content: `J'ai supprimé ${messages.size} messages sur ce salon`, ephemeral: true });

                const logChannel = client.channels.cache.get(process.env.MODO_LOGS_CHANNEL);
                
                logChannel.send({ content: `**${interaction.user.username}** a supprimé ${messages.size} messages sur le salon <#${interaction.channelId}>` });
                
            });
        }
    }
}