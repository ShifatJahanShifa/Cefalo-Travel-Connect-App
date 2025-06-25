var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { TravelPlanMemberDTO } from "../DTOs/travelplanmember.dto.js";
import travelPlanMemberdao from "../repositories/dao/travelplanmember.dao.js";
import userDAO from "../repositories/dao/user.dao.js";
export const addTravelPlanMember = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield travelPlanMemberdao.addTravelPlanMember(data);
    return new TravelPlanMemberDTO(result);
});
export const getTravelPlanMemmebrs = (travel_plan_id) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield travelPlanMemberdao.getTravelPlanMemmebrs(travel_plan_id);
    for (let i = 0; i < results.length; i++) {
        const user = yield userDAO.getUserByID(results[i].user_id);
        results[i].email = user.email;
        results[i].username = user.username;
    }
    return results.map((result) => new TravelPlanMemberDTO(result));
});
export const updateTravelPlanMemberRole = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield travelPlanMemberdao.updateTravelPlanMemberRole(data);
    return new TravelPlanMemberDTO(result);
});
