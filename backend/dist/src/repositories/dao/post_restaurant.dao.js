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
const db = dbClient.getConnection();
class PostRestaurantDao {
    createPostRestaurant(post_id, restaurant_id, cost, rating, review) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db('post_restaurants').insert({
                post_id: post_id,
                restaurant_id: restaurant_id,
                cost: cost,
                rating: rating,
                review: review,
            });
        });
    }
    getById(post_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield db('post_restaurants').where({ post_id });
            return data;
        });
    }
    updatePostRestaurant(post_id, restaurant_id, cost, rating, review) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db('post_restaurants').where({ post_id: post_id, restaurant_id: restaurant_id }).update({
                cost: cost,
                rating: rating,
                review: review
            });
        });
    }
}
const postRestaurantDao = new PostRestaurantDao();
export default postRestaurantDao;
