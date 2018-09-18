const service = require('./service');
const jwt = require('jsonwebtoken');
const config = require('../../config');

const model = {
  /**
   * Tranformed model and return service status code with the emails
   * @returns {Object} List of emails
   */
  login: async ({ email, password }) => {
    try {
      const res = await service.getUsers();
      const user = res.find(user =>
        // Compare credentials
        user.email === email && user.password === password);

      if (!user) {
        throw new Error('Credentials are invalid');
      }

      // Generate jsonwebtoken
      jwt.sign({ email, password }, config.auth.secret, (err, token) => {
        if (err) {
          throw new Error(err);
        }
        return {
          statusCode: res.statusCode,
          body: {
            logged: true,
            token
          }
        };
      });
    } catch (error) {
      error.statusCode = error.statusCode || 500;
      throw error;
    }
  }
};

module.exports = model;
