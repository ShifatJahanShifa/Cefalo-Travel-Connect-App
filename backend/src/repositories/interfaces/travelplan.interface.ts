import { travelPlanInput, travelPlanMember } from "../../types/travelplan.type.ts"

export interface ITravelPlan {
    craeteTravelPlan(input: travelPlanInput): Promise<any>
    getTravelPlans(page: number, limit: number): Promise<any[]> 
    getTravelPlanById(travelPlanId: string): Promise<any> 
    updateTravelPlanById(travelPlanId: string, updatePayload: travelPlanInput): Promise<string> 
    deleteTravelPlanById(travelPlanId: string): Promise<string> 
    getTravelPlanByMemberId(userId: string): Promise<any[]>
}