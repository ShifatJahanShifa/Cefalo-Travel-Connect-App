import { accommodationCreation, accommodationUpdation, getAccommodation } from "../../types/accommodation.type.ts"


export interface IAccommodation {
    createAccommodation(data:  accommodationCreation): Promise<getAccommodation>     
    getAccommodations(): Promise<getAccommodation[]>      
    getAccommodationByTypeAndName(type: string, name: string): Promise<getAccommodation>      
    updateAccommodation(accommodationId: string, data: accommodationUpdation): Promise<accommodationCreation>     
    getAccommodationsByProximity(latitude: number, longitude: number, radius: number): Promise<getAccommodation[]>
    getById(id: any[]): Promise<getAccommodation[]>
}
