var express = require('express');
var router = express.Router();
const path = require('path');
var app = express();

/* GET home page. */
router.get('*', function(req, res, next) {
  console.log('*************** url', req.url)
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
  next()
});

module.exports = router;
