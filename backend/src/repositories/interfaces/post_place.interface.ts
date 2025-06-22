export interface IPostPlace {
    createPostPlace(post_id: number, place_id: number, rating: number, review: string): Promise<void> 
    getById(post_id: number): Promise<any[]>
    updatePostPlace(post_id: number, place_id: number, rating: number, review: string): Promise<any>
}