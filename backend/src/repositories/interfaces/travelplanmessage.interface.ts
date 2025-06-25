import { travelPlanComment } from "../../types/travelplan.type.ts";

export interface ITravelPlanComment { 
    createComment(input: travelPlanComment): Promise<travelPlanComment>
    getComments(travel_plan_id: string): Promise<travelPlanComment[]> 
}