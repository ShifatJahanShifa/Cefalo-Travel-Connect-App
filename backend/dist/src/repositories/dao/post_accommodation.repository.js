import { dbClient } from "../../db/db.js";
const db = dbClient.getConnection();
class PostAccommodationDao {
    async createPostAccommodation(post_id, accommodation_id, cost, rating, review) {
        await db('post_accommodations').insert({
            post_id: post_id,
            accommodation_id: accommodation_id,
            cost: cost,
            rating: rating,
            review: review,
        });
    }
    async getById(post_id) {
        const data = await db('post_accommodations').where({ post_id });
        return data;
    }
    async updatePostAccommodation(post_id, accommodation_id, cost, rating, review) {
        await db('post_accommodations').where({ post_id: post_id, accommodation_id: accommodation_id }).update({
            cost: cost,
            rating: rating,
            review: review
        });
    }
}
const postAccommodationDao = new PostAccommodationDao();
export default postAccommodationDao;
