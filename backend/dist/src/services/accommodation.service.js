import accommodationDao from "../repositories/dao/accommodation.repository.js";
import { AccommodationDTO } from "../DTOs/accommodation.dto.js";
export const createAccommodation = async (data) => {
    const accommodation = await accommodationDao.createAccommodation(data);
    return new AccommodationDTO(accommodation);
};
export const getAccommodations = async () => {
    const accommodations = await accommodationDao.getAccommodations();
    return accommodations.map((accommodation) => new AccommodationDTO(accommodation));
};
export const getAccommodationByTypeAndName = async (type, name) => {
    const accommodation = await accommodationDao.getAccommodationByTypeAndName(type, name);
    return new AccommodationDTO(accommodation);
};
export const updateAccommodation = async (accommodation_id, data) => {
    const accommodation = await accommodationDao.updateAccommodation(accommodation_id, data);
    return new AccommodationDTO(accommodation);
};
export const getAccommodationsByProximity = async (latitude, longitude, radius) => {
    const accommodations = await accommodationDao.getAccommodationsByProximity(latitude, longitude, radius);
    return accommodations.map((accommodation) => new AccommodationDTO(accommodation));
};
