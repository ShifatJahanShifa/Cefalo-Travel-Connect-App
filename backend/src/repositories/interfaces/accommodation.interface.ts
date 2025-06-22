import { accommodationCreation, accommodationUpdation, getAccommodation } from "../../types/accommodation.type.ts"


export interface IAccommodation {
    createAccommodation(data:  accommodationCreation): Promise<accommodationCreation>     // suppose admin creates it
    getAccommodations(): Promise<getAccommodation[]>        // recommendation time
    getAccommodationByTypeAndName(type: string, name: string): Promise<getAccommodation>        // post and plan e use
    updateAccommodation(accommodation_id: number, data: accommodationUpdation): Promise<accommodationCreation>      // admin controls it
    getAccommodationsByProximity(latitude: number, longitude: number, radius: number): Promise<getAccommodation[]>
    getById(id: any[]): Promise<getAccommodation[]>
}
