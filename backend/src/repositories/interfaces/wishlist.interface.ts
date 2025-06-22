import { createWishlistType, getWishlistType } from "../../types/wishlist.type.ts";

export interface IWishlist {
    createWishlist(input: createWishlistType): Promise<getWishlistType>
    getWishlists(page: number, limit: number): Promise<getWishlistType[]>
    getWishlistById(wishlist_id: string): Promise<getWishlistType> 
    updateWishlist(wishlist_id: string, updatedPayload: createWishlistType): Promise<string>
    deleteWishlist(wishlist_id: string): Promise<string>
    getWishlistByUserid(user_id: number, page: number, limit: number): Promise<getWishlistType[]>
    toggleVisibility(wishlist_id: string): Promise<string>
}