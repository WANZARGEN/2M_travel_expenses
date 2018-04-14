require('dotenv').config()

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
var history = require('connect-history-api-fallback');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const app = express();
app.use(history());

const indexRouter = require('./routes/index');

app.use(logger('dev'));

// Session
// app.use(cookieParser());
app.use(session({
  secret: '@#@$MYSIGN#@$#$',
  resave: false,
  saveUninitialized: true,
  // store: new MongoStore({ url: process.env.MONGO_URI })
 }));

  

// Set cross-origin
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Origin, Accept, Content-Type, Authorization, Access-Control-Allow-Origin, X-Requested-With");
  next();
});


// Static File Service
app.use(express.static(path.join(__dirname, 'public')));

// Body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Link Routers
app.use('/api/', indexRouter);


module.exports = app;
