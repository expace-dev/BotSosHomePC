const { EmbedBuilder, PermissionsBitField  } = require('discord.js');

module.exports = {
    name: "ping",
    category: "utilitaires",
    usage: "/ping",
    examples: ["/ping"],
    permissions: PermissionsBitField.Flags.SendMessages,
    description: "La commande ping renvoie la latence du bot et de l'API Discord",
    dm: true,
    async run(client, interaction) {
        const tryPong = await interaction.reply({ content: 'On essaye de pong... un instant!', fetchReply: true, ephemeral: true })
        const embed = new EmbedBuilder()
            .setTitle('🏓 Pong!')
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(
                { name: 'Latence API', value: `\`\`\`${client.ws.ping}ms\`\`\``, inline: true },
                { name: 'Latence BOT', value: `\`\`\`${tryPong.createdTimestamp - interaction.createdTimestamp}ms\`\`\``, inline: true }
            )
            .setTimestamp()
            .setFooter({ text: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
        interaction.editReply({ content: ' ', embeds: [embed], ephemeral: true });
    }
}