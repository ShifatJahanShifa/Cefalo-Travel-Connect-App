import { dbClient } from "../../db/db.js";
const db = dbClient.getConnection();
class Wishlist {
    async createWishlist(input) {
        const [wishlist] = await db("wishlists").insert({
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
    }
    async getWishlists(page, limit) {
        const offset = (page - 1) * limit;
        const wishlists = await db("wishlists").where({ is_public: true }).orderBy('created_at', 'desc').offset(offset).limit(limit);
        return wishlists;
    }
    async getWishlistById(wishlist_id) {
        const wishlist = await db("wishlists").where({
            wishlist_id: wishlist_id
        })
            .first();
        return wishlist;
    }
    async updateWishlist(wishlist_id, updatedPayload) {
        await db("wishlists").update({
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
    }
    async deleteWishlist(wishlist_id) {
        await db("wishlists").where({ wishlist_id: wishlist_id }).del();
        return "deleted wishlist";
    }
    async getWishlistByUserid(user_id, page, limit) {
        const offset = (page - 1) * limit;
        const wishlists = await db("wishlists").where({ user_id: user_id }).orderBy('created_at', 'desc').offset(offset).limit(limit);
        return wishlists;
    }
    async toggleVisibility(wishlist_id) {
        await db('wishlists')
            .where({ wishlist_id: wishlist_id })
            .update({
            is_public: db.raw('NOT is_public'),
            updated_at: db.fn.now()
        });
        return "toggled";
    }
    async groupUsersByWishlistTheme(theme) {
        // only for visible
        const results = await db('wishlists as w')
            .join('users as u', 'w.user_id', 'u.user_id')
            .select('w.wishlist_id', 'w.title', 'w.note', 'w.theme', 'w.type', 'w.user_id', 'u.username', 'u.email', 'u.profile_picture_url')
            .where('w.theme', theme);
        return results;
    }
}
const wishlistDao = new Wishlist();
export default wishlistDao;
