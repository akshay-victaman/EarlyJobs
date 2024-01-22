const jobService = require('../services/JobService');

const getAllJobs = async (req, res) => {
  try {
    const jobs = await jobService.getAllJobs();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addJobDetials = async (req, res) => {
    const job = req.body;
    try {
      const newJob = await jobService.addJobDetials(job);
      res.json(newJob);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const getJobDetails = async (req, res) => {
    const jobId = req.params.jobId;
    console.log(jobId)
    try {
      const job = await jobService.getJobDetails(jobId);
      res.json(job);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }

}

const assignJobToHrByAccountManager = async (req, res) => {
    const jobAssignment = req.body;
    try {
      const jobAssigned = await jobService.assignJobToHrByAccountManager(jobAssignment);
      res.json(jobAssigned);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const getAccountManagerJobs = async (req, res) => {
    const username = req.params.username;
    try {
      const jobs = await jobService.getAccountManagerJobs(username);
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const getHRJobs = async (req, res) => {
    const username = req.params.username;
    try {
      const jobs = await jobService.getHRJobs(username);
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const addCandidateDetailsForJob = async (req, res) => {
    const candidate = req.body;
    try {
      const newCandidate = await jobService.addCandidateDetailsForJob(candidate);
      res.json(newCandidate);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const getJobCandidates = async (req, res) => {
    const jobId = req.params.jobId;
    try {
      const candidates = await jobService.getJobCandidates(jobId);
      res.json(candidates);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const updateCandidateOfferStatus = async (req, res) => {
    const candidate = req.body;
    try {
      const updatedCandidate = await jobService.updateCandidateOfferStatus(candidate);
      res.json(updatedCandidate);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }

}

module.exports = {
    getAllJobs,
    addJobDetials,
    getJobDetails,
    assignJobToHrByAccountManager,
    getAccountManagerJobs,
    getHRJobs,
    addCandidateDetailsForJob,
    getJobCandidates,
    updateCandidateOfferStatus
}