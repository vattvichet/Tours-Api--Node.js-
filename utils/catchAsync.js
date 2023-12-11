const catchAsync = (fn) => {
  return (req, res, next) => {
    console.log('Gone through catchAsync!');
    fn(req, res, next).catch(next);
  };
};

module.exports = catchAsync;
