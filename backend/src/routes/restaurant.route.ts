import express from 'express'
import { authenticate, authorizeAdmin } from '../middlewares/auth.middleware.ts'
import { createRestaurant, getRestaurants, getRestaurantsByProximity, updateRestaurant } from '../controllers/restaurant.controller.ts'
import { validateRestaurantCreationData, validateUpdateRestaurantData } from '../validations/validationMiddlewares/restaurant.validation.ts'
export const resrestaurantRouter = express.Router()

resrestaurantRouter.post('/',authenticate, authorizeAdmin, validateRestaurantCreationData ,createRestaurant)
resrestaurantRouter.get('/', authenticate, getRestaurants)
resrestaurantRouter.patch('/:restaurantId',authenticate, authorizeAdmin, validateUpdateRestaurantData, updateRestaurant)
resrestaurantRouter.get('/search',authenticate, getRestaurantsByProximity)