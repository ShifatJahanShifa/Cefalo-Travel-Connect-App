import express from 'express';
import { authenticate, authorizeAdmin } from "../middlewares/auth.middleware.js";
import { createRestaurant, getRestaurants, getRestaurantsByProximity, updateRestaurant } from "../controllers/restaurant.controller.js";
import { validateRestaurantCreationData, validateUpdateRestaurantData } from "../validations/validationMiddlewares/restaurant.validation.js";
export const resrestaurantRouter = express.Router();
resrestaurantRouter.post('/', authenticate, authorizeAdmin, validateRestaurantCreationData, createRestaurant);
resrestaurantRouter.get('/', authenticate, getRestaurants);
resrestaurantRouter.patch('/:restaurantId', authenticate, authorizeAdmin, validateUpdateRestaurantData, updateRestaurant);
resrestaurantRouter.get('/search', authenticate, getRestaurantsByProximity);
