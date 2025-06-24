export class TravelPlanCommentDTO {
    constructor(data) {
        this.message_id = data.message_id;
        this.travel_plan_id = data.travel_plan_id;
        this.sender_id = data.sender_id;
        this.message = data.message;
    }
}
