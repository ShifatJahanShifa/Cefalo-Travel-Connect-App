export interface ITravelPlanAccommodation {
    createTravelPlanAccommodation(travel_plan_id: string, accommodation_id: number): Promise<void> 
    getById(travel_plan_id: string): Promise<any[]>
    updateTravelPlanAccommodation(travel_plan_id: string, accommodation_id: number): Promise<any>
}