'use strict';

const winston = require('winston');

const { printf, combine, colorize } = winston.format;

winston.addColors({
  error: 'red',
  debug: 'blue',
  warn: 'yellow',
  data: 'grey',
  info: 'green',
  verbose: 'cyan',
  silly: 'magenta'
});

/**
 * Add time to the log message
 */
const jsonFormatter = (logEntry) => {
  const json = { timestamp: new Date(), ...logEntry };
  const today = new Date();
  const day = today.toISOString().split('T')[0];
  const hours = today.getUTCHours();
  const minutes = today.getUTCMinutes();

  logEntry['message'] = `[${day} ${hours}:${minutes} UTC]: ${json.message}`;

  return logEntry;
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      colorize: true
    })
  ],
  levels: {
    error: 0,
    debug: 1,
    warn: 2,
    data: 3,
    info: 4,
    verbose: 5,
    silly: 6
  },
  format: combine(
    colorize(),
    winston.format(jsonFormatter)(),
    printf((info) => `${info.level}: ${info.message}`)
  )
});

module.exports = logger;
