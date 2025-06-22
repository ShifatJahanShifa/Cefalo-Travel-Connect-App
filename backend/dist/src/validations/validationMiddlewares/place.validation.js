import { placeCreationSchema, placeUpdationSchema } from "../schemas/place.schema.js";
export const validatePlaceCreationData = (req, res, next) => {
    var _a, _b;
    try {
        const validatedData = placeCreationSchema.parse(req.body);
        next();
    }
    catch (err) {
        res.status(400).json({
            message: ((_b = (_a = err.errors) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) || 'Invalid input for post creation',
        });
        return;
    }
};
export const validatePlaceUpdationData = (req, res, next) => {
    var _a, _b;
    try {
        const validatedData = placeUpdationSchema.parse(req.body);
        next();
    }
    catch (err) {
        res.status(400).json({
            message: ((_b = (_a = err.errors) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) || 'Invalid input for post creation',
        });
        return;
    }
};
