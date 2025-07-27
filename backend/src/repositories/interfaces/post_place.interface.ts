export interface IPostPlace {
    createPostPlace(post_id: string, place_id: string, cost: number, rating: number, review: string): Promise<void> 
    getById(post_id: string): Promise<any[]>
    updatePostPlace(post_id: string, place_id: string, cost: number, rating: number, review: string): Promise<any>
}