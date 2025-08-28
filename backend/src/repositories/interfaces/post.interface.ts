import { CreatedPost, CreatePostInput, getPost, UpdatePostInput } from "../../types/post.type.ts"

export interface IPost {
    createPost(input: CreatePostInput): Promise<any>
    getAllPosts(page: number, limit: number): Promise<any[]>
    getPostByPostID(postId: string): Promise<any>
    updatePost(postId: string, updatedPostData: UpdatePostInput): Promise<string>
    deletePost(postId: string): Promise<string>
    getPostsByUserID(userId: string): Promise<any[]>
    searchPosts(filters: {
        transport_type?: string;
        place_name?: string;
        restaurant_name?: string;
        accommodation_type?: string;
        }): Promise<getPost[]> 
    
    togglePostLike(postId: string, add: boolean): Promise<string> 
}