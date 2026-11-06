const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'student_gig',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// This is what server.js:7 is looking for
async function connectDB() {
  try {
    const conn = await pool.getConnection();
    console.log('MySQL Connected!');
    conn.release();
  } catch (err) {
    console.error('MySQL connection failed:', err.message);
  }
}

// Make it work BOTH ways:
// 1. const connectDB = require('./config/db'); connectDB() -> works
// 2. const db = require('../config/db'); db.query() -> works
connectDB.query = (...args) => pool.query(...args);
connectDB.execute = (...args) => pool.execute(...args);
connectDB.getConnection = (...args) => pool.getConnection(...args);
connectDB.pool = pool;

module.exports = connectDB;