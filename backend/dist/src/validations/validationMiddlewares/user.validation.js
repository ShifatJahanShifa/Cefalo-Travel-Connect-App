import { updateUserSchema } from "../schemas/user.schema.js";
export const validateUpdateUser = (req, res, next) => {
    var _a, _b;
    try {
        const validatedData = updateUserSchema.parse(req.body);
        req.body = validatedData;
        next();
    }
    catch (err) {
        res.status(400).json({
            message: ((_b = (_a = err.errors) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) || 'Invalid input for user update',
        });
        return;
    }
};
