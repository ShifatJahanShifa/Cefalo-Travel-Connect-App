import * as PostService from '../services/post.service.ts' 
import { ExpressRequest } from '../middlewares/auth.middleware.ts'
import { Request, Response, NextFunction } from 'express'
import { CreatedPost, UpdatePostInput } from '../types/post.type.ts'
import { PostResponseDTO } from '../DTOs/post.dto.ts'

export const createPost = async (req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try { 
        const post: CreatedPost = await PostService.createPost(req.body)
        res.status(201).json(post)
    }
    catch(error)
    {
        next(error)
    }
}

// no auth middleware now
export const getAllPosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const page: number = parseInt(req.query.page as string);
        const limit: number = parseInt(req.query.limit as string); 

        const posts: PostResponseDTO[] = await PostService.getAllPosts(page, limit) 
        res.status(200).json(posts)
    }
    catch (error) 
    {
        next(error)
    }
}


export const getPostByPostID = async (req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const post_id: number = parseInt(req.params.post_id,10)
        const post: PostResponseDTO = await PostService.getPostByPostID(post_id)

        res.status(200).json(post)
    }
    catch (error) 
    {
        next(error)
    }
}


export const updatePost = async (req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const post_id: number = parseInt(req.params.post_id)
        const updatedPostData: UpdatePostInput = req.body
        const status: string = await PostService.updatePost(post_id, updatedPostData)

        res.status(200).send(status)
    }
    catch (error)
    {
        next(error)
    }
}


export const deletePost = async (req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const post_id: number = parseInt(req.params.post_id)
        const status: string = await PostService.deletePost(post_id)

        res.status(204).send(status)
    }
    catch (error) 
    {
        next(error)
    }
}