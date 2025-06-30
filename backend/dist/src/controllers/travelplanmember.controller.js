import * as TravelPlanMemberService from "../services/travelplanmember.service.js";
import * as UserService from "../services/user.service.js";
export const addTravelPlanMember = async (req, res, next) => {
    try {
        // getting from userserice
        // const user: UserDTO = await UserService.getUserByUsername(req.username!) 
        // const payload: travelPlanMemberAdd = {
        //     user_id: user.user_id,
        //     travel_plan_id: req.params.travel_plan_id, 
        //     role: "member"
        // }
        const result = await TravelPlanMemberService.addTravelPlanMember(req.body);
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
};
export const getTravelPlanMemmebrs = async (req, res, next) => {
    try {
        const result = await TravelPlanMemberService.getTravelPlanMemmebrs(req.params.travel_plan_id);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
export const updateTravelPlanMemberRole = async (req, res, next) => {
    try {
        const user = await UserService.getUserByUsername(req.username);
        const payload = {
            user_id: req.body.user_id,
            travel_plan_id: req.params.travel_plan_id,
            role: req.body.role
        };
        const result = await TravelPlanMemberService.updateTravelPlanMemberRole(payload, user.user_id);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
