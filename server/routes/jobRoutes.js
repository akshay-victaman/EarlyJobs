const express = require('express');
const addJobController = require('../controllers/JobController');
const authenticateToken = require('../middleware/authenticationMiddleware');
const checkUserBlockStatus = require('../middleware/checkUserBlockStatus');

const router = express.Router();

router.post('/add/new', authenticateToken, checkUserBlockStatus, addJobController.addJobDetials);
router.put('/edit', authenticateToken, checkUserBlockStatus, addJobController.editJobDetials);
router.get('/assigned-hm/:jobId', authenticateToken, checkUserBlockStatus, addJobController.getAssignedHMsForJob);
router.get('/details/:jobId', authenticateToken, checkUserBlockStatus, addJobController.getJobDetails);
router.post('/assign', authenticateToken, checkUserBlockStatus, addJobController.assignJobToHrByAccountManager);
router.get('/assigned-hr/:jobId/:email', authenticateToken, checkUserBlockStatus, addJobController.getAssignedHRsForJob);
router.put('/assigned-hr/update', authenticateToken, checkUserBlockStatus, addJobController.updateJobAssignmentByHM);
router.get('/bde/:email', authenticateToken, checkUserBlockStatus, addJobController.getJobsForBDE);
router.get('/bde/all/:email', authenticateToken, checkUserBlockStatus, addJobController.getAllJobsForBDE);
router.get('/account-manager/:email', authenticateToken, checkUserBlockStatus, addJobController.getAccountManagerJobs);
router.get('/account-manager/all/:email', authenticateToken, checkUserBlockStatus, addJobController.getAllAccountManagerJobs);
router.get('/hr/:email', authenticateToken, checkUserBlockStatus, addJobController.getHRJobs);
router.get('/hr/all/:email', authenticateToken, checkUserBlockStatus, addJobController.getAllHRJobs);
router.post('/candidate/add', authenticateToken, checkUserBlockStatus, addJobController.addCandidateDetailsForJob);
router.get('/candidate/:jobId', authenticateToken, checkUserBlockStatus, addJobController.getJobCandidates);
router.put('/candidate/interview', authenticateToken, checkUserBlockStatus, addJobController.updateInterviewDate);
router.put('/candidate/status/update', authenticateToken, checkUserBlockStatus, addJobController.updateCandidateOfferStatus);
router.get('/candidate/initial/:email', authenticateToken, checkUserBlockStatus, addJobController.getInitialCandidates);
router.get('/candidate/details/:candidateId', authenticateToken, checkUserBlockStatus, addJobController.getCandidateDetails);

module.exports = router;
