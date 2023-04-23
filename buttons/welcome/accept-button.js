const dotenv = require('dotenv'); dotenv.config();

module.exports = {
    name: "accept-button",
    async run(client, interaction) {

        await interaction.member.roles.add(process.env.ROLE_MEMBRE);
        
        await interaction.reply({ content: `Vous avez accepté le règlement, vous avez maintenant accès à l'intégralité du serveur !!`, ephemeral:true });
    }
}