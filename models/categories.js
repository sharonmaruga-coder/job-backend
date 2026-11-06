const db = require('../config/db');

const Category = {
  create: async (name) => {
    const [result] = await db.query('INSERT INTO categories (name) VALUES (?)', [name]);
    return result.insertId;
  },
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM categories');
    return rows;
  }
};
module.exports = Category;