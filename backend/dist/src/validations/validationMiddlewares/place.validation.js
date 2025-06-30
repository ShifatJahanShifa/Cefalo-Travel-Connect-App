import { placeCreationSchema, placeUpdationSchema } from "../schemas/place.schema.js";
export const validatePlaceCreationData = (req, res, next) => {
    try {
        const validatedData = placeCreationSchema.parse(req.body);
        next();
    }
    catch (err) {
        res.status(400).json({
            message: err.errors?.[0]?.message || 'Invalid input for post creation',
        });
        return;
    }
};
export const validatePlaceUpdationData = (req, res, next) => {
    try {
        const validatedData = placeUpdationSchema.parse(req.body);
        next();
    }
    catch (err) {
        res.status(400).json({
            message: err.errors?.[0]?.message || 'Invalid input for post creation',
        });
        return;
    }
};
