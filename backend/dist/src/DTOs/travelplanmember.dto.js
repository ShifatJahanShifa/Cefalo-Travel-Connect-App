export class TravelPlanMemberDTO {
    constructor(data) {
        this.email = data.email;
        this.travel_plan_member_role = data.role;
        this.user_id = data.user_id;
        this.username = data.username;
    }
}
