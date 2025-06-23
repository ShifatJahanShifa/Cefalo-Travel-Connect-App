import { ExpressRequest } from "../middlewares/auth.middleware";
import accommodationDao from "../repositories/dao/accommodation.dao.ts";
import { AccommodationDTO } from "../DTOs/accommodation.dto.ts";
import { accommodationCreation, accommodationUpdation, getAccommodation } from "../types/accommodation.type.ts";

export const createAccommodation = async (data: accommodationCreation): Promise<AccommodationDTO> => {
    const accommodation: getAccommodation = await accommodationDao.createAccommodation(data)
    return new AccommodationDTO(accommodation)
}

export const getAccommodations = async (): Promise<AccommodationDTO[]> => {
    const accommodations: getAccommodation[] = await accommodationDao.getAccommodations()
    return accommodations.map((accommodation) => new AccommodationDTO(accommodation))
}

export const getAccommodationByTypeAndName = async (type: string, name: string): Promise<AccommodationDTO> => {
    const accommodation: getAccommodation = await accommodationDao.getAccommodationByTypeAndName(type, name)
    return new AccommodationDTO(accommodation)
}

export const updateAccommodation = async (accommodation_id: string, data: accommodationUpdation): Promise<AccommodationDTO> => {
    const accommodation: accommodationCreation = await accommodationDao.updateAccommodation(accommodation_id, data)
    return new AccommodationDTO(accommodation)
}

export const getAccommodationsByProximity = async(latitude: number, longitude: number, radius: number): Promise<AccommodationDTO[]> => {
    const accommodations: getAccommodation[] = await accommodationDao.getAccommodationsByProximity(latitude, longitude, radius)
    return accommodations.map((accommodation) => new AccommodationDTO(accommodation))
}