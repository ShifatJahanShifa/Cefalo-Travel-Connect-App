import express from 'express'
import { authenticate, authorizeAdmin } from '../middlewares/auth.middleware.ts'
import { createPlace, getPlaces, getPlacesByProximity, updatePlace } from '../controllers/place.controller.ts'
import { validatePlaceCreationData, validatePlaceUpdationData } from '../validations/validationMiddlewares/place.validation.ts'

export const placeRouter = express.Router()

placeRouter.get('/', authenticate, getPlaces)
placeRouter.get('/search',authenticate, getPlacesByProximity)
placeRouter.post('/',authenticate, authorizeAdmin, validatePlaceCreationData ,createPlace)
placeRouter.patch('/:placeId',authenticate, authorizeAdmin, validatePlaceUpdationData, updatePlace)