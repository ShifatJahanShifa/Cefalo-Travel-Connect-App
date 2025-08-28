import express from 'express'
import { authenticate, authorizeAdmin } from '../middlewares/auth.middleware.ts'
import { createAccommodation, getAccommodations, getAccommodationsByProximity, updateAccommodation } from '../controllers/accommodation.controller.ts'
import { validateAccommodationCreationData, validateAccommodationUpdationData } from '../validations/validationMiddlewares/accommodation.validation.ts'

export const accommodationRouter = express.Router()

accommodationRouter.get('/', authenticate, getAccommodations)
accommodationRouter.get('/search',authenticate, getAccommodationsByProximity)
accommodationRouter.post('/',authenticate, authorizeAdmin, validateAccommodationCreationData ,createAccommodation)
accommodationRouter.patch('/:accommodationId',authenticate, authorizeAdmin, validateAccommodationUpdationData, updateAccommodation)