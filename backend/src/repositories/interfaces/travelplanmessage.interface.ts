import { travelPlanComment } from "../../types/travelplan.type";

export interface ITravelPlanComment { 
    createComment(input: travelPlanComment): Promise<travelPlanComment>
    getComments(travel_plan_id: string): Promise<travelPlanComment[]> 
}