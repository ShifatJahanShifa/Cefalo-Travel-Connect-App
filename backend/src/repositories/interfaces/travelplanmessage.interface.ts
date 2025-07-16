import { travelPlanComment } from "../../types/travelplan.type.ts"

export interface ITravelPlanComment { 
    createComment(input: travelPlanComment): Promise<travelPlanComment>
    getComments(travelPlanId: string): Promise<travelPlanComment[]> 
}