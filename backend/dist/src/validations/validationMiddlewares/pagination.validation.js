import { paginationSchema } from "../schemas/pagination.schema.js";
export const validatePagination = (req, res, next) => {
    var _a, _b, _c, _d;
    try {
        const result = paginationSchema.parse(req.query);
        req.query.page = ((_a = result.page) === null || _a === void 0 ? void 0 : _a.toString()) || '1';
        req.query.limit = ((_b = result.limit) === null || _b === void 0 ? void 0 : _b.toString()) || '10';
        next();
    }
    catch (err) {
        res.status(400).json({ message: ((_d = (_c = err.errors) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.message) || 'Invalid pagination params' });
        return;
    }
};
