export type createWishlistType = {
    user_id: number 
    title: string 
    type: string 
    reference_id: number 
    place_name?: string
    theme: string 
    region: string 
    note: string 
    is_public: boolean 
}

// i will add travel plan to wishlist later 
export type getWishlistType = {
    wishlist_id: string
    user_id: number 
    title: string 
    type: string 
    reference_id: number
    place_name?: string
    place_latitude?: number 
    place_longitude?: number  
    theme: string 
    region: string 
    note: string 
    is_public: boolean 
}