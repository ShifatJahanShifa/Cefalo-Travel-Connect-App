import { NextFunction, Response } from 'express'
import { ExpressRequest } from '../middlewares/auth.middleware.ts'
import * as RestaurantService from '../services/restaurant.service.ts' 
import { restaurantCreation, restaurantUpdation } from '../types/restaurant.type.ts'
import { RestaurantDTO } from '../DTOs/restaurant.dto.ts'
import { AppError } from '../utils/appError.ts'
import { HTTP_STATUS } from '../constants/httpStatus.ts'

export const createRestaurant = async(req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data: restaurantCreation = req.body
        const restaurant: RestaurantDTO = await RestaurantService.createRestaurant(data)

        res.status(HTTP_STATUS.CREATED).json(restaurant)
    }
    catch (error) 
    {
        next(error)
    }
}

export const getRestaurants = async(req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const restaurants: RestaurantDTO[] = await RestaurantService.getRestaurants()

        res.status(HTTP_STATUS.OK).json(restaurants)
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
        const restaurant: RestaurantDTO = await RestaurantService.updateRestaurant(restaurant_id,data)

        res.status(HTTP_STATUS.OK).json(restaurant)
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

        const data: RestaurantDTO[] = await RestaurantService.getRestaurantsByProximity(latitude, longitude, radius)
        
        res.status(HTTP_STATUS.OK).json(data)
    }
    catch (error) 
    {
        next(error)
    }
}