import { TravelPlanCommentDTO } from "../DTOs/travelplanmessage.dto.js";
import travelPlanCommentDao from "../repositories/dao/travelplanmessage.repository.js";
import travelPlanMemberdao from "../repositories/dao/travelplanmember.repository.js";
import { AppError } from "../utils/appError.js";
export const createTravelPlanComment = async (data) => {
    const isExist = await travelPlanMemberdao.memberExists(data.sender_id, data.travel_plan_id);
    if (!isExist) {
        throw new AppError("you are not allowed to comment", 403);
    }
    const result = await travelPlanCommentDao.createComment(data);
    return new TravelPlanCommentDTO(result);
};
export const getTravelPlanComments = async (travel_plan_id) => {
    const results = await travelPlanCommentDao.getComments(travel_plan_id);
    return results.map((result) => new TravelPlanCommentDTO(result));
};
