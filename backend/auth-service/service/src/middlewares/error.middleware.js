export const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
};

export const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;

  if (res.headersSent) {
    return next(error);
  }

  const message =
    statusCode >= 500
      ? "Something went wrong on the server"
      : error.message || "Request failed";

  res.status(statusCode).json({
    success: false,
    message,
  });
};
