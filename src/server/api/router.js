const express = require('express');
const emailsController = require('./emails/controller');

const router = express.Router();

router.get('/emails', emailsController.getAllEmails);
router.get('/emails/:id', emailsController.getEmailById);

module.exports = router;
