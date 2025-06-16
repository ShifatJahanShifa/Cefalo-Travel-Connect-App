import { signupSchema, signinSchema } from "../schemas/auth.schema.js";
import { z } from 'zod';
export const validateSignup = (req, res, next) => {
    try {
        signupSchema.parse(req.body);
        next();
    }
    catch (err) {
        if (err instanceof z.ZodError) {
            res.status(400).json({
                success: false,
                errors: err.errors, // array of validation issues
            });
            return;
        }
        next(err); // need to check
    }
};
export const validateSignin = (req, res, next) => {
    try {
        signinSchema.parse(req.body);
        next();
    }
    catch (err) {
        if (err instanceof z.ZodError) {
            res.status(400).json({
                success: false,
                errors: err.errors, // array of validation issues
            });
            return;
        }
        next(err); // need to check
    }
};
