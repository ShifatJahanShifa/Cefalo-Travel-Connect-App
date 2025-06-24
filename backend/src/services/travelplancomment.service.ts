import { TravelPlanCommentDTO } from "../DTOs/travelplanmessage.dto.ts";
import { travelPlanComment } from "../types/travelplan.type.ts";

import travelPlanCommentDao from "../repositories/dao/travelplanmessage.dao.ts";

export const createTravelPlanComment = async (data: travelPlanComment): Promise<TravelPlanCommentDTO> => {
    const result = await travelPlanCommentDao.createComment(data) 

    return new TravelPlanCommentDTO(result)
}

export const getTravelPlanComments = async (travel_plan_id: string): Promise<TravelPlanCommentDTO[]> => {
    const results = await travelPlanCommentDao.getComments(travel_plan_id)

    return results.map((result) => new TravelPlanCommentDTO(result))
}