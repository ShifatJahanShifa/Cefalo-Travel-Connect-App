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
class PostPlaceDao {
    createPostPlace(post_id, place_id, cost, rating, review) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db('post_places').insert({
                post_id: post_id,
                place_id: place_id,
                cost: cost,
                rating: rating,
                review: review,
            });
        });
    }
    getById(post_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield db('post_places').where({ post_id });
            return data;
        });
    }
    updatePostPlace(post_id, place_id, cost, rating, review) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db('post_places').where({ post_id: post_id, place_id: place_id }).update({
                cost: cost,
                rating: rating,
                review: review
            });
        });
    }
}
const postPlaceDao = new PostPlaceDao();
export default postPlaceDao;
