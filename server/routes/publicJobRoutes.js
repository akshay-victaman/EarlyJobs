const express = require('express');
const publiceJobController = require('../controllers/PublicJobController');

const router = express.Router();

router.get('/jobs', publiceJobController.getAllJobs);
router.get('/jobs/:jobId', publiceJobController.getJobDetails);
router.post('/jobs', publiceJobController.addPublicApplicationForJob);

module.exports = router;