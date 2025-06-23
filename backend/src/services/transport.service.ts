import { ExpressRequest } from "../middlewares/auth.middleware";
import transportDao from "../repositories/dao/transport.dao.ts";
import { transportDTO } from "../DTOs/transport.dto.ts";
import { transportCreation, transportUpdation, getTransport } from "../types/transport.type.ts";

export const createtransport = async (data: transportCreation): Promise<transportDTO> => {
    const transport: transportCreation = await transportDao.createTransport(data)
    return new transportDTO(transport)
}

export const gettransports = async (): Promise<transportDTO[]> => {
    const transports: getTransport[] = await transportDao.getTransports()
    return transports.map((transport) => new transportDTO(transport))
}

export const gettransportByTypeAndName = async (type: string, name: string): Promise<transportDTO> => {
    const transport: getTransport = await transportDao.getTransportByTypeAndName(type, name)
    return new transportDTO(transport)
}

export const updatetransport = async (transport_id: string, data: transportUpdation): Promise<transportDTO> => {
    const transport: transportCreation = await transportDao.updateTransport(transport_id, data)
    return new transportDTO(transport)
}

export const gettransportsByProximity = async(latitude: number, longitude: number, radius: number): Promise<transportDTO[]> => {
    const transports: getTransport[] = await transportDao.getTransportsByProximity(latitude, longitude, radius)
    return transports.map((transport) => new transportDTO(transport))
}