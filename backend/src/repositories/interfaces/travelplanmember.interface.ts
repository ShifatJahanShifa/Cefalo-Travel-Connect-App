import { travelPlanMember, travelPlanMemberAdd } from "../../types/travelplan.type.ts"

export interface ITravelPlanMember {
    addTravelPlanMember(data: travelPlanMemberAdd): Promise<travelPlanMember> // frontend theke ids ashbe
    getTravelPlanMemmebrs(travel_plan_id: string): Promise<travelPlanMember[]> 
    updateTravelPlanMemberRole(data: travelPlanMemberAdd): Promise<travelPlanMember>
}