import express from 'express'
import { authenticate } from '../middlewares/auth.middleware.ts'
import { createPost, getAllPosts, getPostByPostID, updatePost, deletePost } from '../controllers/post.controller.ts'
import { validatePostCreationData, validateUpdatePostData } from '../validations/validationMiddlewares/post.validation.ts'
import { validatePagination } from '../validations/validationMiddlewares/pagination.validation.ts'
export const postRouter = express.Router()

postRouter.post('/', authenticate, validatePostCreationData, createPost) 
postRouter.get('/', validatePagination, getAllPosts) 
postRouter.get('/:post_id', getPostByPostID)
// // i will handle authorization later
postRouter.patch('/:post_id', authenticate, validateUpdatePostData, updatePost)
postRouter.delete('/:post_id', authenticate, deletePost)
//deletePost, getAllPosts, getPostByPostID, updatePost