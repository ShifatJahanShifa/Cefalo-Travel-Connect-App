export interface IPostImage {
    createPostImage(post_id: string, image_url: string, caption?: string): Promise<void> 
    getById(post_id: string): Promise<any[]>
    updatePostImage(post_id: string, image_id: string, caption?: string): Promise<any>
    deleteById(post_id: string): Promise<void>
}