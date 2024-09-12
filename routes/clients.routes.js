const express = require('express');
const router = express.Router();

const clientController = require('../controllers/client.controller')

router.get('/documents', clientController.getDocuments);

router.get('/my-documents', clientController.getMyDocuments);

router.get('/lhc', clientController.getLhc);

router.get('/legal-updates', clientController.getLegalUpdates);

router.get('/business-calendar', clientController.getBusinessCalendar);


router.post('/requested-consultation', clientController.requestedConsultation)

module.exports = router;



