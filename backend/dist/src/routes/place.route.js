import express from 'express';
import { authenticate, authorizeAdmin } from "../middlewares/auth.middleware.js";
import { createPlace, getPlaces, getPlacesByProximity, updatePlace } from "../controllers/place.controller.js";
import { validatePlaceCreationData, validatePlaceUpdationData } from "../validations/validationMiddlewares/place.validation.js";
export const placeRouter = express.Router();
placeRouter.post('/', authenticate, authorizeAdmin, validatePlaceCreationData, createPlace);
placeRouter.get('/', authenticate, getPlaces);
placeRouter.patch('/:placeId', authenticate, authorizeAdmin, validatePlaceUpdationData, updatePlace);
placeRouter.get('/search', authenticate, getPlacesByProximity);
