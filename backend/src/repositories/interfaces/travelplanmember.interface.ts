import { travelPlanMember } from "../../types/travelplan.type"

export interface ITravelPlanMember {
    addTravelPlanMember(travel_plan_id: string, user_id: string, role: string): Promise<string> // frontend theke ids ashbe
    getTravelPlanMemmebrs(travel_plan_id: string): Promise<travelPlanMember[]> 
    updateTravelPlanMemberRole(travel_plan_id: string, user_id: string, role: string): Promise<string>
}