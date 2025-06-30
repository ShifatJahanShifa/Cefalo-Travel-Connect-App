import * as UserService from "../services/user.service.js";
import * as TravelPlanService from "../services/travelplan.service.js";
export const craeteTravelPlan = async (req, res, next) => {
    try {
        // at first getting the planner_id 
        const user = await UserService.getUserByUsername(req.username);
        const payload = req.body;
        payload.planner_id = user.user_id;
        const result = await TravelPlanService.craeteTravelPlan(payload);
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
};
export const getTravelPlans = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const results = await TravelPlanService.getTravelPlans(page, limit);
        res.status(200).json(results);
    }
    catch (error) {
        next(error);
    }
};
export const getTravelPlanById = async (req, res, next) => {
    try {
        const result = await TravelPlanService.getTravelPlanById(req.params.travel_plan_id);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
export const updateTravelPlanById = async (req, res, next) => {
    try {
        const user = await UserService.getUserByUsername(req.username);
        const payload = req.body;
        payload.planner_id = user.user_id;
        const result = await TravelPlanService.updateTravelPlan(req.params.travel_plan_id, payload);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
export const deleteTravelPlanById = async (req, res, next) => {
    try {
        const user = await UserService.getUserByUsername(req.username);
        const result = await TravelPlanService.deleteTravelPlan(req.params.travel_plan_id, user.user_id);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
export const getTravelPlanByMemberId = async (req, res, next) => {
    try {
        // at first getting th eplanner_id 
        const user = await UserService.getUserByUsername(req.username);
        const results = await TravelPlanService.getTravelPlansByMemberId(user.user_id);
        res.status(200).json(results);
    }
    catch (error) {
        next(error);
    }
};
