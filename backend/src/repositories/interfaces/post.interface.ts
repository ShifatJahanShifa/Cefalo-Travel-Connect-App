import { CreatedPost, CreatePostInput, getPost, UpdatePostInput } from "../../types/post.type.ts"

export interface IPost {
    createPost(input: CreatePostInput): Promise<any>
    getAllPosts(page: number, limit: number): Promise<any[]>
    getPostByPostID(post_id: string): Promise<any>
    updatePost(post_id: string, updatedPostData: UpdatePostInput): Promise<string>
    deletePost(post_id: string): Promise<string>
    // // not applying pagination rn
    getPostsByUserID(user_id: string): Promise<any[]>
    searchPosts(filters: {
        transport_type?: string;
        place_name?: string;
        restaurant_name?: string;
        accommodation_type?: string;
        }): Promise<getPost[]> 
    
    togglePostLike(post_id: string, add: boolean): Promise<string> 
}