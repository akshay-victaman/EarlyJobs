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

const getAllAdminJobs = async (req, res) => {
  try {
    const jobs = await adminService.getAllAdminJobs();
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

const offerLetterCount = async (req, res) => {
  try {
    const date = req.params.date;
    const count = await adminService.offerLetterCount(date);
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const changePassword = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const users = await adminService.changePassword(email, password);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const updateOrInsertOfferLetterCount = async (req, res) => {
  try {
    const date = req.params.date;
    const count = await adminService.updateOrInsertOfferLetterCount(date);
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getUnreadCompliants = async (req, res) => {
  try {
    const compliants = await adminService.getUnreadCompliants();
    res.json(compliants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getReadCompliants = async (req, res) => {
  try {
    const compliants = await adminService.getReadCompliants();
    res.json(compliants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getCompliantById = async (req, res) => {
  try {
    const compliantId = req.params.id;
    const compliant = await adminService.getCompliantById(compliantId);
    res.json(compliant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const markCompliantAsRead = async (req, res) => {
  try {
    const compliantId = req.params.id;
    const result = await adminService.markCompliantAsRead(compliantId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllUsers,
  getAllCandidates,
  getAllJobs,
  getAllAdminJobs,
  archiveJob,
  blockUser,
  unblockUser,
  changePassword,
  offerLetterCount,
  updateOrInsertOfferLetterCount,
  getUnreadCompliants,
  getReadCompliants,
  getCompliantById,
  markCompliantAsRead
};
