const { v4: uuidv4 } = require('uuid');
const db = require('../config/database');

const getComapniesCount = async (search) => {
    try {
        const query = `SELECT COUNT(*) AS count FROM companies ${search ? `WHERE name LIKE '%${search}%'` : ''};`;
        const result = await db.query(query);
        return result[0][0].count;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getCompanies = async (search, page) => {
    try {
        const pageSize = 10;
        const startIndex = (page - 1) * pageSize;
        const query = `
            SELECT * FROM companies 
            ${search ? `WHERE name LIKE '%${search}%'` : ''}
            ORDER BY name ASC, created_at DESC
            ${page ? "LIMIT ? OFFSET ?" : ""}
        `;
        const result = await db.query(query, [pageSize, startIndex]);
        let count = 0;
        if (search !== undefined) {
            count = await getComapniesCount(search);
        }
        return { companies: result[0], count };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getCompaniesForExcel = async (search) => {
    try {
        const query = `SELECT * FROM companies ${search ? `WHERE name LIKE '%${search}%'` : ''} ORDER BY name ASC, created_at DESC;`;
        const result = await db.query(query);
        return result[0];
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getCompanyById = async (id) => {
    try {
        const query = 'SELECT * FROM companies WHERE id = ?;';
        const result = await db.query(query, [id]);
        if (result[0].length) {
            return result[0];
        } else {
            const error = new Error('Company not found');
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const createCompany = async (company) => {
    try {
        const { name, companyLogoUrl, registeredAddress, address, phone, email, gstNo, spocName, spocEmail, spocPhone } = company;
        const companyExists = await getCompanies(name, 1);
        if (companyExists.companies.length) {
            const error = new Error('Company already exists');
            error.statusCode = 400;
            throw error;
        }

        const id = uuidv4();
        const query = 'INSERT INTO companies (id, name, logo_url, registered_address, address, phone, email, gst_no, spoc_name, spoc_email, spoc_phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
        const result = await db.query(query, [id, name, companyLogoUrl, registeredAddress, address, phone, email, gstNo, spocName, spocEmail, spocPhone]);
        if (result[0].affectedRows) {
            return { message: 'Company created successfully', id };
        } else {
            const error = new Error('Failed to create company');
            error.statusCode = 500;
            throw error;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const updateCompany = async (id, company) => {
    try {
        await getCompanyById(id);

        const { name, companyLogoUrl, registeredAddress, address, phone, email, gstNo, spocName, spocEmail, spocPhone } = company;
        const query = 'UPDATE companies SET name = ?, logo_url = ?, registered_address = ?, address = ?, phone = ?, email = ?, gst_no = ?, spoc_name = ?, spoc_email = ?, spoc_phone = ? WHERE id = ?;';
        const result = await db.query(query, [name, companyLogoUrl, registeredAddress, address, phone, email, gstNo, spocName, spocEmail, spocPhone, id]);
        if (result[0].affectedRows) {
            return { message: 'Company details updated successfully' };
        } else {
            const error = new Error('Failed to update company details');
            error.statusCode = 500;
            throw error;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const deleteCompany = async (id) => {
    try {
        await getCompanyById(id);

        const query = 'DELETE FROM companies WHERE id = ?;';
        const result = await db.query(query, [id]);
        if (result[0].affectedRows) {
            return { message: 'Company deleted successfully' };
        } else {
            const error = new Error('Failed to delete company');
            error.statusCode = 500;
            throw error;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getCompanyJobs = async (id) => {
    try {
        const query = `
            SELECT * FROM jobs 
            WHERE company_id = ?
            ORDER BY created_at DESC;
        `;
        const result = await db.query(query, [id]);
        return result[0];
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getJoinedCandidatesForCompanyCount = async (companyId, fromDate, toDate, jobId, search, offerStatus) => {
    try {
        const query = `
            SELECT COUNT(*) AS count
            FROM companies 
            INNER JOIN jobs ON companies.id = jobs.company_id
            INNER JOIN applications ON jobs.id = applications.job_id
            INNER JOIN candidates ON applications.candidate_id = candidates.id
            WHERE companies.id = ? AND applications.offer_status ${offerStatus !== '' ? '= ?' : "IN ('Joined', 'Selected')"}
            ${search === "" ?
                `AND DATE(applications.offered_date) >= ?
                AND DATE(applications.offered_date) < DATE_ADD(?, INTERVAL 1 DAY)`
            : ""}
            ${(jobId !== undefined && jobId !== '') ? 'AND applications.job_id = ?' : ''}
            ${(search !== undefined && search !== '') ? `AND (candidates.name LIKE '%${search}%' OR candidates.email LIKE '%${search}%' OR candidates.phone LIKE '%${search}%')` : ''};
        `;

        const params = [companyId];
        if (offerStatus !== '') {
            params.push(offerStatus);
        }
        if (search === "") {
            params.push(fromDate, toDate);
        }
        if (jobId !== undefined && jobId !== '') {
            params.push(jobId);
        }
        const result = await db.query(query, params);
        return result[0][0].count;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getJoinedCandidatesForCompany = async (companyId, fromDate, toDate, jobId, search, offerStatus, page) => {
    try {
        const pageSize = 10;
        const startIndex = (page - 1) * pageSize;

        const query = `
            SELECT 
                applications.id as application_id,
                candidates.id as candidate_id,
                candidates.name, 
                candidates.father_name, 
                candidates.email, 
                candidates.phone, 
                candidates.current_location,
                jobs.area as job_area, 
                jobs.city as job_city, 
                interview_date, 
                offer_status, 
                offered_date, 
                verification_status,
                tenure_status,
                is_tenure_approved,
                tenure_in_days
            FROM companies 
            INNER JOIN jobs ON companies.id = jobs.company_id
            INNER JOIN applications ON jobs.id = applications.job_id
            INNER JOIN candidates ON applications.candidate_id = candidates.id
            WHERE companies.id = ? AND applications.offer_status ${offerStatus !== '' ? '= ?' : "IN ('Joined', 'Selected')"} 
            ${search === "" ?
            `AND DATE(applications.offered_date) >= ?
            AND DATE(applications.offered_date) < DATE_ADD(?, INTERVAL 1 DAY)`
            : ""}
            ${(jobId !== undefined && jobId !== '') ? 'AND applications.job_id = ?' : ''}
            ${(search !== undefined && search !== '') ? `AND (candidates.name LIKE '%${search}%' OR candidates.email LIKE '%${search}%' OR candidates.phone LIKE '%${search}%')` : ''}
            ORDER BY applications.offered_date DESC
            LIMIT ? OFFSET ?;
        `;

        const params = [companyId];
        if (offerStatus !== '') {
            params.push(offerStatus);
        }
        if (search === "") {
            params.push(fromDate, toDate);
        }
        if (jobId !== undefined && jobId !== '') {
            params.push(jobId);
        }
        params.push(pageSize, startIndex);
        const result = await db.query(query, params);
        const count = await getJoinedCandidatesForCompanyCount(companyId, fromDate, toDate, jobId, search, offerStatus);
        const companyJobList = await getCompanyJobs(companyId);
        return { candidatesList: result[0], count, companyJobList};
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getJoinedCandidatesForCompanyForExcel = async (companyId, fromDate, toDate, jobId, search, offerStatus) => {
    try {
        const query = `
            SELECT 
                candidates.name, 
                candidates.father_name, 
                candidates.email, 
                candidates.phone, 
                candidates.current_location,
                candidates.date_of_birth,
                jobs.area as job_area, 
                jobs.city as job_city, 
                interview_date, 
                offer_status, 
                offered_date, 
                verification_status
            FROM companies 
            INNER JOIN jobs ON companies.id = jobs.company_id
            INNER JOIN applications ON jobs.id = applications.job_id
            INNER JOIN candidates ON applications.candidate_id = candidates.id
            WHERE companies.id = ? AND applications.offer_status ${offerStatus !== '' ? '= ?' : "IN ('Joined', 'Selected')"}
            ${search === "" ?
                `AND DATE(applications.offered_date) >= ?
                AND DATE(applications.offered_date) < DATE_ADD(?, INTERVAL 1 DAY)`
            : ""}
            ${(jobId !== undefined && jobId !== '') ? 'AND applications.job_id = ?' : ''}
            ${(search !== undefined && search !== '') ? `AND (candidates.name LIKE '%${search}%' OR candidates.email LIKE '%${search}%' OR candidates.phone LIKE '%${search}%')` : ''}
            ORDER BY applications.offered_date DESC;
        `;

        const params = [companyId];
        if (offerStatus !== '') {
            params.push(offerStatus);
        }
        if (search === "") {
            params.push(fromDate, toDate);
        }
        if (jobId !== undefined && jobId !== '') {
            params.push(jobId);
        }
        const result = await db.query(query, params);
        return result[0];
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getTenureApprovedCandidatesForCompanyCount = async (companyId, fromDate, toDate, jobId, search) => {
    try {
        const query = `
            SELECT count(*) as count,
            SUM(commission_received) as total_commission
            FROM companies 
            INNER JOIN jobs ON companies.id = jobs.company_id
            INNER JOIN applications ON jobs.id = applications.job_id
            INNER JOIN candidates ON applications.candidate_id = candidates.id
            INNER JOIN tenure_approved ON tenure_approved.application_id = applications.id
            WHERE companies.id = ? AND applications.is_tenure_approved = 'Approved'
            ${search === "" ?
                `AND DATE(applications.offered_date) >= ?
                AND DATE(applications.offered_date) < DATE_ADD(?, INTERVAL 1 DAY)`
            : ""}
            ${(jobId !== undefined && jobId !== '') ? 'AND applications.job_id = ?' : ''}
            ${(search !== undefined && search !== '') ? `AND (candidates.name LIKE '%${search}%' OR candidates.email LIKE '%${search}%' OR candidates.phone LIKE '%${search}%' OR tenure_approved.employee_id LIKE '%${search}%')` : ''}
        `;
        const params = [companyId];
        if (search === "") {
            params.push(fromDate, toDate);
        }
        if (jobId !== undefined && jobId !== '') {
            params.push(jobId);
        }
        const result = await db.query(query, params);
        return result[0][0];
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getTenureApprovedCandidatesForCompany = async (companyId, fromDate, toDate, jobId, search, page) => {
    try {
        const pageSize = 10;
        const startIndex = (page - 1) * pageSize;
        const query = `
            SELECT 
                candidates.id as candidate_id,
                candidates.name, 
                candidates.father_name, 
                candidates.email, 
                candidates.phone, 
                candidates.current_location,
                jobs.area as job_area, 
                jobs.city as job_city, 
                interview_date, 
                offered_date, 
                tenure_approved.id as tenure_approved_id,
                tenure_approved.employee_id as employee_id,
                tenure_approved.position_name as position_name,
                tenure_approved.salary as salary,
                tenure_approved.commission_received as commission_received
            FROM companies 
            INNER JOIN jobs ON companies.id = jobs.company_id
            INNER JOIN applications ON jobs.id = applications.job_id
            INNER JOIN candidates ON applications.candidate_id = candidates.id
            INNER JOIN tenure_approved ON tenure_approved.application_id = applications.id
            WHERE companies.id = ? AND applications.is_tenure_approved = 'Approved'
            ${search === "" ?
                `AND DATE(applications.offered_date) >= ?
                AND DATE(applications.offered_date) < DATE_ADD(?, INTERVAL 1 DAY)`
            : ""}
            ${(jobId !== undefined && jobId !== '') ? 'AND applications.job_id = ?' : ''}
            ${(search !== undefined && search !== '') ? `AND (candidates.name LIKE '%${search}%' OR candidates.email LIKE '%${search}%' OR candidates.phone LIKE '%${search}%' OR tenure_approved.employee_id LIKE '%${search}%')` : ''}
            ORDER BY applications.offered_date DESC
            LIMIT ? OFFSET ?;
        `;

        const params = [companyId];
        if (search === "") {
            params.push(fromDate, toDate);
        }
        if (jobId !== undefined && jobId !== '') {
            params.push(jobId);
        }
        params.push(pageSize, startIndex);
        const result = await db.query(query, params);
        const companyJobList = await getCompanyJobs(companyId);
        const count = await getTenureApprovedCandidatesForCompanyCount(companyId, fromDate, toDate, jobId, search);
        return { candidatesList: result[0], companyJobList, count };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getTenureApprovedCandidatesForCompanyForExcel = async (companyId, fromDate, toDate, jobId, search) => {
    try {
        const query = `
            SELECT 
                candidates.name, 
                candidates.father_name, 
                candidates.email, 
                candidates.phone, 
                candidates.current_location,
                jobs.area as job_area, 
                jobs.city as job_city, 
                interview_date, 
                offered_date, 
                tenure_approved.id as tenure_approved_id,
                tenure_approved.employee_id as employee_id,
                tenure_approved.position_name as position_name,
                tenure_approved.salary as salary,
                tenure_approved.commission_received as commission_received
            FROM companies 
            INNER JOIN jobs ON companies.id = jobs.company_id
            INNER JOIN applications ON jobs.id = applications.job_id
            INNER JOIN candidates ON applications.candidate_id = candidates.id
            INNER JOIN tenure_approved ON tenure_approved.application_id = applications.id
            WHERE companies.id = ? AND applications.is_tenure_approved = 'Approved'
            ${search === "" ?
                `AND DATE(applications.offered_date) >= ?
                AND DATE(applications.offered_date) < DATE_ADD(?, INTERVAL 1 DAY)`
            : ""}
            ${(jobId !== undefined && jobId !== '') ? 'AND applications.job_id = ?' : ''}
            ${(search !== undefined && search !== '') ? `AND (candidates.name LIKE '%${search}%' OR candidates.email LIKE '%${search}%' OR candidates.phone LIKE '%${search}%' OR tenure_approved.employee_id LIKE '%${search}%')` : ''};
        `;

        const params = [companyId];
        if (search === "") {
            params.push(fromDate, toDate);
        }
        if (jobId !== undefined && jobId !== '') {
            params.push(jobId);
        }
        const result = await db.query(query, params);
        return result[0];
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    getCompanies,
    getCompaniesForExcel,
    getCompanyById,
    createCompany,
    updateCompany,
    deleteCompany,
    getCompanyJobs,
    getJoinedCandidatesForCompany,
    getJoinedCandidatesForCompanyForExcel,
    getTenureApprovedCandidatesForCompany,
    getTenureApprovedCandidatesForCompanyForExcel
};