export type transportCreation = {
    transport_type: string 
    transport_name: string 
    cost_per_person: number 
    starting_location_name: string 
    starting_location_latitude: number
    starting_location_longitude: number
    ending_location_name: string 
    ending_location_latitude: number
    ending_location_longitude: number
}

export type getTransport = {
    transport_id: number
    transport_type: string
    transport_name: string 
    cost_per_person: number 
    starting_location_name: string 
    ending_location_name: string 
    starting_location_latitude: number
    starting_location_longitude: number
    ending_location_latitude: number
    ending_location_longitude: number
}

export type transportUpdation = {
    transport_type?: string 
    transport_name?: string 
    cost_per_person?: number 
    starting_location_name?: string 
    starting_location_latitude?: number
    starting_location_longitude?: number
    ending_location_name?: string 
    ending_location_latitude?: number
    ending_location_longitude?: number
}