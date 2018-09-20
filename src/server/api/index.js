const express = require('express');
const httpStatus = require('http-status');
const router = require('./router');

const api = express.Router();

// API Routes
api.use(router);

// Error handler
api.use((err, _req, res, _next) => {
  const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  res.status(statusCode).json({
    statusCode,
    message: err.message ? err.message : err
  });
});

module.exports = api;
