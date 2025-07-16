export interface IPostFood {
    createPostFood(postId: string, foodName: string, cost: number, rating: number, review: string): Promise<void> 
    getById(postId: string): Promise<any[]>
    updatePostFood(postId: string, foodName: string, cost: number, rating: number, review: string): Promise<any>
    deleteById(postId: string): Promise<boolean>
}

