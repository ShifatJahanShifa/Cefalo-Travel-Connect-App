import express from 'express';
import { authenticate, authorizeAdmin } from "../middlewares/auth.middleware.js";
import { createTransport, getTransports, getTransportsByProximity, updateTransport } from "../controllers/transport.controller.js";
import { validatetransportCreationData, validatetransportUpdationData } from "../validations/validationMiddlewares/transport.validation.js";
export const transportRouter = express.Router();
transportRouter.post('/', authenticate, authorizeAdmin, validatetransportCreationData, createTransport);
transportRouter.get('/', authenticate, getTransports);
transportRouter.patch('/:transportId', authenticate, authorizeAdmin, validatetransportUpdationData, updateTransport);
transportRouter.get('/search', authenticate, getTransportsByProximity);
