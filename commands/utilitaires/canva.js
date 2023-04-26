import { EmbedBuilder, PermissionsBitField, AttachmentBuilder, time  } from "discord.js";
const { createCanvas, loadImage, GlobalFonts } = require('@napi-rs/canvas');
const { request } = require('undici');

module.exports = {
    name: "canva",
    category: "utilitaires",
    permissions: PermissionsBitField.Default,
    description: "Tester la création d'image",
    async run(client, interaction) {

		GlobalFonts.loadFontsFromDir('./assets/fonts')


		
		const start = Date.now();
		const rejoignedAt = interaction.member.joinedTimestamp;
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


		//console.log(Canvas.GlobalFonts.families);

		// Create a 700x250 pixel canvas and get its context
		// The context will be used to modify the canvas
		const canvas = createCanvas(1000, 300);
		const context = canvas.getContext('2d');

		const background = await loadImage('./assets/images/background.png');

		// This uses the canvas dimensions to stretch the image onto the entire canvas
		context.drawImage(background, 0, 0, canvas.width, canvas.height);

		// Slightly smaller text placed above the member's display name
		context.font = '110px Quantify';
		context.fillStyle = '#ffffff';
		context.fillText('Bienvenue', canvas.width / 3.2, canvas.height / 2.4);

		context.font = '50px Arial';
		context.fillStyle = '#ffffff';
		context.fillText('sur le serveur Discord', canvas.width / 3.2, canvas.height / 1.6);

		context.font = '50px ';
		context.font = '50px Quantify, Segoe UI Emoji';
		context.fillStyle = '#ffffff';
		context.fillText(`${interaction.guild.name}`, canvas.width / 3.2, canvas.height / 1.2);

		// Pick up the pen
		context.beginPath();

		// Start the arc to form a circle
		context.arc(145, 150, 110, 0, Math.PI * 2);

		// Put the pen down
		context.closePath();

		// Clip off the region you drew on
		context.clip();

		// Using undici to make HTTP requests for better performance
		const { body } = await request(interaction.user.displayAvatarURL({ extension: 'jpg' }));
		const avatar = await loadImage(await body.arrayBuffer());

		// If you don't care about the performance of HTTP requests, you can instead load the avatar using
		// const avatar = await Canvas.loadImage(interaction.user.displayAvatarURL({ extension: 'jpg' }));

		// Move the image downwards vertically and constrain its height to 200, so that it's square
		context.drawImage(avatar, 25, 25, 250, 250);

		// Use the helpful Attachment class structure to process the file for you
		const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-image.png' });


		const embed = new EmbedBuilder()
			.setTitle(`**Ho ! Un nouveau membre !**`)
			.setDescription(`**Bienvenue ${interaction.user.username} sur TDVA**`)
			.setColor("#e71a33")
			.setImage('attachment://profile-image.png')
			.setFooter({ text: `Nous as rejoint il y à ${duree}` });

		interaction.reply({ embeds: [embed], files: [attachment] });
    }
}