export interface IPostAccommodation {
    createPostAccommodation(post_id: string, accommodation_id: string, cost: number, rating: number, review: string): Promise<void> 
    getById(post_id: string): Promise<any[]>
    updatePostAccommodation(post_id: string, accommodation_id: string,  cost: number, rating: number, review: string): Promise<any>
    deleteById(post_id: string): Promise<boolean>
}