import { dbClient } from "../../db/db.js";
const db = dbClient.getConnection();
class PostTransportDao {
    async createPostTransport(post_id, transport_id, cost, rating, review) {
        await db('post_transports').insert({
            post_id: post_id,
            transport_id: transport_id,
            cost: cost,
            rating: rating,
            review: review,
        });
    }
    async getById(post_id) {
        const data = await db('post_transports').where({ post_id: post_id });
        return data;
    }
    async updatePostTransport(post_id, transport_id, cost, rating, review) {
        await db('post_transports').where({ post_id: post_id, transport_id: transport_id }).update({
            cost: cost,
            rating: rating,
            review: review
        });
    }
}
const postTransportDao = new PostTransportDao();
export default postTransportDao;
