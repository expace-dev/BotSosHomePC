const dotenv = require('dotenv'); dotenv.config();

module.exports = {
    name: "roles-menu",
    async run(client, interaction) {

        await interaction.member.roles.add(interaction.values[0]);
        
        await interaction.reply({ content: `Félicitation je t'ai ajouté le role demandé !!`, ephemeral:true });
    }
}