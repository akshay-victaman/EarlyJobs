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
router.put('/applications/:applicationId', authenticateToken, checkUserBlockStatus, publiceJobController.rejectPublicApplication);
router.delete('/applications/:applicationId', authenticateToken, checkUserBlockStatus, publiceJobController.deletePublicApplication);
router.get('/rejected-applications', authenticateToken, checkUserBlockStatus, publiceJobController.getRejectedApplications);
router.get('/rejected-applications/excel', authenticateToken, checkUserBlockStatus, publiceJobController.getRejectedApplicationsExcel);
router.get('/approved-applications', authenticateToken, checkUserBlockStatus, publiceJobController.getApprovedApplications);
router.get('/approved-applications/excel', authenticateToken, checkUserBlockStatus, publiceJobController.getApprovedApplicationsExcel);
router.get('/companies-and-locations', publiceJobController.getLocationTitleAndCompanyListWithJobCount);

module.exports = router;