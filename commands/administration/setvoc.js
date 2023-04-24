const { EmbedBuilder, PermissionsBitField, ApplicationCommandOptionType, ChannelType, PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: "setvoc",
    category: "administration",
    usage: "/setvoc",
    examples: ["/setvoc"],
    permissions: PermissionsBitField.Flags.ManageGuild,
    description: "Cette commande ne fonctionne pas actuellement",
    options: [
        {
            type: ApplicationCommandOptionType.Channel,
            name: "salon",
            description: "Salon pour créer le vocal",
            required: true
        },
    ],
    async run(client, interaction) {
        const db = client.db;
        //const channel = interaction.getChannel("salon");

        const embedvocadd = new EmbedBuilder()
            .setDescription(`VOUS AVEZ BIEN ACTIVÉ LES VOCAUX PRIVÉ`);
        
                const guild = interaction.guild;
                await guild.channels.create({
                    type: ChannelType.GuildCategory,
                    name: `Assistance`,
                    permissionOverwrites: [
                        {
                            id: guild.roles.everyone,
                            allow: [
                                PermissionFlagsBits.ViewChannel,
                                PermissionFlagsBits.Connect
                            ]
                        },
                    ],
                }).then(NewCategory => {
                    db.query(`SELECT * FROM privatevoc privatevoc guildID = '${interaction.guild.id}'`, async (err, req) => {
                        db.query(`INSERT INTO privatevoc (guildID, categoryID, channelID) VALUES (${interaction.guild.id}, "${NewCategory.id}", "aucun")`);
                        interaction.reply({ embeds: [embedvocadd], ephemeral: true });
                    });

                    guild.channels.create({
                        type: ChannelType.GuildVoice,
                        name: `➕ Créer votre salon`,
                        parent: NewCategory
                    }).then(channel => {
                        db.query(`SELECT * FROM privatevoc WHERE guildID = '${interaction.guild.id}'`, async (err, req) => {
                            db.query(`UPDATE privatevoc SET channelID = '${channel.id}' WHERE guildID = '${interaction.guild.id}'`);
                        });
                    });
                });
    }
};