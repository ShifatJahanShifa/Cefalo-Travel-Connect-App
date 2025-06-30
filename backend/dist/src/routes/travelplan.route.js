import express from 'express';
import { authenticate } from "../middlewares/auth.middleware.js";
import { craeteTravelPlan, deleteTravelPlanById, getTravelPlanById, getTravelPlans, updateTravelPlanById } from "../controllers/travelplan.controller.js";
import { createTravelPlanComment, getTravelPlanComments } from "../controllers/travelplanmessage.controller.js";
import { addTravelPlanMember, getTravelPlanMemmebrs, updateTravelPlanMemberRole } from "../controllers/travelplanmember.controller.js";
export const travelPlanRouter = express.Router();
travelPlanRouter.post('/', authenticate, craeteTravelPlan);
travelPlanRouter.get('/', authenticate, getTravelPlans);
travelPlanRouter.get('/:travel_plan_id', authenticate, getTravelPlanById);
travelPlanRouter.patch('/:travel_plan_id', authenticate, updateTravelPlanById);
travelPlanRouter.delete('/:travel_plan_id', authenticate, deleteTravelPlanById);
// // member related routes 
travelPlanRouter.post('/:travel_plan_id/members', authenticate, addTravelPlanMember);
travelPlanRouter.get('/:travel_plan_id/members', authenticate, getTravelPlanMemmebrs);
travelPlanRouter.patch('/:travel_plan_id/members/:user_id/role', authenticate, updateTravelPlanMemberRole);
// // plan comments related 
travelPlanRouter.post('/:travel_plan_id/comments', authenticate, createTravelPlanComment);
travelPlanRouter.get('/:travel_plan_id/comments', authenticate, getTravelPlanComments);
