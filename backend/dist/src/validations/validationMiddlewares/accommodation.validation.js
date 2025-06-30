import { accommodationCreationSchema, accommodationUpdationSchema } from "../schemas/accommodation.schema.js";
export const validateAccommodationCreationData = (req, res, next) => {
    try {
        const validatedData = accommodationCreationSchema.parse(req.body);
        req.body = validatedData;
        next();
    }
    catch (err) {
        res.status(400).json({
            message: err.errors?.[0]?.message || 'Invalid input for post creation',
        });
        return;
    }
};
export const validateAccommodationUpdationData = (req, res, next) => {
    try {
        const validatedData = accommodationUpdationSchema.parse(req.body);
        req.body = validatedData;
        next();
    }
    catch (err) {
        res.status(400).json({
            message: err.errors?.[0]?.message || 'Invalid input for post creation',
        });
        return;
    }
};
