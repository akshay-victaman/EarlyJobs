const express = require('express');
const AdminController = require('../controllers/AdminController')
const authenticateToken = require('../middleware/authenticationMiddleware');

const router = express.Router();

router.get('/get-users/all', authenticateToken, AdminController.getAllUsers);
router.get('/get-candidates/all', authenticateToken, AdminController.getAllCandidates);
router.get('/get-jobs/all', authenticateToken, AdminController.getAllJobs);
router.put('/archive-job/:id', authenticateToken, AdminController.archiveJob);
router.put('/block-user/:email', authenticateToken, AdminController.blockUser);
router.put('/unblock-user/:email', authenticateToken, AdminController.unblockUser);

module.exports = router;
