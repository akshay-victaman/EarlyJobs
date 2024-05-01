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

const hrResumes = async (hrEmail, resumeUrl) => {
    const query = 'INSERT INTO hr_resume (hr_email, resume_url) VALUES (?, ?)';
    const result = await db.query(query, [hrEmail, resumeUrl]);
    if(result[0].affectedRows > 0) {
        return {success: 'HR resume uploaded successfully'};
    }
    return {error: 'HR resume upload failed'};
    // return result[0].affectedRows > 0;
}

const createUser = async (user) => {
    const {docId, username, email, phone, password, role, hiringFor, assignHM, location, hiringCategory, hmType} = user;
    const hiringCategory1 = hiringCategory.join(', ');
    const id = uuidv4();
    const hashedPassword = bcrypt.hashSync(password, 10)
    // const dbUser = await getUserByNameEmail(username, email);
    const dbUser = await getUserByEmailPhone(email, phone);
    console.log(dbUser)
    if (dbUser.length > 0) {
        return {error: 'User already exists'};
    } else {
        const query = 'INSERT INTO users (id, user_details_id, username, email, phone, password, role, hiring_for, location, hiring_category, is_blocked, hm_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const result = await db.query(query, [id, docId, username, email, phone, hashedPassword, role, hiringFor, location, hiringCategory1, 0, hmType]);
        if (result[0].affectedRows > 0) {
            if(role === 'HR') {
                hrAssignedHm(email, assignHM);
            }
            return {success: 'User created successfully'};
        } else {
            return {error: 'User creation failed'};
        }
    }
}

const updateUser = async (user) => {
    const {docId, email, location, password} = user;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const query = 'UPDATE users SET user_details_id = ?, location = ?, password = ? WHERE email = ?';
    const result = await db.query(query, [docId, location, hashedPassword, email]);
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
    // const dbUser = await getUserByNameEmail(email, email);
    const dbUser = await getUserByEmail(email);
    console.log('dbUser', dbUser)
    if (dbUser.length > 0) {
        const match = bcrypt.compareSync(password, dbUser[0].password);
        if (match) {
            if(dbUser[0].role === 'HR') {
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

const getAllAccountManagers = async () => {
    const query = 'SELECT username, email, phone, location, hiring_ctc, hiring_category FROM users WHERE role = ? order by username asc';
    const result = await db.query(query, ['AC']);
    return result[0]; 
}

const getAllHRs = async (email) => {
    const query = `
        SELECT username, email, location, hiring_ctc, hiring_category 
        FROM users INNER JOIN hrassignedhm ON 
        users.email=hrassignedhm.hr_email 
        WHERE role = ? AND hm_email = ? 
        order by username asc
    `;
    const result = await db.query(query, ['HR', email]);
    return result[0]; 
}

const getAllHRsForHiringManager = async (email, hiringFor, page) => {
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize; 
    let query = `
        SELECT username, email, phone, created_at, hiring_for, last_login, is_blocked
        FROM users INNER JOIN hrassignedhm ON 
        users.email=hrassignedhm.hr_email 
        WHERE hm_email = ? 
        ${hiringFor !== 'undefined' && hiringFor !== '' ? `AND hiring_for = ? ` : ''} 
        ORDER BY created_at DESC, username ASC 
        LIMIT ? OFFSET ? ;
    `;
    console.log(query)
    let countQuery = `
        SELECT count(*) as count 
        FROM users INNER JOIN hrassignedhm ON 
        users.email=hrassignedhm.hr_email 
        WHERE hm_email = ? 
        ${hiringFor !== 'undefined' && hiringFor !== '' ? `AND hiring_for = ? ` : ''} 
    `;
    const params = (hiringFor !== 'undefined' && hiringFor !== '') ? [email, hiringFor, pageSize, startIndex] : [email, pageSize, startIndex];
    const result = await db.query(query, params);
    const params2 = (hiringFor !== 'undefined' && hiringFor !== '') ? [email, hiringFor] : [email];
    const countResult = await db.query(countQuery, params2);
    return {users: result[0], count: countResult[0][0].count};
}

const getHrAssignedHm = async (email, role) => {
    const HRQuery = `
        SELECT username, phone 
        FROM users
        WHERE email = ?
    `;
    if(role === 'AC') {
        const result = await db.query(HRQuery, [email]);
        return {hm: result[0]};
    }
    const result1 = await db.query(HRQuery, [email]);
    const HMQuery = `
        SELECT username, phone 
        FROM users INNER JOIN hrassignedhm ON 
        users.email = hrassignedhm.hm_email 
        WHERE hr_email = ?
    `;
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
