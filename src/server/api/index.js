const express = require('express');
const httpStatus = require('http-status');

const api = express.Router();

// Error handler
api.use((err, _req, res) => {
  const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  res.status(statusCode).json({ statusCode, message: err });
});

module.exports = api;
