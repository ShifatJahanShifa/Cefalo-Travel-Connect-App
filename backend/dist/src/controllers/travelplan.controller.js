var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as UserService from "../services/user.service.js";
import * as TravelPlanService from "../services/travelplan.service.js";
export const craeteTravelPlan = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // at first getting th eplanner_id 
        const user = yield UserService.getUserByUsername(req.username);
        const payload = req.body;
        payload.planner_id = user.user_id;
        const result = yield TravelPlanService.craeteTravelPlan(payload);
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
});
export const getTravelPlans = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const results = yield TravelPlanService.getTravelPlans(page, limit);
        res.status(200).json(results);
    }
    catch (error) {
        next(error);
    }
});
export const getTravelPlanById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield TravelPlanService.getTravelPlanById(req.params.travel_plan_id);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
export const updateTravelPlanById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserService.getUserByUsername(req.username);
        const payload = req.body;
        payload.planner_id = user.user_id;
        const result = yield TravelPlanService.updateTravelPlan(req.params.travel_plan_id, payload);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
export const deleteTravelPlanById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield TravelPlanService.deleteTravelPlan(req.params.travel_plan_id);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
