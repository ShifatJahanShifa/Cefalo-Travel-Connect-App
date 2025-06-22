export type restaurantCreation = {
    restaurant_name: string 
    popular_food: string
    latitude: number
    longitude: number
}

export type getRestaurant = {
    restaurant_id: number
    restaurant_name: string 
    popular_food: string
    latitude: number
    longitude: number
}

export type restaurantUpdation = { 
    restaurant_name?: string 
    popular_food?: string 
    latitude?: number
    longitude?: number
}