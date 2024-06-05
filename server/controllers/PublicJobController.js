const publicJobService = require('../services/PublicJobService');

const getAllJobs = async (req, res) => {
    const page = req.query.page || 1;
    try {
        const result = await publicJobService.getAllJobs(page);
        res.json(result);
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
}

const getJobDetails = async (req, res) => {
    const jobId = req.params.jobId;
    try {
        const job = await publicJobService.getJobDetails(jobId);
        res.json(job);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const addPublicApplicationForJob = async (req, res) => {
    const applicationData = req.body;
    try {
        const result = await publicJobService.addPublicApplicationForJob(applicationData);
        res.json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
}

const getPublicApplications = async (req, res) => {
    try {
        const jobId = req.query.jobId;
        const email = req.email;
        const createdTo = req.query.createdTo;
        const createdFrom = req.query.createdFrom;
        const search = req.query.search;
        const page = req.query.page || 1;
        const result = await publicJobService.getPublicApplications(jobId, email, search, createdTo, createdFrom, page);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deletePublicApplication = async (req, res) => {
    try {
        const applicationId = req.params.applicationId;
        const result = await publicJobService.deletePublicApplication(applicationId);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllJobs,
    getJobDetails,
    addPublicApplicationForJob,
    getPublicApplications,
    deletePublicApplication
}