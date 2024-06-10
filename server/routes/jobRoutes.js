const express = require('express');
const jobController = require('../controllers/JobController');
const authenticateToken = require('../middleware/authenticationMiddleware');
const checkUserBlockStatus = require('../middleware/checkUserBlockStatus');

const router = express.Router();

router.post('/add/new', authenticateToken, checkUserBlockStatus, jobController.addJobDetials);
router.put('/edit', authenticateToken, checkUserBlockStatus, jobController.editJobDetials);
router.get('/assigned-hm/:jobId', authenticateToken, checkUserBlockStatus, jobController.getAssignedHMsForJob);
router.get('/details/:jobId', authenticateToken, checkUserBlockStatus, jobController.getJobDetails);
router.post('/assign', authenticateToken, checkUserBlockStatus, jobController.assignJobToHrByAccountManager);
router.get('/assigned-hr/:jobId/:email', authenticateToken, checkUserBlockStatus, jobController.getAssignedHRsForJob);
router.put('/assigned-hr/update', authenticateToken, checkUserBlockStatus, jobController.updateJobAssignmentByHM);
router.get('/bde/:email', authenticateToken, checkUserBlockStatus, jobController.getJobsForBDE);
router.get('/bde/all/:email', authenticateToken, checkUserBlockStatus, jobController.getAllJobsForBDE);
router.get('/account-manager/:email', authenticateToken, checkUserBlockStatus, jobController.getAccountManagerJobs);
router.get('/account-manager/all/:email', authenticateToken, checkUserBlockStatus, jobController.getAllAccountManagerJobs);
router.get('/hr/:email', authenticateToken, checkUserBlockStatus, jobController.getHRJobs);
router.get('/hr/all/:email', authenticateToken, checkUserBlockStatus, jobController.getAllHRJobs);
router.post('/candidate/add', authenticateToken, checkUserBlockStatus, jobController.addCandidateDetailsForJob);
router.get('/candidate/:jobId', authenticateToken, checkUserBlockStatus, jobController.getJobCandidates);
router.get('/candidates/excel/:jobId', authenticateToken, checkUserBlockStatus, jobController.getJobCandidatesForExcel);
router.put('/candidate/interview', authenticateToken, checkUserBlockStatus, jobController.updateInterviewDate);
router.put('/candidate/status/update', authenticateToken, checkUserBlockStatus, jobController.updateCandidateOfferStatus);
router.get('/candidate/initial/:email', authenticateToken, checkUserBlockStatus, jobController.getInitialCandidates);
router.get('/candidates/initial/excel/:email', authenticateToken, checkUserBlockStatus, jobController.getInitialCandidatesForExcel);
router.get('/candidate/details/:candidateId', authenticateToken, checkUserBlockStatus, jobController.getCandidateDetails);
router.get('/candidate', authenticateToken, checkUserBlockStatus, jobController.getOfferStatusCandidates);
router.get('/candidates/excel', authenticateToken, checkUserBlockStatus, jobController.getOfferStatusCandidatesForExcel);

module.exports = router;
