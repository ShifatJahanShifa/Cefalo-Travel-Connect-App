import { travelPlanComment } from "../types/travelplan.type"

export class TravelPlanCommentDTO {
    message_id!: string
    travel_plan_id!: string 
    sender_id!: string 
    message!: string 
    
    
    constructor(data: travelPlanComment) {
        Object.assign(this, data)
    }
}