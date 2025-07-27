export class TravelPlanMemberDTO {
    user_id: string 
    username: string
    email: string 
    travel_plan_member_role: string 

    constructor(data: any) 
    {
        this.email = data.email 
        this.travel_plan_member_role = data.role
        this.user_id = data.user_id
        this.username = data.username
    }
}

