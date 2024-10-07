const express = require('express');
const consultancyController = require('../controller/consultancyController');
const router = express.Router();

router.route('/create').post(consultancyController.createConsultancy);
router.route('/getAll').get(consultancyController.getConsultancy);
router.route('/getbyid').get(consultancyController.getConsultancyById);
router.route('/update').put(consultancyController.updateConsultancy);
router.route('/delete').delete(consultancyController.deleteConsultancy);
router.route('/multiDelete').delete(consultancyController.multiDelete);
router.route('/search').get(consultancyController.searchConsultancy);

module.exports = router;
