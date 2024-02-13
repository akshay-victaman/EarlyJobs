const express = require('express');
const addJobController = require('../controllers/JobController');
const authenticateToken = require('../middleware/authenticationMiddleware');

const router = express.Router();

router.post('/add/new', authenticateToken, addJobController.addJobDetials);
router.get('/details/:jobId', authenticateToken, addJobController.getJobDetails);
router.post('/assign', authenticateToken, addJobController.assignJobToHrByAccountManager);
router.get('/account-manager/:email', authenticateToken, addJobController.getAccountManagerJobs);
router.get('/hr/:email', authenticateToken, addJobController.getHRJobs);
router.post('/candidate/add', authenticateToken, addJobController.addCandidateDetailsForJob);
router.get('/candidate/:jobId', authenticateToken, addJobController.getJobCandidates);
router.put('/candidate/status/update', authenticateToken, addJobController.updateCandidateOfferStatus);
router.get('/candidates/:email', authenticateToken, addJobController.getAllCandidatesForHR);
router.get('/candidate/details/:candidateId', authenticateToken, addJobController.getCandidateDetails);

module.exports = router;
