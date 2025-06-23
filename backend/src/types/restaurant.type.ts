export type restaurantCreation = {
    restaurant_name: string 
    latitude: number
    longitude: number
}

export type getRestaurant = {
    restaurant_id: string
    restaurant_name: string 
    latitude: number
    longitude: number
}

export type restaurantUpdation = { 
    restaurant_name?: string 
    latitude?: number
    longitude?: number
}