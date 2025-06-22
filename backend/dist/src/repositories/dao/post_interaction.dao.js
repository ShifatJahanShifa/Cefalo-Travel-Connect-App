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
class PostInteraction {
    createPostInteraction(post_id, user_id, type, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const [interactiuon] = yield db("posts_interactions").insert({
                post_id: post_id,
                user_id: user_id,
                interaction_type: type,
                value: value
            })
                .returning("*");
            return interactiuon;
        });
    }
    getPostInteraction(post_id, user_id, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const interactiuon = yield db("posts_interactions").where({
                post_id: post_id,
                user_id: user_id,
                interaction_type: type
            })
                .first();
            return interactiuon;
        });
    }
    deletePostInteraction(post_id, user_id, type) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db("posts_interactions").where({
                post_id: post_id,
                user_id: user_id,
                interaction_type: type
            })
                .del();
        });
    }
}
const postInteractionDao = new PostInteraction();
export default postInteractionDao;
