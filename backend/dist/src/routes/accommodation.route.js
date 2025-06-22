import express from 'express';
import { authenticate, authorizeAdmin } from "../middlewares/auth.middleware.js";
import { createAccommodation, getAccommodations, getAccommodationsByProximity, updateAccommodation } from "../controllers/accommodation.controller.js";
import { validateAccommodationCreationData, validateAccommodationUpdationData } from "../validations/validationMiddlewares/accommodation.validation.js";
export const accommodationRouter = express.Router();
accommodationRouter.post('/', authenticate, authorizeAdmin, validateAccommodationCreationData, createAccommodation);
accommodationRouter.get('/', authenticate, getAccommodations);
accommodationRouter.patch('/:accommodationId', authenticate, authorizeAdmin, validateAccommodationUpdationData, updateAccommodation);
accommodationRouter.get('/search', authenticate, getAccommodationsByProximity);
