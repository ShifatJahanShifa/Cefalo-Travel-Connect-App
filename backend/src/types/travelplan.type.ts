export type travelPlanInput = {
    planner_id?: number
    start_date: string 
    end_data: string 
    note: string 
    estimated_cost: number

    accommodations?: Array<{
        accommodation_type: string
        accommodation_name: string;
        cost_per_night?: number;
        latitude?: number;
        longitude?: number;
        cost: number 
        rating: number
        review: string;
    }>;

    transports?: Array<{
        transport_type: string;
        transport_name: string;
        cost_per_person?: number;
        starting_location_name?: string;
        starting_location_latitude?: number;
        starting_location_longitude?: number;
        ending_location_name?: string
        ending_location_latitude?: number;
        ending_location_longitude?: number;
        cost: number 
        rating: number
        review: string;
    }>;

    places?: Array<{
        place_name: string;
        latitude?: number;
        longitude?: number;
        rating: number
        review: string;
    }>;
}

export type travelPlanOutput = {
    travel_plan_id: string;         
    planner_id: number;             
    start_date: string       
    end_date: string         
    note: string            
    estimated_cost: number   
    created_at: string;             
    updated_at: string;

    accommodations?: any[];
    transports?: any[];
    places?: any[];
}

export type travelPlanUpdation = {
    travel_plan_id: string;         
    planner_id: number;     
    start_date: string 
    end_data: string 
    note: string 
    estimated__cost: number

    accommodations?: Array<{
        accommodation_type: string
        accommodation_name: string;
        cost_per_night?: number;
        latitude?: number;
        longitude?: number;
        cost: number 
        rating: number
        review: string;
    }>;

    transports?: Array<{
        transport_type: string;
        transport_name: string;
        cost_per_person?: number;
        starting_location_latitude?: number;
        ending_location_latitude?: number;
        starting_location_longitude?: number;
        ending_location_longitude?: number;
        cost: number 
        rating: number
        review: string;
    }>;

    places?: Array<{
        place_name: string;
        latitude?: number;
        longitude?: number;
        rating: number
        review: string;
    }>;
}

export type SearchFilters = {
    transport_type?: string;
    transport_name?: string;
    place_name?: string;
    accommodation_type?: string;
    accommodation_name?: string
}