const model = require('./model');

const controller = {
  /**
   * Get all emails
   */
  getAllEmails: async (req, res, next) => {
    try {
      const response = await model.getEmails();
      res.json(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * Get email by id
   */
  getEmailById: async (req, res, next) => {
    try {
      const response = await model.getEmail(req.params.id);
      res.json(response);
    } catch (err) {
      next(err);
    }
  }

};

module.exports = controller;
