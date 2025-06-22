var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import restaurantDao from "../repositories/dao/restaurant.dao.js";
import { restaurantDTO } from "../DTOs/restaurant.dto.js";
export const createRestaurant = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurant = yield restaurantDao.createRestaurant(data);
    return new restaurantDTO(restaurant);
});
export const getRestaurants = () => __awaiter(void 0, void 0, void 0, function* () {
    const restaurants = yield restaurantDao.getRestaurants();
    return restaurants.map((restaurant) => new restaurantDTO(restaurant));
});
export const getRestaurantByTypeAndName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurant = yield restaurantDao.getRestaurantByName(name);
    return new restaurantDTO(restaurant);
});
export const updateRestaurant = (restaurant_id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurant = yield restaurantDao.updateRestaurant(restaurant_id, data);
    return new restaurantDTO(restaurant);
});
export const getRestaurantsByProximity = (latitude, longitude, radius) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurants = yield restaurantDao.getRestaurantsByProximity(latitude, longitude, radius);
    return restaurants.map((restaurant) => new restaurantDTO(restaurant));
});
