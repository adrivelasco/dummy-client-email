'use strict';

const rp = require('request-promise');
const config = require('../config');

const service = {
  /**
   * Get all emails
   * @returns {Promise} Resolve data emails or reject error
   */
  getEmails: async () => {
    try {
      const query = await rp({
        method: 'GET',
        uri: `${config.uri}/${config.endpoints.emails}`,
        json: true,
        resolveWithFullResponse: true
      });
      return Promise.resolve(query);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

module.exports = service;
