import { accommodationCreation, getAccommodation } from "../types/accommodation.type.ts"

export class AccommodationDTO {
    accommodation_id: string
    accommodation_type: 'hotel' | 'motel' | 'resort' | 'villa' | 'cottage' 
    accommodation_name: string 
    location: {
        latitude: number
        longitude: number
    }


    constructor(accommodation: any) 
    {
        this.accommodation_id = accommodation.accommodation_id
        this.accommodation_type = accommodation.accommodation_type
        this.accommodation_name = accommodation.accommodation_name
        this.location = {
            latitude: accommodation.latitude,
            longitude:  accommodation.longitude
        }
       
    }
}