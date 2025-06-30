import * as PlaceService from "../services/place.service.js";
export const createPlace = async (req, res, next) => {
    try {
        const data = req.body;
        const place = await PlaceService.createPlace(data);
        res.status(201).json(place);
    }
    catch (error) {
        next(error);
    }
};
export const getPlaces = async (req, res, next) => {
    try {
        const places = await PlaceService.getPlaces();
        res.status(200).json(places);
    }
    catch (error) {
        next(error);
    }
};
export const updatePlace = async (req, res, next) => {
    try {
        const place_id = (req.params.placeId);
        const data = req.body;
        const place = await PlaceService.updatePlace(place_id, data);
        res.status(200).json(place);
    }
    catch (error) {
        next(error);
    }
};
export const getPlacesByProximity = async (req, res, next) => {
    try {
        const latitude = parseInt(req.query.latitude);
        const longitude = parseInt(req.query.longitude);
        const radius = parseInt(req.query.radius);
        const data = await PlaceService.getPlacesByProximity(latitude, longitude, radius);
        res.status(200).json(data);
    }
    catch (error) {
        next(error);
    }
};
