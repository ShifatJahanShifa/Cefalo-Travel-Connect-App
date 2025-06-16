import { AppError } from "../utils/appError.js";
export const globalErrorHandler = (err, req, res, next) => {
    console.error('Global error handler caught:', err);
    const statusCode = (err instanceof AppError && err.statusCode) || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        message,
    });
};
