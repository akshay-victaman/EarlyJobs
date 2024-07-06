const express = require('express');
const publiceJobController = require('../controllers/PublicJobController');
const authenticateToken = require('../middleware/authenticationMiddleware');
const checkUserBlockStatus = require('../middleware/checkUserBlockStatus');

const router = express.Router();

router.get('/jobs', publiceJobController.getAllJobs);
router.get('/jobs/:jobId', publiceJobController.getJobDetails);
router.post('/jobs', publiceJobController.addPublicApplicationForJob);
router.get('/applications', authenticateToken, checkUserBlockStatus, publiceJobController.getPublicApplications);
router.get('/applications/excel', authenticateToken, checkUserBlockStatus, publiceJobController.getPublicApplicationsForExcel);
router.delete('/applications/:applicationId', authenticateToken, checkUserBlockStatus, publiceJobController.deletePublicApplication);
router.get('/companies-and-locations', publiceJobController.getLocationTitleAndCompanyListWithJobCount);

module.exports = router;