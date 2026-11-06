const Job = require('../models/job');
const Category = require('../models/categories');

// 1. CREATE JOB
exports.createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 2. VIEW JOBS with search, filter, status
exports.getJobs = async (req, res) => {
  try {
    const { search, category, status } = req.query;
    let filter = {};
    if (search) filter.title = { $regex: search, $options: 'i' };
    if (category) filter.category = category;
    if (status) filter.status = status;
    const jobs = await Job.find(filter).populate('category').sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 3. VIEW ONE
exports.getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('category');
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 4. EDIT
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 5. DELETE / CLOSE
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, { status: 'closed' }, { new: true });
    res.json({ message: 'Job closed', job });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CATEGORIES
exports.createCategory = async (req, res) => {
  try {
    const cat = await Category.create(req.body);
    res.status(201).json(cat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const cats = await Category.find();
    res.json(cats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};