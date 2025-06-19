import { NextFunction } from "express";
import { ExpressRequest } from "../middlewares/auth.middleware.ts";
import postDAO from "../repositories/dao/post.dao.ts"; 
import { CreatedPost, CreatePostInput, UpdatePostInput } from "../types/post.type.ts";
import { PostResponseDTO } from "../DTOs/post.dto.ts";
import { getPost } from "../types/post.type.ts";

export const createPost = async(input: CreatePostInput): Promise<CreatedPost> => {
    const createdPost: CreatedPost = await postDAO.createPost(input)
    // not calling dto now
    return createdPost
}

export const getAllPosts = async(page: number, limit: number): Promise<PostResponseDTO[]> => {
    const posts: getPost[] = await postDAO.getAllPosts(page,limit)
    return posts.map((post) => new PostResponseDTO(post))
}

export const getPostByPostID = async(post_id: number): Promise<PostResponseDTO> => {
    const post: getPost = await postDAO.getPostByPostID(post_id)
    return new PostResponseDTO(post)
}

export const updatePost = async(post_id: number, updatedPostData: UpdatePostInput): Promise<string> => {
    const status: string = await postDAO.updatePost(post_id, updatedPostData)
    return status
}

export const deletePost = async(post_id: number): Promise<string> => {
    const status: string = await postDAO.deletePost(post_id)
    return status
}