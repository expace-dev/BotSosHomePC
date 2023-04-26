const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();
const { createCanvas, loadImage, GlobalFonts } = require('@napi-rs/canvas');
const { request } = require('undici');

module.exports = {
    name: 'guildMemberRemove',
    once: false,
    async execute(client, member) {

		GlobalFonts.loadFontsFromDir('./assets/fonts');

        const start = Date.now();
		const rejoignedAt = member.joinedTimestamp;
		const ecoule = (start - rejoignedAt);

		const seconds = Math.floor(ecoule / (1000));
		const minuts = Math.floor(ecoule / (1000*60));
		const hours = Math.floor(ecoule / (1000*60*60));
		const days = Math.floor(ecoule / (1000*60*60*24));
		const months = Math.floor(ecoule / (1000*60*60*24*30));
		const years = Math.floor(days / 365);
		let duree;

		if (years > 0) {
			duree = `${years} ans`;
		}
		else if (months > 0) {
			duree = `${months} mois`;
		}
		else if (days > 0) {
			duree = `${days} jours`;
		}
		else if (hours > 0) {
			duree = `${hours} heures`;
		}
		else if (minuts > 0) {
			duree = `${minuts} minutes`;
		}
		else {
			duree = `${seconds} secondes`;
		}

        const canvas = createCanvas(1000, 300);
		const context = canvas.getContext('2d');

        const background = await loadImage('./assets/images/background.png');

        context.drawImage(background, 0, 0, canvas.width, canvas.height);

        context.font = '110px Quantify';
		context.fillStyle = '#ffffff';
		context.fillText('À bientôt', canvas.width / 3.2, canvas.height / 2.4);

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

        const audit = await member.guild.fetchAuditLogs();
       const logs = audit.entries.first();

       /*
        member.guild.fetchAuditLogs()
            .then(audit => {
                console.log(audit.entries.first());
            })
            .catch(console.error);
        */
        // Embed à l'intention du client
		const embedClient = new EmbedBuilder()
			.setTitle(`**Un membre vient de partir 😢**`)
			.setDescription(`**À bientôt ${member.user.username} 👋**`)
			.setColor(`#${process.env.COLOR_PRIMARY}`)
			.setImage('attachment://profile-image.png')
            .setFooter({ text: `Avait rejoint le serveur il y a ${duree}` });

        const arrivedChannel = client.channels.cache.get(process.env.QUIT_CHANNEL);
        arrivedChannel.send({ embeds: [embedClient], files: [attachment] });

        const embedModo = new EmbedBuilder()
            .setAuthor({ name: `${member.user.tag} (${member.id})`, iconURL: member.user.displayAvatarURL() })
            .setColor('#dc143c')
            .setDescription(`Nom d'utilisateur: ${member.displayName}
            Créé le: <t:${parseInt(member.user.createdTimestamp / 1000)}:f> (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)
            Rejoint le: <t:${parseInt(member.joinedTimestamp / 1000)}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)
            Quitté le: <t:${parseInt(Date.now() / 1000)}:f> (<t:${parseInt(Date.now() / 1000)}:R>)
            `)
            .setTimestamp()
            .setFooter({ text: 'L\'utilisateur a quitté' })
        
        const logChannel = client.channels.cache.get(process.env.MODO_QUIT_CHANNEL);
        logChannel.send({ embeds: [embedModo], ephemeral: true });























        /*
       const audit = await member.guild.fetchAuditLogs();
       const logs = audit.entries.first();

        member.guild.fetchAuditLogs()
            .then(audit => {
                console.log(audit.entries.first());
            })
            .catch(console.error);



*/
    }
}