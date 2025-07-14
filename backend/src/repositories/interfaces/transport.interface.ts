import { transportCreation, transportUpdation, getTransport } from "../../types/transport.type.ts"


export interface ITransport {
    createTransport(data:  transportCreation): Promise<getTransport>     
    getTransports(): Promise<getTransport[]>       
    getTransportByTypeAndName(type: string, name: string): Promise<getTransport>        
    updateTransport(transport_id: string, data: transportUpdation): Promise<transportCreation>      
    // getTransportsByProximity(latitude: number, longitude: number, radius: number): Promise<getTransport[]>
    getById(id: any[]): Promise<getTransport[]>
}
