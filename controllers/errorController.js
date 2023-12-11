const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.keyValue.name;
  console.log('err.keyValue.name: ', err.keyValue.name);
  const message = `Duplicated field value: ${value}. Please use another one`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('  &&  ')}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sentErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: err.status,
      message: err.message,
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    console.log('DEV');
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    console.log('PROD');
    let error = { ...err };
    //Handle Invalid ID
    if (err.name === 'CastError') {
      console.log('TRUE #########################');
      error = handleCastErrorDB(error);
    }
    //Handle Duplicated Fields
    if (err.code === 11000) {
      console.log('err.code', err.code);
      error = handleDuplicateFieldsDB(err);
    }
    //Handle Validations Error
    if ((err.name = 'ValidationError')) {
      error = handleValidationErrorDB(err);
    }
    sentErrorProd(error, res);
  }
};
