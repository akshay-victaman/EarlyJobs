const express = require('express');
const userController = require('../controllers/UserController');
const authenticateToken = require('../middleware/authenticationMiddleware');

const router = express.Router();

router.get('/users', userController.getAllUsers);
router.get('/users/:username', userController.getUserByEmail);
router.get('/users/all/account-managers', authenticateToken, userController.getAllAccountManagers);
router.get('/users/all/hr', authenticateToken, userController.getAllHRs);
router.post('/users/register', userController.createUser);
router.put('/users/update-doc-id', userController.updateDocId);
router.post('/users/login', userController.loginUser);

module.exports = router;
