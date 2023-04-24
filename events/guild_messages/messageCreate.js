const dotenv = require('dotenv'); dotenv.config();
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'messageCreate',
    once: false,
    execute(client, message) {
        if (message.author.bot) return;

        if (message.channel.parentId === '697716115287179327') {

            const mots = ['aide', 'aides', 'expliquer', 'explication', 'explications'];

            if (
                message.member.roles.cache.has(process.env.ROLE_ADMIN) || 
                message.member.roles.cache.has(process.env.ROLE_TECH) ||
                message.member.roles.cache.has(process.env.ROLE_MODO)
                ) return;

            if (
                message.content.includes('aide') ||
                message.content.includes('expliquer') ||
                message.content.includes('explication') ||
                message.content.includes('help')
                ) {
                const embed = new EmbedBuilder()
                .setDescription(`
                Attention, le salon <#${message.channelId}> n'est PAS destiné à poser des questions d'aide, merci de choisir le bon salon !!
                `)
                .setColor(`#${process.env.COLOR_PRIMARY}`)
                .setThumbnail("https://www.sos-home-pc.eu/images/discord/interdit.png");

                message.channel.send({ embeds: [embed] });
            }
        }
    }
}