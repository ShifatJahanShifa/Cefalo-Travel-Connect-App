import { travelPlanComment } from "../types/travelplan.type.ts"

export class TravelPlanCommentDTO {
    
    message_id: string
    travel_plan_id: string 
    sender_id: string 
    message: string 
    
    

    constructor(data: travelPlanComment) {
        this.message_id = data.message_id!
        this.travel_plan_id = data.travel_plan_id
        this.sender_id = data.sender_id 
        this.message = data.message
    }
}