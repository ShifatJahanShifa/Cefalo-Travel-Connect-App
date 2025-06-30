import { paginationSchema } from "../schemas/pagination.schema.js";
export const validatePagination = (req, res, next) => {
    try {
        const result = paginationSchema.parse(req.query);
        req.query.page = result.page?.toString() || '1';
        req.query.limit = result.limit?.toString() || '10';
        next();
    }
    catch (err) {
        res.status(400).json({ message: err.errors?.[0]?.message || 'Invalid pagination params' });
        return;
    }
};
