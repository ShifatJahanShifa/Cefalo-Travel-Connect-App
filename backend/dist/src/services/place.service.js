import placeDao from "../repositories/dao/place.repository.js";
import { placeDTO } from "../DTOs/place.dto.js";
export const createPlace = async (data) => {
    const place = await placeDao.createPlace(data);
    return new placeDTO(place);
};
export const getPlaces = async () => {
    const places = await placeDao.getPlaces();
    return places.map((place) => new placeDTO(place));
};
export const getPlaceByName = async (name) => {
    const place = await placeDao.getPlaceByName(name);
    // if(!place) 
    // {
    //     throw new AppError("place not found", 404)
    // }
    if (!place)
        return undefined;
    return new placeDTO(place);
};
export const updatePlace = async (place_id, data) => {
    const place = await placeDao.updatePlace(place_id, data);
    return new placeDTO(place);
};
export const getPlacesByProximity = async (latitude, longitude, radius) => {
    const places = await placeDao.getPlacesByProximity(latitude, longitude, radius);
    return places.map((place) => new placeDTO(place));
};
