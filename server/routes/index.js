var express = require('express');
var router = express.Router();
const path = require('path');
var app = express();

/* GET home page. */
router.get('*', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

module.exports = router;
