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

const getJoinedCandidatesForCompany = async (req, res) => {
    try {
        const { fromDate, toDate, jobId, search, offerStatus } = req.query;
        const page = req.query.page || 1;
        const companyId = req.params.id;
        const candidates = await CompanyService.getJoinedCandidatesForCompany(companyId, fromDate, toDate, jobId, search, offerStatus, page);
        res.status(200).json(candidates);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
}

const getJoinedCandidatesForCompanyForExcel = async (req, res) => {
    try {
        const { fromDate, toDate, jobId, search, offerStatus } = req.query;
        const companyId = req.params.id;
        const candidates = await CompanyService.getJoinedCandidatesForCompanyForExcel(companyId, fromDate, toDate, jobId, search, offerStatus);
        res.status(200).json(candidates);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
}

const getTenureApprovedCandidatesForCompany = async (req, res) => {
    try {
        const { fromDate, toDate, jobId, search } = req.query;
        const page = req.query.page || 1;
        const companyId = req.params.id;
        const candidates = await CompanyService.getTenureApprovedCandidatesForCompany(companyId, fromDate, toDate, jobId, search, page);
        res.status(200).json(candidates);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
}

const getTenureApprovedCandidatesForCompanyForExcel = async (req, res) => {
    try {
        const { fromDate, toDate, jobId, search } = req.query;
        const companyId = req.params.id;
        const candidates = await CompanyService.getTenureApprovedCandidatesForCompanyForExcel(companyId, fromDate, toDate, jobId, search);
        res.status(200).json(candidates);
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
    getCompanyJobs,
    getJoinedCandidatesForCompany,
    getJoinedCandidatesForCompanyForExcel,
    getTenureApprovedCandidatesForCompany,
    getTenureApprovedCandidatesForCompanyForExcel
};