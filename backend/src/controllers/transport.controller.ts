import { NextFunction, Response } from 'express'
import { ExpressRequest } from '../middlewares/auth.middleware.ts'
import * as TransportService from '../services/transport.service.ts' 
import { transportCreation, transportUpdation } from '../types/transport.type.ts'
import { TransportDTO } from '../DTOs/transport.dto.ts'
import { AppError } from '../utils/appError.ts'
import { HTTP_STATUS } from '../constants/httpStatus.ts'

export const createTransport = async(req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data: transportCreation = req.body
        const transport: TransportDTO = await TransportService.createtransport(data)

        res.status(HTTP_STATUS.CREATED).json(transport)
    }
    catch (error) 
    {
        next(error)
    }
}

export const getTransports = async(req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const transports: TransportDTO[] = await TransportService.gettransports()

        res.status(HTTP_STATUS.OK).json(transports)
    }
    catch (error) 
    {
        next(error)
    }
}

export const updateTransport = async(req:ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const transport_id: string = (req.params.transportId) 
        const data: transportUpdation = req.body
        const transport: TransportDTO = await TransportService.updatetransport(transport_id,data)

        res.status(HTTP_STATUS.OK).json(transport)
    }
    catch (error) 
    {
        next(error)
    }
}


export const getTransportsByProximity = async(req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const latitude: number = parseInt(req.query.latitude as string)
        const longitude: number = parseInt(req.query.longitude as string)
        const radius: number = parseInt(req.query.radius as string)

        const data: TransportDTO[] = await TransportService.gettransportsByProximity(latitude, longitude, radius)
        
        res.status(HTTP_STATUS.OK).json(data)
    }
    catch (error) 
    {
        next(error)
    }
}