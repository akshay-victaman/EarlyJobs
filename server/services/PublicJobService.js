const { v4: uuidv4 } = require('uuid');
const db = require('../config/database');

const getAllJobs = async (company, location, title, search, page) => {
    const pageSize = 20;
    const startIndex = (page - 1) * pageSize;
    const query = `
        SELECT * FROM jobs 
        where status != 'ARCHIVED'
        ${company && search === '' ? 'AND company_name = ?' : ''}
        ${location && search === '' ? 'AND city = ?' : ''}
        ${title && search === '' ? 'AND title = ?' : ''}
        ${search ? 'AND (title LIKE ? OR company_name LIKE ? OR city LIKE ? OR keywords LIKE ?)' : ''}
        order by created_at desc Limit ? offset ?;`;
    const countQuery = `
        SELECT count(*) as count FROM jobs
        where status != 'ARCHIVED'
        ${company && search === '' ? 'AND company_name = ?' : ''}
        ${location && search === '' ? 'AND city = ?' : ''}
        ${title && search === '' ? 'AND title = ?' : ''}
        ${search ? 'AND (title LIKE ? OR company_name LIKE ? OR city LIKE ? OR keywords LIKE ?)' : ''}`;
    try {
        let params = [];
        if(company && search === '') params.push(company);
        if(location && search === '') params.push(location);
        if(title && search === '') params.push(title);
        const searchQuery = `%${search}%`;
        if(search) params = [searchQuery, searchQuery, searchQuery, searchQuery];
        params.push(pageSize);
        params.push(startIndex);
        const result = await db.query(query, params);
        let countParams = [];
        if(company && search === '') countParams.push(company);
        if(location && search === '') countParams.push(location);
        if(title && search === '') countParams.push(title);
        if(search) countParams = [searchQuery, searchQuery, searchQuery, searchQuery];
        const countResult = await db.query(countQuery, countParams);
        return {jobs: result[0], count: countResult[0][0].count};
    } catch (error) {
        return {error: error.message};
    }
}

const getJobDetails = async (jobId) => {
    const query = 'SELECT * FROM jobs WHERE id = ?';
    try {
        const result = await db.query(query, [jobId]);
        if (result[0].length > 0) {
            return result[0][0];
        } else {
            return {error: 'Job not found'};
        }
    } catch (error) {
        return {error: error.message};
    }
}

const getAssignedHMsForJob = async (jobId) => {
    const shmQuery = 'SELECT shm_email FROM job_assigned_by_bde WHERE job_id = ?';
    const hmQuery = 'SELECT assigned_to FROM jobassignments WHERE role = "HM" AND job_id = ?';
    try {
        let result1 = await db.query(shmQuery, [jobId]);
        let result2 = await db.query(hmQuery, [jobId]);
        result1 = result1[0].map(shm => ({hm_email: shm.shm_email}));
        result2 = result2[0].map(hm => ({hm_email: hm.assigned_to}));
        const result = result1.concat(result2);
        return result;
    } catch (error) {
        return {error: error.message};
    }
}

