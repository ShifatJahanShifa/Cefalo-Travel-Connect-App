import { proximityCheckSchema } from "../schemas/proximity.schema.js";
export const proximityVaidation = (req, res, next) => {
    try {
        const validatedData = proximityCheckSchema.parse(req.body);
        req.body = validatedData;
        next();
    }
    catch (err) {
        res.status(400).json({
            message: err.errors?.[0]?.message || 'Invalid input for user update',
        });
        return;
    }
};
