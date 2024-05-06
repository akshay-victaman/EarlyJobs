const userService = require('../services/UserService');

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserByEmailPhone = async (req, res) => {
  const email = req.params.email;
  const phone = req.params.phone;
  try {
    const user = await userService.getUserByEmailPhone(email, phone);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserByEmail = async (req, res) => {
  const username = req.params.username;
  try {
    const user = await userService.getUserByEmail(username);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const hrResumes = async (req, res) => {
  const hrEmail = req.params.hrEmail;
  const {offerLetterUrl} = req.body;
  try {
    const user = await userService.hrResumes(hrEmail, offerLetterUrl);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
    const user = req.body;
    try {
      const newUser = await userService.createUser(user);
      res.json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const updateUser = async (req, res) => {
    const user = req.body;
    try {
      const updatedUser = await userService.updateUser(user);
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const getHrResumes = async (req, res) => {
    const email = req.params.email;
    try {
      const users = await userService.getHrResumes(email);
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const updatePassword = async (req, res) => {
    const user = req.body;
    try {
      const updatedUser = await userService.updatePassword(user);
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const updateDocId = async (req, res) => {
    const user = req.body;
    try {
      const updatedUser = await userService.updateDocId(user);
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const loginUser = async (req, res) => {
    const user = req.body;
    try {
      const newUser = await userService.loginUser(user);
      res.json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const getAllAccountManagers = async (req, res) => {
    try {
      const users = await userService.getAllAccountManagers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const getAllHRs = async (req, res) => {
    try {
      const email = req.params.email;
      const users = await userService.getAllHRs(email);
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const getAllHRsForHiringManager = async (req, res) => {
    try {
      const email = req.params.email;
      const hiringFor = req.query.hiringFor;
      const search = req.query.search;
      const page = parseInt(req.query.page) || 1;
      const users = await userService.getAllHRsForHiringManager(email, hiringFor, search, page);
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const getHrAssignedHm = async (req, res) => {
    try {
      const email = req.params.email;
      const role = req.query.role;
      const users = await userService.getHrAssignedHm(email, role);
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const createComplaint = async (req, res) => {
    const complaint = req.body;
    complaint.email = req.email;
    try {
      const newComplaint = await userService.createComplaint(complaint);
      res.json(newComplaint);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

module.exports = {
  getAllUsers,
  getUserByEmailPhone,
  getUserByEmail,
  hrResumes,
  createUser,
  updateUser,
  getHrResumes,
  updatePassword,
  updateDocId,
  loginUser,
  getAllAccountManagers,
  getAllHRs,
  getAllHRsForHiringManager,
  getHrAssignedHm,
  createComplaint
};
