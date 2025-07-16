import { travelPlanMember, travelPlanMemberAdd } from "../../types/travelplan.type.ts"

export interface ITravelPlanMember {
    addTravelPlanMember(data: travelPlanMemberAdd): Promise<travelPlanMember> 
    getTravelPlanMemmebrs(travelPlanId: string): Promise<travelPlanMember[]> 
    updateTravelPlanMemberRole(data: travelPlanMemberAdd): Promise<travelPlanMember>
    memberExists(userId: string, travelPlanId: string): Promise<any>
}