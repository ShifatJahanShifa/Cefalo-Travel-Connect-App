import { Request, Response, NextFunction } from 'express';
import { createRestaurantSchema, updateRestaurantSchema } from '../schemas/restaurant.schema.ts';
import { ExpressRequest } from '../../middlewares/auth.middleware.ts';

export const validateRestaurantCreationData = (req: ExpressRequest, res: Response, next: NextFunction): void => {
    try {
        const validatedData = createRestaurantSchema.parse(req.body);
        next();
    } 
    catch (err: any) {
            res.status(400).json({
            message: err.errors?.[0]?.message || 'Invalid input for Restaurant creation',
        });
        return;
    }
};

export const validateUpdateRestaurantData = (req: ExpressRequest, res: Response, next: NextFunction): void => {
    try {
        const validatedData = updateRestaurantSchema.parse(req.body);
        next();
    } 
    catch (err: any) {
            res.status(400).json({
            message: err.errors?.[0]?.message || 'Invalid input for Restaurant creation',
        });
        return;
    }
};