export interface IPostAccommodation {
    createPostAccommodation(post_id: number, accommodation_id: number, cost: number, rating: number, review: string): Promise<void> 
    getById(post_id: number): Promise<any[]>
    updatePostAccommodation(post_id: number, accommodation_id: number,  cost: number, rating: number, review: string): Promise<any>
}