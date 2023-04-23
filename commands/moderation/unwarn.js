const { ApplicationCommandOptionType, EmbedBuilder, PermissionsBitField } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();
const Logger = require('../../utils/Logger');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
    name: "unwarn",
    usage: "/unwarn <utilisateur>",
    examples: ["/unwarn <@utilisateur>"],
    category: "moderation",
    permissions: PermissionsBitField.Flags.BanMembers,
    description: "Permet de supprimer les avertissements de l'utilisateur",
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

        if (membre === interaction.member) return interaction.reply({ content: `❌ Vous n'avez même pas d'avertissement ! 🤣 🤣 🤣`, ephemeral: true });

        if (membre.user.bot) return interaction.reply({ content: `❌ Je te rappelle que je nepeux pas me sanctionner ?? 🤣 🤣 🤣`, ephemeral: true });

        let warnings = await db.get(`warnings_${interaction.guild.id}_${membre.id}`);

        if (warnings === null) {
            return interaction.reply({ content: `❌ L'utilisateur ${membre} n'as aucun avertissement !!`, ephemeral: true });
        }

        await db.delete(`warnings_${interaction.guild.id}_${membre.id}`);
        await db.delete(`warnings_${interaction.guild.id}_${membre.id}_list`);

        return interaction.reply({ content: `Je viens de supprimer les avertissements de l'utilisateur ${membre}`, ephemeral:true });

    }
}