import { post_interaction } from "../../types/post.type.ts"

export interface IPostInteraction {
    createPostInteraction(post_id: string, user_id: string, type: string, value: string): Promise<post_interaction>
    getPostInteraction(post_id: string, user_id: string, type: string): Promise<post_interaction>
    deletePostInteraction(post_id: string, user_id: string, type: string): Promise<void>
}