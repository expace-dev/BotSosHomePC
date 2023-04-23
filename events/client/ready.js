const Logger = require('../../utils/Logger');
const dotenv = require('dotenv'); dotenv.config();
const databaseUtil = require('../../utils/handlers/databaseUtil');


module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        
        Logger.client('Le bot est bien connecté');

        const devGuild = await client.guilds.cache.get(process.env.GUILD_ID);
        devGuild.commands.set(client.commands.map(cmd => cmd));

        
        

        function updateStats() {

            const nbreMembre = devGuild.members.cache.filter(member => member.roles.cache.has(process.env.ROLE_MEMBRE)).size;
            const nbreVisiteur = devGuild.members.cache.filter(member => member.roles.cache.has(process.env.ROLE_VISITEUR)).size;
            const nbreModo = devGuild.members.cache.filter(member => member.roles.cache.has(process.env.ROLE_MODO)).size;
            const nbreTech = devGuild.members.cache.filter(member => member.roles.cache.has(process.env.ROLE_TECH)).size;
            const nbreAbo = devGuild.members.cache.filter(member => member.roles.cache.has(process.env.ROLE_ABO)).size;

            devGuild.channels.edit(process.env.STATS_USER, { name: `Utilisateurs: ${nbreVisiteur}` }).then().catch(console.error);
            devGuild.channels.edit(process.env.STATS_MODO, { name: `Modérateurs: ${nbreModo}` }).then().catch(console.error);
            devGuild.channels.edit(process.env.STATS_TECH, { name: `Techniciens: ${nbreTech}` }).then().catch(console.error);
            devGuild.channels.edit(process.env.STATS_ABO, { name: `Abonnées: ${nbreAbo}` }).then().catch(console.error);
            devGuild.channels.edit(process.env.STATS_MEMBER, { name: `Membres: ${nbreMembre}` }).then().catch(console.error);
            
            setTimeout(updateStats,900000); /* rappel après 10 secondes = 10000 millisecondes */
        }
             
        updateStats();

        client.db = await databaseUtil();

        client.db.connect(function () {
            Logger.client("Connecté à la base Mysql");
        })
    
    }
}