import { NextFunction, Response } from 'express'
import { ExpressRequest } from '../middlewares/auth.middleware.ts'
import * as AccommodationService from '../services/accommodation.service.ts' 
import { accommodationCreation, accommodationUpdation } from '../types/accommodation.type.ts'
import { AccommodationDTO } from '../DTOs/accommodation.dto.ts'
import { AppError } from '../utils/appError.ts'

export const createAccommodation = async(req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data: accommodationCreation = req.body
        const accommodation: AccommodationDTO = await AccommodationService.createAccommodation(data)

        res.status(201).json(accommodation)
    }
    catch (error) 
    {
        next(error)
    }
}

export const getAccommodations = async(req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const accommodations: AccommodationDTO[] = await AccommodationService.getAccommodations()

        res.status(200).json(accommodations)
    }
    catch (error) 
    {
        next(error)
    }
}

export const updateAccommodation = async(req:ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const accommodation_id: string = (req.params.accommodationId) 
        const data: accommodationUpdation = req.body
        const accommodation: AccommodationDTO = await AccommodationService.updateAccommodation(accommodation_id,data)

        res.status(200).json(accommodation)
    }
    catch (error) 
    {
        next(error)
    }
}


export const getAccommodationsByProximity = async(req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const latitude: number = parseInt(req.query.latitude as string)
        const longitude: number = parseInt(req.query.longitude as string)
        const radius: number = parseInt(req.query.radius as string)

        const data: AccommodationDTO[] = await AccommodationService.getAccommodationsByProximity(latitude, longitude, radius)
        
        res.status(200).json(data)
    }
    catch (error) 
    {
        next(error)
    }
}