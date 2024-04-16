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

const editJobDetials = async (req, res) => {
    const job = req.body;
    try {
      const updatedJob = await jobService.editJobDetials(job);
      res.json(updatedJob);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const getAssignedHMsForJob = async (req, res) => {
    const jobId = req.params.jobId;
    try {
      const assignedHMs = await jobService.getAssignedHMsForJob(jobId);
      res.json(assignedHMs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const getJobDetails = async (req, res) => {
    const jobId = req.params.jobId;
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

const getJobsForBDE = async (req, res) => {
    const email = req.params.email;
    const page = parseInt(req.query.page) || 1;
    try {
      const jobs = await jobService.getJobsForBDE(email, page);
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const getAccountManagerJobs = async (req, res) => {
    const email = req.params.email;
    const page = parseInt(req.query.page) || 1;
    try {
      const jobs = await jobService.getAccountManagerJobs(email, page);
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const getHRJobs = async (req, res) => {
    const email = req.params.email;
    const page = parseInt(req.query.page) || 1;
    try {
      const jobs = await jobService.getHRJobs(email, page);
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

const updateInterviewDate = async (req, res) => {
    const candidate = req.body;
    try {
      const updatedCandidate = await jobService.updateInterviewDate(candidate);
      res.json(updatedCandidate);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const getJobCandidates = async (req, res) => {
    const jobId = req.params.jobId;
    const email = req.query.email;
    const offerStatus = req.query.offerStatus;
    const page = parseInt(req.query.page) || 1;
    try {
      const candidates = await jobService.getJobCandidates(jobId, email, offerStatus, page);
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

const getAllCandidatesForHR = async (req, res) => {
    const email = req.params.email;
    try {
      const candidates = await jobService.getAllCandidatesForHR(email);
      res.json(candidates);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const getCandidateDetails = async (req, res) => {
    const candidateId = req.params.candidateId;
    try {
      const candidate = await jobService.getCandidateDetails(candidateId);
      res.json(candidate);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllJobs,
    addJobDetials,
    editJobDetials,
    getAssignedHMsForJob,
    getJobDetails,
    assignJobToHrByAccountManager,
    getJobsForBDE,
    getAccountManagerJobs,
    getHRJobs,
    addCandidateDetailsForJob,
    getJobCandidates,
    updateCandidateOfferStatus,
    getAllCandidatesForHR,
    getCandidateDetails,
    updateInterviewDate
}