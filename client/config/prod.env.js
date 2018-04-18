'use strict'
const publicIp = require('public-ip');
publicIp.v4().then(ip => {
  console.log(ip);
  module.exports = {
    NODE_ENV: '"production"',
    baseURI: '"http://' + ip + ':3000"',
    exchangeURI: '"https://openexchangerates.org/api/"',
    appId: '"de0ac08850bb4c2a8eb573c120c5b74f"'
  }
});
