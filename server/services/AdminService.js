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
    const query = `SELECT * FROM jobs order by created_at desc Limit ? offset ?;`;
    const countQuery = 'SELECT count(*) as count FROM jobs';
    const result = await db.query(query, [pageSize, startIndex]);
    const countResult = await db.query(countQuery);
    return {jobs: result[0], count: countResult[0][0].count};
}

const getAllAdminJobs = async () => {
    const query = `SELECT id, company_name, title FROM jobs order by created_at desc;`;
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

const changePhone = async (email, phone) => {
    const query = `UPDATE users SET phone = ? WHERE email = ?`;
    try {
        const result = await db.query(query, [phone, email]);
        if (result[0].affectedRows === 0) {
            return {error: 'User not found.'};
        } else {
            return {message: 'Phone number changed.'};
        }
    } catch (error) {
        console.error('Error in changePhone:', error);
        throw error;
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

const getUnreadCompliants = async page => {
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;
    const query = `
        SELECT 
        compliants.*, username
        FROM compliants INNER JOIN users ON compliants.user_email = users.email
        WHERE is_read = 0
        order by created_at desc
        Limit ? offset ?;
    `;
    const queryCount = `
        SELECT count(*) as count
        FROM compliants
        WHERE is_read = 0;
    `;
    const result = await db .query(query, [pageSize, startIndex]);
    const countResult = await db.query(queryCount);
    return {compliants: result[0], count: countResult[0][0].count};
}

const getReadCompliants = async (page) => {
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;
    const query = `
        SELECT 
        compliants.*, username
        FROM compliants INNER JOIN users ON compliants.user_email = users.email
        WHERE is_read = 1
        order by created_at desc
        Limit ? offset ?;
    `;
    const queryCount = `
        SELECT count(*) as count
        FROM compliants
        WHERE is_read = 1;
    `;
    const result = await db .query(query, [pageSize, startIndex]);
    const countResult = await db.query(queryCount);
    return {compliants: result[0], count: countResult[0][0].count};
}

const getCompliantById = async (compliantId) => {
    const query = `
        SELECT 
        compliants.*, username, users.role, users.phone, users.hiring_for
        FROM compliants INNER JOIN users ON compliants.user_email = users.email
        WHERE compliants.id = ?;
    `;
    const result = await db .query(query, [compliantId]);
    return result[0][0];
}

const markCompliantAsRead = async (compliantId) => {
    const query = `UPDATE compliants SET is_read = 1 WHERE id = ?`;
    const result = await db.query(query, [compliantId]);
    if (result[0].affectedRows === 0) {
        return {error: 'Compliant not found.'};
    } else {
        return {message: 'Compliant marked as read.'};
    }
}


const addMemberCard = async (member) => {
    try {
        const {name, imageUrl, designation, category, experience, certifiedBy, linkedInUrl, position} = member;
        const id = uuidv4();
        const query = 'INSERT INTO team (id, name, image_url, designation, category, experience_in_years, certified_by, linkedIn_url, position) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const result = await db.query(query, [id, name, imageUrl, designation, category, experience, certifiedBy, linkedInUrl, position]);
        if (result[0].affectedRows === 0) {
            return {error: 'Error adding member.'};
        }
        return {success: "New member added"};
    } catch (error) {
        console.error('Error adding member:', error);
        throw error;
    }
}

const getMemberCards = async (category) => {
    console.log(category)
    try {
        const query = `
            SELECT * FROM team 
            ${(category !== '' && category !== undefined ) ? `WHERE category = '${category}'` : ''}
            order by position asc
        `;
        const result = await db.query(query);
        return result[0];
    } catch (error) {
        console.error('Error fetching Members:', error);
        throw error;
    }
}

const updateMemberCard = async (member) => {
    try {
        const {id, name, imageUrl, designation, category, experience, certifiedBy, linkedInUrl, position} = member;

        const memberQuery = 'SELECT * FROM team WHERE id = ?';
        const existingMember = await db.query(memberQuery, [id]);
        if (!existingMember[0][0]) {
            const error = new Error('Invalid member ID');
            error.statusCode = 404;
            throw error;
        }
        const query = 'UPDATE team SET name = ?, image_url = ?, designation = ?, category = ?, experience_in_years = ?, certified_by = ?, linkedIn_url = ?, position = ? WHERE id = ?';
        const result = await db.query(query, [name, imageUrl, designation, category, experience, certifiedBy, linkedInUrl, position, id]);
        if (result[0].affectedRows === 0) {
            return {error: 'Error updating member.'};
        }
        return {success: "Member updated"};
    } catch (error) {
        console.error('Error updating member:', error);
        throw error;
    }
}

const deleteMemberCard = async (id) => {
    console.log(id)
    try {
        const memberQuery = 'SELECT * FROM team WHERE id = ?';
        const member = await db.query(memberQuery, [id]);
        if (!member[0][0]) {
            const error = new Error('Invalid member ID');
            error.statusCode = 404;
            throw error;
        }
        const query = 'DELETE FROM team WHERE id = ?';
        const result = await db.query(query, [id]);
        if (result[0].affectedRows === 0) {
            return {error: 'Error deleting member.'};
        } 
        return {success: "Member deleted"};
    } catch (error) {
        console.error('Error deleting member:', error);
        throw error;
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
