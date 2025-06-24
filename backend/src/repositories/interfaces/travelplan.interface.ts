import { travelPlanInput, travelPlanMember } from "../../types/travelplan.type.ts";

export interface ITravelPlan {
    craeteTravelPlan(input: travelPlanInput): Promise<any>
    getTravelPlans(page: number, limit: number): Promise<any[]> 
    getTravelPlanById(travel_plan_id: string): Promise<any> 
    updateTravelPlanById(travel_plan_id: string, updatePayload: travelPlanInput): Promise<string> 
    deleteTravelPlanById(travel_plan_id: string): Promise<string> 
}