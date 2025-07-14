import { ExpressRequest } from "../../middlewares/auth.middleware.ts";
import { paginationSchema } from "../schemas/pagination.schema.ts";
import { Response, NextFunction } from "express";

export const validatePagination = (req: ExpressRequest, res: Response, next: NextFunction): void => {
  try {
    const result = paginationSchema.parse(req.query);

    req.query.page = result.page?.toString() || '1';
    req.query.limit = result.limit?.toString() || '10';
    next();

   } 
   catch (err: any) {
    res.status(400).json({ message: err.errors?.[0]?.message || 'Invalid pagination params' });
    return; 
   }
};
