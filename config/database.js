const {createPool} = require('mysql2');

const pool = createPool({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password:process.env.DB_PASS,
    database: process.env.MYSQL_DB,
    connectionLimit: 9

});
 module.exports = pool;