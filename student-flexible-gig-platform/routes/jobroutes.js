const express = require('express');
const router = express.Router();
const controller = require('../controllers/jobcontrollers');

router.post('/', controller.createJob);
router.get('/', controller.getJobs);
router.get('/:id', controller.getJob);
router.put('/:id', controller.updateJob);
router.delete('/:id', controller.deleteJob);
router.post('/category/create', controller.createCategory);
router.get('/category/all', controller.getCategories);

module.exports = router;