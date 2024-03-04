const bcrypt = require('bcryptjs');
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

const changePassword = async (email, password) => {
    const userQuery = `SELECT * FROM users WHERE email = ?`;
    const userResult = await db.query(userQuery, [email]);
    const userPassword = userResult[0][0].password;
    const match = await bcrypt.compare(password, userPassword);
    if (match) {
        return {error: 'New password cannot be the same as old password.'};
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `UPDATE users SET password = ? WHERE email = ?`;
    const result = await db.query(query, [hashedPassword, email]);
    if (result[0].affectedRows === 0) {
        return {error: 'User not found.'};
    } else {
        return {message: 'Password changed.'};
    }
}

const offerLetterCount = async (date) => {
    try {
        const query = 'SELECT count FROM offer_letter_ref_count WHERE date = ?';
        const result = await db.query(query, [date]);
        return result[0][0];
    } catch (error) {
        console.error('Error in offerLetterCount:', error);
        throw new Error('Error fetching offer letter count.');
    }
};

const updateOrInsertOfferLetterCount = async (date) => {
    try {
        const currentCount = await offerLetterCount(date);
        console.log(currentCount)
        if (currentCount === undefined) {
            const insertQuery = 'INSERT INTO offer_letter_ref_count (date, count) VALUES (?, 1)';
            const insertResult = await db.query(insertQuery, [date]);

            if (insertResult[0].affectedRows === 0) {
                return { error: 'Error inserting new date for offer letter.' };
            }

            return { message: 'Offer letter new date row inserted.' };
        }

        const updateQuery = 'UPDATE offer_letter_ref_count SET count = ? WHERE date = ?';
        const updateResult = await db.query(updateQuery, [currentCount.count + 1, date]);

        if (updateResult[0].affectedRows === 0) {
            return { error: 'Error updating offer letter count.' };
        }

        return { message: 'Offer letter count updated.' };
    } catch (error) {
        console.error('Error in updateOrInsertOfferLetterCount:', error);
        throw new Error('Error updating or inserting offer letter count.');
    }
};

module.exports = {
  getAllUsers,
  getAllCandidates,
  getAllJobs,
  archiveJob,
  blockUser,
  unblockUser,
  changePassword,
  offerLetterCount,
  updateOrInsertOfferLetterCount
};
