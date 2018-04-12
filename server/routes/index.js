var express = require('express');
var router = express.Router();
const path = require('path');
var app = express();

const userRouter = require('./UserRoutes');
const travelRouter = require('./TravelRoutes');
const expenseRouter = require('./ExpenseRoutes');

router.use('/user/', userRouter);
router.use('/travel/', travelRouter);
router.use('/expense/', expenseRouter);

module.exports = router;
