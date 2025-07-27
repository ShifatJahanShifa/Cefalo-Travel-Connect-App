export interface IPostFood {
    createPostFood(post_id: string, food_name: string, cost: number, rating: number, review: string): Promise<void> 
    getById(post_id: string): Promise<any[]>
    updatePostFood(post_id: string, food_name: string, cost: number, rating: number, review: string): Promise<any>
}

