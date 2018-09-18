const service = require('./service');

const model = {
  /**
   * Tranformed model and return service status code with the emails
   * @returns {Object} List of emails
   */
  getProducts: async () => {
    try {
      const response = await service.getEmails();
      return {
        statusCode: response.statusCode,
        body: response.body
      };
    } catch (error) {
      error.statusCode = error.statusCode || 500;
      throw error;
    }
  }
};

module.exports = model;
