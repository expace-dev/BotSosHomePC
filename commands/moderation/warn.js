const { ApplicationCommandOptionType, EmbedBuilder, PermissionsBitField } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();
const Logger = require('../../utils/Logger');
const ms = require('ms');

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

        const db = client.db;

        const membre = interaction.options.getMember('membre');
        const raison = interaction.options.getString('raison');
        const convertedTime = ms('1 hour');
        const logChannel = client.channels.cache.get(process.env.MODO_LOGS_CHANNEL);
        const sanctionsChannel = client.channels.cache.get(process.env.SANCTIONS_CHANNEL);

        if (membre === interaction.member) return interaction.reply({ content: `❌ Vous ne pouvez pas vous avertir!`, ephemeral: true });

        if (raison.length > 1500) return interaction.reply({ content: `❌ La raison de l'avertissement est trop longue!`, ephemeral: true });

        if (membre.user.bot) return interaction.reply({ content: `❌ Vous avez vraiment cru que j'était capable de m'avertir moi même ?? 🤣 🤣 🤣`, ephemeral: true });
        // On compte le nombre de warnings
        db.query(`SELECT COUNT(*) AS warnings FROM sanctions WHERE utilisateur='${membre.id}'`, async (error, results, fields) => { 
            
            const warnings = results[0].warnings;
            const date = Date.now();
            
            
            // si le nombre de warnings est inférieur à 3
            if (warnings < 2) {
                // On ajoute un warnings
                db.query(`INSERT INTO sanctions (type, utilisateur, raison, date) VALUES ("warnings", "${membre.id}", "${raison}", "${date}")`);
                
                interaction.reply({ content: `Je viens de donner un avertissement à l'utilisateur ${membre} pour la raison suivante: **${raison}**`, ephemeral: true });

                logChannel.send({ content: `**${interaction.user.username}** a donné un avertissement à l'utilisateur ${membre} pour la raison suivante: **${raison}**` });

                sanctionsChannel.send({ content: `**${membre}** vous avez reçu un avertissement de **${interaction.user.username}** pour la raison suivante: **${raison}**` });
            }
            // Si l'utilisateur à plus de 3 warnings
            else if (warnings < 4) {
                // Ont mute l'utilisateur pendant une heure
                membre.timeout(convertedTime, raison);

                db.query(`INSERT INTO sanctions (type, utilisateur, raison, date) VALUES ("warnings", "${membre.id}", "${raison}", "${date}")`);

                db.query(`INSERT INTO sanctions (type, utilisateur, raison, date) VALUES ("mute", "${membre.id}", "${raison}", "${date}")`);
                
                interaction.reply({ content: `Suite à plusieurs avertissements j'ai réduit au silence l'utilisateur ${membre} pour la raison suivante: **${raison}**`, ephemeral: true });

                logChannel.send({ content: `Suite à plusieurs avertissements **${interaction.user.username}** a réduit au silence l'utilisateur ${membre} pour la raison suivante: **${raison}**` });

                sanctionsChannel.send({ content: `**${membre}** vous a été réduit au silence par **${interaction.user.username}** pour la raison suivante: **${raison}**` });



            }
            // Sinon ont bloque l'utilisateur
            else {
                interaction.guild.bans.create(membre.id, {reason: raison});

                db.query(`INSERT INTO sanctions (type, utilisateur, raison, date) VALUES ("warnings", "${membre.id}", "${raison}", "${date}")`);

                db.query(`INSERT INTO sanctions (type, utilisateur, raison, date) VALUES ("bann", "${membre.id}", "${raison}", "${date}")`);

                interaction.reply({ content: `Suite à plusieurs avertissements j'ai bloqué l'utilisateur ${membre} pour la raison suivante: **${raison}**`, ephemeral: true });

                logChannel.send({ content: `Suite à plusieurs avertissements **${interaction.user.username}** a bloqué l'utilisateur ${membre} pour la raison suivante: **${raison}**` });

                try {
                    membre.send({ content: `Vous avez été bloqué par **${interaction.user.username}** sur le serveur ${interaction.guild.name} pour la raison suivante: **${raison}**`});
                } catch (err) {
                    Logger.warn("Bann: Impossible d'envoyer le message privé");
                }
            }

            
        });


    }
}