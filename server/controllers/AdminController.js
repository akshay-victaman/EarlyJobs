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
    const jobs = await adminService.getAllJobs();
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
    const username = req.params.username;
    const users = await adminService.blockUser(username);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const unblockUser = async (req, res) => {
  try {
    const username = req.params.username;
    const users = await adminService.unblockUser(username);
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
