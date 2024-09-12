const RecommendationService = require('../services/RecommendationService');

const getRecruiterRecommendations = async (req, res) => {
    try {
        const email = req.email;
        const recruiterRecommendations = await RecommendationService.getRecruiterRecommendations(email);
        res.status(200).json(recruiterRecommendations);
    } catch (error) {
        console.error('Error in getRecruiterRecommendations:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getRecruiterRecommendations
}