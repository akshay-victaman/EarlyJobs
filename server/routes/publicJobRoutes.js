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
router.get('/applications/bde', authenticateToken, checkUserBlockStatus, publiceJobController.getPublicApplicationsForBDE);
router.get('/applications/bde/excel', authenticateToken, checkUserBlockStatus, publiceJobController.getPublicApplicationsForBDEExcel);
router.put('/applications/:applicationId', authenticateToken, checkUserBlockStatus, publiceJobController.rejectPublicApplication);
router.delete('/applications/:applicationId', authenticateToken, checkUserBlockStatus, publiceJobController.deletePublicApplication);
router.get('/rejected-applications', authenticateToken, checkUserBlockStatus, publiceJobController.getRejectedApplications);
router.get('/rejected-applications/excel', authenticateToken, checkUserBlockStatus, publiceJobController.getRejectedApplicationsExcel);
router.get('/approved-applications', authenticateToken, checkUserBlockStatus, publiceJobController.getApprovedApplications);
router.get('/approved-applications/excel', authenticateToken, checkUserBlockStatus, publiceJobController.getApprovedApplicationsExcel);
router.get('/companies-and-locations', publiceJobController.getLocationTitleAndCompanyListWithJobCount);
router.post('/create-sub-jobs', authenticateToken, checkUserBlockStatus, publiceJobController.createSubJobByHiringNeed);
router.put('/edit-sub-jobs', authenticateToken, checkUserBlockStatus, publiceJobController.EditSubJobByHiringNeed);
router.get('/sub-jobs', authenticateToken, checkUserBlockStatus, publiceJobController.getSubJobsForHR);
router.get('/sub-jobs-details/:jobId', publiceJobController.getSubJobDetails);
router.get('/sub-jobs-applications', authenticateToken, checkUserBlockStatus, publiceJobController.getSubJobPublicApplications);
router.get('/sub-jobs-applications/excel', authenticateToken, checkUserBlockStatus, publiceJobController.getSubJobPublicApplicationsForExcel);

module.exports = router;