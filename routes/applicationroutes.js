const express = require('express');
const router = express.Router();
const appController = require('../controllers/applicationcontrollers');

router.post('/', appController.createApplication);
router.get('/job/:jobId', appController.getApplicationsByJob);
router.get('/student/:studentId', appController.getApplicationsByStudent);
router.put('/:id/status', appController.updateStatus);
module.exports = router;