const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const db = require('../config/database');

const jwt = require('jsonwebtoken');


const getAllUsers = async  () => {
  const query = 'SELECT * FROM users';
  const result = await db.query(query);
  return result[0];
};

const getUserByNameEmail = async (username, email) => {
  const query = 'SELECT * FROM users WHERE username LIKE ? or email LIKE ?';
  let username1 = "%"+username;
  let email1 = "%"+email;
  const result = await db.query(query, [username1, email1]);
  return result[0];
};

const createUser = async (user) => {
    const {username, email, password, role, industry, hiringCtc, location} = user;
    const id = uuidv4();
    const hashedPassword = bcrypt.hashSync(password, 10)
    const dbUser = await getUserByNameEmail(username, email);

    if (dbUser.length > 0) {
        return 'User already exists';
    } else {
        const query = 'INSERT INTO users (id, username, password, email, role, location, hiring_ctc, industry) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const result = await db.query(query, [id, username, hashedPassword, email, role, location, hiringCtc, industry]);
        if (result[0].affectedRows > 0) {
            return {success: 'User created successfully'};
        } else {         
            return {error: 'User creation failed'};
        }
    }
}

const loginUser = async (user) => {
    const {username, password} = user;
    const dbUser = await getUserByNameEmail(username, username);
    if (dbUser.length > 0) {
        const match = bcrypt.compareSync(password, dbUser[0].password);
        if (match) {
            const jwtToken = jwt.sign({username: dbUser[0].username}, 'jobbyApp');
            return {username, jwtToken, role: dbUser[0].role, isBlocked: dbUser[0].is_blocked};
        } else {
            return {error: 'Invalid Password'};
        }
    } else {
        return {error: 'Invalid Username'};
    }
}

const getAllAccountManagers = async () => {
    const query = 'SELECT username, location, hiring_ctc, industry FROM users WHERE role = ?';
    const result = await db.query(query, ['AC']);
    return result[0];
}

const getAllHRs = async () => {
    const query = 'SELECT username, location, hiring_ctc, industry FROM users WHERE role = ?';
    const result = await db.query(query, ['HR']);
    return result[0];
}

module.exports = {
  getAllUsers,
  getUserByNameEmail,
  createUser,
  loginUser,
  getAllAccountManagers,
  getAllHRs
};
