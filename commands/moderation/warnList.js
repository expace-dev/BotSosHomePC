const { ApplicationCommandOptionType, EmbedBuilder, PermissionsBitField } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();
const Logger = require('../../utils/Logger');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
    name: "warn-list",
    usage: "/warn-list <utilisateur>",
    examples: ["/warn-list <@utilisateur>"],
    category: "moderation",
    permissions: PermissionsBitField.Flags.BanMembers,
    description: "Permet de récupérer les avertissements de l'utilisateur",
    options: [
        {
            type: ApplicationCommandOptionType.User,
            name: "membre",
            description: "Quel est l'utilisateur ?",
            required: true
        }
    ],
    async run(client, interaction) {

        const membre = interaction.options.getMember('membre');

        let warnings = await db.get(`warnings_${interaction.guild.id}_${membre.id}`);
        let raison = await db.get(`warnings_${interaction.guild.id}_${membre.id}_list`);

        if (warnings === null) warnings = 0;
        if (raison === null) raison = ""; else raison.join('\n');

        const embed = new EmbedBuilder()
            .setTitle("Avertissements")
            .setColor(`#${process.env.COLOR_PRIMARY}`)
            .setDescription(`l'utilisateur ${membre} a été averti ${warnings} fois pour le(s) raison(s): \n${raison}`)
            .setFooter({ text: `Demandé par ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}` });

        return interaction.reply({embeds: [embed], ephemeral: true});

    }
}