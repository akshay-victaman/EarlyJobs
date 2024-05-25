const express = require('express');
const userController = require('../controllers/UserController');
const authenticateToken = require('../middleware/authenticationMiddleware');
const checkUserBlockStatus = require('../middleware/checkUserBlockStatus');

const router = express.Router();

router.get('/users', userController.getAllUsers);
router.get('/users/v1/:email/:phone', userController.getUserByEmailPhone);
router.get('/users/:username', authenticateToken, checkUserBlockStatus, userController.getUserByEmail);
router.get('/users/all/account-managers', authenticateToken, checkUserBlockStatus, userController.getAllAccountManagers);
router.get('/users/all/hr/:email', authenticateToken, checkUserBlockStatus, userController.getAllHRs);
router.post('/users/hr-resumes/:hrEmail', authenticateToken, checkUserBlockStatus, userController.hrResumes);
router.post('/users/register', userController.createUser);
router.put('/users/update', userController.updateUser);
router.get('/users/hr-offer-letter/:email', authenticateToken, checkUserBlockStatus, userController.getHrResumes);
router.put('/users/update-password', userController.updatePassword);
router.put('/users/update-doc-id', userController.updateDocId);
router.post('/users/login', userController.loginUser);
router.get('/users/hr-for-hm/:email', authenticateToken, checkUserBlockStatus, userController.getAllHRsForHiringManager);
router.get('/users/hr-assigned-hm/:email', authenticateToken, checkUserBlockStatus, userController.getHrAssignedHm);
router.post('/users/complaints', authenticateToken, userController.createComplaint);
router.put('/users/gender', authenticateToken, userController.updateGender);
router.put('/users/change-hiring-for', authenticateToken, checkUserBlockStatus, userController.changeUserRole);
router.put('/users/mingrate-hr-assigned-hm', authenticateToken, checkUserBlockStatus, userController.mingrateHrAssignedHm);

module.exports = router;
