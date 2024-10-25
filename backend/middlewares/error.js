const ErrorHandler = require('../utils/errorHandler');

const errorMiddleware = (err, req, res, next) => {

    err = new ErrorHandler(
        err.message || "Internal Server Error",
        err.statusCode || 500
    );

    //Mongodb error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 404);
    }

    //Mongoose duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
    }
    // Customize error response format
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });

};
module.exports = errorMiddleware;