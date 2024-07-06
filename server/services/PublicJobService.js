const { v4: uuidv4 } = require('uuid');
const db = require('../config/database');

const getAllJobs = async (company, location, title, page) => {
    const pageSize = 20;
    const startIndex = (page - 1) * pageSize;
    const query = `
        SELECT * FROM jobs 
        where status != 'ARCHIVED'
        ${company ? 'AND company_name = ?' : ''}
        ${location ? 'AND city = ?' : ''}
        ${title ? 'AND title = ?' : ''}
        order by created_at desc Limit ? offset ?;`;
    const countQuery = `
        SELECT count(*) as count FROM jobs
        where status != 'ARCHIVED'
        ${company ? 'AND company_name = ?' : ''}
        ${location ? 'AND city = ?' : ''}
        ${title ? 'AND title = ?' : ''};`;
    try {
        let params = [];
        if(company) params.push(company);
        if(location) params.push(location);
        if(title) params.push(title);
        params.push(pageSize);
        params.push(startIndex);

        // if(company && location && title) {
        //     params = [company, location, title, pageSize, startIndex];
        // } else if(company) {
        //     params = [company, pageSize, startIndex];
        // } else if(location) {
        //     params = [location, pageSize, startIndex];
        // } else if(title) {
        //     params = [title, pageSize, startIndex];
        // } else {
        //     params = [pageSize, startIndex];
        // }
        const result = await db.query(query, params);
        let countParams = [];
        // if(company && location) {
        //     countParams = [company, location];
        // } else if(company) {
        //     countParams = [company];
        // } else if(location) {
        //     countParams = [location];
        // }
        if(company) countParams.push(company);
        if(location) countParams.push(location);
        if(title) countParams.push(title);
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
    console.log(hmEmails)
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
        SELECT public_applications.*, company_name, title FROM public_applications INNER JOIN jobs ON public_applications.job_id = jobs.id
        WHERE DATE(public_applications.created_at) >= ? 
        AND DATE(public_applications.created_at) < DATE_ADD(?, INTERVAL 1 DAY)
        AND hm_emails LIKE ?
        ${jobId ? 'AND job_id = ?' : ''}
        ${search ? 'AND (name LIKE ? OR email LIKE ? OR phone LIKE ?)' : ''}
        order by created_at desc Limit ? offset ?;`;
    const countQuery = `
        SELECT count(*) as count FROM public_applications INNER JOIN jobs ON public_applications.job_id = jobs.id
        WHERE DATE(public_applications.created_at) >= ?
        AND DATE(public_applications.created_at) < DATE_ADD(?, INTERVAL 1 DAY)
        AND hm_emails LIKE ?
        ${jobId ? 'AND job_id = ?' : ''}
        ${search ? 'AND (name LIKE ? OR email LIKE ? OR phone LIKE ?)' : ""}
        `;
    try {
        let params = [createdFrom, createdTo, `%${email}%`];
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
        let countParams = [createdFrom, createdTo, `%${email}%`];
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
        SELECT public_applications.*, company_name, title FROM public_applications INNER JOIN jobs ON public_applications.job_id = jobs.id
        WHERE DATE(public_applications.created_at) >= ? 
        AND DATE(public_applications.created_at) < DATE_ADD(?, INTERVAL 1 DAY)
        AND hm_emails LIKE ?
        ${jobId ? 'AND job_id = ?' : ''}
        ${search ? 'AND (name LIKE ? OR email LIKE ? OR phone LIKE ?)' : ''}
        order by created_at desc;`;
    try {
        let params = [createdFrom, createdTo, `%${email}%`];
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
    deletePublicApplication,
    getLocationTitleAndCompanyListWithJobCount
}