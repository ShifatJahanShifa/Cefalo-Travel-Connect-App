import { Request, Response, NextFunction } from 'express';
import { ExpressRequest } from '../../middlewares/auth.middleware.ts';
import { transportCreationSchema, transportUpdationSchema } from '../schemas/transport.schema.ts';
import { notificationSchema } from '../schemas/notifcation.schema.ts'

export const validateWishlistCreationData = (req: ExpressRequest, res: Response, next: NextFunction): void => {
    try {
        const validatedData = notificationSchema.parse(req.body);
       
        next();
    } 
    catch (err: any) {
            res.status(400).json({
            message: err.errors?.[0]?.message || 'Invalid input for post creation',
        });
        return;
    }
};