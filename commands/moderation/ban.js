const { ApplicationCommandOptionType, EmbedBuilder, PermissionsBitField } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();
const Logger = require('../../utils/Logger');

module.exports = {
    name: "ban",
    usage: "/ban <utilisateur>",
    examples: ["/ban <@utilisateur>"],
    category: "moderation",
    permissions: PermissionsBitField.Flags.BanMembers,
    description: "Permet de bloquer un utilisateur sur le serveur",
    options: [
        {
            type: ApplicationCommandOptionType.User,
            name: "membre",
            description: "Le membre à bloquer",
            required: true
        },
        {
            type: ApplicationCommandOptionType.String,
            name: "raison",
            description: "La raison du bloquage",
            required: true
        }
    ],
    async run(client, interaction) {

        const membre = interaction.options.getMember('membre');
        const raison = interaction.options.getString('raison');

        if (!membre.bannable) return interaction.reply({ content: '❌ Je ne peux pas bloquer cet utilisateur!', ephemeral: true });

        //interaction.guild.bans.create(membre.id, {reason: raison});

        interaction.reply({ content: `Le membre ${membre} a été bloqué!`, ephemeral: true });

        const logChannel = client.channels.cache.get(process.env.MODO_LOGS_CHANNEL);

        logChannel.send({ content: `**${interaction.user.username}** a bloqué l'utilisateur ${membre} pour la raison suivante: **${raison}**` });

        try {
            membre.send({ content: `Vous avez été bloqué par **${interaction.user.username}** sur le serveur ${interaction.guild.name} pour la raison suivante: **${raison}**`});
        } catch (err) {
            Logger.warn("Bann: Impossible d'envoyer le message privé");
        }
    }
}