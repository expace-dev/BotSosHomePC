const { ApplicationCommandOptionType, EmbedBuilder, PermissionsBitField } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();


module.exports = {
    name: "unmute",
    usage: "/unmute <utilisateur> <raison>",
    examples: ["/unmute <@utilisateur> <raison>"],
    category: "moderation",
    permissions: PermissionsBitField.Flags.MuteMembers,
    description: "Permet d'enlever la sanction réduire au silence",
    options: [
        {
            type: ApplicationCommandOptionType.User,
            name: "membre",
            description: "Utilisateur",
            required: true
        },
        {
            type: ApplicationCommandOptionType.String,
            name: "raison",
            description: "La raison",
            required: true
        }
    ],
    async run(client, interaction) {

        const membre = interaction.options.getMember('membre');
        const raison = interaction.options.getString('raison');

        if (!membre.isCommunicationDisabled()) return interaction.reply({ content: "Ce membre n'as pas été réduit au silence!", ephemeral: true });

        membre.timeout(null);

        interaction.reply({ content: `Le membre ${membre} n'est plus réduit au silence!`, ephemeral: true });

        const logChannel = client.channels.cache.get(process.env.MODO_LOGS_CHANNEL);

        logChannel.send({ content: `**${interaction.user.username}** a enlevé la sanction **réduire au silence** à ${membre} pour la raison suivante: **${raison}**` });
    }
}