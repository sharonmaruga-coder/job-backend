const Job = require('../models/job');

exports.createJob = async (req, res) => {
  try {
    const { title, description, employer_id, pay, location } = req.body;
    const id = await Job.create(title, description, employer_id, pay, location);
    res.status(201).json({ message: 'Job created', id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.getAll();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.getById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.deleteJob = async (req, res) => {
  try {
    await Job.delete(req.params.id);
    res.json({ message: 'Job deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};