const mysql = require('mysql');
const dotenv = require('dotenv'); dotenv.config();


module.exports = async () => {
    const db = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    });

    return db;
}