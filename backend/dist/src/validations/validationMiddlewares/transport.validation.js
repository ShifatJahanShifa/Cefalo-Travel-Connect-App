import { transportCreationSchema, transportUpdationSchema } from "../schemas/transport.schema.js";
export const validatetransportCreationData = (req, res, next) => {
    try {
        const validatedData = transportCreationSchema.parse(req.body);
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
export const validatetransportUpdationData = (req, res, next) => {
    try {
        const validatedData = transportUpdationSchema.parse(req.body);
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
