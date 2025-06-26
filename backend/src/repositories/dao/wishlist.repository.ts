import { createWishlistType, getWishlistType, groupedUsers } from "../../types/wishlist.type.ts";
import { IWishlist } from "../interfaces/wishlist.interface.ts";
import { Knex } from 'knex';
import { dbClient } from '../../db/db.ts';
import { IUser } from '../interfaces/user.interface.ts';
import { updateUserInfo } from '../../types/user.tpye.ts';
import { Role } from '../../enums/role.ts';
const db: Knex = dbClient.getConnection();

class Wishlist implements IWishlist {
    async createWishlist(input: createWishlistType): Promise<getWishlistType> {
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
        .returning("*")

        return wishlist
    }

    async getWishlists(page: number, limit: number): Promise<getWishlistType[]> {
        const offset=(page-1)*limit
        const wishlists = await db("wishlists").where({ is_public: true }).orderBy('created_at', 'desc').offset(offset).limit(limit)
        
        return wishlists
    }

    async getWishlistById(wishlist_id: string): Promise<getWishlistType> {
        const wishlist: getWishlistType = await db("wishlists").where({
            wishlist_id: wishlist_id
        })
        .first()
        
        return wishlist
    }

    async updateWishlist(wishlist_id: string, updatedPayload: createWishlistType): Promise<string> {
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
        }) 

        return "updated wishlist"
    }    

    async deleteWishlist(wishlist_id: string): Promise<string> {
        await db("wishlists").where({wishlist_id: wishlist_id}).del()

        return "deleted wishlist"
    }

    async getWishlistByUserid(user_id: string, page: number, limit: number): Promise<getWishlistType[]> {
        const offset=(page-1)*limit
        const wishlists = await db("wishlists").where({ user_id: user_id }).orderBy('created_at', 'desc').offset(offset).limit(limit)
        
        return wishlists
    }

    async toggleVisibility(wishlist_id: string): Promise<string> {
        await db('wishlists')
        .where({ wishlist_id: wishlist_id })
        .update({
            is_public: db.raw('NOT is_public'),
            updated_at: db.fn.now()
        });

        return "toggled"
    }


    async groupUsersByWishlistTheme(theme: string): Promise<groupedUsers[]> {
        // only for visible
        const results: groupedUsers[] = await db('wishlists as w')
                        .join('users as u', 'w.user_id', 'u.user_id')
                        .select(
                            'w.wishlist_id',
                            'w.title',
                            'w.note',
                            'w.theme',
                            'w.type',
                            'w.user_id',
                            'u.username',
                            'u.email',
                            'u.profile_picture_url'
                        )
                        .where('w.theme', theme);
        
        return results
    }
}


const wishlistDao = new Wishlist()
export default wishlistDao