const express = require('express');
const CompanyController = require('../controllers/CompanyController')
const authenticateToken = require('../middleware/authenticationMiddleware');

const router = express.Router();

router.get('/', authenticateToken, CompanyController.getCompanies);
router.get('/excel', authenticateToken, CompanyController.getCompaniesForExcel);
router.get('/:id', authenticateToken, CompanyController.getCompanyById);
router.post('/', authenticateToken, CompanyController.createCompany);
router.put('/:id', authenticateToken, CompanyController.updateCompany);
router.delete('/:id', authenticateToken, CompanyController.deleteCompany);
router.get('/:id/jobs', authenticateToken, CompanyController.getCompanyJobs);
router.get('/:id/candidates', authenticateToken, CompanyController.getJoinedCandidatesForCompany);
router.get('/:id/candidates/excel', authenticateToken, CompanyController.getJoinedCandidatesForCompanyForExcel);
router.get('/:id/candidates/tenure-approved', authenticateToken, CompanyController.getTenureApprovedCandidatesForCompany);
router.get('/:id/candidates/tenure-approved/excel', authenticateToken, CompanyController.getTenureApprovedCandidatesForCompanyForExcel);

module.exports = router;