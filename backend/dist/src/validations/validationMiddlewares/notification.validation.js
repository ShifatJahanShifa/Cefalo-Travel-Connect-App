import { notificationSchema } from "../schemas/notifcation.schema.js";
export const validateWishlistCreationData = (req, res, next) => {
    var _a, _b;
    try {
        const validatedData = notificationSchema.parse(req.body);
        // req.body=validatedData
        next();
    }
    catch (err) {
        res.status(400).json({
            message: ((_b = (_a = err.errors) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) || 'Invalid input for post creation',
        });
        return;
    }
};
