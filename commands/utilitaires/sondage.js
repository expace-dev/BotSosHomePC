const { EmbedBuilder, PermissionsBitField, ApplicationCommandOptionType } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();

module.exports = {
    name: "sondage",
    category: "utilitaires",
    usage: "/sondage",
    examples: ["/sondage <titre> <question>"],
    permissions: PermissionsBitField.Flags.SendMessages,
    description: "Permet de créer un nouveau sondage",
    options: [
        {
            name: 'titre',
            description: 'Taper le titre de votre sondage',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'contenu',
            description: 'Taper la question de votre sondage',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],
    async run(client, interaction) {
        const pollTitle = interaction.options.getString('titre');
        const pollContent = interaction.options.getString('contenu');

        const embed = new EmbedBuilder()
            .setTitle(pollTitle)
            .setColor(`#${process.env.COLOR_PRIMARY}`)
            .setDescription(pollContent)
            .setTimestamp()
            .setFooter({ text: `Nouveau sondage généré par ${interaction.user.username}!` });

        const poll = await interaction.reply({ embeds: [embed], fetchReply: true });
        poll.react('🟩');
        poll.react('🟥');
    }
}