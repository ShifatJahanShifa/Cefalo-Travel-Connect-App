import { CreatedPost, CreatePostInput, getPost, UpdatePostInput } from "../../types/post.type.ts"

export interface IPost {
    createPost(input: CreatePostInput): Promise<CreatedPost>
    getAllPosts(page: number, limit: number): Promise<getPost[]>
    getPostByPostID(post_id: number): Promise<getPost>
    updatePost(post_id: number, updatedPostData: UpdatePostInput): Promise<string>
    deletePost(post_id: number): Promise<string>
    // // not applying pagination rn
    getPostsByUserID(user_id: number): Promise<getPost[]>
}