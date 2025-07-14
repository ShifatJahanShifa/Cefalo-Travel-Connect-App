export interface ITravelPlanTransport {
    createTravelPlanTransport(travel_plan_id: string, transport_id: string): Promise<void> 
    getById(travel_plan_id: string): Promise<any[]>
    updateTravelPlanTransport(travel_plan_id: string, transport_id: string): Promise<any>
}

