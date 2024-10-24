const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const db = require('../config/database');

const jwt = require('jsonwebtoken');


const getAllUsers = async  () => {
  const query = 'SELECT * FROM users';
  const result = await db.query(query);
  return result[0];
};

const getUserByEmailPhone = async (email, phone) => {
    const query = 'SELECT * FROM users WHERE email LIKE ? or phone LIKE ?';
    const result = await db.query(query, [email, phone]);
    return result[0];
};

const getUserByEmail = async (email) => {
    const query = 'SELECT * FROM users WHERE email LIKE ?';
    let email1 = "%"+email;
    const result = await db.query(query, [email]);
    return result[0];
};

const hrAssignedHm = async (email, hrEmail) => {
    const query = 'INSERT INTO hrassignedhm (hr_email, hm_email) VALUES (?, ?)';
    const result = await db.query(query, [email, hrEmail]);
    return result[0].affectedRows > 0;
}

const hmAssignedShm = async (email, shmEmail) => {
    try {
        const query = 'INSERT INTO hm_assigned_shm (hm_email, shm_email) VALUES (?, ?)';
        const result = await db.query(query, [email, shmEmail]);
        return result[0].affectedRows > 0;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

const hrResumes = async (hrEmail, resumeUrl) => {
    const query = 'INSERT INTO hr_resume (hr_email, resume_url) VALUES (?, ?)';
    const result = await db.query(query, [hrEmail, resumeUrl]);
    if(result[0].affectedRows > 0) {
        return {success: 'HR resume uploaded successfully'};
    }
    return {error: 'HR resume upload failed'};
    // return result[0].affectedRows > 0;
}

const addRoleHistory = async (email, role) => {
    const id = uuidv4();
    const query = `INSERT INTO user_roles_history (id, user_email, role, start_date) VALUES (?, ?, ?, NOW());`;
    try {
        // const [result] = await connection.execute(query, [id, email, role]);
        const [result] = await db.query(query, [id, email, role]);
        if (result.affectedRows === 0) {
            const error = new Error('User not found.');
            error.statusCode = 404;
            throw error;
        } else {
            return true
        }
    } catch (error) {
        console.error('Error in changeUserRoles:', error);
        throw error;
    }
}

const createUser = async (user) => {
    const {docId, username, gender, email, phone, password, role, hiringFor, assignHM, location, hiringCategory, hmType} = user;
    const hiringCategory1 = hiringCategory.join(', ');
    const id = uuidv4();
    const hashedPassword = bcrypt.hashSync(password, 10)
    const dbUser = await getUserByEmailPhone(email, phone);
    if (dbUser.length > 0) {
        return {error: 'User already exists'};
    } else {
        const query = 'INSERT INTO users (id, user_details_id, username, gender, email, phone, password, role, hiring_for, location, hiring_category, is_blocked, hm_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const result = await db.query(query, [id, docId, username, gender, email, phone, hashedPassword, role, hiringFor, location, hiringCategory1, 0, hmType]);
        if (result[0].affectedRows > 0) {
            if(role === 'AC') {
                hmAssignedShm(email, assignHM);
            } else if(role === 'HR') {
                hrAssignedHm(email, assignHM);
            }
            await addRoleHistory(email, role);
            return {success: 'User created successfully'};
        } else {
            return {error: 'User creation failed'};
        }
    }
}

const updateUser = async (user) => {
    const {docId, email, location, password, gender} = user;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const query = 'UPDATE users SET user_details_id = ?, location = ?, password = ?, gender = ? WHERE email = ?';
    const result = await db.query(query, [docId, location, hashedPassword, gender, email]);
    if (result[0].affectedRows > 0) {
        return {success: 'User updated successfully'};
    }
    return {error: 'User update failed'};
}
    
const getHrResumes = async (hrEmail) => {
    const query = 'SELECT resume_url FROM hr_resume WHERE hr_email = ?';
    const result = await db.query(query, [hrEmail]);
    return result[0];
}

const updatePassword = async (user) => {
    const {email, password} = user;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const query = 'UPDATE users SET password = ? WHERE email = ?';
    const result = await db.query(query, [hashedPassword, email]);
    if (result[0].affectedRows > 0) {
        return {success: 'Password updated successfully'};
    }
    return {error: 'Password update failed'};
}


const updateDocId = async (user) => {
    const {docId, email} = user;
    const query = 'UPDATE users SET user_details_id = ? WHERE email = ?';
    const result = await db.query(query, [docId, email]);
    if (result[0].affectedRows > 0) {
        return {success: 'User updated successfully'};
    }
    return {error: 'User update failed'};
}

const updateHRLastLogin = async (email) => {
    const query = 'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE email = ?';
    const result = await db.query(query, [email]);
    if (result[0].affectedRows > 0) {
        return true;
    }
    return false;
}

const loginUser = async (user) => {
    const {email, password} = user;
    const dbUser = await getUserByEmail(email);
    if (dbUser.length > 0) {
        const match = bcrypt.compareSync(password, dbUser[0].password);
        if (match) {
            if(dbUser[0].role === 'HR' || dbUser[0].role === 'AC') {
                const isUpdated = await updateHRLastLogin(email);
                if(!isUpdated) {
                    return {error: 'Login failed'};
                }
            }
            const jwtToken = jwt.sign({email: dbUser[0].email}, 'jobbyApp');
            return {username: dbUser[0].username, userDetailsId: dbUser[0].user_details_id, email, jwtToken, role: dbUser[0].role, isBlocked: dbUser[0].is_blocked, hiringFor: dbUser[0].hiring_for, hmType: dbUser[0].hm_type};
        } else {
            return {error: 'Invalid Password'};
        }
    } else {
        return {error: 'Invalid Email'};
    }
}

const getAllSeniorHMs = async () => {
    try {
        const query = 'SELECT username, email, phone, location, hiring_ctc, hiring_category FROM users WHERE role = ? order by username asc';
        const result = await db.query(query, ['SHM']);
        return result[0];
    } catch (error) {
        console.log(error)
        throw error;
    }
}

const getAllHMs = async () => {
    try {
        const query = 'SELECT username, email, phone, location, hiring_ctc, hiring_category FROM users WHERE role = ? order by username asc';
        const result = await db.query(query, ['AC']);
        return result[0];
    } catch (error) {
        console.log(error)
        throw error;
    }
}

const getAllHMsForSHM = async (email) => {
    try {
        const query = `
            SELECT username, email, location, hiring_ctc, hiring_category 
            FROM users INNER JOIN hm_assigned_shm ON 
            users.email=hm_assigned_shm.hm_email
            WHERE shm_email = ? AND is_blocked = 0
            ORDER BY username ASC
        `;
        const result = await db.query(query, [email]);
        return result[0];
    } catch (error) {
        console.log(error)
        throw error;
    }
}

const getAllHRs = async (email) => {
    const query = `
        SELECT username, email, location, hiring_ctc, hiring_category 
        FROM users INNER JOIN hrassignedhm ON 
        users.email=hrassignedhm.hr_email 
        WHERE hm_email = ? AND is_blocked = 0
        order by username asc
    `;
    const result = await db.query(query, [email]);
    return result[0]; 
}

const getAllHRsForHiringManager = async (email, hiringFor, search, page) => {
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize; 
    let query = `
        SELECT username, email, phone, created_at, hiring_for, last_login, is_blocked
        FROM users INNER JOIN hrassignedhm ON 
        users.email=hrassignedhm.hr_email 
        WHERE hm_email = ? 
        ${hiringFor !== 'undefined' && hiringFor !== '' ? `AND hiring_for = ? ` : ''} 
        ${search !== 'undefined' && search !== '' ? `AND (username LIKE '%${search}%' OR email LIKE '%${search}%' OR phone LIKE '%${search}%') ` : ''}
        ORDER BY created_at DESC, username ASC 
        LIMIT ? OFFSET ? ;
    `;
    let countQuery = `
        SELECT count(*) as count 
        FROM users INNER JOIN hrassignedhm ON 
        users.email=hrassignedhm.hr_email 
        WHERE hm_email = ? 
        ${hiringFor !== 'undefined' && hiringFor !== '' ? `AND hiring_for = ? ` : ''} 
        ${search !== 'undefined' && search !== '' ? `AND (username LIKE '%${search}%' OR email LIKE '%${search}%' OR phone LIKE '%${search}%') ` : ''}
    `;
    const params = (hiringFor !== 'undefined' && hiringFor !== '') ? [email, hiringFor, pageSize, startIndex] : [email, pageSize, startIndex];
    const result = await db.query(query, params);
    const params2 = (hiringFor !== 'undefined' && hiringFor !== '') ? [email, hiringFor] : [email];
    const countResult = await db.query(countQuery, params2);
    return {users: result[0], count: countResult[0][0].count};
}

const getAllHRsForHiringManagerForExcel = async (email, hiringFor, search) => {
    let query = `
        SELECT username, email, phone, created_at, hiring_for, last_login, is_blocked
        FROM users INNER JOIN hrassignedhm ON
        users.email=hrassignedhm.hr_email
        WHERE hm_email = ?
        ${hiringFor !== 'undefined' && hiringFor !== '' ? `AND hiring_for = ? ` : ''}
        ${search !== 'undefined' && search !== '' ? `AND (username LIKE '%${search}%' OR email LIKE '%${search}%' OR phone LIKE '%${search}%') ` : ''}
        ORDER BY created_at DESC, username ASC
    `;
    const params = (hiringFor !== 'undefined' && hiringFor !== '') ? [email, hiringFor] : [email];
    try {
        const result = await db.query(query, params);
        return result[0];
    } catch (error) {
        console.log(error)
        throw error;
    }
}

const getAllHMsForSeniorHM = async (email, search, page) => {
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize; 
    let query = `
        SELECT username, email, phone, created_at, hiring_for, last_login, is_blocked
        FROM users INNER JOIN hm_assigned_shm ON 
        users.email=hm_assigned_shm.hm_email 
        WHERE shm_email = ? 
        ${search !== 'undefined' && search !== '' ? `AND (username LIKE '%${search}%' OR email LIKE '%${search}%' OR phone LIKE '%${search}%') ` : ''}
        ORDER BY created_at DESC, username ASC 
        LIMIT ? OFFSET ? ;
    `;
    let countQuery = `
        SELECT count(*) as count 
        FROM users INNER JOIN hm_assigned_shm ON 
        users.email=hm_assigned_shm.hm_email 
        WHERE shm_email = ? 
        ${search !== 'undefined' && search !== '' ? `AND (username LIKE '%${search}%' OR email LIKE '%${search}%' OR phone LIKE '%${search}%') ` : ''}
    `;
    const params = [email, pageSize, startIndex];
    const result = await db.query(query, params);
    const params2 = [email];
    const countResult = await db.query(countQuery, params2);
    return {users: result[0], count: countResult[0][0].count};
}

const getAllHMsForSeniorHMForExcel = async (email, search) => {
    let query = `
        SELECT username, email, phone, created_at, hiring_for, last_login, is_blocked
        FROM users INNER JOIN hm_assigned_shm ON
        users.email=hm_assigned_shm.hm_email
        WHERE shm_email = ?
        ${search !== 'undefined' && search !== '' ? `AND (username LIKE '%${search}%' OR email LIKE '%${search}%' OR phone LIKE '%${search}%') ` : ''}
        ORDER BY created_at DESC, username ASC
    `;
    const params = [email];
    const result = await db.query(query, params);
    return result[0];
}

const getHrAssignedHm = async (email, role) => {
    const userQuery = `
        SELECT username, phone, email
        FROM users
        WHERE email = ?
    `;
    if(role === 'SHM') {
        const result = await db.query(userQuery, [email]);
        return {shm: result[0]};
    }
    if(role === 'AC') {
        const SHMQuery = `
            SELECT username, phone, email
            FROM users INNER JOIN hm_assigned_shm ON
            users.email = hm_assigned_shm.shm_email
            WHERE hm_email = ?
        `;
        const result = await db.query(SHMQuery, [email]);
        const result1 = await db.query(userQuery, [email]);
        return {shm: result[0], hm: result1[0]};
    }
    const HMQuery = `
        SELECT username, phone, email
        FROM users INNER JOIN hrassignedhm ON 
        users.email = hrassignedhm.hm_email 
        WHERE hr_email = ?
    `;
    const result1 = await db.query(userQuery, [email]);
    const result = await db.query(HMQuery, [email]);
    return {hm: result[0], hr: result1[0]};
}

const createComplaint = async (compliant) => {
    const {email, subject, message, attachmentLink} = compliant;
    const id = uuidv4();
    const query = 'INSERT INTO compliants (id, subject, message, attachment_link, user_email, is_read) VALUES (?, ?, ?, ?, ?, ?)';
    try {
        const result = await db.query(query, [id, subject, message, attachmentLink, email, 0]);
        if (result[0].affectedRows > 0) {
            return {success: 'Complaint sent successfully'};
        }
        return {error: 'Complaint creation failed'};
    } catch (error) {
        console.log(error)
    }
}

const updateGender = async (email, gender) => {
    const query = 'UPDATE users SET gender = ? WHERE email = ?';
    const result = await db.query(query, [gender, email]);
    if (result[0].affectedRows > 0) {
        return {success: 'Gender updated successfully'};
    } else {
        return {error: 'Gender update failed'};
    }
}

const changeUserRole = async (email, hiringFor) => {
    const user = await getUserByEmail(email);
    if(user.length === 0) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }
    const query = 'UPDATE users SET hiring_for = ? WHERE email = ?';
    try {
        const result = await db.query(query, [hiringFor, email]);
        if (result[0].affectedRows > 0) {
            return {success: 'Role updated successfully'};
        }
        return {error: 'Role update failed'};
    } catch (error) {
        console.log(error)
    }
}

const migrateHrAssignedHm = async (hrEmail, currentHM, newHM) => {
    const user = await getUserByEmail(hrEmail);
    if(user.length === 0) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }
    const hmAssignmentQuery = 'UPDATE hrassignedhm SET hm_email = ? WHERE hr_email = ? AND hm_email = ?';
    const jobAssignmentQuery = 'UPDATE jobassignments SET assigned_by = ? WHERE assigned_to = ? AND assigned_by = ?';

    try {
        const result = await db.query(hmAssignmentQuery, [newHM, hrEmail, currentHM]);
        if (result[0].affectedRows > 0) {
            const result2 = await db.query(jobAssignmentQuery, [newHM, hrEmail, currentHM]);
            if (result2[0].affectedRows > 0) {
                return {success: 'HR migrated to new HM successfully'};
            } else {
                return {error: 'HR migration failed'};
            }
        }
        return {error: 'HR migration failed'};
    } catch (error) {
        console.log(error)
    }
}

