const express = require('express');
const jobController = require('../controllers/JobController');
const authenticateToken = require('../middleware/authenticationMiddleware');
const checkUserBlockStatus = require('../middleware/checkUserBlockStatus');

const router = express.Router();

router.post('/add/new', authenticateToken, checkUserBlockStatus, jobController.addJobDetials);
router.put('/edit', authenticateToken, checkUserBlockStatus, jobController.editJobDetials);
router.get('/assigned-shm/:jobId', authenticateToken, checkUserBlockStatus, jobController.getAssignedSHMsForJob);
router.get('/details/:jobId', authenticateToken, checkUserBlockStatus, jobController.getJobDetails);
router.post('/assign', authenticateToken, checkUserBlockStatus, jobController.assignJobToHrByAccountManager);
router.get('/assigned-hm/:jobId', authenticateToken, checkUserBlockStatus, jobController.getAssignedHMsForJob);
router.get('/assigned-hr/:jobId/:email', authenticateToken, checkUserBlockStatus, jobController.getAssignedHRsForJob);
router.put('/assigned-hm/update', authenticateToken, checkUserBlockStatus, jobController.updateJobAssignmentBySHM);
router.put('/assigned-hr/update', authenticateToken, checkUserBlockStatus, jobController.updateJobAssignmentByHM);
router.get('/bde', authenticateToken, checkUserBlockStatus, jobController.getJobsForBDE);
router.get('/bde/all/', authenticateToken, checkUserBlockStatus, jobController.getAllJobsForBDE);
router.get('/senior-hm', authenticateToken, checkUserBlockStatus, jobController.getSeniorHMJobs);
router.get('/senior-hm/all', authenticateToken, checkUserBlockStatus, jobController.getAllSeniorHMJobs);
router.get('/hm', authenticateToken, checkUserBlockStatus, jobController.getHmJobs);
router.get('/hm/all', authenticateToken, checkUserBlockStatus, jobController.getAllHmJobs);
router.get('/hr', authenticateToken, checkUserBlockStatus, jobController.getHRJobs);
router.get('/hr/all', authenticateToken, checkUserBlockStatus, jobController.getAllHRJobs);
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
router.put('/candidate/tenure-status/update', authenticateToken, checkUserBlockStatus, jobController.updateTenureStatus);

module.exports = router;
