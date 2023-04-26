const { ApplicationCommandOptionType, EmbedBuilder, PermissionsBitField } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();
const Logger = require('../../utils/Logger');

module.exports = {
    name: "sanctions",
    usage: "/sanctions <utilisateur>",
    examples: ["/sanctions <@utilisateur>"],
    category: "moderation",
    permissions: PermissionsBitField.Flags.BanMembers,
    description: "Permet de récupérer les sanctions de l'utilisateur",
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
        

        db.query(`SELECT COUNT(*) AS sanctions FROM sanctions WHERE utilisateur='${membre.id}'`, async (error, results, fields) => {
            
            const nbre = results[0].sanctions;

            db.query(`SELECT type, raison, date FROM sanctions WHERE utilisateur='${membre.id}'`, async (error, donnees, fields) => {
                let raisons = "";
                donnees.forEach((donnee) => {
                    raisons += `**${donnee.type}**\n${donnee.raison}\nLe: <t:${parseInt(donnee.date / 1000)}:f>\n\n`
                });
                console.log(raisons);

                const embed = new EmbedBuilder()
            .setTitle("Sanctions")
            .setColor(`#${process.env.COLOR_PRIMARY}`)
            .setDescription(`l'utilisateur ${membre} a été sanctionné ${nbre} fois pour le(s) raison(s): \n\n${raisons}`)
            .setFooter({ text: `Demandé par ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}` });


        return interaction.reply({embeds: [embed], ephemeral: true});


            });


        });


    }
}