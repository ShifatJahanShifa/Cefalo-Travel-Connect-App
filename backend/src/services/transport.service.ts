import { ExpressRequest } from "../middlewares/auth.middleware"
import transportDao from "../repositories/dao/transport.repository.ts"
import { TransportDTO } from "../DTOs/transport.dto.ts"
import { transportCreation, transportUpdation, getTransport } from "../types/transport.type.ts"

export const createtransport = async (data: transportCreation): Promise<TransportDTO> => {
    const transport: transportCreation = await transportDao.createTransport(data)
    return new TransportDTO(transport)
}

export const gettransports = async (): Promise<TransportDTO[]> => {
    const transports: getTransport[] = await transportDao.getTransports()
    return transports.map((transport) => new TransportDTO(transport))
}

export const gettransportByTypeAndName = async (type: string, name: string): Promise<TransportDTO> => {
    const transport: getTransport = await transportDao.getTransportByTypeAndName(type, name)
    return new TransportDTO(transport)
}

export const updatetransport = async (transport_id: string, data: transportUpdation): Promise<TransportDTO> => {
    const transport: transportCreation = await transportDao.updateTransport(transport_id, data)
    return new TransportDTO(transport)
}

export const gettransportsByProximity = async(latitude: number, longitude: number, radius: number): Promise<TransportDTO[]> => {
    const transports: getTransport[] = await transportDao.getTransportsByProximity(latitude, longitude, radius)
    return transports.map((transport) => new TransportDTO(transport))
}