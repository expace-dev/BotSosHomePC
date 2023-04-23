const { ActionRowBuilder, PermissionsBitField, StringSelectMenuBuilder, EmbedBuilder  } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();

const utilitaire = new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
        .setCustomId('help-menu')
        .setMinValues(1)
        .setMaxValues(1)
        .addOptions([
            {
                label: "Acceuil",
                description: "Le menu d'acceuil.",
                value: "home",
                emoji: "🏠"
            },
            {
                label: "Utilitaire",
                description: "Les commandes utilitaires disponible.",
                value: "utils",
                default: true,
                emoji: "🛠️"
            },
            {
                label: "Modération",
                description: "Les commandes de modération disponible.",
                value: "modo",
                emoji: "👮‍♂️"
            },
            {
                label: "Administration",
                description: "Les commandes administrateur",
                value: "admin",
                emoji: "⚙️"
            },
        ])
);

const moderateur = new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
        .setCustomId('help-menu')
        .setMinValues(1)
        .setMaxValues(1)
        .addOptions([
            {
                label: "Acceuil",
                description: "Le menu d'acceuil.",
                value: "home",
                emoji: "🏠"
            },
            {
                label: "Utilitaire",
                description: "Les commandes utilitaires disponible.",
                value: "utils",
                emoji: "🛠️"
            },
            {
                label: "Modération",
                description: "Les commandes de modération disponible.",
                value: "modo",
                default: true,
                emoji: "👮‍♂️"
            },
            {
                label: "Administration",
                description: "Les commandes administrateur",
                value: "admin",
                emoji: "⚙️"
            },
        ])
);

const accueil = new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
        .setCustomId('help-menu')
        .setMinValues(1)
        .setMaxValues(1)
        .addOptions([
            {
                label: "Acceuil",
                description: "Le menu d'acceuil.",
                value: "home",
                default: true,
                emoji: "🏠"
            },
            {
                label: "Utilitaire",
                description: "Les commandes utilitaires disponible.",
                value: "utils",
                emoji: "🛠️"
            },
            {
                label: "Modération",
                description: "Les commandes de modération disponible.",
                value: "modo",
                emoji: "👮‍♂️"
            },
            {
                label: "Administration",
                description: "Les commandes administrateur",
                value: "admin",
                emoji: "⚙️"
            },
        ])
);

const administration = new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
        .setCustomId('help-menu')
        .setMinValues(1)
        .setMaxValues(1)
        .addOptions([
            {
                label: "Acceuil",
                description: "Le menu d'acceuil.",
                value: "home",
                emoji: "🏠"
            },
            {
                label: "Utilitaire",
                description: "Les commandes utilitaires disponible.",
                value: "utils",
                emoji: "🛠️"
            },
            {
                label: "Modération",
                description: "Les commandes de modération disponible.",
                value: "modo",
                emoji: "👮‍♂️"
            },
            {
                label: "Administration",
                description: "Les commandes administrateur",
                value: "admin",
                default: true,
                emoji: "⚙️"
            },
        ])
);

module.exports = {
    name: "help-menu",
    async run(client, interaction) {

        if (interaction.values[0] === 'utils') {

            const commandHelp = client.commands.filter(v => v.category === 'utilitaires').map((v) => `/**${v.name}** ${v.description}`).join("\n")
            console.log(commandHelp);

            const embed = new EmbedBuilder()
            .setTitle("Utilitaires - Commandes utiles")
            .setDescription(commandHelp)
            .setColor(process.env.COLOR_PRIMARY)


            interaction.update({ embeds: [embed], components: [utilitaire] });

        }
       else if (interaction.values[0] === 'modo') {
            const commandHelp = client.commands.filter(v => v.category === 'moderation').map((v) => `/**${v.name}** ${v.description}`).join("\n")
            console.log(commandHelp);

            const embed = new EmbedBuilder()
            .setTitle("Modération - Commandes de modération")
            .setDescription(commandHelp)
            .setColor(process.env.COLOR_PRIMARY)


            interaction.update({ embeds: [embed], components: [moderateur] });
        }
        else if (interaction.values[0] === 'home') {
            const embed = new EmbedBuilder()
            .setTitle("Commandes disponibles")
            .setDescription(`Si vous souhaitez voir mes différentes commandes, je vous pris d'utiliser le menu déroulant ci-dessous. Les commandes sont rangées par catégories.

            - Utilisez \`aide <commande>\` pour voir les détails d'une commande.

            **Quelques liens utiles :**
            [Notre site web](https://www.google.fr)
            [Page Facebook](https://www.google.fr)
            [Page Tweeter](https://www.google.fr)
            [Page Linkedin](https://www.google.fr)
            `)
            .setColor(process.env.COLOR_PRIMARY)


        interaction.update({ embeds: [embed], components: [accueil] });
        }
        else if (interaction.values[0] === 'admin') {

            const commandHelp = client.commands.filter(v => v.category === 'administration').map((v) => `/**${v.name}** ${v.description}`).join("\n")
            console.log(commandHelp);

            const embed = new EmbedBuilder()
            .setTitle("Administration - Commandes d'administration")
            .setDescription(commandHelp)
            .setColor(process.env.COLOR_PRIMARY)


            interaction.update({ embeds: [embed], components: [administration] });

        }
        
        
    }
}