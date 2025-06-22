import { restaurantCreation, getRestaurant, restaurantUpdation } from "../../types/restaurant.type.ts"


export interface IRestaurant {
    createRestaurant(data: restaurantCreation): Promise<restaurantCreation>     // suppose admin creates it
    getRestaurants(): Promise<getRestaurant[]>        // recommendation time
    getRestaurantByName(name: string): Promise<getRestaurant>        // post and plan e use
    updateRestaurant(restaurant_id: number, data: restaurantUpdation): Promise<restaurantCreation>      // admin controls it
    getRestaurantsByProximity(latitude: number, longitude: number, radius: number): Promise<getRestaurant[]>
    getById(id: any[]): Promise<getRestaurant[]>
}
