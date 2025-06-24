import { ExpressRequest } from "../middlewares/auth.middleware";
import placeDao from "../repositories/dao/place.dao.ts";
import { placeDTO } from "../DTOs/place.dto.ts";
import { placeCreation, placeUpdation, getPlace } from "../types/place.type.ts";
import { AppError } from "../utils/appError.ts";

export const createPlace = async (data: placeCreation): Promise<placeDTO> => {
    const place: placeCreation = await placeDao.createPlace(data)
    return new placeDTO(place)
}

export const getPlaces = async (): Promise<placeDTO[]> => {
    const places: getPlace[] = await placeDao.getPlaces()
    return places.map((place) => new placeDTO(place))
}

export const getPlaceByName = async (name: string): Promise<placeDTO> => {
    const place: getPlace = await placeDao.getPlaceByName(name)
    
    if(!place) 
    {
        throw new AppError("place not found", 404)
    }
    return new placeDTO(place)
}

export const updatePlace = async (place_id: string, data: placeUpdation): Promise<placeDTO> => {
    const place: placeCreation = await placeDao.updatePlace(place_id, data)
    return new placeDTO(place)
}

export const getPlacesByProximity = async(latitude: number, longitude: number, radius: number): Promise<placeDTO[]> => {
    const places: getPlace[] = await placeDao.getPlacesByProximity(latitude, longitude, radius)
    return places.map((place) => new placeDTO(place))
}