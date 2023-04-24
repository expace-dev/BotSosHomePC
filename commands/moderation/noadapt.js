const { EmbedBuilder, PermissionsBitField, ApplicationCommandOptionType  } = require('discord.js');

module.exports = {
    name: "noadapt",
    category: "utilitaires",
    usage: "/noadapt <salon>",
    examples: ["/noadapt <salon>"],
    permissions: PermissionsBitField.Flags.ManageMessages,
    description: "Envoie un message précisant le salon ou poster",
    options: [
        {
            type: ApplicationCommandOptionType.Channel,
            name: "salon",
            description: "Le salon adhéquate",
            required: true
        },
    ],
    async run(client, interaction) {
        const salon = interaction.options.getChannel('salon');

        const embed = new EmbedBuilder()
            .setDescription(`
            Cette discussion serait plus adaptée dans le salon ${salon}
            `)
            .setColor(`#${process.env.COLOR_PRIMARY}`)
            .setThumbnail("https://www.sos-home-pc.eu/images/discord/help.png");

            interaction.reply({ embeds: [embed] });
    }
}