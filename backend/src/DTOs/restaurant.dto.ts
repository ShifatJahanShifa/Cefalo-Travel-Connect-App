import { restaurantCreation, getRestaurant } from "../types/restaurant.type.ts"

export class RestaurantDTO {
    restaurant_id: string
    restaurant_name: string 
    location: {
        latitude: number
        longitude: number
    }

    constructor(restaurant: any) 
    {
        this.restaurant_id = restaurant.restaurant_id
        this.restaurant_name = restaurant.restaurant_name
       
        this.location = {
            latitude: restaurant.latitude,
            longitude:  restaurant.longitude
        }
    }
}