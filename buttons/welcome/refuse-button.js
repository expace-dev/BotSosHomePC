const dotenv = require('dotenv'); dotenv.config();
const Logger = require('../../utils/Logger');

module.exports = {
    name: "refuse-button",
    async run(client, interaction) {


        await interaction.member.kick(`Il n'as pas accepté le règlement !!`);

        const logChannel = client.channels.cache.get(process.env.MODO_LOGS_CHANNEL);

        try {
            await interaction.member.send({ content: `Vous avez été expulsé du serveur ${interaction.guild.name} pour la raison suivante: **Refus du règlement**`});
        } catch (err) {
            Logger.warn(`Message bloqué: ${interaction.user.username} Refuse le règlement`);
        }

        logChannel.send({ content: ` L'utilisateur **${interaction.user.username}** n'as pas accepté le règlement, je l'ai expulsé !!` });
        
    }
}