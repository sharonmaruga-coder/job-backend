const Application = require('../models/application');
const Job = require('../models/job');
const Assignment = require('../models/assignment');

// Employee apply for a job
exports.applyForJob = async (req, res) => {
  try {
    const app = await Application.create(req.body);
    res.status(201).json(app);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Employer sees applicants for a job
exports.getApplicationsForJob = async (req, res) => {
  try {
    const apps = await Application.find({ job: req.params.jobId }).populate('job');
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// View all applications
exports.getAllApplications = async (req, res) => {
  const apps = await Application.find().populate('job');
  res.json(apps);
};