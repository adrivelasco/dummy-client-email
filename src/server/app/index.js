'use strict';

const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const sanitized = require('express-sanitized');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const router = require('./router');
const config = require('../config');

const app = express();
const isProduction = config.env === 'production';

global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

if (!isProduction) {
  app.use(morgan('dev'));
  app.enable('trust proxy');
}

app.disable('x-powered-by');
app.use(cookieParser());
app.use(sanitized());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());

app.use(router);

module.exports = app;