import { getWishlistType } from "../types/wishlist.type.ts"

export class WishlistDTO {
    wishlist_id!: string
    user_id!: string
    title!: string
    type!: string 
    place_name?: string 
    place_latitude?: number 
    place_longitude?: number 
    reference_id!: string
    theme!: string 
    region!: string 
    note!: string 
    is_public!: boolean 

    constructor(data: Partial<WishlistDTO>) 
    {
        // this.wishlistId = data.wishlistId
        // this.userId = data.userId
        // this.title = data.title
        // this.type = data.type 
        // this.place_name = data.place_name
        // this.place_latitude = data.place_latitude
        // this.place_longitude = data.place_longitude
        // this.referenceId = data.referenceId
        // this.theme = data.theme
        // this.region = data.region
        // this.note = data.note
        // this.is_public = data.is_public

        Object.assign(this, data)
    }
}