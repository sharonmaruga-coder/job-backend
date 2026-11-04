const express = require('express');
const router = express.Router();
const Application = require('../models/application');
const Job = require('../models/job');
const Assignment = require('../models/assignment');

// Apply for job
router.post('/', async(req, res) => {
    try {
        const app = await Application.create(req.body);
        res.status(201).json(app);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all applications
router.get('/', async(req, res) => {
    const apps = await Application.find().populate('job');
    res.json(apps);
});

// Get applications for one job
router.get('/job/:jobId', async(req, res) => {
    const apps = await Application.find({ job: req.params.jobId }).populate('job');
    res.json(apps);
});

// PUT /api/applications/:id/select
router.put('/:id/select', async(req, res) => {
    try {
        const app = await Application.findById(req.params.id).populate('job');
        if (!app) return res.status(404).json({ message: 'Application not found' });

        const job = await Job.findById(app.job._id);

        // BLOCK 1: If job already assigned
        if (job.status === 'assigned') {
            return res.status(400).json({ message: 'Job already assigned - cannot select more' });
        }

        // Count already selected
        const selectedCount = await Application.countDocuments({
            job: job._id,
            status: 'selected'
        });

        // BLOCK 2: If already full
        if (selectedCount >= job.workersNeeded) {
            job.status = 'assigned';
            await job.save();
            return res.status(400).json({ message: `Maximum ${job.workersNeeded} workers already selected` });
        }

        app.status = 'selected';
        await app.save();

        const newCount = selectedCount + 1;

        let assignment = null;
        if (newCount >= job.workersNeeded) {
            job.status = 'assigned';
            await job.save();

            // Create assignment record
            assignment = await Assignment.create({
                job: job._id,
                employees: await Application.find({ job: job._id, status: 'selected' }).distinct('_id')
            });
        }

        res.json({
            message: `Selected ${newCount}/${job.workersNeeded}`,
            application: app,
            job,
            assignment
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Reject
router.put('/:id/reject', async(req, res) => {
    const app = await Application.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
    res.json(app);
});

module.exports = router;