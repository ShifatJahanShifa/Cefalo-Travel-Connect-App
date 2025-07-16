export interface ITravelPlanTransport {
    createTravelPlanTransport(travelPlanId: string, transportId: string): Promise<void> 
    getById(travelPlanId: string): Promise<any[]>
    updateTravelPlanTransport(travelPlanId: string, transportId: string): Promise<any>
    deleteById(travelPlanId: string): Promise<boolean>
}

