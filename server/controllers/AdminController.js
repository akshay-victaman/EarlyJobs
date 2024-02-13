const adminService = require('../services/AdminService');

const getAllUsers = async (req, res) => {
  try {
    const role = req.query.role;
    const isBlocked = req.query.isBlocked;
    const users = await adminService.getAllUsers(role, isBlocked);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllCandidates = async (req, res) => {
  try {
    const candidates = await adminService.getAllCandidates();
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getAllJobs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const jobs = await adminService.getAllJobs(page);
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const archiveJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const jobs = await adminService.archiveJob(jobId);
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const blockUser = async (req, res) => {
  try {
    const email = req.params.email;
    const users = await adminService.blockUser(email);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const unblockUser = async (req, res) => {
  try {
    const email = req.params.email;
    const users = await adminService.unblockUser(email);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllUsers,
  getAllCandidates,
  getAllJobs,
  archiveJob,
  blockUser,
  unblockUser
};
