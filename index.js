const { Client, Collection } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();
const client = new Client({intents: 3276799});
const Logger = require('./utils/Logger');
const { readdirSync } = require('node:fs');
const { join } = require('path');


['commands', 'buttons', 'selects'].forEach(x => client[x] = new Collection());
['CommandUtil', 'EventUtil', 'ButtonUtil', 'SelectUtil', 'DatabaseUtil'].forEach(handler => { require(`./utils/handlers/${handler}`)(client) });
client.categories = readdirSync(join(__dirname, "./commands"));

process.on('exit', code => { Logger.client(`Le processus s'est arrêté avec le code ${code}!`) });

process.on('uncaughtException', (err, origin) => { 
    Logger.error(`UNCAUGHT_EXCEPTION: ${err}`);
    console.log(`Origine: ${origin}`);
});

process.on('unhandledRejection', (reason, promise) => { 
    Logger.warn(`UNHANDLED_REJECTION: ${reason}`);
    console.log(promise);
});

process.on('warning', (...args) => Logger.warn(...args));

client.login(process.env.DISCORD_TOKEN);