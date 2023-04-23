const { Client, Collection } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();
const client = new Client({intents: 3276799});
const mongoose = require('mongoose');
const Logger = require('./utils/Logger');
const { readdirSync } = require('node:fs');
const { join } = require('path');


const options = {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
};


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

mongoose.connect(
    process.env.DATABASE_URI, options
).then(() => { Logger.client('- Connecté à la base de donnée') })
.catch(err => {Logger.error(err)});

client.login(process.env.DISCORD_TOKEN);