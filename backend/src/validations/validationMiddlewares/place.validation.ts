import { Request, Response, NextFunction } from 'express';
import { ExpressRequest } from '../../middlewares/auth.middleware.ts';
import { placeCreationSchema, placeUpdationSchema } from '../schemas/place.schema.ts';

export const validatePlaceCreationData = (req: ExpressRequest, res: Response, next: NextFunction): void => {
    try {
        const validatedData = placeCreationSchema.parse(req.body);
        next();
    } 
    catch (err: any) {
            res.status(400).json({
            message: err.errors?.[0]?.message || 'Invalid input for post creation',
        });
        return;
    }
};

export const validatePlaceUpdationData = (req: ExpressRequest, res: Response, next: NextFunction): void => {
    try {
        const validatedData = placeUpdationSchema.parse(req.body);
        next();
    } 
    catch (err: any) {
            res.status(400).json({
            message: err.errors?.[0]?.message || 'Invalid input for post creation',
        });
        return;
    }
};

