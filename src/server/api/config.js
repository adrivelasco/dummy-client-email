const config = require('../config');

module.exports = {
  uri: `http://${config.host}:${config.port}/mock`,
  endpoints: {
    emails: 'emails.json'
  }
};
