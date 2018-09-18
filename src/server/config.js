const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || '4010',

  api: {
    basepath: '/mocks',
    endpoints: {
      emails: 'emails',
      users: 'users'
    }
  }
};

module.exports = config;
