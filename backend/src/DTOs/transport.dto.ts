import { transportCreation, getTransport } from "../types/transport.type.ts"

export class TransportDTO {
    transport_id!: string
    transport_type!: string
    transport_name!: string 
    
    constructor(data: Partial<TransportDTO>) {
        Object.assign(this, data)
    }
}