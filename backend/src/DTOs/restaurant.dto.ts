import { restaurantCreation, getRestaurant } from "../types/restaurant.type.ts"

export class restaurantDTO {
    restaurant_id: number 
    restaurant_name: string 
    popular_food: string
    location: {
        latitude: number
        longitude: number
    }

    constructor(restaurant: any) 
    {
        this.restaurant_id = restaurant.restaurant_id
        this.restaurant_name = restaurant.restaurant_name
        this.popular_food = restaurant.popular_food
        this.location = {
            latitude: restaurant.latitude,
            longitude:  restaurant.longitude
        }
    }
}