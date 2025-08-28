import express from 'express'
import { authenticate, authorizeAdmin } from '../middlewares/auth.middleware.ts'
import { createRestaurant, getRestaurants, getRestaurantsByProximity, updateRestaurant } from '../controllers/restaurant.controller.ts'
import { validateRestaurantCreationData, validateUpdateRestaurantData } from '../validations/validationMiddlewares/restaurant.validation.ts'

export const restaurantRouter = express.Router()

restaurantRouter.get('/', authenticate, getRestaurants)
restaurantRouter.get('/search',authenticate, getRestaurantsByProximity)
restaurantRouter.post('/',authenticate, authorizeAdmin, validateRestaurantCreationData ,createRestaurant)
restaurantRouter.patch('/:restaurantId',authenticate, authorizeAdmin, validateUpdateRestaurantData, updateRestaurant)