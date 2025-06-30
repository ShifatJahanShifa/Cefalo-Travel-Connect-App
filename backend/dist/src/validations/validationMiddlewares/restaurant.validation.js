import { createRestaurantSchema, updateRestaurantSchema } from "../schemas/restaurant.schema.js";
export const validateRestaurantCreationData = (req, res, next) => {
    try {
        const validatedData = createRestaurantSchema.parse(req.body);
        next();
    }
    catch (err) {
        res.status(400).json({
            message: err.errors?.[0]?.message || 'Invalid input for Restaurant creation',
        });
        return;
    }
};
export const validateUpdateRestaurantData = (req, res, next) => {
    try {
        const validatedData = updateRestaurantSchema.parse(req.body);
        next();
    }
    catch (err) {
        res.status(400).json({
            message: err.errors?.[0]?.message || 'Invalid input for Restaurant creation',
        });
        return;
    }
};
