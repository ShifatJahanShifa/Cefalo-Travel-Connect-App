import { accommodationCreation, getAccommodation } from "../types/accommodation.type.ts"

export class AccommodationDTO {
    accommodation_id: number
    accommodation_type: 'hotel' | 'motel' | 'resort' | 'villa' | 'cottage' 
    accommodation_name: string 
    location: {
        latitude: number
        longitude: number
    }
    cost_per_night: number  

    constructor(accommodation: any) 
    {
        this.accommodation_id = accommodation.accommodation_id
        this.accommodation_type = accommodation.accommodation_type
        this.accommodation_name = accommodation.accommodation_name
        this.location = {
            latitude: accommodation.latitude,
            longitude:  accommodation.longitude
        }
        this.cost_per_night = accommodation.cost_per_night 
    }
}