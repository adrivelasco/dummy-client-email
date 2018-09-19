const express = require('express');
const emailsController = require('./emails/controller');
const usersController = require('./users/controller');

const router = express.Router();

router.post('/login', usersController.login);
router.post('/logout', usersController.logout);

router.get('/emails', emailsController.getAllEmails);
router.get('/emails/:id', emailsController.getEmailById);

module.exports = router;
