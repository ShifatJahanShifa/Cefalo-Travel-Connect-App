import express from 'express'
import { authenticate, ExpressRequest } from '../middlewares/auth.middleware.ts'
import { createPost, getAllPosts, getPostByPostID, updatePost, deletePost, searchPosts, togglePostLike } from '../controllers/post.controller.ts'
import { validatePostCreationData, validateUpdatePostData } from '../validations/validationMiddlewares/post.validation.ts'
import { validatePagination } from '../validations/validationMiddlewares/pagination.validation.ts'
export const postRouter = express.Router()
// import { createPost, getAllPosts } from '../controllers/post.controller.ts'
import { Request, Response } from 'express'

postRouter.post('/', authenticate, validatePostCreationData, createPost) 
postRouter.get('/', validatePagination, getAllPosts) 
postRouter.get('/search/', searchPosts)
postRouter.get('/:post_id', getPostByPostID)
// // i will handle authorization later
postRouter.patch('/:post_id', authenticate, validateUpdatePostData, updatePost)
postRouter.delete('/:post_id', authenticate, deletePost)
postRouter.post("/:postId/like", authenticate, togglePostLike)
//deletePost, getAllPosts, getPostByPostID, updatePost