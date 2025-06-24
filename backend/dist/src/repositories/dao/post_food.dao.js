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
class PostFood {
    createPostFood(post_id, food_name, cost, rating, review) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db("post_foods").insert({
                post_id: post_id,
                food_name: food_name,
                cost: cost,
                rating: rating,
                review: review
            })
                .returning("*");
        });
    }
    getById(post_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield db("post_foods").select("*").where({ post_id: post_id });
            return results;
        });
    }
    updatePostFood(post_id, food_name, cost, rating, review) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db("post_foods").where({ post_id: post_id, food_name }).update({
                cost: cost,
                rating: rating,
                review: review
            });
        });
    }
}
const postFoodDao = new PostFood();
export default postFoodDao;
