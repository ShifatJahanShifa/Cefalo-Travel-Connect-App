import { dbClient } from "../../db/db.js";
const db = dbClient.getConnection();
class PostFood {
    async createPostFood(post_id, food_name, cost, rating, review) {
        await db("post_foods").insert({
            post_id: post_id,
            food_name: food_name,
            cost: cost,
            rating: rating,
            review: review
        })
            .returning("*");
    }
    async getById(post_id) {
        const results = await db("post_foods").select("*").where({ post_id: post_id });
        return results;
    }
    async updatePostFood(post_id, food_name, cost, rating, review) {
        await db("post_foods").where({ post_id: post_id, food_name }).update({
            cost: cost,
            rating: rating,
            review: review
        });
    }
}
const postFoodDao = new PostFood();
export default postFoodDao;
