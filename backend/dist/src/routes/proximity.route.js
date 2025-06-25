import express from 'express';
import { authenticate } from "../middlewares/auth.middleware.js";
import { checkProximities, createProximity, deleteProximity, findUserProximity, updateProximity } from "../controllers/proximity.controller.js";
export const proximityRouter = express.Router();
proximityRouter.post('/', authenticate, createProximity);
proximityRouter.post('/alert', authenticate, checkProximities);
proximityRouter.get('/:username', authenticate, findUserProximity);
proximityRouter.put('/', authenticate, updateProximity);
proximityRouter.delete('/', authenticate, deleteProximity);
