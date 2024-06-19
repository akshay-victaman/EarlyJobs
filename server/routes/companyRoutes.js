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

module.exports = router;