const HTTPError = require('../utils/HTTPError');

const handleDuplicateKeyError = (error) => {
  const { keyValue } = error;
  const message = `${Object.keys(keyValue)[0]}: ${Object.values(keyValue)[0]}, already exists`;
  return new HTTPError(400, message);
};

const errorMiddleware = (error, req, res, next) => {
  console.dir(error);
  let errorCp = { ...error };
  if (errorCp.code === 11000) errorCp = handleDuplicateKeyError(errorCp);
  console.log(errorCp.message);

  const status = errorCp.status || 500;
  const message = errorCp.message || 'Oops Something went wrong';

  res.status(status).json({
    success: false,
    message,
  });
};

module.exports = errorMiddleware;
