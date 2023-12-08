const express = require('express');
const morgan = require('morgan');

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
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

module.exports = app;
