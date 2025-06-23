import express from 'express'
import { authenticate } from '../middlewares/auth.middleware.ts'
import { craeteTravelPlan, deleteTravelPlanById, getTravelPlanById, getTravelPlans, updateTravelPlanById } from '../controllers/travelplan.controller.ts'
export const travelPlan = express.Router() 

travelPlan.post('/', authenticate, craeteTravelPlan)
travelPlan.get('/', authenticate, getTravelPlans)
travelPlan.get('/:travel_plan_id', authenticate, getTravelPlanById)
travelPlan.patch('/:travel_plan_id', authenticate, updateTravelPlanById)
travelPlan.delete('/:travel_plan_id', authenticate, deleteTravelPlanById)