import { post_interaction } from "../../types/post.type.ts"

export interface IPostInteraction {
    createPostInteraction(post_id: number, user_id: number, type: string, value: string): Promise<post_interaction>
    getPostInteraction(post_id: number, user_id: number, type: string): Promise<post_interaction>
    deletePostInteraction(post_id: number, user_id: number, type: string): Promise<void>
}