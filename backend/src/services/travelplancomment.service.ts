import { TravelPlanCommentDTO } from "../DTOs/travelplanmessage.dto.ts";
import { travelPlanComment } from "../types/travelplan.type.ts";
import travelPlanCommentDao from "../repositories/dao/travelplanmessage.repository.ts";
import travelPlanMemberdao from "../repositories/dao/travelplanmember.repository.ts";
import { AppError } from "../utils/appError.ts";
import { HTTP_STATUS } from "../constants/httpStatus.ts";

export const createTravelPlanComment = async (data: travelPlanComment): Promise<TravelPlanCommentDTO> => {
    const isExist: boolean = await travelPlanMemberdao.memberExists(data.sender_id, data.travel_plan_id); 
    if(!isExist) 
    {
        throw new AppError("you are not allowed to comment", HTTP_STATUS.FORBIDDEN);
    }
    const result = await travelPlanCommentDao.createComment(data) ;

    return new TravelPlanCommentDTO(result);
}

export const getTravelPlanComments = async (travel_plan_id: string): Promise<TravelPlanCommentDTO[]> => {
    const results = await travelPlanCommentDao.getComments(travel_plan_id);

    return results.map((result) => new TravelPlanCommentDTO(result));
}