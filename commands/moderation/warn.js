const { ApplicationCommandOptionType, EmbedBuilder, PermissionsBitField } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();
const Logger = require('../../utils/Logger');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
    name: "warn",
    usage: "/warn <utilisateur> <raison>",
    examples: ["/warn <@utilisateur> <raison>"],
    category: "moderation",
    permissions: PermissionsBitField.Flags.BanMembers,
    description: "Permet d'avertir un membre",
    options: [
        {
            type: ApplicationCommandOptionType.User,
            name: "membre",
            description: "Le membre à avertir",
            required: true
        },
        {
            type: ApplicationCommandOptionType.String,
            name: "raison",
            description: "La raison de l'avertissement",
            required: true
        }
    ],
    async run(client, interaction) {

        const membre = interaction.options.getMember('membre');
        const raison = interaction.options.getString('raison');

        if (membre === interaction.member) return interaction.reply({ content: `❌ Vous ne pouvez pas vous avertir!`, ephemeral: true });

        if (raison.length > 1500) return interaction.reply({ content: `❌ La raison de l'avertissement est trop longue!`, ephemeral: true });

        if (membre.user.bot) return interaction.reply({ content: `❌ Vous avez vraiment cru que j'était capable de m'avertir moi même ?? 🤣 🤣 🤣`, ephemeral: true });

        const warnings = await db.get(`warnings_${interaction.guild.id}_${membre.id}`);

        if (warnings === null) {
            await db.set(`warnings_${interaction.guild.id}_${membre.id}`, 1);
            await db.push(`warnings_${interaction.guild.id}_${membre.id}_list`, raison);
        }
        else if (warnings !== null) {
            await db.add(`warnings_${interaction.guild.id}_${membre.id}`, 1);
            await db.push(`warnings_${interaction.guild.id}_${membre.id}_list`, raison);
        }

        return interaction.reply({ content: `Je viens d'avertir l'utilisateur ${membre} pour la raison ${raison}`, ephemeral: true });

    }
}