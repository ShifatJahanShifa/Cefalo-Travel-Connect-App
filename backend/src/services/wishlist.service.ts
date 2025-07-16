import { HTTP_STATUS } from "../constants/httpStatus.ts";
import { PlaceDTO } from "../DTOs/place.dto.ts";
import { WishlistDTO } from "../DTOs/wishlist.dto.ts";
import placeDao from "../repositories/dao/place.repository.ts";
import wishlistDao from "../repositories/dao/wishlist.repository.ts";
import { getPlace } from "../types/place.type.ts";
import { createWishlistType, getWishlistType, groupedUsers } from "../types/wishlist.type.ts";
import { AppError } from "../utils/appError.ts";
import { doesDataExist } from "../utils/dataExistenceChecker.ts";

import dotenv from 'dotenv';
dotenv.config();

export const createWishlist = async(data: createWishlistType): Promise<WishlistDTO> => {
    const result: getWishlistType = await wishlistDao.createWishlist(data) ;

    return new WishlistDTO(result);
} 

export const getWishlists = async(page: number, limit: number): Promise<WishlistDTO[]> => {
    const results: getWishlistType[] = await wishlistDao.getWishlists(page, limit);

    if(!results || results.length === 0) 
    {
        throw new AppError("wishlist not found", HTTP_STATUS.NOT_FOUND);
    }

    // adding place info 
    const filteredResults = results.filter(result => result.type==="place");
    const ids: string[] = [];

    // for (let index = 0; index < filteredResults.length; index++) {
    //     ids.push(filteredResults[index].reference_id);
    // } 

    filteredResults.forEach(result => {
        ids.push(result.reference_id)
    });

    let placeMap: Record<string, getPlace> = {};
    
    if(doesDataExist(ids)) 
    {
        const places: getPlace[] = await placeDao.getById(ids);
        placeMap = places.reduce((acc, place) => {
            acc[place.place_id] = place;
            return acc;
        }, {} as Record<string, getPlace>);
    }

    const enrichedWishlists = results.map(wishlist => {
        if (wishlist.type === 'place') {
            const place = placeMap[wishlist.reference_id];
            if (place) {
                return {
                    ...wishlist,
                    place_name: place.place_name,
                    place_latitude: place.latitude,
                    place_longitude: place.longitude
                };
            }
        }
        return wishlist;
    })
    return enrichedWishlists.map((result) => new WishlistDTO(result));
}

export const getWishlistById = async(wishlist_id: string): Promise<WishlistDTO> => {
    const result: getWishlistType = await wishlistDao.getWishlistById(wishlist_id);

    if(!result) 
    {
        throw new AppError("wishlist not found", HTTP_STATUS.NOT_FOUND);
    }

    if (result.type === 'place') {
        let ids = [];
        ids.push(result.reference_id);
        const place = await placeDao.getById(ids);
        
        if (place) {
            result.place_name = place[0].place_name;
            result.place_latitude = place[0].latitude;
            result.place_longitude = place[0].longitude;
        }
    }

 

    return new WishlistDTO(result);
}

export const updateWishlist = async(wishlist_id: string, payload: createWishlistType): Promise<string> => {
    const wishlist: getWishlistType = await wishlistDao.getWishlistById(wishlist_id);
    if(!wishlist) 
    {
        throw new AppError("wishlist is not found", HTTP_STATUS.NOT_FOUND);
    }
    
    if(wishlist.user_id !== payload.user_id) 
    {
        throw new AppError("You are not authorized to update wishlist", HTTP_STATUS.FORBIDDEN);
    }
    const result: string = await wishlistDao.updateWishlist(wishlist_id, payload);

    return result;
}

export const deleteWishlist = async(wishlist_id: string, user_id: string): Promise<string> => {
    const wishlist: getWishlistType = await wishlistDao.getWishlistById(wishlist_id);
    if(!wishlist) 
    {
        throw new AppError("wishlist is not found", HTTP_STATUS.NOT_FOUND);
    }
    
    if(wishlist.user_id !== user_id) 
    {
        throw new AppError("You are not authorized to update wishlist", HTTP_STATUS.FORBIDDEN);
    }

    const result: string = await wishlistDao.deleteWishlist(wishlist_id);

    return result;
}

export const getWishlistByUserid = async(user_id: string, page: number, limit: number): Promise<WishlistDTO[]> => {
    const results: getWishlistType[] = await wishlistDao.getWishlistByUserid(user_id, page, limit);

    // if(!results || results.length === 0) 
    // {
    //     throw new AppError("wishlist not found", HTTP_STATUS.NOT_FOUND);
    // }

    return results.map((result) => new WishlistDTO(result));
}

export const toggleVisibility = async(wishlist_id: string): Promise<string> => {
    const result: string = await wishlistDao.toggleVisibility(wishlist_id);

    return result;
}


// returning the type, not calling dto
export const groupUsersByWishlistTheme = async (theme: string): Promise<groupedUsers[]> => {
   
    const results: groupedUsers[] = await wishlistDao.groupUsersByWishlistTheme(theme)

    if(!results) 
    {
        throw new AppError("no user matchted found", HTTP_STATUS.BAD_REQUEST) 
    }

    return results;
}