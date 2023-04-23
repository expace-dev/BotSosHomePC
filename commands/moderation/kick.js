const { ApplicationCommandOptionType, EmbedBuilder, PermissionsBitField } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();

module.exports = {
    name: "kick",
    usage: "/kick <utilisateur>",
    examples: ["/kick <@utilisateur>"],
    category: "moderation",
    permissions: PermissionsBitField.Flags.KickMembers,
    description: "Permet d'expulser un membre",
    options: [
        {
            type: ApplicationCommandOptionType.User,
            name: "membre",
            description: "Le membre à expulser",
            required: true
        },
        {
            type: ApplicationCommandOptionType.String,
            name: "raison",
            description: "La raison de l'expulsion",
            required: true
        }
    ],
    async run(client, interaction) {

        const membre = interaction.options.getMember('membre');
        const raison = interaction.options.getString('raison');

        if (!membre.kickable) return interaction.reply({ content: 'Je ne peux pas expusler ce membre!', ephemeral: true });

        membre.kick({raison});

        interaction.reply({ content: `Le membre ${membre} a été expulsé!`, ephemeral: true });

        const logChannel = client.channels.cache.get(process.env.MODO_LOGS_CHANNEL);

        logChannel.send({ content: `**${interaction.user.username}** a expulsé l'utilisateur ${membre} pour la raison suivante: **${raison}**` });

        try {
            membre.send({ content: `Vous avez été expuslé par **${interaction.user.username}** sur le serveur ${interaction.guild.name} pour la raison suivante: **${raison}**`});
        } catch (err) {
            Logger.warn("Kick: Impossible d'envoyer le message privé");
        }

        
    }
}