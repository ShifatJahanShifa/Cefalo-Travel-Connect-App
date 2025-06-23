export class TravelPlanResponseDTO {
    travel_plan_id!: string;
    user_id!: number;
    title!: string;
    description!: string;
    start_date!: string; 
    end_date!: string;
    estimated_cost!: number;
    created_at!: string;
    updated_at!: string;

    accommodations?: any[];
    transports?: any[];
    places?: any[];
    restaurants?: any[];
    images?: any[];
    

    constructor(data: Partial<TravelPlanResponseDTO>) {
        Object.assign(this, data);
    }
}