const { EmbedBuilder, PermissionsBitField, ApplicationCommandOptionType  } = require('discord.js');

module.exports = {
    name: "respect",
    category: "utilitaires",
    usage: "/respect <utilisateur>",
    examples: ["/respect <@utilisateur>"],
    permissions: PermissionsBitField.Flags.SendMessages,
    description: "Permet de notifier un utilisateur pour manque de respect",
    options: [
        {
            type: ApplicationCommandOptionType.User,
            name: "membre",
            description: "Le membre à notifier",
            required: true
        },
    ],
    async run(client, interaction) {
        const membre = interaction.options.getMember('membre');

        const embed = new EmbedBuilder()
                .setTitle('Manque de respect !!')
                .setDescription(`
                Merci de respecter notre règlement et les membres de la communauté, bonjour et merci sont un minimum !!! 😒
                `)
                .setColor(`#${process.env.COLOR_PRIMARY}`)
                .setThumbnail("https://www.sos-home-pc.eu/images/discord/interdit.png");

                interaction.reply({ content: `${membre}`, embeds: [embed] });
    }
}