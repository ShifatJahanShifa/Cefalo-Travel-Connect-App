import { updateUserSchema } from "../schemas/user.schema.js";
export const validateUpdateUser = (req, res, next) => {
    try {
        const validatedData = updateUserSchema.parse(req.body);
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
