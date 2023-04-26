const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();
const { createCanvas, loadImage, GlobalFonts } = require('@napi-rs/canvas');
const { request } = require('undici');

module.exports = {
    name: 'guildMemberAdd',
    once: false,
    async execute(client, member) {

        GlobalFonts.loadFontsFromDir('./assets/fonts');

        const canvas = createCanvas(1000, 300);
		const context = canvas.getContext('2d');

        await member.roles.add(process.env.ROLE_VISITEUR);

        const background = await loadImage('./assets/images/background.png');

        context.drawImage(background, 0, 0, canvas.width, canvas.height);

        context.font = '110px Quantify';
		context.fillStyle = '#ffffff';
		context.fillText('Bienvenue', canvas.width / 3.2, canvas.height / 2.4);

        context.font = '45px Quantify';
		context.fillStyle = '#ffffff';
		context.fillText('sur le serveur Discord', canvas.width / 3.2, canvas.height / 1.7);

        context.font = '55px Quantify, Segoe UI Emoji';
		context.fillStyle = '#ffffff';
		context.fillText(`${member.guild.name}`, canvas.width / 3.2, canvas.height / 1.2);

		context.beginPath();

		context.arc(145, 150, 110, 0, Math.PI * 2);

		context.closePath();

		context.clip();

		const { body } = await request(member.user.displayAvatarURL({ extension: 'jpg' }));
		const avatar = await loadImage(await body.arrayBuffer());

		context.drawImage(avatar, 25, 25, 250, 250);

		const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-image.png' });

        // Embed à l'intention du client
		const embedClient = new EmbedBuilder()
			.setTitle(`**Ho ! Un nouveau membre !**`)
			.setDescription(`**Bienvenue ${member.user.username}**
            
                Nous sommes très heureux de vous accueillir sur notre serveur

                Nos technicien sont là pour vous aider 
                n'hésitez pas à demander leurs interventions

                Mais dans un premier temps nous vous demanderons d'accepter notre règlement qui est disponible dans le salon <#${process.env.RULE_CHANNEL}>
            `)
			.setColor(`#${process.env.COLOR_PRIMARY}`)
			.setImage('attachment://profile-image.png');

        const arrivedChannel = client.channels.cache.get(process.env.ARRIVED_CHANNEL);
        arrivedChannel.send({ embeds: [embedClient], files: [attachment] });

        // Embed à l'intention des modérateurs
        const embedModo = new EmbedBuilder()
            .setAuthor({ name: `${member.user.tag} (${member.id})`, iconURL: member.user.displayAvatarURL() })
            .setColor(`#${process.env.COLOR_SUCCESS}`)
            .setDescription(`Nom d'utilisateur: ${member}
            Créé le: <t:${parseInt(member.user.createdTimestamp / 1000)}:f> (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)
            Rejoint le: <t:${parseInt(member.joinedTimestamp / 1000)}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)
            `)
            .setTimestamp()
            .setFooter({ text: 'L\'utilisateur a rejoint' })

        const modoArrivedChannel = client.channels.cache.get(process.env.MODO_ARRIVED_CHANNEL);
        modoArrivedChannel.send({ embeds: [embedModo] });
    }
}