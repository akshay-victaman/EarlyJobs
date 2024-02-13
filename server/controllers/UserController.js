const userService = require('../services/UserService');

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
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

const createUser = async (req, res) => {
    const user = req.body;
    try {
      const newUser = await userService.createUser(user);
      res.json(newUser);
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
      const users = await userService.getAllHRs();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

module.exports = {
  getAllUsers,
  getUserByEmail,
  createUser,
  updateDocId,
  loginUser,
  getAllAccountManagers,
  getAllHRs
};
