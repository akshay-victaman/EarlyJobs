const { v4: uuidv4 } = require('uuid');
const db = require('../config/database');


// Function to get today's assigned candidates for a recruiter
async function getTodaysCandidatesForRecruiter(recruiter_id) {
    try {
        const query = `
            SELECT c.id, c.name, c.email, c.phone, c.date_of_birth
            FROM candidates c
            JOIN recruiter_recommendations r ON c.id = r.candidate_id
            WHERE r.recruiter_id = ? AND r.recommended_at = CURRENT_DATE
            ORDER BY c.name ASC;
        `;
        const [candidates] = await db.query(query, [recruiter_id]);
        
        return candidates;
    } catch (error) {
        console.error('Error in getTodaysCandidatesForRecruiter:', error);
        throw error;
    }
}

// Function to get 30 new candidates for a recruiter (if no candidates assigned today)
async function getNewCandidatesForRecruiter(recruiter) {
    try {
        const query = `
            SELECT c.id, c.name, c.email, c.phone, c.date_of_birth
            FROM candidates c 
            LEFT JOIN recruiter_recommendations r ON c.id = r.candidate_id
            WHERE c.is_joined = 0
            AND (r.recommended_at IS NULL OR r.recommended_at < DATE_SUB(CURRENT_DATE, INTERVAL 1 DAY))
            AND c.job_category IN (${db.escape(recruiter.hiring_category.split(', '))})
            GROUP BY c.id
            HAVING COUNT(r.candidate_id) = 0
            ORDER BY c.created_at ASC
            LIMIT 30
        `
        const [candidates] = await db.query(query);
        return candidates;
    } catch (error) {
        console.error('Error in getNewCandidatesForRecruiter:', error);
        throw error;
    }
}

// Function to assign new candidates for today
async function assignNewCandidatesForToday(recruiter_id, candidates) {
    try {
        const values = candidates.map(candidate => `(${db.escape(uuidv4())}, ${db.escape(recruiter_id)}, ${db.escape(candidate.id)}, CURRENT_DATE)`).join(', ');
        const query = `
            INSERT INTO recruiter_recommendations (id, recruiter_id, candidate_id, recommended_at)
            VALUES ${values}
        `;
        await db.query(query);
    } catch (error) {
        console.error('Error in assignNewCandidatesForToday:', error);
        throw error;
    }
}

async function getRecruiterCategoryAndLocation(email) {
    try {
        const query = `
            SELECT hiring_category, location, id
            FROM users
            WHERE email = ? AND is_blocked = 0 AND role = 'HR' AND hiring_for = 'Intern HR Recruiter'
        `;
        const recruiter = await db.query(query, [email]);
        return recruiter[0][0];
    } catch (error) {
        console.error('Error in getRecruiterCategoryAndLocation:', error);
        throw error;
    }
}

async function getRecruiterRecommendations(email) {
    try {
        // First, check if recruiter already has assigned candidates for today
        const recruiter = await getRecruiterCategoryAndLocation(email);
        let candidates = await getTodaysCandidatesForRecruiter(recruiter.id);

        // If no candidates assigned today, fetch new candidates
        if (candidates.length === 0) {
            candidates = await getNewCandidatesForRecruiter(recruiter);
            
            if (candidates.length > 0) {
                // Assign these new candidates to the recruiter for today
                await assignNewCandidatesForToday(recruiter.id, candidates);
            } else {
                return { message: 'No new candidates available for today' };
            }
        }

        return candidates;
    } catch (err) {
        console.error('Error in getRecruiterRecommendations:', err);
        throw err;
    }
}

module.exports = {
    getRecruiterRecommendations
}