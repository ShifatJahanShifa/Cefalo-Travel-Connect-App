export interface IPostRestaurant {
    createPostRestaurant(postId: string, restaurantId: string, cost: number, rating: number, review: string): Promise<void> 
    getById(postId: string): Promise<any[]>
    updatePostRestaurant(postId: string, restaurantId: string, cost: number, rating: number, review: string): Promise<any>
}

