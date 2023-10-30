const express = require('express');
const morgan = require('morgan');

const toursRouter = require('./routes/toursRoute');
const usersRouter = require('./routes/usersRoute');

const app = express();

app.use(morgan('dev'));
app.use(express.json())


//Mounting routers
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter)

module.exports = app;