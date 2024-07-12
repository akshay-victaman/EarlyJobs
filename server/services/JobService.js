const { v4: uuidv4 } = require('uuid');
const db = require('../config/database');

const assignJobToHMByBDE = async (jobId, assignedTo) => {
    const assingmentQuery = 'INSERT INTO job_assigned_by_bde (job_id, shm_email) VALUES ';
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
        companyLogoUrl,
        companyId,
        title, 
        category, 
        shiftTimings,
        description, 
        streetAddress,
        city,
        area,
        pincode,
        locationLink,
        minSalary, 
        maxSalary, 
        skills, 
        language,
        employmentType, 
        workType, 
        commissionFee,
        commissionType,
        tenureInDays,
        noOfOpenings, 
        status, 
        hiringNeed, 
        postedBy, 
        assignedTo,
        qualification,
        maxExperience,
        minExperience,
        minAge,
        maxAge,
        keywords
    } = job;
    const id = uuidv4();
    const query = `
    INSERT INTO jobs (
        id, 
        company_name, 
        company_logo_url,
        company_id,
        title, 
        category, 
        shift_timings,
        description, 
        street,
        city,
        area,
        pincode,
        location,
        location_link, 
        min_salary, 
        max_salary, 
        skills, 
        language, 
        employment_type, 
        work_type, 
        commission_fee, 
        commission_type, 
        tenure_in_days,
        no_of_openings, 
        status, 
        hiring_need, 
        posted_by,
        qualification,
        min_experience,
        max_experience,
        min_age,
        max_age,
        keywords
        ) VALUES (?, ?, ?, ?, ?, ?, ? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    try {
        const result = await db.query(query, [id, companyName, companyLogoUrl, companyId, title, category, shiftTimings, description, streetAddress, city, area, pincode, (`${streetAddress}, ${area}, ${city}, ${pincode}`), locationLink, minSalary, maxSalary, skills, language, employmentType, workType, commissionFee, commissionType, tenureInDays, noOfOpenings, status, hiringNeed, postedBy, qualification, minExperience, maxExperience, minAge, maxAge, keywords]);

        if (result[0].affectedRows > 0) {
            return assignJobToHMByBDE(id, assignedTo);
        } else {
            return {error: 'Job creation failed'};
        }
    } catch (error) {
        console.log(error)
        return {error: error.message};
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
        companyLogoUrl,
        companyId,
        title,
        category,
        shiftTimings,
        description,
        streetAddress,
        city,
        area,
        pincode,
        locationLink,
        minSalary,
        maxSalary,
        skills,
        language,
        employmentType,
        workType,
        commissionFee,
        commissionType,
        tenureInDays,
        noOfOpenings,
        status,
        hiringNeed,
        assignedTo,
        jobId,
        qualification,
        minExperience,
        maxExperience,
        minAge,
        maxAge,
        keywords
    } = job;
    const query = `
    UPDATE jobs SET
        company_name = ?,
        company_id = ?,
        company_logo_url = ?,
        title = ?,
        category = ?,
        shift_timings = ?,
        description = ?,
        street = ?,
        city = ?,
        area = ?,
        pincode = ?,
        location = ?,
        location_link = ?,
        min_salary = ?,
        max_salary = ?,
        skills = ?,
        language = ?,
        employment_type = ?,
        work_type = ?,
        commission_fee = ?,
        commission_type = ?,
        tenure_in_days = ?,
        no_of_openings = ?,
        status = ?,
        hiring_need = ?,
        qualification = ?,
        min_experience = ?,
        max_experience = ?,
        min_age = ?,
        max_age = ?,
        keywords = ?
    WHERE id = ?`;
    try {
        const result = await db.query(query, [companyName, companyId, companyLogoUrl, title, category, shiftTimings, description, streetAddress, city, area, pincode, (`${streetAddress}, ${area}, ${city}, ${pincode}`), locationLink, minSalary, maxSalary, skills, language, employmentType, workType, commissionFee, commissionType, tenureInDays, noOfOpenings, status, hiringNeed, qualification, minExperience, maxExperience, minAge, maxAge, keywords, jobId]);
        if (result[0].affectedRows > 0) {
            await updateJobAssignmentByBde(jobId, assignedTo);
            return {success: 'Job updated successfully'};
        } else {
            return {error: 'Job updation failed'};
        }
    } catch (error) {
        console.log(error)
        return {error: error.message};
    }
}

const getAssignedSHMsForJob = async (jobId) => {
    const query = 'SELECT * FROM job_assigned_by_bde WHERE job_id = ? AND shm_email IS NOT NULL';
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

const assignJobToHmByShm = async (jobAssignment) => {
    const {jobId, assignedTo, assignedBy} = jobAssignment;
    const assignmentQuery = 'INSERT INTO jobassignments (id, job_id, assigned_to, assigned_by, role) VALUES ';
    let multiAssingmentQuery = '';
    for (let i = 0; i < assignedTo.length; i++) {
        const id = uuidv4();
        multiAssingmentQuery += `('${id}', '${jobId}', '${assignedTo[i]}', '${assignedBy}', 'HM'),`;
    }
    const query = assignmentQuery + multiAssingmentQuery.slice(0, -1);
    const result = await db.query(query);
    if (result[0].affectedRows > 0) {
        return {success: 'Job assigned successfully to HM'};
    } else {
        return {error: 'Job assignment failed'};
    }
}

const assignJobToHrByAccountManager = async (jobAssignment) => {
    const {jobId, assignedTo, assignedBy} = jobAssignment;
    const assignmentQuery = 'INSERT INTO jobassignments (id, job_id, assigned_to, assigned_by, role) VALUES ';
    let multiAssingmentQuery = '';
    for (let i = 0; i < assignedTo.length; i++) {
        const id = uuidv4();
        multiAssingmentQuery += `('${id}', '${jobId}', '${assignedTo[i]}', '${assignedBy}', 'HR'),`;
    }
    const query = assignmentQuery + multiAssingmentQuery.slice(0, -1);
    const result = await db.query(query);
    if (result[0].affectedRows > 0) {
        return {success: 'Job assigned successfully to HR'};
    } else {
        return {error: 'Job assignment failed'};
    }
}

const getAssignedHMsForJob = async (jobId, email) => {
    const query = 'SELECT * FROM jobassignments WHERE job_id = ? AND assigned_by = ? AND role = "HM"';
    const result = await db.query(query, [jobId, email]);
    return result[0];
}


const getAssignedHRsForJob = async (jobId, email) => {
    const query = 'SELECT * FROM jobassignments WHERE job_id = ? AND assigned_by = ? AND role = "HR"';
    const result = await db.query(query, [jobId, email]);
    return result[0];
}

const updateJobAssignmentBySHM = async (jobAssignment) => {
    const {jobId, assignedTo, assignedBy} = jobAssignment;
    const deleteQuery = 'DELETE FROM jobassignments WHERE job_id = ? AND assigned_by = ? AND role = "HM"';
    const deleteResult = await db.query(deleteQuery, [jobId, assignedBy]);
    if (deleteResult[0].affectedRows >= 0) {
        if(assignedTo.length > 0) {
            return assignJobToHmByShm({jobId, assignedTo, assignedBy});
        } else {
            return {success: 'Job assigned successfully to HM'};
        }
    } else {
        return {error: 'Job updation failed'};
    }
}

const updateJobAssignmentByHM = async (jobAssignment) => {
    const {jobId, assignedTo, assignedBy} = jobAssignment;
    const deleteQuery = 'DELETE FROM jobassignments WHERE job_id = ? AND assigned_by = ? AND role = "HR"';
    const deleteResult = await db.query(deleteQuery, [jobId, assignedBy]);
    if (deleteResult[0].affectedRows >= 0) {
        if(assignedTo.length > 0) {
            return assignJobToHrByAccountManager({jobId, assignedTo, assignedBy});
        } else {
            return {success: 'Job assigned successfully to HR'};
        }
    } else {
        return {error: 'Job updation failed'};
    }
}

const getJobsForBDE = async (email, company, location, title, page) => {
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;
    const query = `
        SELECT * FROM jobs 
        WHERE posted_by = ? 
        ${company ? 'AND company_name = ?' : ''}
        ${location ? 'AND city = ?' : ''}
        ${title ? 'AND title = ?' : ''}
        order by created_at desc Limit ? offset ?;`;
    const countQuery = `
        SELECT count(*) as count FROM jobs 
         WHERE posted_by = ?
         ${company ? 'AND company_name = ?' : ''}
         ${location ? 'AND city = ?' : ''}
         ${title ? 'AND title = ?' : ''};`;
    const params = [email]
    if (company) params.push(company);
    if (location) params.push(location);
    if (title) params.push(title);
    params.push(pageSize);
    params.push(startIndex);
    const result = await db.query(query, params);
    const countParams = [email]
    if (company) countParams.push(company);
    if (location) countParams.push(location);
    if (title) countParams.push(title);
    const countResult = await db.query(countQuery, countParams);
    return {jobs: result[0], count: countResult[0][0].count};
}

const getAllJobsForBDE = async (email) => {
    const query = `
    SELECT 
        id,
        company_name,
        title,
        location,
        city,
        area
    FROM jobs 
    WHERE posted_by = ? order by created_at desc;`;
    const result = await db.query(query, [email]);
    return result[0];
}

const getSeniorHMJobs = async (email,company, location, title, page) => {
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;
    const query = `
        SELECT jobs.* 
        FROM jobs INNER JOIN job_assigned_by_bde ON 
        job_assigned_by_bde.job_id = jobs.id 
        WHERE shm_email = ? 
        ${company ? 'AND jobs.company_name = ?' : ''}
        ${location ? 'AND jobs.city = ?' : ''}
        ${title ? 'AND jobs.title = ?' : ''}
        order by created_at desc 
        Limit ? offset ?;`;
    const countQuery = `
        SELECT count(*) as count 
        FROM jobs INNER JOIN job_assigned_by_bde ON
        job_assigned_by_bde.job_id = jobs.id 
        WHERE shm_email = ?
        ${company ? 'AND jobs.company_name = ?' : ''}
        ${location ? 'AND jobs.city = ?' : ''}
        ${title ? 'AND jobs.title = ?' : ''};`;
    const params = [email]
    if (company) params.push(company);
    if (location) params.push(location);
    if (title) params.push(title);
    params.push(pageSize);
    params.push(startIndex);
    const result = await db.query(query, params);
    const countParams = [email]
    if (company) countParams.push(company);
    if (location) countParams.push(location);
    if (title) countParams.push(title);
    const countResult = await db.query(countQuery, countParams);
    return {jobs: result[0], count: countResult[0][0].count};
}

const getAllSeniorHMJobs = async (email) => {
    const query = `
    SELECT 
        jobs.id as id,
        company_name,
        title,
        location,
        city,
        area
    FROM jobs INNER JOIN job_assigned_by_bde 
    ON job_assigned_by_bde.job_id = jobs.id 
    WHERE shm_email = ? order by created_at desc;`;
    const result = await db.query(query, [email]);
    return result[0];
}

const getHmJobs = async (email,company, location, title, page) => {
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;
    const query = `
        SELECT jobs.*
        FROM jobs INNER JOIN jobassignments ON
        jobs.id = jobassignments.job_id
        WHERE jobassignments.assigned_to = ? AND jobassignments.role = 'HM'
        ${company ? 'AND company_name = ?' : ''}
        ${location ? 'AND city = ?' : ''}
        ${title ? 'AND title = ?' : ''}
        order by created_at desc
        Limit ? offset ?;`;
    const countQuery = `
        SELECT count(*) as count 
        FROM jobassignments 
        WHERE assigned_to = ? AND role = "HM"
        ${company ? 'AND company_name = ?' : ''}
        ${location ? 'AND city = ?' : ''}
        ${title ? 'AND title = ?' : ''};`;
    const params = [email]
    if (company) params.push(company);
    if (location) params.push(location);
    if (title) params.push(title);
    params.push(pageSize);
    params.push(startIndex);
    const result = await db.query(query, params);
    const countParams = [email]
    if (company) countParams.push(company);
    if (location) countParams.push(location);
    if (title) countParams.push(title);
    const countResult = await db.query(countQuery, countParams);
    return {jobs: result[0], count: countResult[0][0].count};
}

const getAllHmJobs = async (email) => {
    const query = `
        SELECT
            jobs.id as id,
            company_name,
            title,
            location,
            city,
            area
        FROM jobs
        INNER JOIN jobassignments ON
        jobs.id = jobassignments.job_id
        WHERE jobassignments.assigned_to = ? AND jobassignments.role = 'HM'
        order by created_at desc;`;
    const result = await db.query(query, [email]);
    return result[0];
}

const getHRJobs = async (email,company, location, title, page) => {
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;
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
    WHERE jobassignments.assigned_to = ? AND jobassignments.role = 'HR'
    ${company ? 'AND company_name = ?' : ''}
    ${location ? 'AND city = ?' : ''}
    ${title ? 'AND title = ?' : ''}
    order by jobs.created_at desc
    Limit ? offset ?;`;
    const countQuery = `
        SELECT count(*) as count 
        FROM jobassignments 
        WHERE assigned_to = ? AND role = "HR"
        ${company ? 'AND company_name = ?' : ''}
        ${location ? 'AND city = ?' : ''}
        ${title ? 'AND title = ?' : ''};`;
    const params = [email]
    if (company) params.push(company);
    if (location) params.push(location);
    if (title) params.push(title);
    params.push(pageSize);
    params.push(startIndex);
    const result = await db.query(query, params);
    const countParams = [email]
    if (company) countParams.push(company);
    if (location) countParams.push(location);
    if (title) countParams.push(title);
    const countResult = await db.query(countQuery, countParams);
    return {jobs: result[0], count: countResult[0][0].count};
}

