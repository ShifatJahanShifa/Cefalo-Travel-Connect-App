import * as AccommodationService from "../services/accommodation.service.js";
export const createAccommodation = async (req, res, next) => {
    try {
        const data = req.body;
        const accommodation = await AccommodationService.createAccommodation(data);
        res.status(201).json(accommodation);
    }
    catch (error) {
        next(error);
    }
};
export const getAccommodations = async (req, res, next) => {
    try {
        const accommodations = await AccommodationService.getAccommodations();
        res.status(200).json(accommodations);
    }
    catch (error) {
        next(error);
    }
};
export const updateAccommodation = async (req, res, next) => {
    try {
        const accommodation_id = (req.params.accommodationId);
        const data = req.body;
        const accommodation = await AccommodationService.updateAccommodation(accommodation_id, data);
        res.status(200).json(accommodation);
    }
    catch (error) {
        next(error);
    }
};
export const getAccommodationsByProximity = async (req, res, next) => {
    try {
        const latitude = parseInt(req.query.latitude);
        const longitude = parseInt(req.query.longitude);
        const radius = parseInt(req.query.radius);
        const data = await AccommodationService.getAccommodationsByProximity(latitude, longitude, radius);
        res.status(200).json(data);
    }
    catch (error) {
        next(error);
    }
};
