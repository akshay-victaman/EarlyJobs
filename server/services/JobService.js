const { v4: uuidv4 } = require('uuid');
const db = require('../config/database');

const assignJobToHMByBDE = async (jobId, assignedTo) => {
    const assingmentQuery = 'INSERT INTO job_assigned_by_bde (job_id, hm_email) VALUES ';
    let multiAssingmentQuery = '';
    for (let i = 0; i < assignedTo.length; i++) {
        multiAssingmentQuery += `('${jobId}', '${assignedTo[i]}'),`;
    }
    const query = assingmentQuery + multiAssingmentQuery.slice(0, -1);
    const result = await db.query(query);
    if (result[0].affectedRows > 0) {
        return {success: 'Job assigned successfully to HM'};
    } else {
        return {error: 'Job assignment failed'};
    }
}

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
        language,
        employmentType, 
        workType, 
        commissionFee,
        commissionType,
        noOfOpenings, 
        status, 
        hiringNeed, 
        postedBy, 
        assignedTo
    } = job;
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
        language, 
        employment_type, 
        work_type, 
        commission_fee, 
        commission_type, 
        no_of_openings, 
        status, 
        hiring_need, 
        posted_by
        ) VALUES (?, ?, ?, ?, ?, ? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,?, ?, ?, ?)`;
    const result = await db.query(query, [id, companyName, title, category, shiftTimings, description, location, minSalary, maxSalary, skills, language, employmentType, workType, commissionFee, commissionType, noOfOpenings, status, hiringNeed, postedBy]);
    console.log('tried to add job')

    if (result[0].affectedRows > 0) {
        return assignJobToHMByBDE(id, assignedTo);
    } else {         
        return {error: 'Job creation failed'};
    }
}

const updateJobAssignmentByBde = async (jobId, assignedTo) => {
    const deleteQuery = 'DELETE FROM job_assigned_by_bde WHERE job_id = ?';
    const deleteResult = await db.query(deleteQuery, [jobId]);
    if (deleteResult[0].affectedRows > 0) {
        return assignJobToHMByBDE(jobId, assignedTo);
    } else {
        return {error: 'Job updation failed'};
    }
}


const editJobDetials = async (job) => {
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
        language,
        employmentType,
        workType,
        commissionFee,
        commissionType,
        noOfOpenings,
        status,
        hiringNeed,
        assignedTo,
        jobId
    } = job;
    const query = `
    UPDATE jobs SET
        company_name = ?,
        title = ?,
        category = ?,
        shift_timings = ?,
        description = ?,
        location = ?,
        min_salary = ?,
        max_salary = ?,
        skills = ?,
        language = ?,
        employment_type = ?,
        work_type = ?,
        commission_fee = ?,
        commission_type = ?,
        no_of_openings = ?,
        status = ?,
        hiring_need = ?
    WHERE id = ?`;
    const result = await db.query(query, [companyName, title, category, shiftTimings, description, location, minSalary, maxSalary, skills, language, employmentType, workType, commissionFee, commissionType, noOfOpenings, status, hiringNeed, jobId]);
    if (result[0].affectedRows > 0) {
        await updateJobAssignmentByBde(jobId, assignedTo);
        return {success: 'Job updated successfully'};
    } else {
        return {error: 'Job updation failed'};
    }
}

const getAssignedHMsForJob = async (jobId) => {
    const query = 'SELECT * FROM job_assigned_by_bde WHERE job_id = ?';
    const result = await db.query(query, [jobId]);
    return result[0];
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
    const assingmentQuery = 'SELECT * FROM jobassignments WHERE job_id = ? AND assigned_to IN (?)';
    
    const assignmentResult = await db.query(assingmentQuery, [jobId, assignedTo]);
    if (assignmentResult[0].length > 0) {
        const hrEmails = assignmentResult[0].map(assignment => assignment.assigned_to);
        return {error: `Job already assigned to ${hrEmails.join(', ')} selcted HRs`, hrEmails: assignmentResult[0].map(assignment => assignment.assigned_to)};
    }
    
    const insertQuery = 'INSERT INTO jobassignments (id, job_id, assigned_to, assigned_by) VALUES ';
    let multiInsertQuery = '';
    for (let i = 0; i < assignedTo.length; i++) {
        const id = uuidv4();
        multiInsertQuery += `('${id}', '${jobId}', '${assignedTo[i]}', '${assignedBy}'),`;
    }
    const query = insertQuery + multiInsertQuery.slice(0, -1);
    const result = await db.query(query);
    if (result[0].affectedRows > 0) {
        return {success: 'Job assigned successfully to HR'};
    } else {
        return {error: 'Job assignment failed'};
    }
}

const getJobsForBDE = async (email, page) => {
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const query = 'SELECT * FROM jobs WHERE posted_by = ? order by created_at desc Limit ? offset ?;';
    const countQuery = 'SELECT count(*) as count FROM jobs WHERE posted_by = ?';
    const result = await db.query(query, [email, endIndex, startIndex]);
    const countResult = await db.query(countQuery, [email]);
    return {jobs: result[0], count: countResult[0][0].count};
}

const getAccountManagerJobs = async (email, page) => {
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const query = 'SELECT jobs.* FROM jobs INNER JOIN job_assigned_by_bde ON job_assigned_by_bde.job_id = jobs.id WHERE hm_email = ? order by created_at desc Limit ? offset ?;';
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

const addApplication = async (jobId, cId, hrEmail, offerStatus, interviewDate) => {
    const applicationQuery = 'SELECT * FROM applications WHERE job_id = ? AND candidate_id = ? AND applied_by = ?';
    const applicationResult = await db.query(applicationQuery, [jobId, cId, hrEmail]);
    if (applicationResult[0].length > 0) {
        return {error: 'Application already exists for this candidate'};
    }
    const id = uuidv4();
    const query = 'INSERT INTO applications (id, job_id, candidate_id, applied_by, offer_status, interview_date) VALUES (?, ?, ?, ?, ?, ?)';
    const result = await db.query(query, [id, jobId, cId, hrEmail, offerStatus, interviewDate]);
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
        hrEmail,
        interviewDate
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
            return addApplication(jobId, cId, hrEmail, offerStatus, interviewDate);
        } else {
            return {error: 'Candidate addition failed'};
        }
    } else {
        return addApplication(jobId, candidateResult[0][0].id, hrEmail, offerStatus, interviewDate);
    }
}

const getJobCandidates = async (jobId) => {
    const query = `
    SELECT 
        candidates.id as candidate_id,
        users.username as hr_name,
        candidates.name as name,
        candidates.email as email,
        candidates.phone as phone,
        offer_status,
        offered_date,
        applied_by,
        interview_date
    FROM candidates 
    INNER JOIN applications ON 
    candidates.id = applications.candidate_id 
    INNER JOIN users ON 
    users.email = applications.applied_by 
    WHERE applications.job_id = ? order by candidates.created_at desc`;
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
        applied_by,
        interview_date
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
    editJobDetials,
    getAssignedHMsForJob,
    getJobDetails,
    assignJobToHrByAccountManager,
    getJobsForBDE,
    getAccountManagerJobs,
    getHRJobs,
    addCandidateDetailsForJob,
    getJobCandidates,
    updateCandidateOfferStatus,
    getAllCandidatesForHR,
    getCandidateDetails
}