const getAllHRJobs = async (email) => {
    const query = `
    SELECT
        jobs.id as id,
        company_name,
        title,
        location,
        city,
        area
    FROM jobs
    INNER JOIN jobassignments ON
    jobs.id = jobassignments.job_id
    WHERE jobassignments.assigned_to = ? AND jobassignments.role = 'HR'
    order by jobs.created_at desc;`;
    const result = await db.query(query, [email]);
    return result[0];
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
        interviewDate,
        shiftTimings,
        employmentType
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
            skills,
            shift_timings,
            employment_type
            ) VALUES (?, ?, ?, ?, ?, ? ,? ,? ,? ,? ,? ,? ,? ,? ,?, ?, ?)`;
        const result = await db.query(query, [cId, fullName, email, phone, fatherName, dateOfBirth, gender, aadharNumber, highestQualification, currentLocation, spokenLanguages.join(','), experienceInYears, experienceInMonths, jobCategory, skills.join(','), shiftTimings, employmentType]);
        if (result[0].affectedRows > 0) {
            return addApplication(jobId, cId, hrEmail, offerStatus, interviewDate);
        } else {
            return {error: 'Candidate addition failed'};
        }
    } else {
        return addApplication(jobId, candidateResult[0][0].id, hrEmail, offerStatus, interviewDate);
    }
}

const updateInterviewDate = async (candidate) => {
    const {candidateId, jobId, interviewDate, hrEmail, offerStatus} = candidate;
    const applicationQuery = 'SELECT * FROM applications WHERE job_id = ? AND candidate_id = ?';
    const applicationResult = await db.query(applicationQuery, [jobId, candidateId]);
    if (applicationResult[0].length === 0) {
        return addApplication(jobId, candidateId, hrEmail, offerStatus, interviewDate);
    }
    const query = 'UPDATE applications SET interview_date = ? WHERE job_id = ? AND candidate_id = ?';
    const result = await db.query(query, [interviewDate, jobId, candidateId]);
    if (result[0].affectedRows > 0) {
        return {success: 'Candidate interview date updated successfully'};
    } else {         
        return {error: 'Candidate interview date updation failed'};
    }
}

const getjobHREmailAndUsername = async (jobId) => {
    const query = `
        SELECT 
            DISTINCT users.email as email,
            users.username as username
        FROM applications 
        INNER JOIN users ON
        applications.applied_by = users.email
        WHERE applications.job_id = ?`;
    const result = await db.query(query, [jobId]);
    return result[0];
}

const getJobHMEmailAndUsername = async (jobId) => {
    const query = `
        SELECT
            DISTINCT users.email as email,
            users.username as username
        FROM job_assigned_by_bde
        INNER JOIN users ON
        job_assigned_by_bde.hm_email = users.email
        WHERE job_assigned_by_bde.job_id = ?`;
    const result = await db.query(query, [jobId]);
    return result[0];
}

const getJobCandidatesCount = async (jobId, email, offerStatus, fromDate, toDate, search) => {
    const query = `
    SELECT 
        count(*) as count
    FROM candidates 
    INNER JOIN applications ON 
    candidates.id = applications.candidate_id 
    INNER JOIN users ON 
    users.email = applications.applied_by 
    INNER JOIN jobs ON 
    jobs.id = applications.job_id 
    WHERE applications.job_id = ? 
    AND DATE(applications.interview_date) >= ?
    AND DATE(applications.interview_date) < DATE_ADD(?, INTERVAL 1 DAY)
    ${(email !== 'undefined' && email !== "") ? "AND applications.applied_by = ? " : ""}
    ${(offerStatus !== 'undefined' && offerStatus !== "") ? "AND applications.offer_status = ? " : ""}
    ${(search !== 'undefined' && search !== "") ? `AND (candidates.name LIKE '%${search}%' OR candidates.email LIKE '%${search}%' OR candidates.phone LIKE '%${search}%' OR jobs.company_name LIKE '%${search}%')` : ""} 
    order by candidates.created_at desc`;
    const params = (email && offerStatus) ? [jobId, fromDate, toDate, email, offerStatus] : email ? [jobId, fromDate, toDate, email] : (offerStatus ? [jobId, fromDate, toDate, offerStatus] : [jobId, fromDate, toDate])
    const result = await db.query(query, params);
    return result[0][0].count;
}

const getJobCandidates = async (jobId, email, role, offerStatus, fromDate, toDate, search, page) => {
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;
    try {
        const query = `
        SELECT 
            applications.id as application_id,
            candidates.id as candidate_id,
            applications.job_id as job_id,
            users.username as hr_name,
            candidates.name as name,
            candidates.email as email,
            candidates.phone as phone,
            offer_status,
            offered_date,
            applied_by,
            interview_date,
            company_name,
            city,
            area
        FROM candidates 
        INNER JOIN applications ON 
        candidates.id = applications.candidate_id 
        INNER JOIN users ON 
        users.email = applications.applied_by 
        INNER JOIN jobs ON 
        jobs.id = applications.job_id 
        WHERE applications.job_id = ? 
        AND DATE(applications.interview_date) >= ?
        AND DATE(applications.interview_date) < DATE_ADD(?, INTERVAL 1 DAY)
        ${(email !== 'undefined' && email !== "") ? "AND applications.applied_by IN (?) " : ""} 
        ${(offerStatus !== 'undefined' && offerStatus !== "") ? "AND applications.offer_status = ? " : ""} 
        ${(search !== 'undefined' && search !== "") ? `AND (candidates.name LIKE '%${search}%' OR candidates.email LIKE '%${search}%' OR candidates.phone LIKE '%${search}%' OR jobs.company_name LIKE '%${search}%')` : ""} 
        order by applications.interview_date desc 
        LIMIT ? OFFSET ?`;
        let hrEmails = []
        if (role === 'AC') {
            hrEmails = await getHirignManagerHrEmails(email);
        }
        const hrEmailsArr = hrEmails.map(hr => hr.email);
        const params = ((email !== 'undefined' && email !== "") && (offerStatus !== 'undefined' && offerStatus !== "")) ? [jobId, fromDate, toDate, [email, ...hrEmailsArr], offerStatus, pageSize, startIndex] : (email !== 'undefined' && email !== "") ? [jobId, fromDate, toDate, [email, ...hrEmailsArr], pageSize, startIndex] : (offerStatus !== 'undefined' && offerStatus !== "") ? [jobId, fromDate, toDate, offerStatus, pageSize, startIndex] : [jobId, fromDate, toDate, pageSize, startIndex]
        const result = await db.query(query, params);
         hrEmails = await getjobHREmailAndUsername(jobId);
        const count = await getJobCandidatesCount(jobId, email, offerStatus, fromDate, toDate, search);
        return {candidates: result[0], hrList: hrEmails, count};
    } catch (error) {
        console.log(error)
    }
}

const getJobCandidatesForExcel = async (jobId, email, role, offerStatus, fromDate, toDate, search) => {
    const query = `
    SELECT
        applications.id as application_id,
        candidates.id as candidate_id,
        applications.job_id as job_id,
        users.username as hr_name,
        candidates.name as name,
        candidates.email as email,
        candidates.phone as phone,
        offer_status,
        offered_date,
        applied_by,
        interview_date,
        company_name,
        city,
        area
    FROM candidates
    INNER JOIN applications ON
    candidates.id = applications.candidate_id
    INNER JOIN users ON
    users.email = applications.applied_by
    INNER JOIN jobs ON
    jobs.id = applications.job_id
    WHERE applications.job_id = ?
    AND DATE(applications.interview_date) >= ?
    AND DATE(applications.interview_date) < DATE_ADD(?, INTERVAL 1 DAY)
    ${(email !== 'undefined' && email !== "") ? "AND applications.applied_by = ? " : ""}
    ${(offerStatus !== 'undefined' && offerStatus !== "") ? "AND applications.offer_status = ? " : ""}
    ${(search !== 'undefined' && search !== "") ? `AND (candidates.name LIKE '%${search}%' OR candidates.email LIKE '%${search}%' OR candidates.phone LIKE '%${search}%' OR jobs.company_name LIKE '%${search}%')` : ""}
    order by applications.interview_date desc`;
    const params = ((email !== 'undefined' && email !== "") && (offerStatus !== 'undefined' && offerStatus !== "")) ? [jobId, fromDate, toDate, email, offerStatus] : (email !== 'undefined' && email !== "") ? [jobId, fromDate, toDate, email] : (offerStatus !== 'undefined' && offerStatus !== "") ? [jobId, fromDate, toDate, offerStatus] : [jobId, fromDate, toDate]
    const result = await db.query(query, params);
    return result[0];
}

const updateCandidateOfferStatus = async (candidate) => {
    const {candidateId, jobId, email, offerStatus, offeredDate} = candidate;
    const query = 'UPDATE applications SET offer_status = ?, offered_date = ? WHERE job_id = ? AND candidate_id = ? AND applied_by = ?';
    const result = await db.query(query, [offerStatus, offeredDate, jobId, candidateId, email]);
    if (result[0].affectedRows > 0) {
        return {success: 'Candidate offer status updated successfully'};
    } else {         
        return {error: 'Candidate offer status updation failed'};
    }
}

const getBdeShmEmails = async () => {
    const query = `
        SELECT email, username
        FROM users WHERE role = 'SHM'`;
    const result = await db.query(query);
    return result[0];
}

const getSeniorHmHMEmails = async (email) => {
    const query = `
        SELECT
            hm_email as email,
            users.username as username
        FROM hm_assigned_shm INNER JOIN users ON
        hm_assigned_shm.hm_email = users.email
        WHERE shm_email = ?`;
    try {
        const result = await db.query(query, [email]);
        return result[0];
    } catch (error) {
        console.log(error)
    }
}

const getHirignManagerHrEmails = async (email) => {
    const query = `
        SELECT 
            hr_email as email,
            users.username as username
        FROM hrassignedhm INNER JOIN users ON
        hrassignedhm.hr_email = users.email
        WHERE hrassignedhm.hm_email = ?`;
    const result = await db.query(query, [email]);
    return result[0];
}

const getIntitalCandidateCount = async (emails, offerStatus, fromDate, toDate, search) => {
    const query = `
    SELECT 
        count(*) as count
    FROM candidates 
    INNER JOIN applications ON 
    candidates.id = applications.candidate_id 
    INNER JOIN users ON 
    users.email = applications.applied_by 
    INNER JOIN jobs ON 
    jobs.id = applications.job_id 
    WHERE applications.applied_by IN (?) 
    AND DATE(applications.interview_date) >= ?
    AND DATE(applications.interview_date) < DATE_ADD(?, INTERVAL 1 DAY)
    ${(offerStatus !== 'undefined' && offerStatus !== "") ? "AND applications.offer_status = ? " : ""}
    ${(search !== 'undefined' && search !== "") ? `AND (candidates.name LIKE '%${search}%' OR candidates.email LIKE '%${search}%' OR candidates.phone LIKE '%${search}%' OR jobs.company_name LIKE '%${search}%')` : ""}
    order by candidates.created_at desc`;
    let params = [];
    if (offerStatus !== 'undefined' && offerStatus !== "") {
        params = [emails, fromDate, toDate, offerStatus];
    } else {
        params = [emails, fromDate, toDate];
    }
    const result = await db.query(query, params);
    return result[0][0].count;
}

const getInitialCandidates = async (email, offerStatus, fromDate, toDate, role, search, page) => {
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;
    try {
        const query = `
        SELECT 
            applications.id as application_id,
            applications.job_id as job_id,
            candidates.id as candidate_id,
            users.username as hr_name,
            candidates.name as name,
            candidates.email as email,
            candidates.phone as phone,
            offer_status,
            offered_date,
            applied_by,
            interview_date,
            company_name,
            city,
            area
        FROM candidates 
        INNER JOIN applications ON 
        candidates.id = applications.candidate_id 
        INNER JOIN users ON 
        users.email = applications.applied_by 
        INNER JOIN jobs ON 
        jobs.id = applications.job_id 
        WHERE applications.applied_by IN (?)
        AND DATE(applications.interview_date) >= ? 
        AND DATE(applications.interview_date) < DATE_ADD(?, INTERVAL 1 DAY)
        ${(offerStatus !== 'undefined' && offerStatus !== "") ? "AND applications.offer_status = ? " : ""} 
        ${(search !== 'undefined' && search !== "") ? `AND (candidates.name LIKE '%${search}%' OR candidates.email LIKE '%${search}%' OR candidates.phone LIKE '%${search}%' OR jobs.company_name LIKE '%${search}%')` : ""}
        order by applications.interview_date desc 
        Limit ? offset ?`;
        let hrEmails = []
        if (role === 'SHM') {
            const hmEmails = await getSeniorHmHMEmails(email);
            for (const hm of hmEmails) {
                const hrEmailsArr = await getHirignManagerHrEmails(hm.email);
                hrEmails = [...hrEmails, ...hrEmailsArr];
            }
            hrEmails = [...hrEmails, ...hmEmails];
        } else {
            hrEmails = await getHirignManagerHrEmails(email);
        }
        const hrEmailsArr = hrEmails.map(hr => hr.email);
        let params = [];
        if (offerStatus !== 'undefined' && offerStatus !== "" && (role === 'AC' || role === 'SHM')) {
            params = [[email, ...hrEmailsArr], fromDate, toDate, offerStatus, pageSize, startIndex];
        } else if (role === 'AC' || role === 'SHM') {
            params = [[email, ...hrEmailsArr], fromDate, toDate, pageSize, startIndex];
        } else if (offerStatus !== 'undefined' && offerStatus !== "") {
            params = [email, fromDate, toDate, offerStatus, pageSize, startIndex];
        } else {
            params = [email, fromDate, toDate, pageSize, startIndex];
        }
        const result = await db.query(query, params);
        const count = await getIntitalCandidateCount([email, ...hrEmailsArr], offerStatus, fromDate, toDate, search);
        return {candidates: result[0], hrList: hrEmails, count};
    } catch (error) {
        console.log(error)
    }
}

const getInitialCandidatesForExcel = async (email, offerStatus, fromDate, toDate, role, search) => {
    const query = `
    SELECT
        applications.id as application_id,
        applications.job_id as job_id,
        candidates.id as candidate_id,
        users.username as hr_name,
        candidates.name as name,
        candidates.email as email,
        candidates.phone as phone,
        offer_status,
        offered_date,
        applied_by,
        interview_date,
        company_name,
        city,
        area
    FROM candidates
    INNER JOIN applications ON
    candidates.id = applications.candidate_id
    INNER JOIN users ON
    users.email = applications.applied_by
    INNER JOIN jobs ON
    jobs.id = applications.job_id
    WHERE applications.applied_by IN (?)
    AND DATE(applications.interview_date) >= ?
    AND DATE(applications.interview_date) < DATE_ADD(?, INTERVAL 1 DAY)
    ${(offerStatus !== 'undefined' && offerStatus !== "") ? "AND applications.offer_status = ? " : ""}
    ${(search !== 'undefined' && search !== "") ? `AND (candidates.name LIKE '%${search}%' OR candidates.email LIKE '%${search}%' OR candidates.phone LIKE '%${search}%' OR jobs.company_name LIKE '%${search}%')` : ""}
    order by applications.interview_date desc`;
    let hrEmails = []
    if (role === 'SHM') {
        const hmEmails = await getSeniorHmHMEmails(email);
        for (const hm of hmEmails) {
            const hrEmailsArr = await getHirignManagerHrEmails(hm.email);
            hrEmails = [...hrEmails, ...hrEmailsArr];
        }
        hrEmails = [...hrEmails, ...hmEmails];
    } else {
        hrEmails = await getHirignManagerHrEmails(email);
    }
    const hrEmailsArr = hrEmails.map(hr => hr.email);
    let params = [];
    if (offerStatus !== 'undefined' && offerStatus !== "" && (role === 'AC' || role === 'SHM')) {
        params = [[email, ...hrEmailsArr], fromDate, toDate, offerStatus];
    } else if (role === 'AC' || role === 'SHM') {
        params = [[email, ...hrEmailsArr], fromDate, toDate];
    } else if (offerStatus !== 'undefined' && offerStatus !== "") {
        params = [email, fromDate, toDate, offerStatus];
    } else {
        params = [email, fromDate, toDate];
    }
    const result = await db.query(query, params);
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

const getOfferStatusCandidatesVerificationCount = async (
    email,
    hmEmail,
    offerStatus,
    search,
    fromDate,
    toDate,
    jobId
  ) => {
    const appliedBy = Array.isArray(email) ? email : [email, ...hmEmail];
    const offeredOrInterviewDate = (offerStatus === 'Selected' || offerStatus === "Joined") ? 'offered_date' : 'interview_date';
    const query = `
      SELECT 
        SUM(CASE WHEN applications.verification_status = 'Verified' THEN 1 ELSE 0 END) AS verified_count,
        SUM(CASE WHEN applications.verification_status = 'Not Verified' THEN 1 ELSE 0 END) AS not_verified_count,
        SUM(CASE WHEN applications.verification_status = 'Unknown' THEN 1 ELSE 0 END) AS unknown_count,
        SUM(CASE WHEN applications.verification_status IS NULL THEN 1 ELSE 0 END) AS null_count 
      FROM candidates
      INNER JOIN applications ON candidates.id = applications.candidate_id
      INNER JOIN users ON users.email = applications.applied_by
      INNER JOIN jobs ON jobs.id = applications.job_id
      WHERE applications.offer_status = ?
        AND applications.applied_by IN (?) 
        AND DATE(applications.${offeredOrInterviewDate}) >= ? 
        AND DATE(applications.${offeredOrInterviewDate}) < DATE_ADD(?, INTERVAL 1 DAY)
        ${jobId !== 'undefined' && jobId !== "" ? "AND applications.job_id = ?" : ""}
        ${search !== 'undefined' && search !== ""
        ? `AND (candidates.name LIKE '%${search}%' OR candidates.email LIKE '%${search}%' OR candidates.phone LIKE '%${search}%' OR jobs.company_name LIKE '%${search}%')`
        : ""};
    `;
     
      const params = [offerStatus, appliedBy, fromDate, toDate];
      if (jobId !== 'undefined' && jobId !== "") params.push(jobId); 
  
    try {
      const result = await db.query(query, params);
      return result[0][0];
    } catch (error) {
      console.log(error);
      return 0;
    }
};

const getOfferStatusCandidatesCount = async (
    email,
    hmEmail,
    offerStatus,
    search,
    fromDate,
    toDate,
    jobId
  ) => {
    const appliedBy = Array.isArray(email) ? email : [email, ...hmEmail];
    const offeredOrInterviewDate = (offerStatus === 'Selected' || offerStatus === "Joined") ? 'offered_date' : 'interview_date';
    const query = `
      SELECT COUNT(*) as count
      FROM candidates
      INNER JOIN applications ON candidates.id = applications.candidate_id
      INNER JOIN users ON users.email = applications.applied_by
      INNER JOIN jobs ON jobs.id = applications.job_id
      WHERE applications.offer_status = ?
        AND applications.applied_by IN (?) 
        AND DATE(applications.${offeredOrInterviewDate}) >= ? 
        AND DATE(applications.${offeredOrInterviewDate}) < DATE_ADD(?, INTERVAL 1 DAY)
        ${jobId !== 'undefined' && jobId !== "" ? "AND applications.job_id = ?" : ""}
        ${search !== 'undefined' && search !== ""
        ? `AND (candidates.name LIKE '%${search}%' OR candidates.email LIKE '%${search}%' OR candidates.phone LIKE '%${search}%' OR jobs.company_name LIKE '%${search}%')`
        : ""};
    `;
     
      const params = [offerStatus, appliedBy, fromDate, toDate];
      if (jobId !== 'undefined' && jobId !== "") params.push(jobId); 
  
    try {
      const result = await db.query(query, params);
      return result[0][0].count;
    } catch (error) {
      console.log(error);
      return 0;
    }
};

const getOfferStatusCandidates = async (email, hmEmail, offerStatus, role, search, jobId, fromDate, toDate, page) => {
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;
    const offeredOrInterviewDate = (offerStatus === 'Selected' || offerStatus === "Joined") ? 'offered_date' : 'interview_date';
    const query = `
    SELECT 
        applications.id as application_id,
        applications.job_id as job_id,
        candidates.id as candidate_id,
        users.username as hr_name,
        candidates.name as name,
        candidates.phone as phone,
        offered_date,
        applied_by,
        company_name,
        interview_date,
        tenure_in_days,
        tenure_status,
        verification_status,
        city,
        area
    FROM candidates 
    INNER JOIN applications ON 
    candidates.id = applications.candidate_id 
    INNER JOIN users ON 
    users.email = applications.applied_by 
    INNER JOIN jobs ON 
    jobs.id = applications.job_id 
    WHERE applications.offer_status = ?
    AND applications.applied_by IN (?)
    AND DATE(applications.${offeredOrInterviewDate}) >= ? 
    AND DATE(applications.${offeredOrInterviewDate}) < DATE_ADD(?, INTERVAL 1 DAY)
    ${(jobId !== 'undefined' && jobId !== "") ? "AND applications.job_id = ? " : ""}
    ${(search !== 'undefined' && search !== "") ? `AND (candidates.name LIKE '%${search}%' OR candidates.email LIKE '%${search}%' OR candidates.phone LIKE '%${search}%' OR jobs.company_name LIKE '%${search}%')` : ""}
    order by applications.${offeredOrInterviewDate} desc
    Limit ? offset ?`;
    let hrEmails = []
    let hmEmails = []
    if(role === 'SHM') {
        hmEmails = await getSeniorHmHMEmails(hmEmail);
        for (const hm of hmEmails) {
            const hrEmailsArr = await getHirignManagerHrEmails(hm.email);
            hrEmails = [...hrEmails, ...hrEmailsArr];
        }
        hrEmails = [...hrEmails, ...hmEmails];
    } else if (role === 'AC') {
        hrEmails = await getHirignManagerHrEmails(hmEmail);
    }
    let params = [];
    let result = []
    let count = 0;
    let verificationCount = null;
    try {
        if (role === 'SHM') {
            const hrEmailsArr = hrEmails.map(hr => hr.email);
            if ((jobId !== 'undefined' && jobId !== "") && (hmEmail !== email)) {
                params = [offerStatus, [email], fromDate, toDate, jobId, pageSize, startIndex];
            } else if(jobId !== 'undefined' && jobId !== "") {
                params = [offerStatus, [email, ...hrEmailsArr], fromDate, toDate, jobId, pageSize, startIndex];
            } else if(hmEmail !== email) {
                params = [offerStatus, [email], fromDate, toDate, pageSize, startIndex];
            } else {
                params = [offerStatus, [email, ...hrEmailsArr], fromDate, toDate, pageSize, startIndex];
            }
            result = await db.query(query, params);
            count = await getOfferStatusCandidatesCount(email, hrEmailsArr, offerStatus, search, fromDate, toDate, jobId);
            if (offerStatus === 'Joined') {
                verificationCount = await getOfferStatusCandidatesVerificationCount(email, hrEmailsArr, offerStatus, search, fromDate, toDate, jobId);
            }
        } else if(role === 'AC') {
            const hrEmailsArr = hrEmails.map(hr => hr.email);
            if ((jobId !== 'undefined' && jobId !== "") && (hmEmail !== email)) {
                params = [offerStatus, [email], fromDate, toDate, jobId, pageSize, startIndex];
            } else if(jobId !== 'undefined' && jobId !== "") {
                params = [offerStatus, [email, ...hrEmailsArr], fromDate, toDate, jobId, pageSize, startIndex];
            } else if(hmEmail !== email) {
                params = [offerStatus, [email], fromDate, toDate, pageSize, startIndex];
            } else {
                params = [offerStatus, [email, ...hrEmailsArr], fromDate, toDate, pageSize, startIndex];
            }
            result = await db.query(query, params);
            count = await getOfferStatusCandidatesCount(email, hrEmailsArr, offerStatus, search, fromDate, toDate, jobId);
            if (offerStatus === 'Joined') {
                verificationCount = await getOfferStatusCandidatesVerificationCount(email, hrEmailsArr, offerStatus, search, fromDate, toDate, jobId);
            }
        } else {
            if(jobId !== 'undefined' && jobId !== "") {
                params = [offerStatus, email, fromDate, toDate, jobId, pageSize, startIndex];
            } else {
                params = [offerStatus, email, fromDate, toDate, pageSize, startIndex];
            }
            result = await db.query(query, params);
            count = await getOfferStatusCandidatesCount(email, hmEmail, offerStatus, search, fromDate, toDate, jobId);
            if (offerStatus === 'Joined') {
                verificationCount = await getOfferStatusCandidatesVerificationCount(email, hmEmail, offerStatus, search, fromDate, toDate, jobId);
            }
        }
    } catch (error) {
        console.log(error)
    }
    return {candidates: result[0], hrEmails, count, verificationCount};
}

const getOfferStatusCandidatesForExcel = async (email, hmEmail, offerStatus, role, search, jobId, fromDate, toDate,) => {
    const offeredOrInterviewDate = (offerStatus === 'Selected' || offerStatus === "Joined") ? 'offered_date' : 'interview_date';
    const query = `
    SELECT 
        applications.id as application_id,
        applications.job_id as job_id,
        candidates.id as candidate_id,
        users.username as hr_name,
        candidates.name as name,
        candidates.phone as phone,
        offered_date,
        applied_by,
        company_name,
        interview_date,
        tenure_in_days,
        tenure_status,
        verification_status,
        city,
        area
    FROM candidates 
    INNER JOIN applications ON 
    candidates.id = applications.candidate_id 
    INNER JOIN users ON 
    users.email = applications.applied_by 
    INNER JOIN jobs ON 
    jobs.id = applications.job_id 
    WHERE applications.offer_status = ?
    AND applications.applied_by IN (?)
    AND DATE(applications.${offeredOrInterviewDate}) >= ? 
    AND DATE(applications.${offeredOrInterviewDate}) < DATE_ADD(?, INTERVAL 1 DAY)
    ${(jobId !== 'undefined' && jobId !== "") ? "AND applications.job_id = ? " : ""}
    ${(search !== 'undefined' && search !== "") ? `AND (candidates.name LIKE '%${search}%' OR candidates.email LIKE '%${search}%' OR candidates.phone LIKE '%${search}%' OR jobs.company_name LIKE '%${search}%')` : ""}
    order by applications.${offeredOrInterviewDate} desc`;
    let hrEmails = []
    let hmEmails = []
    if(role === 'SHM') {
        hmEmails = await getSeniorHmHMEmails(hmEmail);
        for (const hm of hmEmails) {
            const hrEmailsArr = await getHirignManagerHrEmails(hm.email);
            hrEmails = [...hrEmails, ...hrEmailsArr];
        }
        hrEmails = [...hrEmails, ...hmEmails];
    } else if (role === 'AC') {
        hrEmails = await getHirignManagerHrEmails(hmEmail);
    }
    let params = [];
    let result = []
    try {
        if (role === 'SHM') {
            const hrEmailsArr = hrEmails.map(hr => hr.email);
            if ((jobId !== 'undefined' && jobId !== "") && (hmEmail !== email)) {
                params = [offerStatus, [email], fromDate, toDate, jobId];
            } else if(jobId !== 'undefined' && jobId !== "") {
                params = [offerStatus, [email, ...hrEmailsArr], fromDate, toDate, jobId];
            } else if(hmEmail !== email) {
                params = [offerStatus, [email], fromDate, toDate];
            } else {
                params = [offerStatus, [email, ...hrEmailsArr], fromDate, toDate];
            }
            result = await db.query(query, params);
        } else if(role === 'AC') {
            const hrEmailsArr = hrEmails.map(hr => hr.email);
            if ((jobId !== 'undefined' && jobId !== "") && (hmEmail !== email)) {
                params = [offerStatus, [email], fromDate, toDate, jobId];
            } else if(jobId !== 'undefined' && jobId !== "") {
                params = [offerStatus, [email, ...hrEmailsArr], fromDate, toDate, jobId];
            } else if(hmEmail !== email) {
                params = [offerStatus, [email], fromDate, toDate];
            } else {
                params = [offerStatus, [email, ...hrEmailsArr], fromDate, toDate];
            }
            result = await db.query(query, params);
        } else {
            if(jobId !== 'undefined' && jobId !== "") {
                params = [offerStatus, email, fromDate, toDate, jobId];
            } else {
                params = [offerStatus, email, fromDate, toDate];
            }
            result = await db.query(query, params);
        }
    } catch (error) {
        console.log(error)
    }
    return result[0];
}

const getOfferStatusCandidatesForBDEVerificationCount = async (email, offerStatus, search, jobId, fromDate, toDate) => {
    const offeredOrInterviewDate = (offerStatus === 'Selected' || offerStatus === "Joined") ? 'offered_date' : 'interview_date';
    const query = `
    SELECT 
        SUM(CASE WHEN applications.verification_status = 'Verified' THEN 1 ELSE 0 END) AS verified_count,
        SUM(CASE WHEN applications.verification_status = 'Not Verified' THEN 1 ELSE 0 END) AS not_verified_count,
        SUM(CASE WHEN applications.verification_status = 'Unknown' THEN 1 ELSE 0 END) AS unknown_count,
        SUM(CASE WHEN applications.verification_status IS NULL THEN 1 ELSE 0 END) AS null_count
    FROM candidates 
    INNER JOIN applications ON 
    candidates.id = applications.candidate_id 
    INNER JOIN users ON 
    users.email = applications.applied_by 
    INNER JOIN jobs ON 
    jobs.id = applications.job_id 
    WHERE applications.offer_status = ?
    ${(email !== 'null' && email !== "") ? "AND applications.applied_by IN (?) " : ""}
    AND DATE(applications.${offeredOrInterviewDate}) >= ? 
    AND DATE(applications.${offeredOrInterviewDate}) < DATE_ADD(?, INTERVAL 1 DAY)
    ${(jobId !== 'undefined' && jobId !== "") ? "AND applications.job_id = ? " : ""}
    ${(search !== 'undefined' && search !== "") ? `AND (candidates.name LIKE '%${search}%' OR candidates.email LIKE '%${search}%' OR candidates.phone LIKE '%${search}%' OR jobs.company_name LIKE '%${search}%')` : ""}`;
    let hrEmails = []
    const shmEmails = await getBdeShmEmails();
    if(email !== 'null') {
        
        let hmEmails = []
        const hmEmailsArr = await getSeniorHmHMEmails(email);
        hmEmails = [...hmEmails, ...hmEmailsArr];

        for (const hm of hmEmails) {
            const hrEmailsArr = await getHirignManagerHrEmails(hm.email);
            hrEmails = [...hrEmails, ...hrEmailsArr];
        }
        hrEmails = [...hrEmails, ...hmEmails];
    }
    let params = [];
    let result = []
    try {
        if (email !== 'null') {
            const hrEmailsArr = hrEmails.map(hr => hr.email);
            if ((jobId !== 'undefined' && jobId !== "")) {
                params = [offerStatus, [...hrEmailsArr, email], fromDate, toDate, jobId];
            } else {
                params = [offerStatus, [...hrEmailsArr, email], fromDate, toDate];
            }
            result = await db.query(query, params);
        } else {
            if(jobId !== 'undefined' && jobId !== "") {
                params = [offerStatus, fromDate, toDate, jobId];
            } else {
                params = [offerStatus, fromDate, toDate];
            }
            result = await db.query(query, params);
        }
        return result[0][0];
    } catch (error) {
        console.log(error)
    }        
}

const getOfferStatusCandidatesForBDECount = async (email, offerStatus, search, jobId, fromDate, toDate, verificationStatus) => {
    const offeredOrInterviewDate = (offerStatus === 'Selected' || offerStatus === "Joined") ? 'offered_date' : 'interview_date';
    const query = `
    SELECT 
        count(*) as count
    FROM candidates 
    INNER JOIN applications ON 
    candidates.id = applications.candidate_id 
    INNER JOIN users ON 
    users.email = applications.applied_by 
    INNER JOIN jobs ON 
    jobs.id = applications.job_id 
    WHERE applications.offer_status = ?
    ${(email !== 'null' && email !== "") ? "AND applications.applied_by IN (?) " : ""}
    AND DATE(applications.${offeredOrInterviewDate}) >= ? 
    AND DATE(applications.${offeredOrInterviewDate}) < DATE_ADD(?, INTERVAL 1 DAY)
    ${(jobId !== 'undefined' && jobId !== "") ? "AND applications.job_id = ? " : ""}
    ${(verificationStatus !== 'undefined' && verificationStatus !== "" && verificationStatus !== 'null') ? `AND applications.verification_status = '${verificationStatus}'` : ""}
    ${(verificationStatus === 'null') ? `AND applications.verification_status IS NULL` : ""}
    ${(search !== 'undefined' && search !== "") ? `AND (candidates.name LIKE '%${search}%' OR candidates.email LIKE '%${search}%' OR candidates.phone LIKE '%${search}%' OR jobs.company_name LIKE '%${search}%')` : ""}`;
    let hrEmails = []
    const shmEmails = await getBdeShmEmails();
    if(email !== 'null') {
        
        let hmEmails = []
        const hmEmailsArr = await getSeniorHmHMEmails(email);
        hmEmails = [...hmEmails, ...hmEmailsArr];

        for (const hm of hmEmails) {
            const hrEmailsArr = await getHirignManagerHrEmails(hm.email);
            hrEmails = [...hrEmails, ...hrEmailsArr];
        }
        hrEmails = [...hrEmails, ...hmEmails];
    }
    let params = [];
    let result = []
    try {
        if (email !== 'null') {
            const hrEmailsArr = hrEmails.map(hr => hr.email);
            if ((jobId !== 'undefined' && jobId !== "")) {
                params = [offerStatus, [...hrEmailsArr, email], fromDate, toDate, jobId];
            } else {
                params = [offerStatus, [...hrEmailsArr, email], fromDate, toDate];
            }
            result = await db.query(query, params);
        } else {
            if(jobId !== 'undefined' && jobId !== "") {
                params = [offerStatus, fromDate, toDate, jobId];
            } else {
                params = [offerStatus, fromDate, toDate];
            }
            result = await db.query(query, params);
        }
        return result[0][0].count;
    } catch (error) {
        console.log(error)
    }        
}

const getOfferStatusCandidatesForBDE = async (email, offerStatus, search, jobId, fromDate, toDate, verificationStatus, page) => {
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;
    const offeredOrInterviewDate = (offerStatus === 'Selected' || offerStatus === "Joined") ? 'offered_date' : 'interview_date';
    const query = `
    SELECT 
        applications.id as application_id,
        applications.job_id as job_id,
        candidates.id as candidate_id,
        users.username as hr_name,
        candidates.name as name,
        candidates.phone as phone,
        offered_date,
        applied_by,
        company_name,
        interview_date,
        tenure_in_days,
        tenure_status,
        verification_status,
        city,
        area
    FROM candidates 
    INNER JOIN applications ON 
    candidates.id = applications.candidate_id 
    INNER JOIN users ON 
    users.email = applications.applied_by 
    INNER JOIN jobs ON 
    jobs.id = applications.job_id 
    WHERE applications.offer_status = ?
    ${(email !== 'null' && email !== "") ? "AND applications.applied_by IN (?) " : ""}
    AND DATE(applications.${offeredOrInterviewDate}) >= ? 
    AND DATE(applications.${offeredOrInterviewDate}) < DATE_ADD(?, INTERVAL 1 DAY)
    ${(jobId !== 'undefined' && jobId !== "") ? "AND applications.job_id = ? " : ""}
    ${(verificationStatus !== 'undefined' && verificationStatus !== "" && verificationStatus !== 'null') ? `AND applications.verification_status = '${verificationStatus}'` : ""}
    ${(verificationStatus === 'null') ? `AND applications.verification_status IS NULL` : ""}
    ${(search !== 'undefined' && search !== "") ? `AND (candidates.name LIKE '%${search}%' OR candidates.email LIKE '%${search}%' OR candidates.phone LIKE '%${search}%' OR jobs.company_name LIKE '%${search}%')` : ""}
    order by applications.${offeredOrInterviewDate} desc
    Limit ? offset ?`;
    let hrEmails = []
    const shmEmails = await getBdeShmEmails();
    if(email !== 'null') {
        
        let hmEmails = []
        const hmEmailsArr = await getSeniorHmHMEmails(email);
        hmEmails = [...hmEmails, ...hmEmailsArr];

        for (const hm of hmEmails) {
            const hrEmailsArr = await getHirignManagerHrEmails(hm.email);
            hrEmails = [...hrEmails, ...hrEmailsArr];
        }
        hrEmails = [...hrEmails, ...hmEmails];
    }
    let params = [];
    let result = []
    let count = 0;
    let verificationCount = {}
    try {
        if (email !== 'null') {
            const hrEmailsArr = hrEmails.map(hr => hr.email);
            if ((jobId !== 'undefined' && jobId !== "")) {
                params = [offerStatus, [...hrEmailsArr, email], fromDate, toDate, jobId, pageSize, startIndex];
            } else {
                params = [offerStatus, [...hrEmailsArr, email], fromDate, toDate, pageSize, startIndex];
            }
            result = await db.query(query, params);
            count = await getOfferStatusCandidatesForBDECount(email, offerStatus, search, jobId, fromDate, toDate, verificationStatus);
            verificationCount = await getOfferStatusCandidatesForBDEVerificationCount(email, offerStatus, search, jobId, fromDate, toDate);

        } else {
            if(jobId !== 'undefined' && jobId !== "") {
                params = [offerStatus, fromDate, toDate, jobId, pageSize, startIndex];
            } else {
                params = [offerStatus, fromDate, toDate, pageSize, startIndex];
            }
            result = await db.query(query, params);
            count = await getOfferStatusCandidatesForBDECount(email, offerStatus, search, jobId, fromDate, toDate, verificationStatus);
            verificationCount = await getOfferStatusCandidatesForBDEVerificationCount(email, offerStatus, search, jobId, fromDate, toDate);
        }
    } catch (error) {
        console.log(error)
    }
    return {candidates: result[0], hrEmails: shmEmails, count, verificationCount};
}

const getOfferStatusCandidatesForBDEExcel = async (email, offerStatus, search, jobId, fromDate, toDate, verificationStatus) => {
    const offeredOrInterviewDate = (offerStatus === 'Selected' || offerStatus === "Joined") ? 'offered_date' : 'interview_date';
    const query = `
    SELECT 
        applications.id as application_id,
        applications.job_id as job_id,
        candidates.id as candidate_id,
        users.username as hr_name,
        candidates.name as name,
        candidates.phone as phone,
        offered_date,
        applied_by,
        company_name,
        interview_date,
        tenure_in_days,
        tenure_status,
        verification_status,
        city,
        area
    FROM candidates 
    INNER JOIN applications ON 
    candidates.id = applications.candidate_id 
    INNER JOIN users ON 
    users.email = applications.applied_by 
    INNER JOIN jobs ON 
    jobs.id = applications.job_id 
    WHERE applications.offer_status = ?
    ${(email !== 'null' && email !== "") ? "AND applications.applied_by IN (?) " : ""}
    AND DATE(applications.${offeredOrInterviewDate}) >= ? 
    AND DATE(applications.${offeredOrInterviewDate}) < DATE_ADD(?, INTERVAL 1 DAY)
    ${(jobId !== 'undefined' && jobId !== "") ? "AND applications.job_id = ? " : ""}
    ${(verificationStatus !== 'undefined' && verificationStatus !== "" && verificationStatus !== 'null') ? `AND applications.verification_status = '${verificationStatus}'` : ""}
    ${(verificationStatus === 'null') ? `AND applications.verification_status IS NULL` : ""}
    ${(search !== 'undefined' && search !== "") ? `AND (candidates.name LIKE '%${search}%' OR candidates.email LIKE '%${search}%' OR candidates.phone LIKE '%${search}%' OR jobs.company_name LIKE '%${search}%')` : ""}
    order by applications.${offeredOrInterviewDate} desc`;
    let hrEmails = []
    const shmEmails = await getBdeShmEmails();
    if(email !== 'null') {
        
        let hmEmails = []
        const hmEmailsArr = await getSeniorHmHMEmails(email);
        hmEmails = [...hmEmails, ...hmEmailsArr];

        for (const hm of hmEmails) {
            const hrEmailsArr = await getHirignManagerHrEmails(hm.email);
            hrEmails = [...hrEmails, ...hrEmailsArr];
        }
        hrEmails = [...hrEmails, ...hmEmails];
    }
    let params = [];
    let result = []
    try {
        if (email !== 'null') {
            const hrEmailsArr = hrEmails.map(hr => hr.email);
            if ((jobId !== 'undefined' && jobId !== "")) {
                params = [offerStatus, [...hrEmailsArr, email], fromDate, toDate, jobId];
            } else {
                params = [offerStatus, [...hrEmailsArr, email], fromDate, toDate];
            }
            result = await db.query(query, params);
        } else {
            if(jobId !== 'undefined' && jobId !== "") {
                params = [offerStatus, fromDate, toDate, jobId];
            } else {
                params = [offerStatus, fromDate, toDate];
            }
            result = await db.query(query, params);
        }
        return result[0];
    } catch (error) {
        console.log(error)
    }
}

const updateTenureStatus = async (candidate) => {
    const {applicationId, tenureStatus} = candidate;
    const query = 'UPDATE applications SET tenure_status = ? WHERE id = ?';
    try {
        const result = await db.query(query, [tenureStatus, applicationId]);
        if (result[0].affectedRows > 0) {
            return {success: 'Candidate tenure status updated successfully'};
        } else {         
            return {error: 'Candidate tenure status updation failed'};
        }
    } catch (error) {
        console.log(error)
    }
}

const updateVerificationStatus = async (candidate) => {
    const {applicationId, verificationStatus} = candidate;
    const query = 'UPDATE applications SET verification_status = ? WHERE id = ?';
    try {
        const result = await db.query(query, [verificationStatus, applicationId]);
        if (result[0].affectedRows > 0) {
            return {success: 'Candidate verification status updated successfully'};
        } else {         
            return {error: 'Candidate verification status updation failed'};
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    addJobDetials,
    editJobDetials,
    getAssignedSHMsForJob,
    getJobDetails,
    assignJobToHmByShm,
    assignJobToHrByAccountManager,
    getAssignedHMsForJob,
    getAssignedHRsForJob,
    updateJobAssignmentBySHM,
    updateJobAssignmentByHM,
    getJobsForBDE,
    getAllJobsForBDE,
    getSeniorHMJobs,
    getAllSeniorHMJobs,
    getHmJobs,
    getAllHmJobs,
    getHRJobs,
    getAllHRJobs,
    addCandidateDetailsForJob,
    getJobCandidates,
    getJobCandidatesForExcel,
    updateCandidateOfferStatus,
    getInitialCandidates,
    getInitialCandidatesForExcel,
    getCandidateDetails,
    updateInterviewDate,
    getOfferStatusCandidates,
    getOfferStatusCandidatesForExcel,
    getOfferStatusCandidatesForBDE,
    getOfferStatusCandidatesForBDEExcel,
    updateTenureStatus,
    updateVerificationStatus
}