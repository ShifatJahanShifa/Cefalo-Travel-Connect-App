import { createRestaurantSchema, updateRestaurantSchema } from "../schemas/restaurant.schema.js";
export const validateRestaurantCreationData = (req, res, next) => {
    var _a, _b;
    try {
        const validatedData = createRestaurantSchema.parse(req.body);
        next();
    }
    catch (err) {
        res.status(400).json({
            message: ((_b = (_a = err.errors) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) || 'Invalid input for Restaurant creation',
        });
        return;
    }
};
export const validateUpdateRestaurantData = (req, res, next) => {
    var _a, _b;
    try {
        const validatedData = updateRestaurantSchema.parse(req.body);
        next();
    }
    catch (err) {
        res.status(400).json({
            message: ((_b = (_a = err.errors) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) || 'Invalid input for Restaurant creation',
        });
        return;
    }
};
