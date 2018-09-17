'use strict';

require('dotenv').config();

require('./babel-runtime');

const { logger } = require('./modules');
const app = require('./app');
const config = require('./config');

app.listen(
  config.port,
  () => logger.info(`🚀  Server ready on PORT ${config.port} (${config.env})`)
);
