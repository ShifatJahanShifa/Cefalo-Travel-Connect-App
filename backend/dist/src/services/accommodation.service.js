var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import accommodationDao from "../repositories/dao/accommodation.dao.js";
import { AccommodationDTO } from "../DTOs/accommodation.dto.js";
export const createAccommodation = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const accommodation = yield accommodationDao.createAccommodation(data);
    return new AccommodationDTO(accommodation);
});
export const getAccommodations = () => __awaiter(void 0, void 0, void 0, function* () {
    const accommodations = yield accommodationDao.getAccommodations();
    return accommodations.map((accommodation) => new AccommodationDTO(accommodation));
});
export const getAccommodationByTypeAndName = (type, name) => __awaiter(void 0, void 0, void 0, function* () {
    const accommodation = yield accommodationDao.getAccommodationByTypeAndName(type, name);
    return new AccommodationDTO(accommodation);
});
export const updateAccommodation = (accommodation_id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const accommodation = yield accommodationDao.updateAccommodation(accommodation_id, data);
    return new AccommodationDTO(accommodation);
});
export const getAccommodationsByProximity = (latitude, longitude, radius) => __awaiter(void 0, void 0, void 0, function* () {
    const accommodations = yield accommodationDao.getAccommodationsByProximity(latitude, longitude, radius);
    return accommodations.map((accommodation) => new AccommodationDTO(accommodation));
});
