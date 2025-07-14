import { Request, Response, NextFunction } from 'express';
import { ExpressRequest } from '../../middlewares/auth.middleware.ts';
import { accommodationCreationSchema, accommodationUpdationSchema } from '../schemas/accommodation.schema.ts';

export const validateAccommodationCreationData = (req: ExpressRequest, res: Response, next: NextFunction): void => {
    try {
        const validatedData = accommodationCreationSchema.parse(req.body);
        req.body=validatedData
        next();
    } 
    catch (err: any) {
            res.status(400).json({
            message: err.errors?.[0]?.message || 'Invalid input for post creation',
        });
        return;
    }
};

export const validateAccommodationUpdationData = (req: ExpressRequest, res: Response, next: NextFunction): void => {
    try {
        const validatedData = accommodationUpdationSchema.parse(req.body);
        req.body=validatedData
        next();
    } 
    catch (err: any) {
            res.status(400).json({
            message: err.errors?.[0]?.message || 'Invalid input for post creation',
        });
        return;
    }
};

