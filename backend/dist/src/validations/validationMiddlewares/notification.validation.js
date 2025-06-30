import { notificationSchema } from "../schemas/notifcation.schema.js";
export const validateWishlistCreationData = (req, res, next) => {
    try {
        const validatedData = notificationSchema.parse(req.body);
        // req.body=validatedData
        next();
    }
    catch (err) {
        res.status(400).json({
            message: err.errors?.[0]?.message || 'Invalid input for post creation',
        });
        return;
    }
};
