const adminService = require('../services/AdminService');

const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const role = req.query.role;
    const isBlocked = req.query.isBlocked;
    const search = req.query.search;
    const users = await adminService.getAllUsers(role, isBlocked, search, page);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const changeUserRoleAssignment = async (req, res) => {
  try {
    const email = req.body.email;
    const hmShmEmail = req.body.hmShmEmail;
    const role = req.body.role;
    const hiringFor = req.body.hiringFor;
    const response = await adminService.changeUserRoleAssignment(email, role, hiringFor, hmShmEmail);
    res.json(response);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
}

const getAllCandidates = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const search = req.query.search;
    const candidates = await adminService.getAllCandidates(search, page);
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const setCandidateisJoined = async (req, res) => {
  try {
    const candidateId = req.params.id;
    const isJoined = req.body.isJoined;
    const response = await adminService.setCandidateisJoined(isJoined, candidateId);
    res.json(response);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
}

const viewCandidateApplications = async (req, res) => {
  try {
    const candidateId = req.params.id;
    const applications = await adminService.viewCandidateApplications(candidateId);
    res.json(applications);
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

const changePhone = async (req, res) => {
  try {
    const email = req.body.email;
    const phone = req.body.phone;
    const users = await adminService.changePhone(email, phone);
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
    const page = parseInt(req.query.page) || 1;
    const compliants = await adminService.getUnreadCompliants(page);
    res.json(compliants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getReadCompliants = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const compliants = await adminService.getReadCompliants(page);
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

const addMemberCard = async (req, res) => {
  try {
      const result = await adminService.addMemberCard(req.body);
      res.status(200).json(result);
  } catch (e) {
      console.log(e);
      res.status(e.statusCode || 500).json({ error: e.message });
  }
}

const getMemberCards = async (req, res) => {
  try {
      const memberCards = await adminService.getMemberCards(req.query.category);
      res.status(200).json(memberCards);
  } catch (e) {
      console.log(e);
      res.status(e.statusCode || 500).json({ error: e.message });
  }
}

const updateMemberCard = async (req, res) => {
  try {
      const result = await adminService.updateMemberCard(req.body);
      res.status(200).json(result);
  } catch (e) {
      console.log(e);
      res.status(e.statusCode || 500).json({ error: e.message });
  }
}

const deleteMemberCard = async (req, res) => {
  try {
      console.log('triggered');
      const result = await adminService.deleteMemberCard(req.params.id);
      res.status(200).json(result);
  } catch (e) {
      console.log(e);
      res.status(e.statusCode || 500).json({ error: e.message });
  }
}

module.exports = {
  getAllUsers,
  changeUserRoleAssignment,
  getAllCandidates,
  setCandidateisJoined,
  viewCandidateApplications,
  getAllJobs,
  getAllAdminJobs,
  archiveJob,
  blockUser,
  unblockUser,
  changePassword,
  changePhone,
  offerLetterCount,
  updateOrInsertOfferLetterCount,
  getUnreadCompliants,
  getReadCompliants,
  getCompliantById,
  markCompliantAsRead,
  addMemberCard,
  getMemberCards,
  updateMemberCard,
  deleteMemberCard
};
