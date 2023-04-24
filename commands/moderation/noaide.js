const { EmbedBuilder, PermissionsBitField, ApplicationCommandOptionType  } = require('discord.js');

module.exports = {
    name: "noaide",
    category: "utilitaires",
    usage: "/noaide",
    examples: ["/noaide"],
    permissions: PermissionsBitField.Flags.ManageMessages,
    description: "Envoie un message pas d'aide dans ce salon",
    async run(client, interaction) {
        const membre = interaction.options.getMember('membre');

        const embed = new EmbedBuilder()
            .setDescription(`
            Attention, le salon <#${interaction.channelId}> n'est PAS destiné à poser des questions d'aide, merci de choisir le bon salon !!
            `)
            .setColor(`#${process.env.COLOR_PRIMARY}`)
            .setThumbnail("https://www.sos-home-pc.eu/images/discord/interdit.png");

            interaction.reply({ embeds: [embed] });
    }
}