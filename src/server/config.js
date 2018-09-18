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
    }
  }
};

module.exports = config;
