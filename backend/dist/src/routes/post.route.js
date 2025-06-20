import express from 'express';
import { authenticate } from "../middlewares/auth.middleware.js";
import { createPost, getAllPosts, getPostByPostID, updatePost, deletePost } from "../controllers/post.controller.js";
import { validatePostCreationData, validateUpdatePostData } from "../validations/validationMiddlewares/post.validation.js";
import { validatePagination } from "../validations/validationMiddlewares/pagination.validation.js";
export const postRouter = express.Router();
postRouter.post('/', authenticate, validatePostCreationData, createPost);
postRouter.get('/', validatePagination, getAllPosts);
postRouter.get('/:post_id', getPostByPostID);
// // i will handle authorization later
postRouter.patch('/:post_id', authenticate, validateUpdatePostData, updatePost);
postRouter.delete('/:post_id', authenticate, deletePost);
//deletePost, getAllPosts, getPostByPostID, updatePost
