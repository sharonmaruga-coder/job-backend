const db = require('../config/db');

const Assignment = {
  create: async (job_id, student_id) => {
    const [result] = await db.query(
      'INSERT INTO assignments (job_id, student_id, status) VALUES (?, ?, ?)',
      [job_id, student_id, 'assigned']
    );
    return result.insertId;
  },
  getByStudentId: async (student_id) => {
    const [rows] = await db.query('SELECT * FROM assignments WHERE student_id = ?', [student_id]);
    return rows;
  },
  updateStatus: async (id, status) => {
    const [result] = await db.query('UPDATE assignments SET status = ? WHERE id = ?', [status, id]);
    return result.affectedRows;
  }
};
module.exports = Assignment;