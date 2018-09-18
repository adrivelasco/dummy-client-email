const model = require('./model');

const controller = {
  /**
   * Login user
   */
  login: async (req, res, next) => {
    try {
      const response = await model.login(req.body);
      res.json(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * Logout user
   */
  logout: async (req, res, next) => {
    try {
      const response = await model.logout();
      res.json(response);
    } catch (err) {
      next(err);
    }
  }

};

module.exports = controller;
