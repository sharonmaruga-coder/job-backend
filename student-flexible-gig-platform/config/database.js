const mysql = require("mysql2");

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const promisePool = pool.promise();

promisePool.getConnection()
    .then(connection => {
        console.log("MySQL database connected successfully!");
        connection.release();
    })
    .catch(error => {
        console.error("Database connection failed:", error.message);
    });

module.exports = promisePool;