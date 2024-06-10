const { v4: uuidv4 } = require('uuid');
const db = require('../config/database');

const getAllJobs = async (page) => {
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;
    const query = `SELECT * FROM jobs where status != 'ARCHIVED' order by created_at desc Limit ? offset ?;`;
    const countQuery = 'SELECT count(*) as count FROM jobs where status != "ARCHIVED";';
    try {
        const result = await db.query(query, [pageSize, startIndex]);
        const countResult = await db.query(countQuery);
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
    const query = 'SELECT hm_email FROM job_assigned_by_bde WHERE job_id = ?';
    try {
        const result = await db.query(query, [jobId]);
        return result[0];
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

module.exports = {
    getAllJobs,
    getJobDetails,
    addPublicApplicationForJob,
    getPublicApplications,
    getPublicApplicationsForExcel,
    deletePublicApplication
}