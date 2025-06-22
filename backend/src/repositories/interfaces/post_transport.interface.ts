export interface IPostTransport {
    createPostTransport(post_id: number, transport_id: number, cost: number, rating: number, review: string): Promise<void> 
    getById(post_id: number): Promise<any[]>
    updatePostTransport(post_id: number, transport_id: number, cost: number, rating: number, review: string): Promise<any>
}

