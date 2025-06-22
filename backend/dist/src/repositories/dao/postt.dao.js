var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { dbClient } from "../../db/db.js";
import { AppError } from "../../utils/appError.js";
const db = dbClient.getConnection();
class PosttDAO {
    createPost(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const [post] = yield db('posts')
                .insert({
                user_id: input.user_id,
                title: input.title,
                description: input.description,
                total_cost: input.total_cost,
                duration: input.duration,
                effort: input.effort,
                categories: input.categories // will change it. 
            })
                .returning('*');
            return post;
        });
    }
    getAllPosts(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const offset = (page - 1) * limit;
            const posts = yield db('posts').select('*').orderBy('created_at', 'desc').limit(limit).offset(offset);
            return posts;
        });
    }
    getPostByPostID(post_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield db('posts').select('*').where({ post_id: post_id }).first();
            if (!post) {
                throw new AppError("post not found", 404);
            }
            return post;
        });
    }
    updatePost(post_id, updatedPostData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db('posts').where({ post_id: post_id }).update({
                title: updatedPostData.title,
                description: updatedPostData.description,
                total_cost: updatedPostData.total_cost,
                duration: updatedPostData.duration,
                effort: updatedPostData.effort,
                categories: updatedPostData.categories,
                updated_at: db.fn.now()
            });
            return "updated post table";
        });
    }
    deletePost(post_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const postDeleted = yield db("posts").where({ post_id: post_id }).del();
            return "successfully deleted the post";
        });
    }
    getPostsByUserID(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            // i am not applying pagination rn
            const posts = yield db("posts").select('*').where({ user_id: user_id }).orderBy('created_at', 'desc');
            return posts;
        });
    }
    searchPosts(filters) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const rawPosts = yield query.groupBy('posts.post_id');
            return rawPosts;
        });
    }
    togglePostLike(post_id, add) {
        return __awaiter(this, void 0, void 0, function* () {
            if (add) {
                yield db("posts").where({ post_id: post_id }).increment('likes_count', 1);
            }
            else {
                yield db("posts").where({ post_id: post_id }).decrement('likes_count', 1);
            }
            return "updated like count";
        });
    }
}
const posttDAO = new PosttDAO();
export default posttDAO;
