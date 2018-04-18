'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
var ip = require('ip');

prodEnv.baseURI = '"http://' + ip.address() + ':3000"'
prodEnv.exchangeURI = '"https://openexchangerates.org/api/"'
prodEnv.appId = '"de0ac08850bb4c2a8eb573c120c5b74f"'

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
