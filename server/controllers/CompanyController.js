const CompanyService = require('../services/CompanyService');

const getCompanies = async (req, res) => {
    try {
        const { search, page } = req.query;
        const companies = await CompanyService.getCompanies(search, page);
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getCompaniesForExcel = async (req, res) => {
    try {
        const { search } = req.query;
        const companies = await CompanyService.getCompaniesForExcel(search);
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getCompanyById = async (req, res) => {
    try {
        const { id } = req.params;
        const company = await CompanyService.getCompanyById(id);
        res.status(200).json(company);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
}

const createCompany = async (req, res) => {
    try {
        const company = req.body;
        const result = await CompanyService.createCompany(company);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const company = req.body;
        const result = await CompanyService.updateCompany(id, company);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
}

const deleteCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await CompanyService.deleteCompany(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
}

const getCompanyJobs = async (req, res) => {
    try {
        const jobs = await CompanyService.getCompanyJobs(req.params.id);
        res.status(200).json(jobs);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
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