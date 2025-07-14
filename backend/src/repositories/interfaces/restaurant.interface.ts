import { restaurantCreation, getRestaurant, restaurantUpdation } from "../../types/restaurant.type.ts"


export interface IRestaurant {
    createRestaurant(data: restaurantCreation): Promise<restaurantCreation>     
    getRestaurants(): Promise<getRestaurant[]>       
    getRestaurantByName(name: string): Promise<getRestaurant>        
    updateRestaurant(restaurant_id: string, data: restaurantUpdation): Promise<restaurantCreation>    
    getRestaurantsByProximity(latitude: number, longitude: number, radius: number): Promise<getRestaurant[]>
    getById(id: any[]): Promise<getRestaurant[]>
}
