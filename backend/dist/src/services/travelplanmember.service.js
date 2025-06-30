import { TravelPlanMemberDTO } from "../DTOs/travelplanmember.dto.js";
import travelPlanMemberdao from "../repositories/dao/travelplanmember.repository.js";
import userDAO from "../repositories/dao/user.respository.js";
import { AppError } from "../utils/appError.js";
export const addTravelPlanMember = async (data) => {
    const result = await travelPlanMemberdao.addTravelPlanMember(data);
    return new TravelPlanMemberDTO(result);
};
export const getTravelPlanMemmebrs = async (travel_plan_id) => {
    const results = await travelPlanMemberdao.getTravelPlanMemmebrs(travel_plan_id);
    for (let i = 0; i < results.length; i++) {
        const user = await userDAO.getUserByID(results[i].user_id);
        results[i].email = user.email;
        results[i].username = user.username;
    }
    return results.map((result) => new TravelPlanMemberDTO(result));
};
export const updateTravelPlanMemberRole = async (data, requester_id) => {
    const isExist = await travelPlanMemberdao.memberExists(requester_id, data.travel_plan_id);
    if (isExist && isExist.role !== "creator") {
        throw new AppError("you are not allowed to update the role", 403);
    }
    const result = await travelPlanMemberdao.updateTravelPlanMemberRole(data);
    return new TravelPlanMemberDTO(result);
};
