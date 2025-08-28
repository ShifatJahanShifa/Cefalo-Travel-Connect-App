export interface IPostTransport {
    createPostTransport(postId: string, transportId: string, cost: number, rating: number, review: string): Promise<void> 
    getById(postId: string): Promise<any[]>
    updatePostTransport(postId: string, transportId: string, cost: number, rating: number, review: string): Promise<any>
    deleteById(postId: string): Promise<boolean>
}

