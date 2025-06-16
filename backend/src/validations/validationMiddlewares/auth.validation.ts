import { Request, Response, NextFunction } from 'express';
import { signupSchema, signinSchema } from '../schemas/auth.schema.ts';
import { z } from 'zod'
import { AppError } from '../../utils/appError.ts';
import { ExpressRequest } from '../../middlewares/auth.middleware.ts';

export const validateSignup = (req: ExpressRequest, res: Response, next: NextFunction): void => {
  try {
    signupSchema.parse(req.body); 
    next();
  } catch (err) {
    if (err instanceof z.ZodError) {
       res.status(400).json({
        success: false,
        errors: err.errors, // array of validation issues
      });
      return
    }
    next(err);    // need to check
  }
};

export const validateSignin = (req: ExpressRequest, res: Response, next: NextFunction): void => {
  try {
    signinSchema.parse(req.body); 
    next();
  } catch (err) {
    if (err instanceof z.ZodError) {
       res.status(400).json({
        success: false,
        errors: err.errors, // array of validation issues
      });
      return
    }
    next(err);    // need to check
  }
};
