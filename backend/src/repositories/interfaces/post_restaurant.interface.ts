export interface IPostRestaurant {
    createPostRestaurant(post_id: string, restaurant_id: string, cost: number, rating: number, review: string): Promise<void> 
    getById(post_id: string): Promise<any[]>
    updatePostRestaurant(post_id: string, restaurant_id: string, cost: number, rating: number, review: string): Promise<any>
}

