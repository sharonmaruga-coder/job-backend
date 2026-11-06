const db = require('../config/db');

const Job = {
  create: async (title, description, employer_id, pay, location) => {
    const [result] = await db.query(
      'INSERT INTO jobs (title, description, employer_id, pay, location, status) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description, employer_id, pay, location, 'open']
    );
    return result.insertId;
  },
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM jobs ORDER BY created_at DESC');
    return rows;
  },
  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM jobs WHERE id = ?', [id]);
    return rows[0];
  },
  delete: async (id) => {
    const [result] = await db.query('DELETE FROM jobs WHERE id = ?', [id]);
    return result.affectedRows;
  }
};
module.exports = Job;