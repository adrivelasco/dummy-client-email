'use strict';

const rp = require('request-promise');
const config = require('../config');

const service = {
  /**
   * Get all users registered on the platform
   * @returns {Promise} Resolve data of users
   */
  getUsers: async () => {
    try {
      const query = await rp({
        method: 'GET',
        uri: `${config.uri}/${config.endpoints.users}`,
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
