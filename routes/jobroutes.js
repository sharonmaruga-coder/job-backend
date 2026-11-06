const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobcontrollers');

router.post('/', jobController.createJob);
router.get('/', jobController.getAllJobs);
router.get('/:id', jobController.getJobById);
router.delete('/:id', jobController.deleteJob);
module.exports = router;