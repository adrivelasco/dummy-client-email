'use strict';

// Babel register for read ES6
const fs = require('fs');
const babelrc = fs.readFileSync('./.babelrc');

let babelConfig;

try {
  babelConfig = JSON.parse(babelrc);

  // Babel includes a polyfill that includes a custom regenerator runtime and core-js.
  require('babel-polyfill');

  // The require hook will bind itself to node's require and automatically compile files on the fly.
  require('babel-register')(babelConfig);

  // All transformations will use your local configuration files (.babelrc or in package.json).
  require('babel-core').transform('code', babelConfig);
} catch (err) {
  console.error('==> ERROR: Error parsing your .babelrc.');
  console.error(err);
}
