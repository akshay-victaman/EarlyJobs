const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const db = require('../config/database');

const jwt = require('jsonwebtoken');

const getAllUsers = async (role, isBlocked) => {
    const query = `SELECT * FROM users where role != 'ADMIN' ${role !== 'null' ? `AND role = '${role}'` : ''} ${isBlocked !== 'null' ? `AND is_blocked = ${parseInt(isBlocked)}` : ''} order by username asc;`;
    const result = await db.query(query);
    return result[0];
}

const getAllCandidates = async () => {
    const query = `SELECT * FROM candidates order by name asc;`;
    const result = await db.query(query);
    return result[0];
}

const getAllJobs = async (page) => {
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const query = `SELECT * FROM jobs order by created_at desc Limit ? offset ?;`;
    const countQuery = 'SELECT count(*) as count FROM jobs';
    const result = await db.query(query, [endIndex, startIndex]);
    const countResult = await db.query(countQuery);
    return {jobs: result[0], count: countResult[0][0].count};
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

const blockUser = async (email) => {
    const query = `UPDATE users SET is_blocked = 1 WHERE email = ?`;
    const result = await db.query(query, [email]);
    if (result[0].affectedRows === 0) {
        return {error: 'User not found.'};
    } else {
        return {message: 'User blocked.'};
    }
}

const unblockUser = async (email) => {
    const query = `UPDATE users SET is_blocked = 0 WHERE email = ?`;
    const result = await db.query(query, [email]);
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
