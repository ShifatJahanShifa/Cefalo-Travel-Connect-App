import { ExpressRequest } from "../middlewares/auth.middleware";
import restaurantDao from "../repositories/dao/restaurant.repository.ts";
import { restaurantDTO } from "../DTOs/restaurant.dto.ts"
import { restaurantCreation, restaurantUpdation, getRestaurant } from "../types/restaurant.type.ts";

export const createRestaurant = async (data: restaurantCreation): Promise<restaurantDTO> => {
    const restaurant: restaurantCreation = await restaurantDao.createRestaurant(data)
    return new restaurantDTO(restaurant)
}

export const getRestaurants = async (): Promise<restaurantDTO[]> => {
    const restaurants: getRestaurant[] = await restaurantDao.getRestaurants()
    return restaurants.map((restaurant) => new restaurantDTO(restaurant))
}

export const getRestaurantByTypeAndName = async (name: string): Promise<restaurantDTO> => {
    const restaurant: getRestaurant = await restaurantDao.getRestaurantByName(name)
    return new restaurantDTO(restaurant)
}

export const updateRestaurant = async (restaurant_id: string, data: restaurantUpdation): Promise<restaurantDTO> => {
    const restaurant: restaurantCreation = await restaurantDao.updateRestaurant(restaurant_id, data)
    return new restaurantDTO(restaurant)
}

export const getRestaurantsByProximity = async(latitude: number, longitude: number, radius: number): Promise<restaurantDTO[]> => {
    const restaurants: getRestaurant[] = await restaurantDao.getRestaurantsByProximity(latitude, longitude, radius)
    return restaurants.map((restaurant) => new restaurantDTO(restaurant))
}