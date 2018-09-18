'use strict';

require('dotenv').config();

require('./babel-runtime');

const { logger } = require('./modules');
const app = require('./app');
const config = require('./config');

app.listen(
  config.port,
  () => logger.info(`🚀  Server ready at ${config.http_protocol}://${config.host}:${config.port} (${config.env})`)
);
