if (process.env.BROWSER) {
  throw new Error('Do not import this config file from inside the client-side code.');
}

const config = {
  host: process.env.HOST || '127.0.0.1',
  port: process.env.PORT || '4010',
  http_protocol: process.env.HTTP_PROTOCOL || 'http',
  env: process.env.NODE_ENV || 'development',

  trustProxy: process.env.TRUST_PROXY || 'loopback',

  auth: {
    jwt: {
      secret: process.env.JWT_SECRET || 'dummy'
    },

    credentials: {
      email: process.env.USER_EMAIL || 'test@getsirena.com',
      password: process.env.USER_PASSWORD || 'test'
    }
  },

  app: {
    title: process.env.APP_SITE_NAME || 'Client UI Email',
    description: process.env.APP_SITE_DESCRIPTION || 'Test',
    favicon: process.env.APP_SITE_FAVICON ||
      'https://cdn1.iconfinder.com/data/icons/google_jfk_icons_by_carlosjj/64/googlemail.png'
  }
};

module.exports = config;
