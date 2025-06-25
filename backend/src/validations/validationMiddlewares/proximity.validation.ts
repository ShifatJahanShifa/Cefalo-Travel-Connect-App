import { Request, Response, NextFunction } from 'express';
import { updateUserSchema } from '../schemas/user.schema.ts'; 
import { proximityCheckSchema } from '../schemas/proximity.schema.ts';

export const proximityVaidation = (
  req: Request,
  res: Response,
  next: NextFunction): void => {
  try {
      const validatedData = proximityCheckSchema.parse(req.body);
      req.body = validatedData; 
      next();
    } 
    catch (err: any) {
      res.status(400).json({
      message: err.errors?.[0]?.message || 'Invalid input for user update',
    });
    return;
  }
};
