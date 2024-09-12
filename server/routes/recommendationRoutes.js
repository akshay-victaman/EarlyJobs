const express = require('express');
const authenticateToken = require('../middleware/authenticationMiddleware');
const checkUserBlockStatus = require('../middleware/checkUserBlockStatus');
const RecommendationController = require('../controllers/RecommendationController');

const router = express.Router();

router.get('/candidates', authenticateToken, checkUserBlockStatus, RecommendationController.getRecruiterRecommendations);

module.exports = router