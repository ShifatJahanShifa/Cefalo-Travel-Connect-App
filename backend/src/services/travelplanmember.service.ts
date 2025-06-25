import { TravelPlanMemberDTO } from "../DTOs/travelplanmember.dto.ts";
import travelPlanMemberdao from "../repositories/dao/travelplanmember.dao.ts"; 
import userDAO from "../repositories/dao/user.dao.ts";
import { createdUser } from "../types/auth.type.ts";
import { travelPlanMember, travelPlanMemberAdd } from "../types/travelplan.type.ts";

export const addTravelPlanMember = async(data: travelPlanMemberAdd): Promise<TravelPlanMemberDTO> => {
    const result: travelPlanMember = await travelPlanMemberdao.addTravelPlanMember(data)
    return new TravelPlanMemberDTO(result)
}

export const getTravelPlanMemmebrs = async(travel_plan_id: string): Promise<TravelPlanMemberDTO[]> => {
    const results: travelPlanMember[] = await travelPlanMemberdao.getTravelPlanMemmebrs(travel_plan_id)
    for(let i=0; i<results.length; i++)
    {
        const user: createdUser = await  userDAO.getUserByID(results[i].user_id)
        results[i].email = user.email
        results[i].username = user.username
    }

    return results.map((result) => new TravelPlanMemberDTO(result))
}

export const updateTravelPlanMemberRole = async(data: travelPlanMemberAdd): Promise<TravelPlanMemberDTO> => {
    const result: travelPlanMember = await travelPlanMemberdao.updateTravelPlanMemberRole(data)
    return new TravelPlanMemberDTO(result)
}