import { dbClient } from "../../db/db.js";
const db = dbClient.getConnection();
class PostRestaurantDao {
    async createPostRestaurant(post_id, restaurant_id, cost, rating, review) {
        await db('post_restaurants').insert({
            post_id: post_id,
            restaurant_id: restaurant_id,
            cost: cost,
            rating: rating,
            review: review,
        });
    }
    async getById(post_id) {
        const data = await db('post_restaurants').where({ post_id });
        return data;
    }
    async updatePostRestaurant(post_id, restaurant_id, cost, rating, review) {
        await db('post_restaurants').where({ post_id: post_id, restaurant_id: restaurant_id }).update({
            cost: cost,
            rating: rating,
            review: review
        });
    }
}
const postRestaurantDao = new PostRestaurantDao();
export default postRestaurantDao;
