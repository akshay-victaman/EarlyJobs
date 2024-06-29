const express = require('express');
const userController = require('../controllers/UserController');
const authenticateToken = require('../middleware/authenticationMiddleware');
const checkUserBlockStatus = require('../middleware/checkUserBlockStatus');

const router = express.Router();

router.get('/users', userController.getAllUsers);
router.get('/users/v1/:email/:phone', userController.getUserByEmailPhone);
router.get('/users/:username', authenticateToken, checkUserBlockStatus, userController.getUserByEmail);
router.get('/users/all/senior-hms', authenticateToken, checkUserBlockStatus, userController.getAllSeniorHMs);
router.get('/users/all/hms', authenticateToken, checkUserBlockStatus, userController.getAllHMs);
router.get('/users/all/hiring-managers', authenticateToken, checkUserBlockStatus, userController.getAllHMsForSHM);
router.get('/users/all/hr/:email', authenticateToken, checkUserBlockStatus, userController.getAllHRs);
router.post('/users/hr-resumes/:hrEmail', authenticateToken, checkUserBlockStatus, userController.hrResumes);
router.post('/users/register', userController.createUser);
router.put('/users/update', userController.updateUser);
router.get('/users/hr-offer-letter/:email', authenticateToken, checkUserBlockStatus, userController.getHrResumes);
router.put('/users/update-password', userController.updatePassword);
router.put('/users/update-doc-id', userController.updateDocId);
router.post('/users/login', userController.loginUser);
router.get('/users/v2/hrs-for-hm', authenticateToken, checkUserBlockStatus, userController.getAllHRsForHiringManager);
router.get('/users/v2/hrs-for-hm/excel', authenticateToken, checkUserBlockStatus, userController.getAllHRsForHiringManagerForExcel);
router.get('/users/v2/hm-for-shm', authenticateToken, checkUserBlockStatus, userController.getAllHMsForSeniorHM);
router.get('/users/v2/hm-for-shm/excel', authenticateToken, checkUserBlockStatus, userController.getAllHMsForSeniorHMForExcel);
router.get('/users/hr-assigned-hm/:email', authenticateToken, checkUserBlockStatus, userController.getHrAssignedHm);
router.post('/users/complaints', authenticateToken, userController.createComplaint);
router.put('/users/gender', authenticateToken, userController.updateGender);
router.put('/users/change-hiring-for', authenticateToken, checkUserBlockStatus, userController.changeUserRole);
router.put('/users/migrate-hr-assigned-hm', authenticateToken, checkUserBlockStatus, userController.migrateHrAssignedHm);
router.put('/users/migrate-hm-assigned-shm', authenticateToken, checkUserBlockStatus, userController.migrateHmAssignedShm);

module.exports = router;
