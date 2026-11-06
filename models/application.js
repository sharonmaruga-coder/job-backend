const db = require('../config/db');

const Application = {
  create: async (job_id, student_id, cover_letter) => {
    const [result] = await db.query(
      'INSERT INTO applications (job_id, student_id, cover_letter, status) VALUES (?, ?, ?, ?)',
      [job_id, student_id, cover_letter, 'pending']
    );
    return result.insertId;
  },
  getByJobId: async (job_id) => {
    const [rows] = await db.query('SELECT * FROM applications WHERE job_id = ?', [job_id]);
    return rows;
  },
  getByStudentId: async (student_id) => {
    const [rows] = await db.query('SELECT * FROM applications WHERE student_id = ?', [student_id]);
    return rows;
  },
  updateStatus: async (id, status) => {
    const [result] = await db.query('UPDATE applications SET status = ? WHERE id = ?', [status, id]);
    return result.affectedRows;
  }
};
module.exports = Application;