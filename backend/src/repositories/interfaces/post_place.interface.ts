export interface IPostPlace {
    createPostPlace(postId: string, placeId: string, cost: number, rating: number, review: string): Promise<void> 
    getById(postId: string): Promise<any[]>
    updatePostPlace(postId: string, placeId: string, cost: number, rating: number, review: string): Promise<any>
    deleteById(postId: string): Promise<boolean>
}