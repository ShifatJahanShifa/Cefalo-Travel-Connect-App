import express from 'express';
import { authenticate } from "../middlewares/auth.middleware.js";
import { createPost, getAllPosts, getPostByPostID, updatePost, deletePost, searchPosts, togglePostLike } from "../controllers/post.controller.js";
import { validatePostCreationData, validateUpdatePostData } from "../validations/validationMiddlewares/post.validation.js";
import { validatePagination } from "../validations/validationMiddlewares/pagination.validation.js";
export const postRouter = express.Router();
// import { createPost, getAllPosts } from '../controllers/post.controller.ts'
postRouter.post('/', authenticate, validatePostCreationData, createPost);
postRouter.get('/', authenticate, validatePagination, getAllPosts);
postRouter.get('/search/', authenticate, searchPosts);
postRouter.get('/:post_id', authenticate, getPostByPostID);
postRouter.post("/:postId/like", authenticate, togglePostLike);
postRouter.patch('/:post_id', authenticate, validateUpdatePostData, updatePost);
postRouter.delete('/:post_id', authenticate, deletePost);
