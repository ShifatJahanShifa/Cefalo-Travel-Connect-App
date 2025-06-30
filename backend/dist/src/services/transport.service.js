import transportDao from "../repositories/dao/transport.repository.js";
import { transportDTO } from "../DTOs/transport.dto.js";
export const createtransport = async (data) => {
    const transport = await transportDao.createTransport(data);
    return new transportDTO(transport);
};
export const gettransports = async () => {
    const transports = await transportDao.getTransports();
    return transports.map((transport) => new transportDTO(transport));
};
export const gettransportByTypeAndName = async (type, name) => {
    const transport = await transportDao.getTransportByTypeAndName(type, name);
    return new transportDTO(transport);
};
export const updatetransport = async (transport_id, data) => {
    const transport = await transportDao.updateTransport(transport_id, data);
    return new transportDTO(transport);
};
export const gettransportsByProximity = async (latitude, longitude, radius) => {
    const transports = await transportDao.getTransportsByProximity(latitude, longitude, radius);
    return transports.map((transport) => new transportDTO(transport));
};
