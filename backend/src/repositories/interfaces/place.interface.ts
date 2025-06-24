import { placeCreation, getPlace, placeUpdation } from "../../types/place.type.ts"


export interface IPlace {
    createPlace(data: placeCreation): Promise<getPlace>     // suppose admin creates it
    getPlaces(): Promise<getPlace[]>        // recommendation time
    getPlaceByName(name: string): Promise<getPlace>        // post and plan e use
    updatePlace(place_id: string, data: placeUpdation): Promise<placeCreation>      // admin controls it
    getPlacesByProximity(latitude: number, longitude: number, radius: number): Promise<getPlace[]>
    getById(id: any[]): Promise<getPlace[]>
}
