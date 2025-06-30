import * as RestaurantService from "../services/restaurant.service.js";
export const createRestaurant = async (req, res, next) => {
    try {
        const data = req.body;
        const restaurant = await RestaurantService.createRestaurant(data);
        res.status(201).json(restaurant);
    }
    catch (error) {
        next(error);
    }
};
export const getRestaurants = async (req, res, next) => {
    try {
        const restaurants = await RestaurantService.getRestaurants();
        res.status(200).json(restaurants);
    }
    catch (error) {
        next(error);
    }
};
export const updateRestaurant = async (req, res, next) => {
    try {
        const restaurant_id = (req.params.restaurantId);
        const data = req.body;
        const restaurant = await RestaurantService.updateRestaurant(restaurant_id, data);
        res.status(200).json(restaurant);
    }
    catch (error) {
        next(error);
    }
};
export const getRestaurantsByProximity = async (req, res, next) => {
    try {
        const latitude = parseInt(req.query.latitude);
        const longitude = parseInt(req.query.longitude);
        const radius = parseInt(req.query.radius);
        const data = await RestaurantService.getRestaurantsByProximity(latitude, longitude, radius);
        res.status(200).json(data);
    }
    catch (error) {
        next(error);
    }
};
