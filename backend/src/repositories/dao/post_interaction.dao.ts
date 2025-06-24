import { IPostInteraction } from "../interfaces/post_interaction.interface.ts";
import { Knex } from "knex";
import { dbClient } from "../../db/db.ts";
import { AppError } from "../../utils/appError.ts";
import { post_interaction } from "../../types/post.type.ts";
const db: Knex = dbClient.getConnection();

class PostInteraction implements IPostInteraction {
    async createPostInteraction(post_id: string, user_id: string, type: string, value: string): Promise<post_interaction> {
        const [interactiuon] = await db("posts_interactions").insert({
            post_id: post_id,
            user_id: user_id,
            interaction_type: type,
            value: value 
        })
        .returning("*")

        return interactiuon
    }

    async getPostInteraction(post_id: string, user_id: string, type: string): Promise<post_interaction> {
        const interactiuon = await db("posts_interactions").where({
            post_id: post_id,
            user_id: user_id,
            interaction_type: type
        })
        .first()

        return interactiuon
    }

    async deletePostInteraction(post_id: string, user_id: string, type: string): Promise<void> {
        await db("posts_interactions").where({
            post_id: post_id,
            user_id: user_id,
            interaction_type: type
        })
        .del()
    }
}

const postInteractionDao = new PostInteraction()
export default postInteractionDao