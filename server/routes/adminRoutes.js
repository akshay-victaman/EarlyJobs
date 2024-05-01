const express = require('express');
const AdminController = require('../controllers/AdminController')
const authenticateToken = require('../middleware/authenticationMiddleware');

const router = express.Router();

router.get('/get-users/all', authenticateToken, AdminController.getAllUsers);
router.get('/get-candidates/all', authenticateToken, AdminController.getAllCandidates);
router.get('/get-jobs/all', authenticateToken, AdminController.getAllJobs);
router.get('/get-admin-jobs/all', authenticateToken, AdminController.getAllAdminJobs);
router.put('/archive-job/:id', authenticateToken, AdminController.archiveJob);
router.put('/block-user/:email', authenticateToken, AdminController.blockUser);
router.put('/unblock-user/:email', authenticateToken, AdminController.unblockUser);
router.put('/user/change-password', authenticateToken, AdminController.changePassword);
router.get('/offer-letter-count/:date', authenticateToken, AdminController.offerLetterCount);
router.put('/offer-letter-count/update/:date', authenticateToken, AdminController.updateOrInsertOfferLetterCount);
router.get('/complaints/unread', authenticateToken, AdminController.getUnreadCompliants);
router.get('/complaints/read', authenticateToken, AdminController.getReadCompliants);
router.get('/complaint/:id', authenticateToken, AdminController.getCompliantById);
router.put('/complaint/mark-as-read/:id', authenticateToken, AdminController.markCompliantAsRead);

module.exports = router;
