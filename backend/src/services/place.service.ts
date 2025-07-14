import { ExpressRequest } from "../middlewares/auth.middleware"
import placeDao from "../repositories/dao/place.repository.ts"
import { PlaceDTO } from "../DTOs/place.dto.ts"
import { placeCreation, placeUpdation, getPlace } from "../types/place.type.ts"
import { AppError } from "../utils/appError.ts"

export const createPlace = async (data: placeCreation): Promise<PlaceDTO> => {
    const place: placeCreation = await placeDao.createPlace(data)
    return new PlaceDTO(place)
}

export const getPlaces = async (): Promise<PlaceDTO[]> => {
    const places: getPlace[] = await placeDao.getPlaces()
    return places.map((place) => new PlaceDTO(place))
}

export const getPlaceByName = async (name: string): Promise<PlaceDTO|null> => {
    const place: getPlace = await placeDao.getPlaceByName(name)
    
    if(!place) return null
    return new PlaceDTO(place)
}

export const updatePlace = async (place_id: string, data: placeUpdation): Promise<PlaceDTO> => {
    const place: placeCreation = await placeDao.updatePlace(place_id, data)
    return new PlaceDTO(place)
}

export const getPlacesByProximity = async(latitude: number, longitude: number, radius: number): Promise<PlaceDTO[]> => {
    const places: getPlace[] = await placeDao.getPlacesByProximity(latitude, longitude, radius)
    return places.map((place) => new PlaceDTO(place))
}