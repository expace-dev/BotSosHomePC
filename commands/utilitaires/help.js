const { ActionRowBuilder, PermissionsBitField, StringSelectMenuBuilder, EmbedBuilder, ApplicationCommandOptionType  } = require('discord.js');
const {readdirSync} = require('node:fs');
const dotenv = require('dotenv'); dotenv.config();

const row = new ActionRowBuilder().addComponents(
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

module.exports = {
    name: "help",
    usage: "/help <command (optionnel)>",
    examples: ["/help", "/help <command>"],
    category: "utilitaires",
    permissions: PermissionsBitField.Flags.SendMessages,
    description: "Liste les commandes du bot",
    options: [
        {
            name: "command",
            description: "Tapez le nom de la commande",
            type: ApplicationCommandOptionType.String,
            required: false
        }
    ],
    async run(client, interaction) {

        const cmdName = interaction.options.getString("command");

        if (!cmdName) {
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

            interaction.reply({ embeds: [embed], components: [row], ephemeral:true });
        
        }
        else {
            const cmd = client.commands.get(cmdName);

            if (!cmd) return interaction.reply({ content: 'Cette commande n\'existe pas!', ephemeral: true});

            const argsEmbed = new EmbedBuilder()
                .setColor(process.env.COLOR_PRIMARY)
                .setTitle(`Aide de la commande \`${cmd.name}\``)
                .setDescription(`${cmd.description}
                
                Utilisation: **\`${cmd.usage}\`**
                Exemples: **\`${cmd.examples}\`**

                Ne pas inclure ces caractères -> <> dans vos commandes.
                `)

            return interaction.reply({ embeds: [argsEmbed], ephemeral: true });
        }
        
        

    }
}