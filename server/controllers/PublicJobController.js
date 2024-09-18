const publicJobService = require('../services/PublicJobService');

const getAllJobs = async (req, res) => {
    const company = req.query.company;
    const location = req.query.location;
    const title = req.query.title;
    const search = req.query.search;
    const page = req.query.page || 1;
    try {
        const result = await publicJobService.getAllJobs(company, location, title, search, page);
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

const getPublicApplicationsForExcel = async (req, res) => {
    try {
        const jobId = req.query.jobId;
        const email = req.email;
        const createdTo = req.query.createdTo;
        const createdFrom = req.query.createdFrom;
        const search = req.query.search;
        const result = await publicJobService.getPublicApplicationsForExcel(jobId, email, search, createdTo, createdFrom);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const rejectPublicApplication = async (req, res) => {
    try {
        const applicationId = req.params.applicationId;
        const email = req.email;
        const result = await publicJobService.rejectPublicApplication(applicationId, email);
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

const getRejectedApplications = async (req, res) => {
    try {
        const jobId = req.query.jobId;
        const email = req.email;
        const createdTo = req.query.createdTo;
        const createdFrom = req.query.createdFrom;
        const search = req.query.search;
        const page = req.query.page || 1;
        const result = await publicJobService.getRejectedApplications(jobId, email, search, createdTo, createdFrom, page);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getLocationTitleAndCompanyListWithJobCount = async (req, res) => {
    try {
        const locationList = await publicJobService.getLocationTitleAndCompanyListWithJobCount();
        res.json(locationList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllJobs,
    getJobDetails,
    addPublicApplicationForJob,
    getPublicApplications,
    getPublicApplicationsForExcel,
    rejectPublicApplication,
    deletePublicApplication,
    getRejectedApplications,
    getLocationTitleAndCompanyListWithJobCount
}