import { placeCreation, getPlace } from "../types/place.type.ts"

export class placeDTO {
    place_id: string
    place_name: string 
    location: {
        latitude: number
        longitude: number
    }

    constructor(place: any) 
    {
        this.place_id = place.place_id
        this.place_name = place.place_name
        this.location = {
            latitude: place.latitude,
            longitude:  place.longitude
        }
    }
}