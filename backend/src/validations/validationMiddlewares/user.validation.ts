import { Request, Response, NextFunction } from 'express';
import { updateUserSchema } from '../schemas/user.schema.ts'; 

export const validateUpdateUser = (
  req: Request,
  res: Response,
  next: NextFunction): void => {
  try {
      const validatedData = updateUserSchema.parse(req.body);
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
