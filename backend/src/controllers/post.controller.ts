import * as PostService from '../services/post.service.ts' 
import { ExpressRequest } from '../middlewares/auth.middleware.ts'
import { Request, Response, NextFunction } from 'express'
import { CreatedPost, UpdatePostInput } from '../types/post.type.ts'
import { PostResponseDTO } from '../DTOs/post.dto.ts'
import { UserDTO } from '../DTOs/user.dto.ts'
import * as UserService from '../services/user.service.ts'

export const createPost = async (req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try { 
        const post: boolean = await PostService.createPost(req.body)

        res.status(201).send(post)
    }
    catch(error)
    {
        next(error)
    }
}


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
        const post_id: string = (req.params.post_id)
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
        const post_id: string = (req.params.post_id)
        // const user: UserDTO = await UserService.getUserByUsername()
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
        const post_id: string = (req.params.post_id)
        const user: UserDTO = await UserService.getUserByUsername(req.username!) 

        const status: string = await PostService.deletePost(post_id, user.user_id)

        res.status(204).send(status)
    }
    catch (error) 
    {
        next(error)
    }
}


export const getPostsByUserID = async (req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
   try {
        // at first i will get user_id from user table
        const username: string = req.params.username
        const user: UserDTO = await UserService.getUserByUsername(username)

        // call the post service 
        const posts: PostResponseDTO[] = await PostService.getPostsByUserID(user.user_id)

        res.status(200).json(posts)
    }
    catch (error) 
    {
        next(error)
    }
} 



export const searchPosts = async (req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log('in the con')
    const {
      title,
      min_cost,
      max_cost,
      transport_type,
      place_name,
      restaurant_name,
      accommodation_type
    } = req.query;

    const filters = {
      title: title as string,
      min_cost: min_cost ? Number(min_cost) : undefined,
      max_cost: max_cost ? Number(max_cost) : undefined,
      transport_type: transport_type as string,
      place_name: place_name as string,
      restaurant_name: restaurant_name as string,
      accommodation_type: accommodation_type as string
    };

    const posts = await PostService.searchPosts(filters);
    res.status(200).json(posts);

  } catch (err) {
    next(err); 
  }
};


export const togglePostLike = async (req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const post_id: string = (req.params.postId)
        const username: string = req.username!
        const user: UserDTO = await UserService.getUserByUsername(username)
        
        const result: string = await PostService.togglePostLike(post_id, user.user_id)

        res.status(200).json(result)
    }
    catch (error) 
    {
        next(error)
    }
}