const migrateHmAssignedShm = async (hmEmail, currentSHM, newSHM) => {
    const user = await getUserByEmail(hmEmail);
    if(user.length === 0) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }
    const hmAssignmentQuery = 'UPDATE hm_assigned_shm SET shm_email = ? WHERE hm_email = ? AND shm_email = ?';
    const jobAssignmentQuery = 'UPDATE jobassignments SET assigned_by = ? WHERE assigned_to = ? AND assigned_by = ?';

    try {
        const result = await db.query(hmAssignmentQuery, [newSHM, hmEmail, currentSHM]);
        if (result[0].affectedRows > 0) {
            const result2 = await db.query(jobAssignmentQuery, [newSHM, hmEmail, currentSHM]);
            if (result2[0].affectedRows > 0) {
                return {success: 'HM migrated to new Senior HM successfully'};
            } else {
                return {error: 'HM migration failed'};
            }
        }
        return {error: 'HM migration failed'};
    } catch (error) {
        console.log(error)
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
  getAllSeniorHMs,
  getAllHMs,
  getAllHMsForSHM,
  getAllHRs,
  getAllHRsForHiringManager,
  getAllHRsForHiringManagerForExcel,
  getAllHMsForSeniorHM,
  getAllHMsForSeniorHMForExcel,
  getHrAssignedHm,
  createComplaint,
  updateGender,
  changeUserRole,
  migrateHrAssignedHm,
  migrateHmAssignedShm
};
