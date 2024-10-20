const express = require('express');
const AdminController = require('../controllers/AdminController')
const authenticateToken = require('../middleware/authenticationMiddleware');

const router = express.Router();

router.get('/get-users/all', authenticateToken, AdminController.getAllUsers);
router.get('/role-history/:email', authenticateToken, AdminController.getRoleHistory);
router.put('/user/change-role', authenticateToken, AdminController.changeUserRoleAssignment);
router.get('/get-candidates/all', authenticateToken, AdminController.getAllCandidates);
router.put('/candidate-is-joined/:id', authenticateToken, AdminController.setCandidateisJoined);
router.get('/get-candidate-applications/:id', authenticateToken, AdminController.viewCandidateApplications);
router.get('/get-jobs/all', authenticateToken, AdminController.getAllJobs);
router.get('/get-admin-jobs/all', authenticateToken, AdminController.getAllAdminJobs);
router.put('/archive-job/:id', authenticateToken, AdminController.archiveJob);
router.put('/block-user/:email', authenticateToken, AdminController.blockUser);
router.put('/unblock-user/:email', authenticateToken, AdminController.unblockUser);
router.put('/user/change-password', authenticateToken, AdminController.changePassword);
router.put('/user/change-phone', authenticateToken, AdminController.changePhone);
router.get('/offer-letter-count/:date', authenticateToken, AdminController.offerLetterCount);
router.put('/offer-letter-count/update/:date', authenticateToken, AdminController.updateOrInsertOfferLetterCount);
router.get('/complaints/unread', authenticateToken, AdminController.getUnreadCompliants);
router.get('/complaints/read', authenticateToken, AdminController.getReadCompliants);
router.get('/complaint/:id', authenticateToken, AdminController.getCompliantById);
router.put('/complaint/mark-as-read/:id', authenticateToken, AdminController.markCompliantAsRead);
router.get('/teams', AdminController.getMemberCards);
router.post('/teams', authenticateToken, AdminController.addMemberCard);
router.put('/teams', authenticateToken, AdminController.updateMemberCard);
router.delete('/teams/:id', authenticateToken, AdminController.deleteMemberCard);

module.exports = router;
