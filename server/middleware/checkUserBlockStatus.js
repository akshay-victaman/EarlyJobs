const db = require('../config/database')

const checkUserBlockStatus = async (req, res, next) => {
    const email = req.email;
    const query = 'SELECT is_blocked FROM users WHERE email = ?';
    try {
        const result = await db.query(query, [email]);
        if (result[0] && result[0][0]) {
            const isBlocked = result[0][0].is_blocked;
            if(isBlocked === 1) {
                res.status(401);
                res.send({error: "Your account has been blocked. Please contact the administrator to unblock your account."});
            } else {
                next();
            }
        } else {
            res.status(404);
            res.send({error: "User not found"});
        }
    } catch (error) {
        res.status(500);
        res.send({error: "An error occurred while checking the user's block status"});
    }
}

module.exports = checkUserBlockStatus;