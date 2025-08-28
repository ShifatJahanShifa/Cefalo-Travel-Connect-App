import { createWishlistType, getWishlistType, groupedUsers } from "../../types/wishlist.type.ts"

export interface IWishlist {
    createWishlist(input: createWishlistType): Promise<getWishlistType>
    getWishlists(page: number, limit: number): Promise<getWishlistType[]>
    getWishlistById(wishlistId: string): Promise<getWishlistType> 
    updateWishlist(wishlistId: string, updatedPayload: createWishlistType): Promise<string>
    deleteWishlist(wishlistId: string): Promise<string>
    getWishlistByUserid(userId: string, page: number, limit: number): Promise<getWishlistType[]>
    toggleVisibility(wishlistId: string): Promise<string> 
    groupUsersByWishlistTheme(theme: string): Promise<groupedUsers[]>
}