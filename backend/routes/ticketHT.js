const express = require("express");
const router = express.Router();
const {
  getAssignedPhoneTickets,
  getAssignedFieldTickets,
  getAssignedTickets,
  getReportedFieldTickets,
} = require("../controllers/ticketController");
const requireAuth = require("../middleware/requireAuth");
router.use(requireAuth);
router.get("/approved/all", getAssignedTickets);
router.get("/assigned/phone", getAssignedPhoneTickets);
router.get("/assigned/field", getAssignedFieldTickets);
router.get("/reported/field", getReportedFieldTickets);

module.exports = router;
