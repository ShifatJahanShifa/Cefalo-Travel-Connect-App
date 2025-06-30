import { createPostSchema, updatePostSchema } from "../schemas/post.schema.js";
export const validatePostCreationData = (req, res, next) => {
    try {
        const validatedData = createPostSchema.parse(req.body);
        next();
    }
    catch (err) {
        res.status(400).json({
            message: err.errors?.[0]?.message || 'Invalid input for post creation',
        });
        return;
    }
};
export const validateUpdatePostData = (req, res, next) => {
    try {
        const validatedData = updatePostSchema.parse(req.body);
        next();
    }
    catch (err) {
        res.status(400).json({
            message: err.errors?.[0]?.message || 'Invalid input for post creation',
        });
        return;
    }
};
