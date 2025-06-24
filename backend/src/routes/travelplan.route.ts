import express from 'express'
import { authenticate } from '../middlewares/auth.middleware.ts'
import { craeteTravelPlan, deleteTravelPlanById, getTravelPlanById, getTravelPlans, updateTravelPlanById } from '../controllers/travelplan.controller.ts'
import { createTravelPlanComment, getTravelPlanComments } from '../controllers/travelplanmessage.controller.ts'
export const travelPlanRouter = express.Router() 

travelPlanRouter.post('/', authenticate, craeteTravelPlan)
travelPlanRouter.get('/', authenticate, getTravelPlans)
travelPlanRouter.get('/:travel_plan_id', authenticate, getTravelPlanById)
travelPlanRouter.patch('/:travel_plan_id', authenticate, updateTravelPlanById)
travelPlanRouter.delete('/:travel_plan_id', authenticate, deleteTravelPlanById) 

// // member related routes 
// travelPlanRouter.post('/:travel_plan_id/members')
// travelPlanRouter.get('/:travel_plan_id/members',) 
// travelPlanRouter.patch('/:travel_plan_id/members/:user_id/role')


// // plan comments related 
// add a middleware
travelPlanRouter.post('/:travel_plan_id/comments', authenticate, createTravelPlanComment )
travelPlanRouter.get('/:travel_plan_id/comments', authenticate, getTravelPlanComments )
// travelPlanRouter.patch('/:travel_plan_id/comments',)
// travelPlanRouter.delete('/:travel_plan_id/comments',)