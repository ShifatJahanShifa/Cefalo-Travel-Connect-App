var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as TravelPlanMemberService from "../services/travelplanmember.service.js";
export const addTravelPlanMember = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // getting from userserice
        // const user: UserDTO = await UserService.getUserByUsername(req.username!) 
        // const payload: travelPlanMemberAdd = {
        //     user_id: user.user_id,
        //     travel_plan_id: req.params.travel_plan_id, 
        //     role: "member"
        // }
        const result = yield TravelPlanMemberService.addTravelPlanMember(req.body);
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
});
export const getTravelPlanMemmebrs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield TravelPlanMemberService.getTravelPlanMemmebrs(req.params.travel_plan_id);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
export const updateTravelPlanMemberRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = {
            user_id: req.body.user_id,
            travel_plan_id: req.params.travel_plan_id,
            role: req.body.role
        };
        const result = yield TravelPlanMemberService.updateTravelPlanMemberRole(payload);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
