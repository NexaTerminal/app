const express = require('express');
const router = express.Router();

const clientController = require('../controllers/client.controller')

//Employment templates
router.get('/documents/employment/contract', clientController.getEmploymentAgreement);
router.get('/documents/employment/annex-duration', clientController.getEmploymentAnnexDuration);
router.get('/documents/employment/annex-salary', clientController.getEmploymentAnnexSalary);
router.get('/documents/employment/annex-work-position', clientController.getEmploymentAnnexWorkPosition);
router.get('/documents/employment/annual-leave-decision', clientController.getAnnualLeaveDecision);
router.get('/documents/employment/decision-for-disciplinary-measure', clientController.getDisciplinaryMeasure);
router.get('/documents/employment/decision-for-disciplinary-measure-warning', clientController.getDisciplinaryMeasureWarning);
router.get('/documents/employment/termination-agreement', clientController.getTerminationAgreement);
router.get('/documents/employment/termination-warning-letter', clientController.getTerminationWarningLetter);
router.get('/documents/employment/termination-due-to-personal-reasons', clientController.getTerminationDueToPersonalReasons);




module.exports = router;


// // Example route for Employment Contract
// router.get('/employment/contract', (req, res, next) => {
//     res.render('users/clients/documents/employment-agreement', { pageTitle: 'Договор за вработување' });
// });

// Add more routes for other templates
