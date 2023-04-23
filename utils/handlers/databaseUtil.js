const mysql = require('mysql');
const dotenv = require('dotenv'); dotenv.config();

module.exports = async () => {
    const db = await mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    });

    return db;
}