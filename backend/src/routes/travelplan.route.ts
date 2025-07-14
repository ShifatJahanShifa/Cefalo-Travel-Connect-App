import express from 'express'
import { authenticate } from '../middlewares/auth.middleware.ts'
import { craeteTravelPlan, deleteTravelPlanById, getTravelPlanById, getTravelPlans, updateTravelPlanById } from '../controllers/travelplan.controller.ts'
import { createTravelPlanComment, getTravelPlanComments } from '../controllers/travelplanmessage.controller.ts'
import { addTravelPlanMember, getTravelPlanMemmebrs, updateTravelPlanMemberRole } from '../controllers/travelplanmember.controller.ts'
export const travelPlanRouter = express.Router() 

travelPlanRouter.get('/', authenticate, getTravelPlans)
travelPlanRouter.get('/:travel_plan_id', authenticate, getTravelPlanById)
travelPlanRouter.post('/', authenticate, craeteTravelPlan)
travelPlanRouter.patch('/:travel_plan_id', authenticate, updateTravelPlanById)
travelPlanRouter.delete('/:travel_plan_id', authenticate, deleteTravelPlanById) 


travelPlanRouter.get('/:travel_plan_id/members', authenticate, getTravelPlanMemmebrs) 
travelPlanRouter.post('/:travel_plan_id/members', authenticate, addTravelPlanMember)
travelPlanRouter.patch('/:travel_plan_id/members/:user_id/role', authenticate, updateTravelPlanMemberRole)


travelPlanRouter.get('/:travel_plan_id/comments', authenticate, getTravelPlanComments )
travelPlanRouter.post('/:travel_plan_id/comments', authenticate, createTravelPlanComment )