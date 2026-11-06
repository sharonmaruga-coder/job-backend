const Application = require('../models/application');

exports.createApplication = async (req, res) => {
  try {
    const { job_id, student_id, cover_letter } = req.body;
    const id = await Application.create(job_id, student_id, cover_letter);
    res.status(201).json({ message: 'Application submitted', id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getApplicationsByJob = async (req, res) => {
  try {
    const apps = await Application.getByJobId(req.params.jobId);
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getApplicationsByStudent = async (req, res) => {
  try {
    const apps = await Application.getByStudentId(req.params.studentId);
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.updateStatus = async (req, res) => {
  try {
    await Application.updateStatus(req.params.id, req.body.status);
    res.json({ message: 'Status updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};