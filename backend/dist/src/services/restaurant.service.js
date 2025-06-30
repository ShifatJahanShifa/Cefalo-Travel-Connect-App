import restaurantDao from "../repositories/dao/restaurant.repository.js";
import { restaurantDTO } from "../DTOs/restaurant.dto.js";
export const createRestaurant = async (data) => {
    const restaurant = await restaurantDao.createRestaurant(data);
    return new restaurantDTO(restaurant);
};
export const getRestaurants = async () => {
    const restaurants = await restaurantDao.getRestaurants();
    return restaurants.map((restaurant) => new restaurantDTO(restaurant));
};
export const getRestaurantByTypeAndName = async (name) => {
    const restaurant = await restaurantDao.getRestaurantByName(name);
    return new restaurantDTO(restaurant);
};
export const updateRestaurant = async (restaurant_id, data) => {
    const restaurant = await restaurantDao.updateRestaurant(restaurant_id, data);
    return new restaurantDTO(restaurant);
};
export const getRestaurantsByProximity = async (latitude, longitude, radius) => {
    const restaurants = await restaurantDao.getRestaurantsByProximity(latitude, longitude, radius);
    return restaurants.map((restaurant) => new restaurantDTO(restaurant));
};
