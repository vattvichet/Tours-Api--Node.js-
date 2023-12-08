const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const toursRouter = require('./routes/toursRoute');
const usersRouter = require('./routes/usersRoute');

const app = express();

console.log(`######## Environment : ${process.env.NODE_ENV} ########`);
if (process.env.NODE_ENV === 'development') {
  console.log('Environment Development');
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static('./public'));

//Mounting routers
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);

app.all('*', (req, res, next) => {
  //   const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  //   err.status = 'fail';
  //   err.statusCode = 404;
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
