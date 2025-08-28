import { placeCreation, getPlace, placeUpdation } from "../../types/place.type.ts"


export interface IPlace {
    createPlace(data: placeCreation): Promise<getPlace>    
    getPlaces(): Promise<getPlace[]>        
    getPlaceByName(name: string): Promise<getPlace>       
    updatePlace(placeId: string, data: placeUpdation): Promise<placeCreation>    
    getPlacesByProximity(latitude: number, longitude: number, radius: number): Promise<getPlace[]>
    getById(id: any[]): Promise<getPlace[]>
}
