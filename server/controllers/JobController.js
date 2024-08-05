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

const getAssignedSHMsForJob = async (req, res) => {
    const jobId = req.params.jobId;
    try {
      const assignedHMs = await jobService.getAssignedSHMsForJob(jobId);
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

const getAssignedHMsForJob = async (req, res) => {
  const jobId = req.params.jobId;
  const email = req.email;
  try {
    const assignedHMs = await jobService.getAssignedHMsForJob(jobId, email);
    res.json(assignedHMs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getAssignedHRsForJob = async (req, res) => {
    const jobId = req.params.jobId;
    const email = req.params.email;
    try {
      const assignedHRs = await jobService.getAssignedHRsForJob(jobId, email);
      res.json(assignedHRs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const updateJobAssignmentBySHM = async (req, res) => {
    const jobAssignment = req.body;
    try {
      const jobAssigned = await jobService.updateJobAssignmentBySHM(jobAssignment);
      res.json(jobAssigned);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const updateJobAssignmentByHM = async (req, res) => {
    const jobAssignment = req.body;
    try {
      const jobAssigned = await jobService.updateJobAssignmentByHM(jobAssignment);
      res.json(jobAssigned);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const getJobsForBDE = async (req, res) => {
    const email = req.email;
    const company = req.query.company;
    const location = req.query.location;
    const title = req.query.title;
    const page = parseInt(req.query.page) || 1;
    try {
      const jobs = await jobService.getJobsForBDE(email,company, location, title, page);
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const getAllJobsForBDE = async (req, res) => {
    const email = req.email;
    try {
      const jobs = await jobService.getAllJobsForBDE(email);
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const getSeniorHMJobs = async (req, res) => {
    const email = req.email;
    const company = req.query.company;
    const location = req.query.location;
    const title = req.query.title;
    const page = parseInt(req.query.page) || 1;
    try {
      const jobs = await jobService.getSeniorHMJobs(email,company, location, title, page);
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const getAllSeniorHMJobs = async (req, res) => {
    const email = req.email;
    try {
      const jobs = await jobService.getAllSeniorHMJobs(email);
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const getHmJobs = async (req, res) => {
    const email = req.email;
    const company = req.query.company;
    const location = req.query.location;
    const title = req.query.title;
    const page = parseInt(req.query.page) || 1;
    try {
      const jobs = await jobService.getHmJobs(email,company, location, title, page);
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const getAllHmJobs = async (req, res) => {
    const email = req.email;
    try {
      const jobs = await jobService.getAllHmJobs(email);
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const getHRJobs = async (req, res) => {
    const email = req.email;
    const company = req.query.company;
    const location = req.query.location;
    const title = req.query.title;
    const page = parseInt(req.query.page) || 1;
    try {
      const jobs = await jobService.getHRJobs(email,company, location, title, page);
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const getAllHRJobs = async (req, res) => {
    const email = req.email;
    try {
      const jobs = await jobService.getAllHRJobs(email);
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
    const role = req.query.role;
    const offerStatus = req.query.offerStatus;
    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;
    const search = req.query.search;
    const page = parseInt(req.query.page) || 1;
    try {
      const candidates = await jobService.getJobCandidates(jobId, email, role, offerStatus, fromDate, toDate, search, page);
      res.json(candidates);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const getJobCandidatesForExcel = async (req, res) => {
    const jobId = req.params.jobId;
    const email = req.query.email;
    const role = req.query.role;
    const offerStatus = req.query.offerStatus;
    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;
    const search = req.query.search;
    try {
      const candidates = await jobService.getJobCandidatesForExcel(jobId, email, role, offerStatus, fromDate, toDate, search);
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

const getInitialCandidates = async (req, res) => {
    const email = req.params.email;
    const offerStatus = req.query.offerStatus;
    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;
    const role = req.query.role;
    const search = req.query.search;
    const page = parseInt(req.query.page) || 1;
    try {
      const candidates = await jobService.getInitialCandidates(email, offerStatus, fromDate, toDate, role, search, page);
      res.json(candidates);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const getInitialCandidatesForExcel = async (req, res) => {
    const email = req.params.email;
    const offerStatus = req.query.offerStatus;
    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;
    const role = req.query.role;
    const search = req.query.search;
    try {
      const candidates = await jobService.getInitialCandidatesForExcel(email, offerStatus, fromDate, toDate, role, search);
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

const getOfferStatusCandidates = async (req, res) => {
    const email = req.query.email;
    const hmEmail = req.email;
    const offerStatus = req.query.offerStatus;
    const tenureStatus = req.query.tenureStatus;
    const approveStatus = req.query.approveStatus;
    const role = req.query.role;
    const search = req.query.search;
    const jobId = req.query.jobId;
    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;
    const page = parseInt(req.query.page) || 1;
    try {
      const candidates = await jobService.getOfferStatusCandidates(email, hmEmail, offerStatus, tenureStatus, approveStatus, role, search, jobId, fromDate, toDate, page);
      res.json(candidates);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const getOfferStatusCandidatesForExcel = async (req, res) => {
    const email = req.query.email;
    const hmEmail = req.email;
    const offerStatus = req.query.offerStatus;
    const tenureStatus = req.query.tenureStatus;
    const approveStatus = req.query.approveStatus;
    const role = req.query.role;
    const search = req.query.search;
    const jobId = req.query.jobId;
    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;
    try {
      const candidates = await jobService.getOfferStatusCandidatesForExcel(email, hmEmail, offerStatus, tenureStatus, approveStatus, role, search, jobId, fromDate, toDate);
      res.json(candidates);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const getOfferStatusCandidatesForBDE = async (req, res) => {
    const email = req.query.email;
    const offerStatus = req.query.offerStatus;
    const tenureStatus = req.query.tenureStatus;
    const approveStatus = req.query.approveStatus;
    const search = req.query.search;
    const jobId = req.query.jobId;
    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;
    const verificationStatus = req.query.verificationStatus;
    const page = parseInt(req.query.page) || 1;

    try {
      const candidates = await jobService.getOfferStatusCandidatesForBDE(email, offerStatus, tenureStatus, approveStatus, search, jobId, fromDate, toDate, verificationStatus, page);
      res.json(candidates);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const getOfferStatusCandidatesForBDEExcel = async (req, res) => {
    const email = req.query.email;
    const offerStatus = req.query.offerStatus;
    const tenureStatus = req.query.tenureStatus;
    const approveStatus = req.query.approveStatus;
    const search = req.query.search;
    const jobId = req.query.jobId;
    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;
    const verificationStatus = req.query.verificationStatus;
    try {
      const candidates = await jobService.getOfferStatusCandidatesForBDEExcel(email, offerStatus, tenureStatus, approveStatus, search, jobId, fromDate, toDate, verificationStatus);
      res.json(candidates);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const updateTenureStatus = async (req, res) => {
    const candidate = req.body;
    try {
      const updatedCandidate = await jobService.updateTenureStatus(candidate);
      res.json(updatedCandidate);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const updateTenureApprovalStatus = async (req, res) => {
    const candidate = req.body;
    try {
      const updatedCandidate = await jobService.updateTenureApprovalStatus(candidate);
      res.json(updatedCandidate);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const updateVerificationStatus = async (req, res) => {
    const candidate = req.body;
    try {
      const updatedCandidate = await jobService.updateVerificationStatus(candidate);
      res.json(updatedCandidate);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const getJoinedCandidateCompanyDetails = async (req, res) => {
    const candidateId = req.params.id;
    try {
      const joinedCompanyDetails = await jobService.getJoinedCandidateCompanyDetails(candidateId);
      res.json(joinedCompanyDetails);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllJobs,
    addJobDetials,
    editJobDetials,
    getAssignedSHMsForJob,
    getJobDetails,
    assignJobToHrByAccountManager,
    getAssignedHMsForJob,
    getAssignedHRsForJob,
    updateJobAssignmentBySHM,
    updateJobAssignmentByHM,
    getJobsForBDE,
    getAllJobsForBDE,
    getSeniorHMJobs,
    getAllSeniorHMJobs,
    getHmJobs,
    getAllHmJobs,
    getHRJobs,
    getAllHRJobs,
    addCandidateDetailsForJob,
    getJobCandidates,
    getJobCandidatesForExcel,
    updateCandidateOfferStatus,
    getInitialCandidates,
    getInitialCandidatesForExcel,
    getCandidateDetails,
    updateInterviewDate,
    getOfferStatusCandidates,
    getOfferStatusCandidatesForExcel,
    getOfferStatusCandidatesForBDE,
    getOfferStatusCandidatesForBDEExcel,
    updateTenureStatus,
    updateTenureApprovalStatus,
    updateVerificationStatus,
    getJoinedCandidateCompanyDetails
}