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
        const { name, registeredAddress, address, phone, email, gstNo, spocName, spocEmail, spocPhone } = company;
        const companyExists = await getCompanies(name, 1);
        if (companyExists.companies.length) {
            const error = new Error('Company already exists');
            error.statusCode = 400;
            throw error;
        }

        const id = uuidv4();
        const query = 'INSERT INTO companies (id, name, registered_address, address, phone, email, gst_no, spoc_name, spoc_email, spoc_phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
        const result = await db.query(query, [id, name, registeredAddress, address, phone, email, gstNo, spocName, spocEmail, spocPhone]);
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

        const { name, registeredAddress, address, phone, email, gstNo, spocName, spocEmail, spocPhone } = company;
        const query = 'UPDATE companies SET name = ?, registered_address = ?, address = ?, phone = ?, email = ?, gst_no = ?, spoc_name = ?, spoc_email = ?, spoc_phone = ? WHERE id = ?;';
        const result = await db.query(query, [name, registeredAddress, address, phone, email, gstNo, spocName, spocEmail, spocPhone, id]);
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

module.exports = {
    getCompanies,
    getCompaniesForExcel,
    getCompanyById,
    createCompany,
    updateCompany,
    deleteCompany,
    getCompanyJobs
};