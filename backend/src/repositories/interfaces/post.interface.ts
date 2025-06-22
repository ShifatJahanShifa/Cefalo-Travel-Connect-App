import { CreatedPost, CreatePostInput, getPost, UpdatePostInput } from "../../types/post.type.ts"

export interface IPost {
    createPost(input: CreatePostInput): Promise<any>
    getAllPosts(page: number, limit: number): Promise<any[]>
    getPostByPostID(post_id: number): Promise<any>
    updatePost(post_id: number, updatedPostData: UpdatePostInput): Promise<string>
    deletePost(post_id: number): Promise<string>
    // // not applying pagination rn
    getPostsByUserID(user_id: number): Promise<any[]>
    searchPosts(filters: {
        transport_type?: string;
        place_name?: string;
        restaurant_name?: string;
        accommodation_type?: string;
        }): Promise<getPost[]> 
    
    togglePostLike(post_id: number, add: boolean): Promise<string> 
}