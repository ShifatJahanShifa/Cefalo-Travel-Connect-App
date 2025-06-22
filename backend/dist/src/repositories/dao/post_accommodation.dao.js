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
class PostAccommodationDao {
    createPostAccommodation(post_id, accommodation_id, cost, rating, review) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db('post_accommodations').insert({
                post_id: post_id,
                accommodation_id: accommodation_id,
                cost: cost,
                rating: rating,
                review: review,
            });
        });
    }
    getById(post_id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!post_id) {
                console.log('yesss');
                throw new AppError("not valid id", 400);
            }
            const data = yield db('post_accommodations').where({ post_id });
            console.log(data, 'jj');
            return data;
        });
    }
    updatePostAccommodation(post_id, accommodation_id, cost, rating, review) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db('post_accommodations').where({ post_id: post_id, accommodation_id: accommodation_id }).update({
                cost: cost,
                rating: rating,
                review: review
            });
        });
    }
}
const postAccommodationDao = new PostAccommodationDao();
export default postAccommodationDao;
