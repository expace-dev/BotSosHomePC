const { ActionRowBuilder, EmbedBuilder, ButtonBuilder, PermissionsBitField, ButtonStyle  } = require('discord.js');



module.exports = {
    name: "reglement",
    usage: "/reglement",
    examples: ["/reglement"],
    category: "administration",
    permissions: PermissionsBitField.Flags.Administrator,
    description: "Permet de mettre en place le règlement",
    async run(client, interaction) {

        const buttons = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('accept-button')
                .setLabel('Accepter le règlement')
                .setStyle(ButtonStyle.Success),
    
            new ButtonBuilder()
                .setCustomId('refuse-button')
                .setLabel('Refuser le règlement')
                .setStyle(ButtonStyle.Danger),
        );
    
        const welcomeEmbed = new EmbedBuilder()
            .setTitle(`Acceptez le règlement de ${interaction.guild.name}`)
            .setDescription(`
            **Accepter ce règlement vous permettras d'accéder à l'intégraité du serveur !!**

            🔞  NSFW
             NSFW, NSFL et le contenu malsain n'est pas autorise sur le serveur. 
            Il sera punissable d'un bannissement!

            ⚠️  Publicité
            Toute publicité non autorisé par un membre du staff est strictement interdite sur le serveur. Mais également dans les messages privés.
            Il sera punissable d'une exclusion et d'un bannissement temporaire!

            🚨  Mentions
            Evitez les mentions inutiles et réfléchissez avant de poser une question. 
            Vous n'êtes pas seuls et les réponses ont souvent déjà été données.
            Il seras punissable d'une exclusion ou d'un bannissement  en cas d'abus!

            🇫🇷 Français
            La structure est francophone, veuillez donc à écrire en français uniquement 
            pour une compréhension facile de tous les membres de la communauté

            👥  Vie privée
            Evitez d'être trop intrusif et respectez la vie privée des membres présents. 
            Ne réclamez pas la présence d'un membre de l'équipe si celle ci n'est pas possible.

            Règlement mis a jour le 04/04/2023

            Pour accepter le règlement, veuillez interagir avec les boutons ci-dessous !
            `);

            await interaction.reply({ embeds: [welcomeEmbed], components: [buttons] });
    }
}