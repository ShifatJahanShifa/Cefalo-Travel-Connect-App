export interface ITravelPlanAccommodation {
    createTravelPlanAccommodation(travelPlanId: string, accommodationId: string): Promise<void> 
    getById(travelPlanId: string): Promise<any[]>
    updateTravelPlanAccommodation(travelPlanId: string, accommodationId: string): Promise<any>
    deleteById(travelPlanId: string): Promise<boolean>
}