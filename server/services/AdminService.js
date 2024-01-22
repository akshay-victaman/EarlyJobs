const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const db = require('../config/database');

const jwt = require('jsonwebtoken');

const getAllUsers = async (role, isBlocked) => {
    const query = `SELECT * FROM users where role != 'ADMIN' ${role !== 'null' ? `AND role = '${role}'` : ''} ${isBlocked !== 'null' ? `AND is_blocked = ${parseInt(isBlocked)}` : ''}`;
    const result = await db.query(query);
    return result[0];
}

const getAllCandidates = async () => {
    const query = `SELECT * FROM candidates`;
    const result = await db.query(query);
    return result[0];
}

const getAllJobs = async () => {
    const query = `SELECT * FROM jobs`;
    const result = await db.query(query);
    return result[0];
}

const archiveJob = async (jobId) => {
    const query = `UPDATE jobs SET status = 'ARCHIVED' WHERE id = ?`;
    const result = await db.query(query, [jobId]);
    if (result[0].affectedRows === 0) {
        return {error: 'Job not found.'};
    } else {
        return {message: 'Job archived.'};
    }
}

const blockUser = async (username) => {
    const query = `UPDATE users SET is_blocked = 1 WHERE username = ?`;
    const result = await db.query(query, [username]);
    if (result[0].affectedRows === 0) {
        return {error: 'User not found.'};
    } else {
        return {message: 'User blocked.'};
    }
}

const unblockUser = async (username) => {
    const query = `UPDATE users SET is_blocked = 0 WHERE username = ?`;
    const result = await db.query(query, [username]);
    if (result[0].affectedRows === 0) {
        return {error: 'User not found.'};
    } else {
        return {message: 'User unblocked.'};
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
