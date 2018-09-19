const jwt = require('jsonwebtoken');
const config = require('../../config');

const model = {
  /**
   * Tranformed model and return service status code with the login
   * @returns {Object} Login user
   */
  login: ({ email, password }) => {
    try {
      if (email !== config.auth.credentials.email ||
        password !== config.auth.credentials.password) {
        throw new Error('Credentials are invalid');
      }

      // Generate jsonwebtoken
      const token = jwt.sign({ email, password }, config.auth.jwt.secret);

      return {
        statusCode: 200,
        body: {
          logged: true,
          email,
          token
        }
      };
    } catch (error) {
      error.statusCode = error.statusCode || 500;
      throw error;
    }
  },

  /**
   * Tranformed model of the logout user
   * @returns {Object} Logout user data
   */
  logout: () => {
    return {
      statusCode: 200,
      body: {
        logged: false
      }
    };
  }
};

module.exports = model;
