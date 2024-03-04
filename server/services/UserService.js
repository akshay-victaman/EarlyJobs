const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const db = require('../config/database');

const jwt = require('jsonwebtoken');


const getAllUsers = async  () => {
  const query = 'SELECT * FROM users';
  const result = await db.query(query);
  return result[0];
};

// const getUserByNameEmail = async (username, email) => {
//   const query = 'SELECT * FROM users WHERE username LIKE ? or email LIKE ?';
//   let username1 = "%"+username;
//   let email1 = "%"+email;
//   const result = await db.query(query, [username1, email1]);
//   return result[0];
// };

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

const createUser = async (user) => {
    console.log(user)
    const {docId, username, email, phone, password, role, hiringFor, assignHM, location, hiringCategory} = user;
    const hiringCategory1 = hiringCategory.join(', ');
    const id = uuidv4();
    const hashedPassword = bcrypt.hashSync(password, 10)
    // const dbUser = await getUserByNameEmail(username, email);
    const dbUser = await getUserByEmailPhone(email, phone);
    console.log(dbUser)
    if (dbUser.length > 0) {
        return {error: 'User already exists'};
    } else {
        const query = 'INSERT INTO users (id, user_details_id, username, email, phone, password, role, hiring_for, location, hiring_category, is_blocked) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const result = await db.query(query, [id, docId, username, email, phone, hashedPassword, role, hiringFor, location, hiringCategory1, 0]);
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

const loginUser = async (user) => {
    const {email, password} = user;
    console.log(user)
    // const dbUser = await getUserByNameEmail(email, email);
    const dbUser = await getUserByEmail(email);
    console.log(dbUser)
    if (dbUser.length > 0) {
        const match = bcrypt.compareSync(password, dbUser[0].password);
        if (match) {
            const jwtToken = jwt.sign({email: dbUser[0].email}, 'jobbyApp');
            return {username: dbUser[0].username, userDetailsId: dbUser[0].user_details_id, email, jwtToken, role: dbUser[0].role, isBlocked: dbUser[0].is_blocked};
        } else {
            return {error: 'Invalid Password'};
        }
    } else {
        return {error: 'Invalid Email'};
    }
}

const getAllAccountManagers = async () => {
    console.log('triggered')
    const query = 'SELECT username, email, phone, location, hiring_ctc, hiring_category FROM users WHERE role = ? order by username asc';
    const result = await db.query(query, ['AC']);
    console.log(result)
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

module.exports = {
  getAllUsers,
  getUserByEmailPhone,
  getUserByEmail,
  createUser,
  updateUser,
  updatePassword,
  updateDocId,
  loginUser,
  getAllAccountManagers,
  getAllHRs
};
