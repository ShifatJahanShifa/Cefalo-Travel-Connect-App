import { NextFunction, Response } from 'express'
import { ExpressRequest } from '../middlewares/auth.middleware.ts'
import * as ProximityService from '../services/proximity.service.ts' 
import { proximity } from '../types/proximity.type.ts'
import { UserDTO } from '../DTOs/user.dto.ts'
import * as UserService from '../services/user.service.ts'
import { ProximityDTO } from '../DTOs/proximity.dto.ts'
import * as WishlistService from '../services/wishlist.service.ts'
import { WishlistDTO } from '../DTOs/wishlist.dto.ts'
import { getDistanceInKm } from '../utils/distanceCalculator.ts'
import { HTTP_STATUS } from '../constants/httpStatus.ts'


export const createProximity = async(req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user: UserDTO = await UserService.getUserByUsername(req.username!)
        
        // only adding for wishlist now. later may consider other services
        const proximityData: proximity = {
            user_id: user.user_id,
            type: req.body.type, 
            reference_id: req.body.reference_id,
            radius: req.body.radius
        }

        const result: ProximityDTO = await ProximityService.createProximity(proximityData)

        res.status(HTTP_STATUS.CREATED).json(result)
    }
    catch(error)
    {
        next(error)
    }
}

export const findUserProximity = async(req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user: UserDTO = await UserService.getUserByUsername(req.username!)

        const result: ProximityDTO[] = await ProximityService.findUserProximity(user.user_id)
        res.status(HTTP_STATUS.OK).json(result)
    }
    catch(error)
    {
        next(error)
    }
}

export const updateProximity = async(req: ExpressRequest, res: Response, next: NextFunction) => {
    try {
        const user: UserDTO = await UserService.getUserByUsername(req.username!)
        
        const proximityData: proximity = {
            user_id: user.user_id,
            type: req.body.type, 
            reference_id: req.body.reference_id,
            radius: req.body.radius
        }

        const result: ProximityDTO = await ProximityService.updateProximity(proximityData)

        res.status(HTTP_STATUS.OK).json(result)
    }
    catch(error)
    {
        next(error)
    }
}


export const deleteProximity = async(req: ExpressRequest, res: Response, next: NextFunction) => {
    try {
        const user: UserDTO = await UserService.getUserByUsername(req.username!)
        
        const proximityData: proximity = {
            user_id: user.user_id,
            type: req.body.type, 
            reference_id: req.body.reference_id,
            radius: req.body.radius
        }

        const result: boolean = await ProximityService.deleteProximity(proximityData)

        res.status(HTTP_STATUS.NO_CONTENT).json(result)
    }
    catch(error)
    {
        next(error)
    }
}

export const checkProximities = async(req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const alerts = [];
        const user: UserDTO = await UserService.getUserByUsername(req.username!)
        const { userLat, userLong } = req.body
        const proximities: proximity[] = await ProximityService.findUserProximity(user.user_id)

        for (const proximity of proximities) {
            const wishlist: WishlistDTO = await WishlistService.getWishlistById(proximity.reference_id);
            

            const latitude = wishlist.place_latitude as number;
            const longitude = wishlist.place_longitude as number;

            const distance = getDistanceInKm(userLat, userLong, latitude, longitude);

            if (distance <= Number(proximity.radius)) {
                alerts.push({
                    wishlist_id: wishlist.wishlist_id,
                    title: wishlist.title,
                    place: wishlist.place_name,
                    distance,
                    threshold: proximity.radius,
                });

                ProximityService.deleteProximityById(proximity.proximity_id!)
            }
        }

        res.status(HTTP_STATUS.OK).json(alerts)
    } 
    catch(error)
    {
        next(error)
    }
  
}