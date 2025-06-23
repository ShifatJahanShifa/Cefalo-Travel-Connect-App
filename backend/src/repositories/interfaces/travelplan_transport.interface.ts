export interface ITravelPlanTransport {
    createTravelPlanTransport(travel_plan_id: string, transport_id: number): Promise<void> 
    getById(travel_plan_id: string): Promise<any[]>
    updateTravelPlanTransport(travel_plan_id: string, transport_id: number): Promise<any>
}

