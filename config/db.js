const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // put your MySQL password here
  database: 'gig_platform',
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = db;