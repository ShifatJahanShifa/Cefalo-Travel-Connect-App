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
class PostImageDao {
    createPostImage(post_id, image_url, caption) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db('post_images').insert({
                post_id: post_id,
                image_url: image_url,
                caption: caption ? caption : null
            });
        });
    }
    getById(post_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield db('post_images').where({ post_id });
            return data;
        });
    }
    updatePostImage(post_id, image_id, caption) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db('post_images').where({ post_id: post_id, image_id: image_id }).update({
                caption: caption
            });
        });
    }
    deleteById(post_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db('post_images').where({ post_id: post_id }).del();
        });
    }
}
const postImageDao = new PostImageDao();
export default postImageDao;
