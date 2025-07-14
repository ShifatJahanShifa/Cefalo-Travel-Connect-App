import * as WishlistService from "../services/wishlist.service.ts" 
import * as UserService from '../services/user.service.ts'
import { WishlistDTO } from "../DTOs/wishlist.dto.ts"
import * as PlaceService from "../services/place.service.ts"
import { ExpressRequest } from "../middlewares/auth.middleware.ts"
import { NextFunction, Request, Response } from "express"
import { createdUser } from "../types/auth.type.ts"
import userDAO from "../repositories/dao/user.respository.ts"
import { UserDTO } from "../DTOs/user.dto.ts"
import { createWishlistType } from "../types/wishlist.type.ts"
import { PlaceDTO } from "../DTOs/place.dto.ts"
import dotenv from 'dotenv'
import { placeCreation } from "../types/place.type.ts"
import { HTTP_STATUS } from "../constants/httpStatus.ts"
dotenv.config()

export const createWishlist = async(req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user: UserDTO = await UserService.getUserByUsername(req.username!)
       
        const payload: createWishlistType = req.body
        let place: PlaceDTO | null = await PlaceService.getPlaceByName(req.body.place_name)
        if(!place) 
        {
            const data: placeCreation = {
                place_name: req.body.place_name,
                latitude: req.body.latitude,
                longitude: req.body.longitude
            }
            place = await PlaceService.createPlace(data)
        }
        payload.user_id = user.user_id
        payload.reference_id = place.place_id

        const wishlist: WishlistDTO = await WishlistService.createWishlist(payload)

        res.status(HTTP_STATUS.CREATED).json(wishlist)
    }
    catch(error)
    {
        next(error)
    }
} 

export const getWishlists = async(req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const page: number = parseInt(req.query.page as string)
        const limit: number = parseInt(req.query.limit as string)

        const wishlists: WishlistDTO[] = await WishlistService.getWishlists(page, limit)

        res.status(HTTP_STATUS.OK).json(wishlists)
    }
    catch(err)
    {
        next(err)
    }
}

export const getWishlistById = async(req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const wishlist_id: string = (req.params.wishlist_id)  

        const wishlist: WishlistDTO = await WishlistService.getWishlistById(wishlist_id)

        res.status(HTTP_STATUS.OK).json(wishlist)
    }
    catch(err)
    {
        next(err)
    }
}

export const updateWishlist = async(req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const wishlist_id: string = (req.params.wishlist_id)  

        const user: UserDTO = await UserService.getUserByUsername(req.username!)
        const payload: createWishlistType = req.body
        const place: PlaceDTO | null = await PlaceService.getPlaceByName(req.body.place_name)
        payload.user_id = user.user_id
        payload.reference_id = place?.place_id as string 

        const wishlist = await WishlistService.updateWishlist(wishlist_id, payload)

        res.status(HTTP_STATUS.OK).json(wishlist)
    }
    catch(err)
    {
        next(err)
    }
}

export const deleteWishlist = async(req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const wishlist_id: string = (req.params.wishlist_id)  
        const user: UserDTO = await UserService.getUserByUsername(req.username!) 
        const wishlist = await WishlistService.deleteWishlist(wishlist_id, user.user_id)
   
        res.status(HTTP_STATUS.NO_CONTENT).json(wishlist)
    }
    catch(err)
    {
        next(err)
    }
}

export const getWishlistByUserid = async(req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const username: string = req.params.username
        const user: UserDTO = await UserService.getUserByUsername(username)

        const page: number = parseInt(req.query.page as string)
        const limit: number = parseInt(req.query.limit as string)
     
        const wishlists: WishlistDTO[] = await WishlistService.getWishlistByUserid(user.user_id, page, limit)

        res.status(HTTP_STATUS.OK).json(wishlists)
    }
    catch (error) 
    {
        next(error)
    }
}


export const shareWishlist = async (req: ExpressRequest, res: Response) => {
    const wishlist_id: string = (req.params.wishlist_id)
    
    const shareURL = `${process.env.BASE_URL}/shared/${wishlist_id}`
    res.status(HTTP_STATUS.OK).json( shareURL )
};


export const toggleVisibility = async (req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const wishlist_id: string = req.params.wishlist_id
        const result: string = await WishlistService.toggleVisibility(wishlist_id)

        res.status(HTTP_STATUS.OK).json(result)
    }
    catch(err) 
    {
        next(err)
    }
} 

export const groupUsersByWishlistTheme = async (req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const theme: string = req.body.theme
    
        const results = await WishlistService.groupUsersByWishlistTheme(theme)

        res.status(HTTP_STATUS.OK).json(results)
    }
    catch(error) 
    {
        next(error)
    }
}