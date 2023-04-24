const dotenv = require('dotenv'); dotenv.config();
const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: 'voiceStateUpdate',
    once: false,
    execute(client, oldState, newState) {
        const db = client.db;
    
        db.query(`SELECT * FROM privatevoc WHERE guildID = '${newState.guild.id}'`, async (err, req) => {
            if (req.length < 1) {
                return;
            } else {
                db.query(`SELECT * FROM privatevoc WHERE guildID = '${newState.guild.id}'`, async (err, req) => {
    
                    const guild = newState.guild;
                    const channelcreate = req[0].channelID
                    const parent = req[0].categoryID
                    const memberName = newState.member.displayName;
                    const channelName = `Salon de ${memberName}`;
                    const newChannel = newState.channel;
    
                    //try {
                    if (newState.channelId === channelcreate) {
                        await guild.channels.create({
                            type: 2,
                            name: `${channelName}`,
                            parent: parent,
                            permissionOverwrites: [
                                {
                                    id: newState.member.id,
                                    allow: [PermissionFlagsBits.Connect,
                                    PermissionFlagsBits.Speak,
                                    PermissionFlagsBits.ViewChannel]
                                },
                                {
                                    id: guild.roles.everyone,
                                    allow: [PermissionFlagsBits.ViewChannel],
                                    deny: [PermissionFlagsBits.Connect]
                                },
                            ],
                        }).then(newChannel => {
                            newState.setChannel(newChannel);
                            newChannel.botCreated = true
                        })
                    } else if (oldState.channelId && oldState.channelId !== channelcreate) {
                        const oldChannel = guild.channels.cache.get(oldState.channelId)
                        if (oldChannel.members.size === 0 && oldChannel.botCreated) {
                            oldChannel.delete()
                        }
                    }
                })
            }
        })
    
    }
}