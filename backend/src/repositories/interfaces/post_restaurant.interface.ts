export interface IPostRestaurant {
    createPostRestaurant(post_id: number, restaurant_id: number, cost: number, rating: number, review: string): Promise<void> 
    getById(post_id: number): Promise<any[]>
    updatePostRestaurant(post_id: number, restaurant_id: number, cost: number, rating: number, review: string): Promise<any>
}

