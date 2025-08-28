import { Request, Response, NextFunction } from 'express';
import { ExpressRequest } from '../../middlewares/auth.middleware.ts';
import { transportCreationSchema, transportUpdationSchema } from '../schemas/transport.schema.ts';

export const validatetransportCreationData = (req: ExpressRequest, res: Response, next: NextFunction): void => {
    try {
        const validatedData = transportCreationSchema.parse(req.body);
        req.body=validatedData;
        next();
    } 
    catch (err: any) {
            res.status(400).json({
            message: err.errors?.[0]?.message || 'Invalid input for post creation',
        });
        return;
    }
};

export const validatetransportUpdationData = (req: ExpressRequest, res: Response, next: NextFunction): void => {
    try {
        const validatedData = transportUpdationSchema.parse(req.body);
        req.body=validatedData;
        next();
    } 
    catch (err: any) {
            res.status(400).json({
            message: err.errors?.[0]?.message || 'Invalid input for post creation',
        });
        return;
    }
};

