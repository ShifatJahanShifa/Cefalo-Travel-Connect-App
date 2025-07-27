import { Request, Response, NextFunction } from 'express';
import { createPostSchema, updatePostSchema } from '../schemas/post.schema.ts';
import { ExpressRequest } from '../../middlewares/auth.middleware.ts';

export const validatePostCreationData = (req: ExpressRequest, res: Response, next: NextFunction): void => {
    try {
        const validatedData = createPostSchema.parse(req.body);
        next();
    } 
    catch (err: any) {
            res.status(400).json({
            message: err.errors?.[0]?.message || 'Invalid input for post creation',
        });
        return;
    }
};

export const validateUpdatePostData = (req: ExpressRequest, res: Response, next: NextFunction): void => {
    try {
        const validatedData = updatePostSchema.parse(req.body);
        next();
    } 
    catch (err: any) {
            res.status(400).json({
            message: err.errors?.[0]?.message || 'Invalid input for post creation',
        });
        return;
    }
};