const express = require('express');
const addJobController = require('../controllers/JobController');
const authenticateToken = require('../middleware/authenticationMiddleware');

const router = express.Router();

router.post('/add/new', authenticateToken, addJobController.addJobDetials);
router.put('/edit', authenticateToken, addJobController.editJobDetials);
router.get('/assigned-hm/:jobId', authenticateToken, addJobController.getAssignedHMsForJob);
router.get('/details/:jobId', authenticateToken, addJobController.getJobDetails);
router.post('/assign', authenticateToken, addJobController.assignJobToHrByAccountManager);
router.get('/bde/:email', authenticateToken, addJobController.getJobsForBDE);
router.get('/bde/all/:email', authenticateToken, addJobController.getAllJobsForBDE);
router.get('/account-manager/:email', authenticateToken, addJobController.getAccountManagerJobs);
router.get('/account-manager/all/:email', authenticateToken, addJobController.getAllAccountManagerJobs);
router.get('/hr/:email', authenticateToken, addJobController.getHRJobs);
router.get('/hr/all/:email', authenticateToken, addJobController.getAllHRJobs);
router.post('/candidate/add', authenticateToken, addJobController.addCandidateDetailsForJob);
router.get('/candidate/:jobId', authenticateToken, addJobController.getJobCandidates);
router.put('/candidate/interview', authenticateToken, addJobController.updateInterviewDate);
router.put('/candidate/status/update', authenticateToken, addJobController.updateCandidateOfferStatus);
router.get('/candidate/initial/:email', authenticateToken, addJobController.getInitialCandidates);
router.get('/candidate/details/:candidateId', authenticateToken, addJobController.getCandidateDetails);

module.exports = router;
