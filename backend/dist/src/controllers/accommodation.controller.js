var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as AccommodationService from "../services/accommodation.service.js";
export const createAccommodation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const accommodation = yield AccommodationService.createAccommodation(data);
        res.status(201).json(accommodation);
    }
    catch (error) {
        next(error);
    }
});
export const getAccommodations = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accommodations = yield AccommodationService.getAccommodations();
        res.status(200).json(accommodations);
    }
    catch (error) {
        next(error);
    }
});
export const updateAccommodation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accommodation_id = parseInt(req.params.accommodationId);
        const data = req.body;
        const accommodation = yield AccommodationService.updateAccommodation(accommodation_id, data);
        res.status(200).json(accommodation);
    }
    catch (error) {
        next(error);
    }
});
export const getAccommodationsByProximity = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const latitude = parseInt(req.query.latitude);
        const longitude = parseInt(req.query.longitude);
        const radius = parseInt(req.query.radius);
        const data = yield AccommodationService.getAccommodationsByProximity(latitude, longitude, radius);
        res.status(200).json(data);
    }
    catch (error) {
        next(error);
    }
});
