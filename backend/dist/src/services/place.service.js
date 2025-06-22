var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import placeDao from "../repositories/dao/place.dao.js";
import { placeDTO } from "../DTOs/place.dto.js";
export const createPlace = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const place = yield placeDao.createPlace(data);
    return new placeDTO(place);
});
export const getPlaces = () => __awaiter(void 0, void 0, void 0, function* () {
    const places = yield placeDao.getPlaces();
    return places.map((place) => new placeDTO(place));
});
export const getPlaceByTypeAndName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const place = yield placeDao.getPlaceByName(name);
    return new placeDTO(place);
});
export const updatePlace = (place_id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const place = yield placeDao.updatePlace(place_id, data);
    return new placeDTO(place);
});
export const getPlacesByProximity = (latitude, longitude, radius) => __awaiter(void 0, void 0, void 0, function* () {
    const places = yield placeDao.getPlacesByProximity(latitude, longitude, radius);
    return places.map((place) => new placeDTO(place));
});
