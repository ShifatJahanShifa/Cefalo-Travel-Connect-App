var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as TravelPlanCommentService from "../services/travelplancomment.service.js";
export const createTravelPlanComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = {
            travel_plan_id: req.params.travel_plan_id,
            sender_id: req.body.sender_id,
            message: req.body.message
        };
        const result = yield TravelPlanCommentService.createTravelPlanComment(payload);
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
});
export const getTravelPlanComments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const travel_plan_id = req.params.travel_plan_id;
        const results = yield TravelPlanCommentService.getTravelPlanComments(travel_plan_id);
        res.status(200).json(results);
    }
    catch (error) {
        next(error);
    }
});
