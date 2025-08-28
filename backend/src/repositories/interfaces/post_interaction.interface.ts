import { post_interaction } from "../../types/post.type.ts"

export interface IPostInteraction {
    createPostInteraction(postId: string, userId: string, type: string, value: string): Promise<post_interaction>
    getPostInteraction(postId: string, userId: string, type: string): Promise<post_interaction>
    deletePostInteraction(postId: string, userId: string, type: string): Promise<void>
}