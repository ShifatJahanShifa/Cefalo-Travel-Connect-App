import express from 'express'
import { Request, Response } from 'express'
import { authenticate, ExpressRequest } from '../middlewares/auth.middleware.ts'
import { createPost, getAllPosts, getPostByPostID, updatePost, deletePost, searchPosts, togglePostLike } from '../controllers/post.controller.ts'
import { validatePostCreationData, validateUpdatePostData } from '../validations/validationMiddlewares/post.validation.ts'
import { validatePagination } from '../validations/validationMiddlewares/pagination.validation.ts'
export const postRouter = express.Router()

postRouter.get('/', authenticate, validatePagination, getAllPosts) 
postRouter.get('/search/', authenticate, searchPosts)
postRouter.get('/:post_id', authenticate, getPostByPostID)

postRouter.post('/', authenticate, validatePostCreationData, createPost) 
postRouter.post("/:postId/like", authenticate, togglePostLike)


postRouter.patch('/:post_id', authenticate, validateUpdatePostData, updatePost)
postRouter.delete('/:post_id', authenticate, deletePost)