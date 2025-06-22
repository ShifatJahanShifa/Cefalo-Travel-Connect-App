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
class Wishlist {
    createWishlist(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const [wishlist] = yield db("wishlists").insert({
                user_id: input.user_id,
                title: input.title,
                type: input.type,
                reference_id: input.reference_id,
                theme: input.theme,
                region: input.region,
                note: input.note,
                is_public: input.is_public
            })
                .returning("*");
            return wishlist;
        });
    }
    getWishlists(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const offset = (page - 1) * limit;
            const wishlists = yield db("wishlists").where({ is_public: true }).orderBy('created_at', 'desc').offset(offset).limit(limit);
            return wishlists;
        });
    }
    getWishlistById(wishlist_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const wishlist = yield db("wishlists").where({
                wishlist_id: wishlist_id
            })
                .first();
            return wishlist;
        });
    }
    updateWishlist(wishlist_id, updatedPayload) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db("wishlists").update({
                user_id: updatedPayload.user_id,
                title: updatedPayload.title,
                type: updatedPayload.type,
                reference_id: updatedPayload.reference_id,
                theme: updatedPayload.theme,
                region: updatedPayload.region,
                note: updatedPayload.note,
                is_public: updatedPayload.is_public,
                updated_at: db.fn.now()
            })
                .where({
                wishlist_id: wishlist_id
            });
            return "updated wishlist";
        });
    }
    deleteWishlist(wishlist_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db("wishlists").where({ wishlist_id: wishlist_id }).del();
            return "deleted wishlist";
        });
    }
    getWishlistByUserid(user_id, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const offset = (page - 1) * limit;
            const wishlists = yield db("wishlists").where({ user_id: user_id }).orderBy('created_at', 'desc').offset(offset).limit(limit);
            return wishlists;
        });
    }
    toggleVisibility(wishlist_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db('wishlists')
                .where({ wishlist_id: wishlist_id })
                .update({
                is_public: db.raw('NOT is_public'),
                updated_at: db.fn.now()
            });
            return "toggled";
        });
    }
}
const wishlistDao = new Wishlist();
export default wishlistDao;
