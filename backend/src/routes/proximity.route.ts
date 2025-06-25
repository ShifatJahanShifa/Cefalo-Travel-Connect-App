import express from 'express'
import { authenticate } from '../middlewares/auth.middleware.ts'
import { checkProximities, createProximity, deleteProximity, findUserProximity, updateProximity } from '../controllers/proximity.controller.ts'
export const proximityRouter = express.Router()

proximityRouter.post('/', authenticate, createProximity) 
proximityRouter.post('/alert', authenticate, checkProximities)
proximityRouter.get('/:username', authenticate, findUserProximity)
proximityRouter.put('/', authenticate, updateProximity)
proximityRouter.delete('/', authenticate, deleteProximity)