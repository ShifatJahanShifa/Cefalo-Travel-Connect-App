import { NextFunction, Response } from 'express'
import { ExpressRequest } from '../middlewares/auth.middleware.ts'
import * as PlaceService from '../services/place.service.ts' 
import { placeCreation, placeUpdation } from '../types/place.type.ts'
import { PlaceDTO } from '../DTOs/place.dto.ts'
import { AppError } from '../utils/appError.ts'
import { HTTP_STATUS } from '../constants/httpStatus.ts'

export const createPlace = async(req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data: placeCreation = req.body
        const place: PlaceDTO = await PlaceService.createPlace(data)

        res.status(HTTP_STATUS.CREATED).json(place)
    }
    catch (error) 
    {
        next(error)
    }
}

export const getPlaces = async(req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const places: PlaceDTO[] = await PlaceService.getPlaces()

        res.status(HTTP_STATUS.OK).json(places)
    }
    catch (error) 
    {
        next(error)
    }
}

export const updatePlace = async(req:ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const place_id: string = (req.params.placeId) 
        const data: placeUpdation = req.body
        const place: PlaceDTO = await PlaceService.updatePlace(place_id,data)

        res.status(HTTP_STATUS.OK).json(place)
    }
    catch (error) 
    {
        next(error)
    }
}


export const getPlacesByProximity = async(req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const latitude: number = parseFloat(req.query.latitude as string)
        const longitude: number = parseFloat(req.query.longitude as string)
        const radius: number = parseFloat(req.query.radius as string)

        const data: PlaceDTO[] = await PlaceService.getPlacesByProximity(latitude, longitude, radius)
        
        res.status(HTTP_STATUS.OK).json(data)
    }
    catch (error) 
    {
        next(error)
    }
}