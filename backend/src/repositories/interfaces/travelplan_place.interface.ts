export interface ITravelPlanPlace {
    createTravelPlanPlace(travelPlanId: string, placeId: string): Promise<void> 
    getById(travelPlanId: string): Promise<any[]>
    updateTravelPlanPlace(travelPlanId: string, placeId: string): Promise<any>
    deleteById(travelPlanId: string): Promise<boolean>
}