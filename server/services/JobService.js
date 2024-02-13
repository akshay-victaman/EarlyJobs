const { v4: uuidv4 } = require('uuid');
const db = require('../config/database');

const addJobDetials = async (job) => {
    const {
        companyName, 
        title, 
        category, 
        shiftTimings,
        description, 
        location, 
        minSalary, 
        maxSalary, 
        skills, 
        employmentType, 
        workType, 
        commissionFee,
        commissionType,
        noOfOpenings, 
        status, 
        hiringNeed, 
        postedBy, 
        assignedTo} = job;
    const id = uuidv4();
    const query = `
    INSERT INTO jobs (
        id, 
        company_name, 
        title, 
        category, 
        shift_timings,
        description, 
        location, 
        min_salary, 
        max_salary, 
        skills, 
        employment_type, 
        work_type, 
        commission_fee, 
        commission_type, 
        no_of_openings, 
        status, 
        hiring_need, 
        posted_by, 
        assigned_to
        ) VALUES (?, ?, ?, ?, ?, ? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,?, ?, ?, ?)`;
    const result = await db.query(query, [id, companyName, title, category, shiftTimings, description, location, minSalary, maxSalary, skills, employmentType, workType, commissionFee, commissionType, noOfOpenings, status, hiringNeed, postedBy, assignedTo]);
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
    const assingmentQuery = 'SELECT * FROM jobassignments WHERE job_id = ? AND assigned_to = ?';
    const assingmentResult = await db.query(assingmentQuery, [jobId, assignedTo]);
    if (assingmentResult[0].length > 0) {
        return {error: 'Job already assigned to HR'};
    }
    const id = uuidv4();
    const query = 'INSERT INTO jobassignments (id, job_id, assigned_to, assigned_by) VALUES (?, ?, ?, ?)';
    const result = await db.query(query, [id, jobId, assignedTo, assignedBy]);
    if (result[0].affectedRows > 0) {
        return {success: 'Job assigned successfully to HR'};
    } else {
        return {error: 'Job assignment failed'};
    }
}

const getAccountManagerJobs = async (email, page) => {
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const query = 'SELECT * FROM jobs WHERE assigned_to = ? order by created_at desc Limit ? offset ?;';
    const countQuery = 'SELECT count(*) as count FROM jobs WHERE assigned_to = ?';
    const result = await db.query(query, [email, endIndex, startIndex]);
    const countResult = await db.query(countQuery, [email]);
    return {jobs: result[0], count: countResult[0][0].count};
}

const getHRJobs = async (email, page) => {
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const query = `
    SELECT 
        jobs.id as id,
        company_name,
        title,
        category,
        description,
        location,
        min_salary,
        max_salary,
        skills,
        employment_type,
        work_type,
        commission_fee,
        commission_type,
        no_of_openings,
        status,
        hiring_need,
        assigned_by as posted_by,
        assigned_at as created_at
    FROM jobs 
    INNER JOIN jobassignments ON 
    jobs.id = jobassignments.job_id 
    WHERE jobassignments.assigned_to = ? 
    order by jobassignments.assigned_at desc
    Limit ? offset ?;`;
    const countQuery = 'SELECT count(*) as count FROM jobassignments WHERE assigned_to = ?';
    const result = await db.query(query, [email, endIndex, startIndex]);
    const countResult = await db.query(countQuery, [email]);
    return {jobs: result[0], count: countResult[0][0].count};
}

const addApplication = async (jobId, cId, hrEmail, offerStatus) => {
    const applicationQuery = 'SELECT * FROM applications WHERE job_id = ? AND candidate_id = ? AND applied_by = ?';
    const applicationResult = await db.query(applicationQuery, [jobId, cId, hrEmail]);
    if (applicationResult[0].length > 0) {
        return {error: 'Application already exists for this candidate'};
    }
    const id = uuidv4();
    const query = 'INSERT INTO applications (id, job_id, candidate_id, applied_by, offer_status) VALUES (?, ?, ?, ?, ?)';
    const result = await db.query(query, [id, jobId, cId, hrEmail, offerStatus]);
    if (result[0].affectedRows > 0) {
        return {success: 'Candidate added successfully'};
    } else {         
        return {error: 'Candidate addition failed'};
    }
}

const addCandidateDetailsForJob = async (candidate) => {
    const {
        fullName,
        fatherName,
        email,
        phone,
        dateOfBirth,
        gender,
        aadharNumber,     
        highestQualification,
        currentLocation,
        spokenLanguages,
        experienceInYears,
        experienceInMonths,
        skills,
        jobCategory,
        offerStatus,
        jobId,
        hrEmail
    } = candidate;
    const candidateQuery = 'SELECT * FROM candidates WHERE email = ? OR phone = ?';
    const candidateResult = await db.query(candidateQuery, [email, phone]);
    if (candidateResult[0].length === 0) {
        const cId = uuidv4();
        const query =  `
        INSERT INTO candidates (
            id, 
            name, 
            email, 
            phone, 
            father_name, 
            date_of_birth, 
            gender, 
            aadhar_number,
            highest_qualification, 
            current_location, 
            spoken_languages, 
            experience_in_years, 
            experience_in_months, 
            job_category, 
            skills
            ) VALUES (?, ?, ?, ?, ?, ? ,? ,? ,? ,? ,? ,? ,? ,? ,?)`;
        const result = await db.query(query, [cId, fullName, email, phone, fatherName, dateOfBirth, gender, aadharNumber, highestQualification, currentLocation, spokenLanguages.join(','), experienceInYears, experienceInMonths, jobCategory, skills.join(',')]);
        if (result[0].affectedRows > 0) {
            return addApplication(jobId, cId, hrEmail, offerStatus);
        } else {
            return {error: 'Candidate addition failed'};
        }
    } else {
        return addApplication(jobId, candidateResult[0][0].id, hrEmail, offerStatus);
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
    INNER JOIN applications ON 
    candidates.id = applications.candidate_id 
    WHERE applications.job_id = ? order by created_at desc;`;
    const result = await db.query(query, [jobId]);
    return result[0];
}

const updateCandidateOfferStatus = async (candidate) => {
    console.log(candidate)
    const {candidateId, jobId, email, offerStatus} = candidate;
    const query = 'UPDATE applications SET offer_status = ? WHERE job_id = ? AND candidate_id = ? AND applied_by = ?';
    const result = await db.query(query, [offerStatus, jobId, candidateId, email]);
    console.log(result)
    console.log(query)
    if (result[0].affectedRows > 0) {
        return {success: 'Candidate offer status updated successfully'};
    } else {         
        return {error: 'Candidate offer status updation failed'};
    }
}

const getAllCandidatesForHR = async (email) => {
    const query = `
    SELECT 
        candidates.id as candidate_id,
        job_id,
        name,
        email,
        phone,
        offer_status,
        offered_date,
        applied_by
    FROM candidates 
    INNER JOIN applications ON 
    candidates.id = applications.candidate_id 
    WHERE applications.applied_by = ? order by created_at desc;`;
    const result = await db.query(query, [email]);
    return result[0];
}

const getCandidateDetails = async (candidateId) => {
    const query = 'SELECT * FROM candidates WHERE id = ?';
    const result = await db.query(query, [candidateId]);
    if (result[0].length > 0) {
        return result[0][0];
    } else {
        return {error: 'Candidate not found'};
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
    updateCandidateOfferStatus,
    getAllCandidatesForHR,
    getCandidateDetails
}