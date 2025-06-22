var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as PlaceService from "../services/place.service.js";
export const createPlace = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const place = yield PlaceService.createPlace(data);
        res.status(201).json(place);
    }
    catch (error) {
        next(error);
    }
});
export const getPlaces = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const places = yield PlaceService.getPlaces();
        res.status(200).json(places);
    }
    catch (error) {
        next(error);
    }
});
export const updatePlace = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const place_id = parseInt(req.params.placeId);
        const data = req.body;
        const place = yield PlaceService.updatePlace(place_id, data);
        res.status(200).json(place);
    }
    catch (error) {
        next(error);
    }
});
export const getPlacesByProximity = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const latitude = parseInt(req.query.latitude);
        const longitude = parseInt(req.query.longitude);
        const radius = parseInt(req.query.radius);
        const data = yield PlaceService.getPlacesByProximity(latitude, longitude, radius);
        res.status(200).json(data);
    }
    catch (error) {
        next(error);
    }
});
