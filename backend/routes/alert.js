const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alertController');
const { Router } = require('express');

router.get('/get', alertController.getAlerts);

module.exports = router;
