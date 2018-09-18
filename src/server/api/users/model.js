const service = require('./service');

const model = {
  /**
   * Tranformed model and return service status code with the emails
   * @returns {Object} List of emails
   */
  login: async ({ email, password }) => {
    try {
      const res = await service.getUsers();
      const foundUser = res.find(user => user.email === email && user.password === password);
      if (!foundUser) {
        throw new Error('Credentials are invalid');
      }
      return {
        statusCode: res.statusCode,
        body: res.body
      };
    } catch (error) {
      error.statusCode = error.statusCode || 500;
      throw error;
    }
  }
};

module.exports = model;
