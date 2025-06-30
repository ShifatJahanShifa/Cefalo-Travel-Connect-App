import { dbClient } from "../../db/db.js";
import { AppError } from "../../utils/appError.js";
const db = dbClient.getConnection();
class PosttDAO {
    async createPost(input) {
        const [post] = await db('posts')
            .insert({
            user_id: input.user_id,
            title: input.title,
            description: input.description,
            total_cost: input.total_cost,
            duration: input.duration,
            effort: input.effort,
            categories: input.categories
        })
            .returning('*');
        return post;
    }
    async getAllPosts(page, limit) {
        const offset = (page - 1) * limit;
        const posts = await db('posts').select('*').orderBy('created_at', 'desc').limit(limit).offset(offset);
        return posts;
    }
    async getPostByPostID(post_id) {
        const post = await db('posts').select('*').where({ post_id: post_id }).first();
        if (!post) {
            throw new AppError("post not found", 404);
        }
        return post;
    }
    async updatePost(post_id, updatedPostData) {
        await db('posts').where({ post_id: post_id }).update({
            title: updatedPostData.title,
            description: updatedPostData.description,
            total_cost: updatedPostData.total_cost,
            duration: updatedPostData.duration,
            effort: updatedPostData.effort,
            categories: updatedPostData.categories,
            updated_at: db.fn.now()
        });
        return "updated post table";
    }
    async deletePost(post_id) {
        const postDeleted = await db("posts").where({ post_id: post_id }).del();
        return "successfully deleted the post";
    }
    async getPostsByUserID(user_id) {
        // i am not applying pagination rn
        const posts = await db("posts").select('*').where({ user_id: user_id }).orderBy('created_at', 'desc');
        return posts;
    }
    async searchPosts(filters) {
        let query = db('posts').select('posts.*');
        if (filters.transport_type) {
            query = query
                .join('post_transports', 'posts.post_id', 'post_transports.post_id')
                .join('transports', 'transports.transport_id', 'post_transports.transport_id')
                .where('transports.transport_type', 'ilike', `%${filters.transport_type}%`);
        }
        if (filters.place_name) {
            query = query
                .join('post_places', 'posts.post_id', 'post_places.post_id')
                .join('places', 'places.place_id', 'post_places.place_id')
                .where('places.place_name', 'ilike', `%${filters.place_name}%`);
        }
        if (filters.restaurant_name) {
            query = query
                .join('post_restaurants', 'posts.post_id', 'post_restaurants.post_id')
                .join('restaurants', 'restaurants.restaurant_id', 'post_restaurants.restaurant_id')
                .where('restaurants.restaurant_name', 'ilike', `%${filters.restaurant_name}%`);
        }
        if (filters.accommodation_type) {
            query = query
                .join('post_accommodations', 'posts.post_id', 'post_accommodations.post_id')
                .join('accommodations', 'accommodations.accommodation_id', 'post_accommodations.accommodation_id')
                .where('accommodations.accommodation_type', 'ilike', `%${filters.accommodation_type}%`);
        }
        const rawPosts = await query.groupBy('posts.post_id');
        return rawPosts;
    }
    async togglePostLike(post_id, add) {
        if (add) {
            await db("posts").where({ post_id: post_id }).increment('likes_count', 1);
        }
        else {
            await db("posts").where({ post_id: post_id }).decrement('likes_count', 1);
        }
        return "updated like count";
    }
}
const posttDAO = new PosttDAO();
export default posttDAO;
