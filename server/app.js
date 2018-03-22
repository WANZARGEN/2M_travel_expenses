const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();

const indexRouter = require('./routes/index');
const userRouter = require('./routes/UserRoutes');
const travelRouter = require('./routes/TravelRoutes');
const expenseRouter = require('./routes/ExpenseRoutes');

app.use(logger('dev'));
app.use(cookieParser());

// Static File Service
app.use(express.static(path.join(__dirname, 'public')));

// Body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Link Routers
app.use('/', indexRouter);
app.use('/api/user/', userRouter);
app.use('/api/travel/', travelRouter);
app.use('/api/expense/', expenseRouter);

module.exports = app;
