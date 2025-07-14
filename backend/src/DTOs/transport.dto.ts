import { transportCreation, getTransport } from "../types/transport.type.ts"

export class transportDTO {
    transport_id: string
    transport_type: string
    transport_name: string 
    // cost_per_person: number  
    // starting_location_name: string
    // starting_location: {
    //     latitude: number
    //     longitude: number
    // }
    // ending_location_name: string
    // ending_location: {
    //     latitude: number
    //     longitude: number
    // }

    constructor(transport: any) 
    {
        this.transport_id = transport.transport_id
        this.transport_type = transport.transport_type
        this.transport_name = transport.transport_name
        // this.cost_per_person = transport.cost_per_person 
        // this.starting_location_name = transport.starting_location_name
        // this.starting_location = {
        //     latitude: transport.starting_location_latitude,
        //     longitude:  transport.starting_location_longitude
        // }
        // this.ending_location_name = transport.ending_location_name
        // this.ending_location = {
        //     latitude: transport.ending_location_latitude,
        //     longitude: transport.ending_location_longitude
        // }
    }
}