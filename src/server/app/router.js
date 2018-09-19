const path = require('path');
const express = require('express');
const history = require('connect-history-api-fallback');

const api = require('../api');
const ssrMiddleware = require('../middleware/ssr');

const router = express.Router();

// API Routes
router.use('/api', api);
router.use('/mock', express.static(path.resolve(__dirname, '../../../mock')));

// Middleware to proxy requests through a specified index page,
// useful for SPA that utilise the HTML5 History API.
router.use(history());

// APP Routes
router.use('/static', express.static(path.resolve(__dirname, '../../../build/static')));
router.get('*', ssrMiddleware);

module.exports = router;
