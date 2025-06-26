import express from 'express'
import { authenticate, authorizeAdmin } from '../middlewares/auth.middleware.ts'
import { createAccommodation, getAccommodations, getAccommodationsByProximity, updateAccommodation } from '../controllers/accommodation.controller.ts'
import { validateAccommodationCreationData, validateAccommodationUpdationData } from '../validations/validationMiddlewares/accommodation.validation.ts'

export const accommodationRouter = express.Router()

accommodationRouter.post('/',authenticate, authorizeAdmin, validateAccommodationCreationData ,createAccommodation)
accommodationRouter.get('/', authenticate, getAccommodations)
accommodationRouter.patch('/:accommodationId',authenticate, authorizeAdmin, validateAccommodationUpdationData, updateAccommodation)
accommodationRouter.get('/search',authenticate, getAccommodationsByProximity)