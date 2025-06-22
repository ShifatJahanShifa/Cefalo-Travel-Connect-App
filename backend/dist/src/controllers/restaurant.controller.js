var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as RestaurantService from "../services/restaurant.service.js";
export const createRestaurant = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const restaurant = yield RestaurantService.createRestaurant(data);
        res.status(201).json(restaurant);
    }
    catch (error) {
        next(error);
    }
});
export const getRestaurants = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurants = yield RestaurantService.getRestaurants();
        res.status(200).json(restaurants);
    }
    catch (error) {
        next(error);
    }
});
export const updateRestaurant = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurant_id = parseInt(req.params.restaurantId);
        const data = req.body;
        const restaurant = yield RestaurantService.updateRestaurant(restaurant_id, data);
        res.status(200).json(restaurant);
    }
    catch (error) {
        next(error);
    }
});
export const getRestaurantsByProximity = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const latitude = parseInt(req.query.latitude);
        const longitude = parseInt(req.query.longitude);
        const radius = parseInt(req.query.radius);
        const data = yield RestaurantService.getRestaurantsByProximity(latitude, longitude, radius);
        res.status(200).json(data);
    }
    catch (error) {
        next(error);
    }
});
