export type accommodationCreation = {
    accommodation_type: string
    accommodation_name: string 
    latitude: number
    longitude: number
    
}

export type getAccommodation = {
    accommodation_id: string
    accommodation_type: string
    accommodation_name: string 
    latitude: number
    longitude: number
    
}

export type accommodationUpdation = {
    accommodation_id?: string
    accommodation_type?: string
    accommodation_name?: string 
    latitude?: number
    longitude?: number
}