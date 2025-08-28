import express from 'express'
import { authenticate, authorizeAdmin } from '../middlewares/auth.middleware.ts'
import { createTransport, getTransports, getTransportsByProximity, updateTransport } from '../controllers/transport.controller.ts'
import { validatetransportCreationData, validatetransportUpdationData } from '../validations/validationMiddlewares/transport.validation.ts'

export const transportRouter = express.Router()

transportRouter.get('/', authenticate, getTransports)
transportRouter.get('/search',authenticate, getTransportsByProximity)
transportRouter.post('/',authenticate, authorizeAdmin, validatetransportCreationData ,createTransport)
transportRouter.patch('/:transportId',authenticate, authorizeAdmin, validatetransportUpdationData, updateTransport)