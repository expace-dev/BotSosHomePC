const { ApplicationCommandOptionType, EmbedBuilder, PermissionsBitField } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();
const Logger = require('../../utils/Logger');

module.exports = {
    name: "unban",
    usage: "/unban <utilisateur> <raison>",
    examples: ["/unban <@utilisateur> <raison>"],
    category: "moderation",
    permissions: PermissionsBitField.Flags.BanMembers,
    description: "Permet de débloquer un utilisateur",
    options: [
        {
            type: ApplicationCommandOptionType.String,
            name: "membre",
            description: "L'id du membre à débloquer",
            required: true
        },
        {
            type: ApplicationCommandOptionType.String,
            name: "raison",
            description: "La raison du débloquage",
            required: true
        }
    ],
    async run(client, interaction) {

        const membre = interaction.options.getString('membre');
        const raison = interaction.options.getString('raison');


        interaction.guild.bans.fetch(membre).then((membre) => {
            interaction.guild.members.unban(membre.user.id).then(() => {
                interaction.reply({ content: `Le membre ${membre.user.username} a été débloqué!`, ephemeral: true });

                const logChannel = client.channels.cache.get(process.env.MODO_LOGS_CHANNEL);

                logChannel.send({ content: `**${interaction.user.username}** a débloqué l'utilisateur ${membre.user.username} pour la raison suivante: **${raison}**` });

                try {
                    membre.user.send({ content: `Vous avez été débloqué par **${interaction.user.username}** sur le serveur ${interaction.guild.name} pour la raison suivante: **${raison}**`});
                } catch (err) {
                    Logger.warn("Unban: Impossible d'envoyer le message privé");
                }
            });
        }).catch(() => {
            Logger.warn("Ce membre n'est pas bloqué");
            interaction.reply({ content: "Ce membre n'est pas bloqué!", ephemeral: true });
        });

        
    }
}