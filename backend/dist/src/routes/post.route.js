import express from 'express';
import { authenticate } from "../middlewares/auth.middleware.js";
import { createPost, deletePost, getAllPosts, getPostByPostID, updatePost } from "../controllers/post.controller.js";
import { validatePostCreationData, validateUpdatePostData } from "../validations/validationMiddlewares/post.validation.js";
import { validatePagination } from "../validations/validationMiddlewares/pagination.validation.js";
export const postRouter = express.Router();
postRouter.post('/', authenticate, validatePostCreationData, createPost);
postRouter.get('/', validatePagination, getAllPosts);
postRouter.get('/:post_id', authenticate, getPostByPostID);
// i will handle authorization later
postRouter.patch('/:post_id', authenticate, validateUpdatePostData, updatePost);
postRouter.delete('/:post_id', authenticate, deletePost);
