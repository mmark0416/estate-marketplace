const errorHandler = (err, req, res, next) => {
  let customError = {
    success: false,
    statusCode: err.statusCode || 500,
    message: err.message || "Internal Server Error"
  }

  return res.status(customError.statusCode).json(customError);
};

export default errorHandler