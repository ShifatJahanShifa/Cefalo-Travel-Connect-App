import { dbClient } from "../../db/db.js";
const db = dbClient.getConnection();
class PostPlaceDao {
    async createPostPlace(post_id, place_id, cost, rating, review) {
        await db('post_places').insert({
            post_id: post_id,
            place_id: place_id,
            cost: cost,
            rating: rating,
            review: review,
        });
    }
    async getById(post_id) {
        const data = await db('post_places').where({ post_id });
        return data;
    }
    async updatePostPlace(post_id, place_id, cost, rating, review) {
        await db('post_places').where({ post_id: post_id, place_id: place_id }).update({
            cost: cost,
            rating: rating,
            review: review
        });
    }
}
const postPlaceDao = new PostPlaceDao();
export default postPlaceDao;
