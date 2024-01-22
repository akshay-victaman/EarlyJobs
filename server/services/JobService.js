const { v4: uuidv4 } = require('uuid');
const db = require('../config/database');

const addJobDetials = async (job) => {
    const {companyName, title, category, description, location, ctc, skills, employmentType, workType, commission, noOfOpenings, status, hiringNeed, postedBy, assignedTo} = job;
    const id = uuidv4();
    const query = 'INSERT INTO jobs (id, company_name, title, category, description, location, ctc, skills, employment_type, work_type, commission, no_of_openings, status, hiring_need, posted_by, assigned_to) VALUES (?, ?, ?, ?, ?, ? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,?)';
    const result = await db.query(query, [id, companyName, title, category, description, location, ctc, skills, employmentType, workType, commission, noOfOpenings, status, hiringNeed, postedBy, assignedTo]);
    if (result[0].affectedRows > 0) {
        return {success: 'Job created successfully'};
    } else {         
        return {error: 'Job creation failed'};
    }
}

const getJobDetails = async (jobId) => {
    const query = 'SELECT * FROM jobs WHERE id = ?';
    const result = await db.query(query, [jobId]);
    if (result[0].length > 0) {
        return result[0][0];
    } else {
        return {error: 'Job not found'};
    }
}

const assignJobToHrByAccountManager = async (jobAssignment) => {
    const {jobId, assignedTo, assignedBy} = jobAssignment;
    const assingmentQuery = 'SELECT * FROM JobAssignments WHERE job_id = ? AND assigned_to = ?';
    const assingmentResult = await db.query(assingmentQuery, [jobId, assignedTo]);
    if (assingmentResult[0].length > 0) {
        return {error: 'Job already assigned to HR'};
    }
    const id = uuidv4();
    const query = 'INSERT INTO JobAssignments (id, job_id, assigned_to, assigned_by) VALUES (?, ?, ?, ?)';
    const result = await db.query(query, [id, jobId, assignedTo, assignedBy]);
    if (result[0].affectedRows > 0) {
        return {success: 'Job assigned successfully to HR'};
    } else {
        return {error: 'Job assignment failed'};
    }
}

const getAccountManagerJobs = async (username) => {
    const query = 'SELECT * FROM jobs WHERE assigned_to = ?';
    const result = await db.query(query, [username]);
    return result[0];
}

const getHRJobs = async (username) => {
    const query = `
    SELECT 
        jobs.id as id,
        company_name,
        title,
        category,
        description,
        location,
        ctc,
        skills,
        employment_type,
        work_type,
        commission,
        no_of_openings,
        status,
        hiring_need,
        assigned_by as posted_by,
        assigned_at as created_at
    FROM jobs 
    INNER JOIN JobAssignments ON 
    jobs.id = JobAssignments.job_id 
    WHERE JobAssignments.assigned_to = ?;`;
    const result = await db.query(query, [username]);
    return result[0];
}

const addApplication = async (jobId, cId, username, offerStatus) => {
    const applicationQuery = 'SELECT * FROM Applications WHERE job_id = ? AND candidate_id = ? AND applied_by = ?';
    const applicationResult = await db.query(applicationQuery, [jobId, cId, username]);
    if (applicationResult[0].length > 0) {
        return {error: 'Application already exists for this candidate'};
    }
    const id = uuidv4();
    const query = 'INSERT INTO Applications (id, job_id, candidate_id, applied_by, offer_status) VALUES (?, ?, ?, ?, ?)';
    const result = await db.query(query, [id, jobId, cId, username, offerStatus]);
    if (result[0].affectedRows > 0) {
        return {success: 'Candidate added successfully'};
    } else {         
        return {error: 'Candidate addition failed'};
    }
}

const addCandidateDetailsForJob = async (candidate) => {
    const {candidateName, candidateEmail, candidatePhone, jobId, username, offerStatus} = candidate;
    const candidateQuery = 'SELECT * FROM candidates WHERE email = ? OR phone = ?';
    const candidateResult = await db.query(candidateQuery, [candidateEmail, candidatePhone]);
    if (candidateResult[0].length === 0) {
        const cId = uuidv4();
        const query = 'INSERT INTO candidates (id, name, email, phone) VALUES (?, ?, ?, ?)';
        const result = await db.query(query, [cId, candidateName, candidateEmail, candidatePhone]);
        if (result[0].affectedRows > 0) {
            return addApplication(jobId, cId, username, offerStatus);
        } else {
            return {error: 'Candidate addition failed'};
        }
    } else {
        return addApplication(jobId, candidateResult[0][0].id, username, offerStatus);
    }
}

const getJobCandidates = async (jobId) => {
    const query = `
    SELECT 
        candidates.id as candidate_id,
        name,
        email,
        phone,
        offer_status,
        offered_date,
        applied_by
    FROM candidates 
    INNER JOIN Applications ON 
    candidates.id = Applications.candidate_id 
    WHERE Applications.job_id = ?;`;
    const result = await db.query(query, [jobId]);
    return result[0];
}

const updateCandidateOfferStatus = async (candidate) => {
    const {candidateId, jobId, username, offerStatus} = candidate;
    const query = 'UPDATE Applications SET offer_status = ? WHERE job_id = ? AND candidate_id = ? AND applied_by = ?';
    const result = await db.query(query, [offerStatus, jobId, candidateId, username]);
    if (result[0].affectedRows > 0) {
        return {success: 'Candidate offer status updated successfully'};
    } else {         
        return {error: 'Candidate offer status updation failed'};
    }
}

module.exports = {
    addJobDetials,
    getJobDetails,
    assignJobToHrByAccountManager,
    getAccountManagerJobs,
    getHRJobs,
    addCandidateDetailsForJob,
    getJobCandidates,
    updateCandidateOfferStatus
}