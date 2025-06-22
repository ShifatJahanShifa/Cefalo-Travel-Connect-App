export type accommodationCreation = {
    accommodation_type: 'hotel' | 'motel' | 'resort' | 'villa' | 'cottage' 
    accommodation_name: string 
    latitude: number
    longitude: number
    cost_per_night: number 
}

export type getAccommodation = {
    accommodation_id: number
    accommodation_type: 'hotel' | 'motel' | 'resort' | 'villa' | 'cottage' 
    accommodation_name: string 
    latitude: number
    longitude: number
    cost_per_night: number 
}

export type accommodationUpdation = {
    accommodation_id?: number
    accommodation_type?: 'hotel' | 'motel' | 'resort' | 'villa' | 'cottage' 
    accommodation_name?: string 
    latitude?: number
    longitude?: number
    cost_per_night?: number 
}