const getPublicApplicationForJob = async (jobId, email, phone) => {
    const query = 'SELECT * FROM public_applications WHERE job_id = ? AND (email = ? OR phone = ?)';
    try {
        const result = await db.query(query, [jobId, email, phone]);
        if (result[0].length > 0) {
            return result[0][0];
        } else {
            const error = new Error('Application not found');
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        return {error: error.message};
    }
}

const getPublicApplicationForJobApproved = async (jobId, email, phone) => {
    const query = `SELECT * FROM candidates 
        INNER JOIN applications ON candidates.id = applications.candidate_id
        WHERE job_id = ? AND (email = ? OR phone = ?)`;
    try {
        const result = await db.query(query, [jobId, email, phone]);
        if (result[0].length > 0) {
            return result[0][0];
        } else {
            const error = new Error('Application not found');
            error.statusCode = 404;
            throw error;
        }
    }
    catch (error) {
        return {error: error.message};
    }
}
    

const addPublicApplicationForJob = async (applicationData) => {
    const {
        jobId,
        fullName,
        email,
        phone,
        fatherName,
        offerStatus,
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
        shiftTimings,
        employmentType,
    } = applicationData;

    const hmEmails = await getAssignedHMsForJob(jobId);
    const hmEmailsString = hmEmails.map(hm => hm.hm_email).join(',');
    
    const query = `
        INSERT INTO public_applications 
        (id, job_id, name, email, phone, father_name, offer_status, date_of_birth, gender, aadhar_number, highest_qualification, current_location, spoken_languages, experience_in_years, experience_in_months, skills, job_category, shift_timings, employment_type, hm_emails) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    try {
        const application = await getPublicApplicationForJob(jobId, email, phone);
        const existingApplication = await getPublicApplicationForJobApproved(jobId, email, phone);
        if(application.error === undefined || existingApplication.error === undefined) {
            const error = new Error('Application already exists');
            error.statusCode = 409;
            throw error;
        }

        const result = await db.query(query, [uuidv4(), jobId, fullName, email, phone, fatherName, offerStatus, dateOfBirth, gender, aadharNumber, highestQualification, currentLocation, spokenLanguages.join(","), experienceInYears, experienceInMonths, skills.join(","), jobCategory, shiftTimings, employmentType, hmEmailsString]);
        if(result[0].affectedRows > 0) {
            return {success: "Application submitted successfully"};
        }
        else {
            return {error: "Application submission failed"};
        }
    } catch (error) {
        return {error: error.message};
    }
}

const getPublicApplications = async (jobId, email, search, createdTo, createdFrom, page) => {
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;
    const query = `
        SELECT public_applications.*, company_name, title 
        FROM public_applications 
        INNER JOIN jobs ON public_applications.job_id = jobs.id
        WHERE 
        ${search === "" ?
        `DATE(public_applications.created_at) >= ? 
        AND DATE(public_applications.created_at) < DATE_ADD(?, INTERVAL 1 DAY)`
        : ""}
        AND is_rejected = 0
        AND hm_emails LIKE ?
        ${jobId ? 'AND job_id = ?' : ''}
        ${search ? 'AND (name LIKE ? OR email LIKE ? OR phone LIKE ?)' : ''}
        order by created_at desc Limit ? offset ?;`;
    const countQuery = `
        SELECT count(*) as count FROM public_applications INNER JOIN jobs ON public_applications.job_id = jobs.id
        WHERE 
        ${search === "" ?
        `DATE(public_applications.created_at) >= ?
        AND DATE(public_applications.created_at) < DATE_ADD(?, INTERVAL 1 DAY)`
        : ""}
        AND is_rejected = 0
        AND hm_emails LIKE ?
        ${jobId ? 'AND job_id = ?' : ''}
        ${search ? 'AND (name LIKE ? OR email LIKE ? OR phone LIKE ?)' : ""}
        `;
    try {
        let params = [`%${email}%`];
        if (search === "") {
            params.splice(0, 0, createdFrom, createdTo);
        }
        if(jobId) {
            params.push(jobId);
        }
        if (search) {
            params.push(`%${search}%`);
            params.push(`%${search}%`);
            params.push(`%${search}%`);
        }
        params.push(pageSize);
        params.push(startIndex);
        const result = await db.query(query, params);
        let countParams = [`%${email}%`];
        if (search === "") {
            countParams.splice(0, 0, createdFrom, createdTo);
        }
        if(jobId) {
            countParams.push(jobId);
        }
        if (search) {
            countParams.push(`%${search}%`);
            countParams.push(`%${search}%`);
            countParams.push(`%${search}%`);
        }
        const countResult = await db.query(countQuery, countParams);
        return {applications: result[0], count: countResult[0][0].count};
    } catch (error) {
        console.log(error);
        return {error: error.message};
    }
}

const getPublicApplicationsForExcel = async (jobId, email, search, createdTo, createdFrom) => {
    const query = `
        SELECT public_applications.*, company_name, title 
        FROM public_applications 
        INNER JOIN jobs ON public_applications.job_id = jobs.id
        WHERE 
        ${search === "" ?
        `DATE(public_applications.created_at) >= ? 
        AND DATE(public_applications.created_at) < DATE_ADD(?, INTERVAL 1 DAY)`
        : ""}
        AND is_rejected = 0
        AND hm_emails LIKE ?
        ${jobId ? 'AND job_id = ?' : ''}
        ${search ? 'AND (name LIKE ? OR email LIKE ? OR phone LIKE ?)' : ''}
        order by created_at desc;`;
    try {
        let params = [`%${email}%`];
        if (search === "") {
            params.splice(0, 0, createdFrom, createdTo);
        }
        if(jobId) {
            params.push(jobId);
        }
        if (search) {
            params.push(`%${search}%`);
            params.push(`%${search}%`);
            params.push(`%${search}%`);
        }
        const result = await db.query(query, params);
        return result[0];
    } catch (error) {
        return {error: error.message};
    }
}

const getPublicApplicationsForBDECount = async (jobId, search, createdTo, createdFrom) => {
    const query = `
        SELECT count(*) as count 
        FROM applications 
        INNER JOIN candidates ON applications.candidate_id = candidates.id
        INNER JOIN jobs ON applications.job_id = jobs.id
        WHERE
        is_public_application = 1
        ${jobId ? 'AND job_id = ?' : ''}
        ${search ? 'AND (name LIKE ? OR email LIKE ? OR phone LIKE ?)' : ''}
        ${search === "" ?
        `AND DATE(applications.created_at) >= ?
        AND DATE(applications.created_at) < DATE_ADD(?, INTERVAL 1 DAY)`
        : ""}`;
    try {
        let params = [];
        if(jobId) {
            params.push(jobId);
        }
        if (search) {
            params.push(`%${search}%`);
            params.push(`%${search}%`);
            params.push(`%${search}%`);
        }
        if (search === "") {
            params.push(createdFrom);
            params.push(createdTo);
        }
        const result = await db.query(query, params);
        return result[0][0].count;
    } catch (error) {
        return {error: error.message};
    }
}

const getPublicApplicationsForBDE = async (jobId, search, createdTo, createdFrom, page) => {
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;
    const query = `
        SELECT candidates.*, company_name, title, applications.applied_by 
        FROM applications 
        INNER JOIN candidates ON applications.candidate_id = candidates.id
        INNER JOIN jobs ON applications.job_id = jobs.id
        WHERE
        is_public_application = 1
        ${jobId ? 'AND job_id = ?' : ''}
        ${search ? 'AND (name LIKE ? OR email LIKE ? OR phone LIKE ?)' : ''}
        ${search === "" ?
        `AND DATE(applications.created_at) >= ?
        AND DATE(applications.created_at) < DATE_ADD(?, INTERVAL 1 DAY)`
        : ""}
        order by created_at desc
        Limit ? offset ?;`;
    try {
        let params = [];
        if(jobId) {
            params.push(jobId);
        }
        if (search) {
            params.push(`%${search}%`);
            params.push(`%${search}%`);
            params.push(`%${search}%`);
        }
        if (search === "") {
            params.push(createdFrom);
            params.push(createdTo);
        }
        params.push(pageSize);
        params.push(startIndex);
        const result = await db.query(query, params);
        const count = await getPublicApplicationsForBDECount(jobId, search, createdTo, createdFrom);
        return {applications: result[0], count: count};
    } catch (error) {
        return {error: error.message};
    }
}

const getPublicApplicationsForBDEExcel = async (jobId, search, createdTo, createdFrom) => {
    const query = `
        SELECT candidates.*, company_name, title, applications.applied_by 
        FROM applications 
        INNER JOIN candidates ON applications.candidate_id = candidates.id
        INNER JOIN jobs ON applications.job_id = jobs.id
        WHERE
        is_public_application = 1
        ${jobId ? 'AND job_id = ?' : ''}
        ${search ? 'AND (name LIKE ? OR email LIKE ? OR phone LIKE ?)' : ''}
        ${search === "" ?
        `AND DATE(applications.created_at) >= ?
        AND DATE(applications.created_at) < DATE_ADD(?, INTERVAL 1 DAY)`
        : ""}
        order by created_at desc;
        `;
    try {
        let params = [];
        if(jobId) {
            params.push(jobId);
        }
        if (search) {
            params.push(`%${search}%`);
            params.push(`%${search}%`);
            params.push(`%${search}%`);
        }
        if (search === "") {
            params.push(createdFrom);
            params.push(createdTo);
        }
        const result = await db.query(query, params);
        return result[0];
    } catch (error) {
        return {error: error.message};
    }
}

const rejectPublicApplication = async (applicationId, hrEmail) => {
    const query = 'UPDATE public_applications SET is_rejected = 1, rejected_by = ? WHERE id = ?';
    try {
        const result = await db.query(query, [hrEmail, applicationId]);
        if(result[0].affectedRows > 0) {
            return {success: "Application deleted successfully"};
        }
        else {
            return {error: "Application deletion failed"};
        }
    } catch (error) {
        return {error: error.message};
    }
}

const deletePublicApplication = async (applicationId) => {
    const query = 'DELETE FROM public_applications WHERE id = ?';
    try {
        const result = await db.query(query, [applicationId]);
        if(result[0].affectedRows > 0) {
            return {success: "Application deleted successfully"};
        }
        else {
            return {error: "Application deletion failed"};
        }
    } catch (error) {
        return {error: error.message};
    }
}

const getRejectedApplicationsCount = async (jobId, email, search, createdTo, createdFrom) => {
    const query = `
        SELECT count(*) as count
        FROM public_applications 
        INNER JOIN jobs ON public_applications.job_id = jobs.id
        WHERE
        is_rejected = 1
        AND rejected_by = ?
        ${jobId ? 'AND job_id = ?' : ''}
        ${search ? 'AND (name LIKE ? OR email LIKE ? OR phone LIKE ?)' : ''}
        ${search === "" ?
        `AND DATE(public_applications.created_at) >= ?
        AND DATE(public_applications.created_at) < DATE_ADD(?, INTERVAL 1 DAY)`
        : ""}
        `;
    try {
        let params = [email];
        if(jobId) {
            params.push(jobId);
        }
        if (search) {
            params.push(`%${search}%`);
            params.push(`%${search}%`);
            params.push(`%${search}%`);
        }
        if (search === "") {
            params.push(createdFrom);
            params.push(createdTo);
        }
        const result = await db.query(query, params);
        return result[0][0].count;
    } catch (error) {
        return {error: error.message};
    }
}

const getRejectedApplications = async (jobId, email, search, createdTo, createdFrom, page) => {
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;
    const query = `
        SELECT public_applications.*, company_name, title 
        FROM public_applications 
        INNER JOIN jobs ON public_applications.job_id = jobs.id
        WHERE
        is_rejected = 1
        AND rejected_by = ?
        ${jobId ? 'AND job_id = ?' : ''}
        ${search ? 'AND (name LIKE ? OR email LIKE ? OR phone LIKE ?)' : ''}
        ${search === "" ?
        `AND DATE(public_applications.created_at) >= ?
        AND DATE(public_applications.created_at) < DATE_ADD(?, INTERVAL 1 DAY)`
        : ""}
        order by created_at desc
        Limit ? offset ?;`;
    try {
        let params = [email];
        if(jobId) {
            params.push(jobId);
        }
        if (search) {
            params.push(`%${search}%`);
            params.push(`%${search}%`);
            params.push(`%${search}%`);
        }
        if (search === "") {
            params.push(createdFrom);
            params.push(createdTo);
        }
        params.push(pageSize);
        params.push(startIndex);
        const result = await db.query(query, params);
        const count = await getRejectedApplicationsCount(jobId, email, search, createdTo, createdFrom);
        return {applications: result[0], count: count};
    } catch (error) {
        return {error: error.message};
    }
}

const getRejectedApplicationsExcel = async (jobId, email, search, createdTo, createdFrom) => {
    const query = `
        SELECT public_applications.*, company_name, title 
        FROM public_applications 
        INNER JOIN jobs ON public_applications.job_id = jobs.id
        WHERE
        is_rejected = 1
        AND rejected_by = ?
        ${jobId ? 'AND job_id = ?' : ''}
        ${search ? 'AND (name LIKE ? OR email LIKE ? OR phone LIKE ?)' : ''}
        ${search === "" ?
        `AND DATE(public_applications.created_at) >= ?
        AND DATE(public_applications.created_at) < DATE_ADD(?, INTERVAL 1 DAY)`
        : ""}
        order by created_at desc;`;
    try {
        let params = [email];
        if(jobId) {
            params.push(jobId);
        }
        if (search) {
            params.push(`%${search}%`);
            params.push(`%${search}%`);
            params.push(`%${search}%`);
        }
        if (search === "") {
            params.push(createdFrom);
            params.push(createdTo);
        }
        const result = await db.query(query, params);
        return result[0];
    } catch (error) {
        return {error: error.message};
    }
}

const getApprovedApplicationsCount = async (jobId, email, search, createdTo, createdFrom) => {
    const query = `
        SELECT count(*) as count
        FROM applications 
        INNER JOIN candidates ON applications.candidate_id = candidates.id
        INNER JOIN jobs ON applications.job_id = jobs.id
        WHERE
        applied_by = ?
        AND is_public_application = 1
        ${jobId ? 'AND job_id = ?' : ''}
        ${search ? 'AND (name LIKE ? OR email LIKE ? OR phone LIKE ?)' : ''}
        ${search === "" ?
        `AND DATE(applications.created_at) >= ?
        AND DATE(applications.created_at) < DATE_ADD(?, INTERVAL 1 DAY)`
        : ""}
        `;
    try {
        let params = [email];
        if(jobId) {
            params.push(jobId);
        }
        if (search) {
            params.push(`%${search}%`);
            params.push(`%${search}%`);
            params.push(`%${search}%`);
        }
        if (search === "") {
            params.push(createdFrom);
            params.push(createdTo);
        }
        const result = await db.query(query, params);
        return result[0][0].count;
    } catch (error) {
        return {error: error.message};
    }
}

const getApprovedApplications = async (jobId, email, search, createdTo, createdFrom, page) => {
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;
    const query = `
        SELECT candidates.*, company_name, title 
        FROM applications 
        INNER JOIN candidates ON applications.candidate_id = candidates.id
        INNER JOIN jobs ON applications.job_id = jobs.id
        WHERE
        applied_by = ?
        AND is_public_application = 1
        ${jobId ? 'AND job_id = ?' : ''}
        ${search ? 'AND (name LIKE ? OR email LIKE ? OR phone LIKE ?)' : ''}
        ${search === "" ?
        `AND DATE(applications.created_at) >= ?
        AND DATE(applications.created_at) < DATE_ADD(?, INTERVAL 1 DAY)`
        : ""}
        order by created_at desc
        Limit ? offset ?;`;
    try {
        let params = [email];
        if(jobId) {
            params.push(jobId);
        }
        if (search) {
            params.push(`%${search}%`);
            params.push(`%${search}%`);
            params.push(`%${search}%`);
        }
        if (search === "") {
            params.push(createdFrom);
            params.push(createdTo);
        }
        params.push(pageSize);
        params.push(startIndex);
        const result = await db.query(query, params);
        const count = await getApprovedApplicationsCount(jobId, email, search, createdTo, createdFrom);
        return {applications: result[0], count: count};
    } catch (error) {
        console.log(error)
        return {error: error.message};
    }
}

const getApprovedApplicationsExcel = async (jobId, email, search, createdTo, createdFrom) => {
    const query = `
        SELECT candidates.*, company_name, title 
        FROM applications 
        INNER JOIN candidates ON applications.candidate_id = candidates.id
        INNER JOIN jobs ON applications.job_id = jobs.id
        WHERE
        applied_by = ?
        AND is_public_application = 1
        ${jobId ? 'AND job_id = ?' : ''}
        ${search ? 'AND (name LIKE ? OR email LIKE ? OR phone LIKE ?)' : ''}
        ${search === "" ?
        `AND DATE(applications.created_at) >= ?
        AND DATE(applications.created_at) < DATE_ADD(?, INTERVAL 1 DAY)`
        : ""}
        order by created_at desc;`;
    try {
        let params = [email];
        if(jobId) {
            params.push(jobId);
        }
        if (search) {
            params.push(`%${search}%`);
            params.push(`%${search}%`);
            params.push(`%${search}%`);
        }
        if (search === "") {
            params.push(createdFrom);
            params.push(createdTo);
        }
        const result = await db.query(query, params);
        return result[0];
    } catch (error) {
        return {error: error.message};
    }
}
    
const getCompanyListWithJobCount = async () => {
    const query = `
        SELECT company_name, count(*) as count FROM jobs
        WHERE status != 'ARCHIVED'
        GROUP BY company_name
        ORDER BY count desc, company_name asc;`;
    try {
        const result = await db.query(query);
        return result[0];
    } catch (error) {
        return {error: error.message};
    }
}

const getLocationListWithJobCount = async () => {
    const query = `
        SELECT city, count(*) as count FROM jobs
        WHERE status != 'ARCHIVED'
        GROUP BY city
        ORDER BY count desc, city asc;`;
    try {
        const result = await db.query(query);
        return result[0];
    } catch (error) {
        return {error: error.message};
    }
}

const getTitleListWithJobCount = async () => {
    const query = `
        SELECT title, count(*) as count FROM jobs
        WHERE status != 'ARCHIVED'
        GROUP BY title
        ORDER BY count desc, title asc;`;
    try {
        const result = await db.query(query);
        return result[0];
    } catch (error) {
        return {error: error.message};
    }
}

const getLocationTitleAndCompanyListWithJobCount = async () => {
    const companyList = await getCompanyListWithJobCount();
    const locationList = await getLocationListWithJobCount();
    const titleList = await getTitleListWithJobCount();
    return {companyList, locationList, titleList};
}

module.exports = {
    getAllJobs,
    getJobDetails,
    addPublicApplicationForJob,
    getPublicApplications,
    getPublicApplicationsForExcel,
    getPublicApplicationsForBDE,
    getPublicApplicationsForBDEExcel,
    rejectPublicApplication,
    deletePublicApplication,
    getRejectedApplications,
    getRejectedApplicationsExcel,
    getApprovedApplications,
    getApprovedApplicationsExcel,
    getLocationTitleAndCompanyListWithJobCount
}