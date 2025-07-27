import { NextFunction, Response } from 'express'
import { ExpressRequest } from '../middlewares/auth.middleware.ts'
import * as PlaceService from '../services/place.service.ts' 
import { placeCreation, placeUpdation } from '../types/place.type.ts'
import { placeDTO } from '../DTOs/place.dto.ts'
import { AppError } from '../utils/appError.ts'

export const createPlace = async(req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data: placeCreation = req.body
        const place: placeDTO = await PlaceService.createPlace(data)

        res.status(201).json(place)
    }
    catch (error) 
    {
        next(error)
    }
}

export const getPlaces = async(req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const places: placeDTO[] = await PlaceService.getPlaces()

        res.status(200).json(places)
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
        const place: placeDTO = await PlaceService.updatePlace(place_id,data)

        res.status(200).json(place)
    }
    catch (error) 
    {
        next(error)
    }
}


export const getPlacesByProximity = async(req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const latitude: number = parseInt(req.query.latitude as string)
        const longitude: number = parseInt(req.query.longitude as string)
        const radius: number = parseInt(req.query.radius as string)

        const data: placeDTO[] = await PlaceService.getPlacesByProximity(latitude, longitude, radius)
        
        res.status(200).json(data)
    }
    catch (error) 
    {
        next(error)
    }
}