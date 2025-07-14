export interface IPostTransport {
    createPostTransport(post_id: string, transport_id: string, cost: number, rating: number, review: string): Promise<void> 
    getById(post_id: string): Promise<any[]>
    updatePostTransport(post_id: string, transport_id: string, cost: number, rating: number, review: string): Promise<any>
    deleteById(post_id: string): Promise<boolean>
}

