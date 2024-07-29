const express = require('express');
const router = express.Router();
const contratController = require('../controllers/contratController');
const { Router } = require('express');
router.post('/add',contratController.addContrat)
router.delete('/:contratId',contratController.deleteContrat)
router.get('/liste', contratController.fetchContrats);
router.get('/:contratId', contratController.viewContratById
);
router.put('/:contratId',contratController.updateContrat)
//router.put('/:contratId/attachments',contratController.updateAttachments);

module.exports = router;
