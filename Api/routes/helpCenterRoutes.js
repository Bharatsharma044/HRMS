const helpCenterController = require("../controller/helpCenterController");
const express = require("express");
const router = express.Router();

router.route('/createTicket').post(helpCenterController.createTicket);
router.route('/list').get(helpCenterController.getTickets);
router.route('/update').put(helpCenterController.updateTicket);
router.route('/delete').delete(helpCenterController.deleteTicket);
router.route('/getTicketById').get(helpCenterController.getTicketById);
router.route('/multiDelete').delete(helpCenterController.multiDelete);
router.route('/search').get(helpCenterController.searchHelpCenter);

module.exports = router;

