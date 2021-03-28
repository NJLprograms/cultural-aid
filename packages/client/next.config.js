const withTM = require('next-transpile-modules')([
  '@cultural-aid/types',
  '@cultural-aid/core',
]);

module.exports = withTM({
  env: {
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
  },
});
