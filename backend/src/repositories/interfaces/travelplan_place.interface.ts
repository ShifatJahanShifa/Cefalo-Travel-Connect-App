export interface ITravelPlanPlace {
    createTravelPlanPlace(travel_plan_id: string, place_id: number): Promise<void> 
    getById(travel_plan_id: string): Promise<any[]>
    updateTravelPlanPlace(travel_plan_id: string, place_id: number): Promise<any>
}