const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.MYSQL_LOCAL_HOST,
    user: process.env.MYSQL_USERNAME,
    port: process.env.MYSQL_PORT,
    password: process.env.MYSQL_LOCAL_PASSWORD,
    database: process.env.MYSQL_DATABASE
})

/*
    배포시
    MYSQL_LOCAL_HOST => MYSQL_HOST
    MYSQL_LOCAL_PASSWORD => MYSQL_PASSWORD
*/

module.exports = { pool: pool };