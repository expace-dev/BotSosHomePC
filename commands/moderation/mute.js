const { ApplicationCommandOptionType, EmbedBuilder, PermissionsBitField } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();
const ms = require('ms');


module.exports = {
    name: "mute",
    usage: "/mute <utilisateur> <raison>",
    examples: ["/mute <@utilisateur> <raison>"],
    category: "moderation",
    permissions: PermissionsBitField.Flags.MuteMembers,
    description: "Permet de réduire un utilisateur au silence",
    options: [
        {
            type: ApplicationCommandOptionType.User,
            name: "membre",
            description: "Le membre à mute",
            required: true
        },
        {
            type: ApplicationCommandOptionType.String,
            name: "raison",
            description: "La raison du mute",
            required: true
        },
        {
            type: ApplicationCommandOptionType.String,
            name: "duree",
            description: "La durée du mute",
            choices: [
                {
                    name: '15 minutes',
                    value: '15 minutes'
                },
                {
                    name: '30 minutes',
                    value: '30 minutes'
                },
                {
                    name: '1 heure',
                    value: '1 hour'
                },
                {
                    name: '3 heures',
                    value: '3 hour'
                },
                {
                    name: 'Une journée',
                    value: '1 days'
                },
                {
                    name: 'Une semaine',
                    value: '7 days'
                }
            ],
            required: true
        }
    ],
    async run(client, interaction) {

        const membre = interaction.options.getMember('membre');
        const raison = interaction.options.getString('raison');
        const duree = interaction.options.getString('duree');
        const convertedTime = ms(duree);
        const db = client.db;
        
        if (!membre.moderatable) return interaction.reply("Ce membre ne peut pas être mute  par le bot!");
        if (!convertedTime) return interaction.reply({ content: 'Spécifier une durée valable', ephemeral: true});

        membre.timeout(convertedTime, raison);

        const date = Date.now();

        db.query(`INSERT INTO sanctions (type, utilisateur, raison, date) VALUES ("mute", "${membre.id}", "${raison}", "${date}")`);

        interaction.reply({ content: `Le membre ${membre} a été mute pour une durée de ${duree}!`, ephemeral: true });

        const logChannel = client.channels.cache.get(process.env.MODO_LOGS_CHANNEL);

        logChannel.send({ content: `**${interaction.user.username}** a réduit au silence l'utilisateur ${membre} pour une durée de ${duree}, pour la raison suivante: **${raison}**` });

    }
}