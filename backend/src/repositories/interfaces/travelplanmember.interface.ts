import { travelPlanMember, travelPlanMemberAdd } from "../../types/travelplan.type.ts"

export interface ITravelPlanMember {
    addTravelPlanMember(data: travelPlanMemberAdd): Promise<travelPlanMember> 
    getTravelPlanMemmebrs(travel_plan_id: string): Promise<travelPlanMember[]> 
    updateTravelPlanMemberRole(data: travelPlanMemberAdd): Promise<travelPlanMember>
    memberExists(user_id: string, travel_plan_id: string): Promise<any>
}