const model = require('./model');

const controller = {
  /**
   * Login user
   */
  login: async (req, res, next) => {
    try {
      const response = await model.login(req.body);

      // Save access-token on session
      req.session.token = response.token;

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

      // Remove access-token from session
      delete req.session.token;

      res.json(response);
    } catch (err) {
      next(err);
    }
  }

};

module.exports = controller;
