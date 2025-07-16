export interface IPostAccommodation {
    createPostAccommodation(postId: string, accommodationId: string, cost: number, rating: number, review: string): Promise<void> 
    getById(postId: string): Promise<any[]>
    updatePostAccommodation(postId: string, accommodationId: string,  cost: number, rating: number, review: string): Promise<any>
    deleteById(postId: string): Promise<boolean>
}