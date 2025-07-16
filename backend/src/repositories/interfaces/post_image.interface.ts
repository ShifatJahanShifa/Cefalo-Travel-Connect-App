export interface IPostImage {
    createPostImage(postId: string, imageUrl: string, caption?: string): Promise<void> 
    getById(postId: string): Promise<any[]>
    updatePostImage(postId: string, imageId: string, caption?: string): Promise<any>
    deleteById(postId: string): Promise<void>
}