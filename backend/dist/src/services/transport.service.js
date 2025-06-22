var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import transportDao from "../repositories/dao/transport.dao.js";
import { transportDTO } from "../DTOs/transport.dto.js";
export const createtransport = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const transport = yield transportDao.createTransport(data);
    return new transportDTO(transport);
});
export const gettransports = () => __awaiter(void 0, void 0, void 0, function* () {
    const transports = yield transportDao.getTransports();
    return transports.map((transport) => new transportDTO(transport));
});
export const gettransportByTypeAndName = (type, name) => __awaiter(void 0, void 0, void 0, function* () {
    const transport = yield transportDao.getTransportByTypeAndName(type, name);
    return new transportDTO(transport);
});
export const updatetransport = (transport_id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const transport = yield transportDao.updateTransport(transport_id, data);
    return new transportDTO(transport);
});
export const gettransportsByProximity = (latitude, longitude, radius) => __awaiter(void 0, void 0, void 0, function* () {
    const transports = yield transportDao.getTransportsByProximity(latitude, longitude, radius);
    return transports.map((transport) => new transportDTO(transport));
});
