import * as TravelPlanCommentService from "../services/travelplancomment.service.js";
export const createTravelPlanComment = async (req, res, next) => {
    try {
        const payload = {
            travel_plan_id: req.params.travel_plan_id,
            sender_id: req.body.sender_id,
            message: req.body.message
        };
        const result = await TravelPlanCommentService.createTravelPlanComment(payload);
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
};
export const getTravelPlanComments = async (req, res, next) => {
    try {
        const travel_plan_id = req.params.travel_plan_id;
        const results = await TravelPlanCommentService.getTravelPlanComments(travel_plan_id);
        res.status(200).json(results);
    }
    catch (error) {
        next(error);
    }
};
