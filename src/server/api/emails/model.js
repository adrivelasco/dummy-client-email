const service = require('./service');

const model = {
  /**
   * Tranformed model and return service status code with the emails
   * @returns {Object} List of emails
   */
  getEmails: async () => {
    try {
      const res = await service.getEmails();
      return {
        statusCode: res.statusCode,
        body: res.body
      };
    } catch (error) {
      error.statusCode = error.statusCode || 500;
      throw error;
    }
  },

  /**
   * Transformed model and return service data with email
   * @param {String|Number} id - Email id
   */
  getEmail: async (id) => {
    try {
      const res = await service.getEmails();
      const foundEmail = res.find(email => email.id === id);
      if (!foundEmail) {
        throw new Error('Email ID is invalid');
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
