import { dbClient } from "../../db/db.js";
const db = dbClient.getConnection();
class PostInteraction {
    async createPostInteraction(post_id, user_id, type, value) {
        const [interactiuon] = await db("posts_interactions").insert({
            post_id: post_id,
            user_id: user_id,
            interaction_type: type,
            value: value
        })
            .returning("*");
        return interactiuon;
    }
    async getPostInteraction(post_id, user_id, type) {
        const interactiuon = await db("posts_interactions").where({
            post_id: post_id,
            user_id: user_id,
            interaction_type: type
        })
            .first();
        return interactiuon;
    }
    async deletePostInteraction(post_id, user_id, type) {
        await db("posts_interactions").where({
            post_id: post_id,
            user_id: user_id,
            interaction_type: type
        })
            .del();
    }
}
const postInteractionDao = new PostInteraction();
export default postInteractionDao;
