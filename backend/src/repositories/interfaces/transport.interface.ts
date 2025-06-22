import { transportCreation, transportUpdation, getTransport } from "../../types/transport.type.ts"


export interface ITransport {
    createTransport(data:  transportCreation): Promise<transportCreation>     // suppose admin creates it
    getTransports(): Promise<getTransport[]>        // recommendation time
    getTransportByTypeAndName(type: string, name: string): Promise<getTransport>        // post and plan e use
    updateTransport(transport_id: number, data: transportUpdation): Promise<transportCreation>      // admin controls it
    getTransportsByProximity(latitude: number, longitude: number, radius: number): Promise<getTransport[]>
    getById(id: any[]): Promise<getTransport[]>
}
