import { ExpressRequest } from "../middlewares/auth.middleware"
import restaurantDao from "../repositories/dao/restaurant.repository.ts"
import { RestaurantDTO } from "../DTOs/restaurant.dto.ts"
import { restaurantCreation, restaurantUpdation, getRestaurant } from "../types/restaurant.type.ts"

export const createRestaurant = async (data: restaurantCreation): Promise<RestaurantDTO> => {
    const restaurant: restaurantCreation = await restaurantDao.createRestaurant(data)
    return new RestaurantDTO(restaurant)
}

export const getRestaurants = async (): Promise<RestaurantDTO[]> => {
    const restaurants: getRestaurant[] = await restaurantDao.getRestaurants()
    return restaurants.map((restaurant) => new RestaurantDTO(restaurant))
}

export const getRestaurantByTypeAndName = async (name: string): Promise<RestaurantDTO> => {
    const restaurant: getRestaurant = await restaurantDao.getRestaurantByName(name)
    return new RestaurantDTO(restaurant)
}

export const updateRestaurant = async (restaurant_id: string, data: restaurantUpdation): Promise<RestaurantDTO> => {
    const restaurant: restaurantCreation = await restaurantDao.updateRestaurant(restaurant_id, data)
    return new RestaurantDTO(restaurant)
}

export const getRestaurantsByProximity = async(latitude: number, longitude: number, radius: number): Promise<RestaurantDTO[]> => {
    const restaurants: getRestaurant[] = await restaurantDao.getRestaurantsByProximity(latitude, longitude, radius)
    return restaurants.map((restaurant) => new RestaurantDTO(restaurant))
}