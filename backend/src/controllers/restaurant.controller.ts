import { NextFunction, Response } from 'express'
import { ExpressRequest } from '../middlewares/auth.middleware.ts'
import * as RestaurantService from '../services/restaurant.service.ts' 
import { restaurantCreation, restaurantUpdation } from '../types/restaurant.type.ts'
import { restaurantDTO } from '../DTOs/restaurant.dto.ts'
import { AppError } from '../utils/appError.ts'

export const createRestaurant = async(req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data: restaurantCreation = req.body
        const restaurant: restaurantDTO = await RestaurantService.createRestaurant(data)

        res.status(201).json(restaurant)
    }
    catch (error) 
    {
        next(error)
    }
}

export const getRestaurants = async(req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const restaurants: restaurantDTO[] = await RestaurantService.getRestaurants()

        res.status(200).json(restaurants)
    }
    catch (error) 
    {
        next(error)
    }
}

export const updateRestaurant = async(req:ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const restaurant_id: string = (req.params.restaurantId) 
        const data: restaurantUpdation = req.body
        const restaurant: restaurantDTO = await RestaurantService.updateRestaurant(restaurant_id,data)

        res.status(200).json(restaurant)
    }
    catch (error) 
    {
        next(error)
    }
}


export const getRestaurantsByProximity = async(req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const latitude: number = parseFloat(req.query.latitude as string)
        const longitude: number = parseFloat(req.query.longitude as string)
        const radius: number = parseFloat(req.query.radius as string)

        const data: restaurantDTO[] = await RestaurantService.getRestaurantsByProximity(latitude, longitude, radius)
        
        res.status(200).json(data)
    }
    catch (error) 
    {
        next(error)
    }
}