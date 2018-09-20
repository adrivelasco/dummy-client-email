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
      req.session.email = response.email;

      res.json(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * Logout user
   */
  logout: (req, res, next) => {
    try {
      const response = model.logout();

      // Remove access-token and email from session
      delete req.session.token;
      delete req.session.email;

      res.json(response);
    } catch (err) {
      next(err);
    }
  }

};

module.exports = controller;
