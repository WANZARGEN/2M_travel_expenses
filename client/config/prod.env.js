'use strict'
var ip = require('ip');
module.exports = {
  NODE_ENV: '"production"',
  baseURI: '"http://' + ip.address() + ':3000"',
  exchangeURI: '"https://openexchangerates.org/api/"',
  appId: '"de0ac08850bb4c2a8eb573c120c5b74f"'
}