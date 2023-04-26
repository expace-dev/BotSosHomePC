const { ApplicationCommandOptionType, EmbedBuilder, PermissionsBitField } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();
const Logger = require('../../utils/Logger');

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
        const db = client.db;

        if (membre === interaction.member) return interaction.reply({ content: `❌ Vous n'avez même pas d'avertissement ! 🤣 🤣 🤣`, ephemeral: true });

        if (membre.user.bot) return interaction.reply({ content: `❌ Je te rappelle que je ne peux pas me sanctionner ?? 🤣 🤣 🤣`, ephemeral: true });

        db.query(`SELECT COUNT(*) AS warnings FROM sanctions WHERE utilisateur='${membre.id}'`, async (error, results, fields) => {
            const warnings = results[0].warnings;

            if (warnings === 0) {
                return interaction.reply({ content: `❌ L'utilisateur ${membre} n'as aucun avertissement !!`, ephemeral: true });
            }
            else {
                db.query(`DELETE FROM sanctions WHERE utilisateur="${membre.id}" AND type="warnings"`);
                return interaction.reply({ content: `Je viens de supprimer les avertissements de l'utilisateur ${membre}`, ephemeral:true });
            }
        });


    }
}