export interface IPostImage {
    createPostImage(post_id: number, image_url: string, caption?: string): Promise<void> 
    getById(post_id: number): Promise<any[]>
    updatePostImage(post_id: number, image_id: number, caption?: string): Promise<any>
    deleteById(post_id: number): Promise<void>
}