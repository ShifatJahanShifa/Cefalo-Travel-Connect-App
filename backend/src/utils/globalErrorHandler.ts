import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError.ts';

export const globalErrorHandler = (err: Error | AppError, req: Request, res: Response, next: NextFunction): void => {
    console.error('Global error handler caught:', err);

    const statusCode = (err instanceof AppError && err.statusCode) || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        message,
    });
};
