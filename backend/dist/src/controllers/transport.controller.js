var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as TransportService from "../services/transport.service.js";
export const createTransport = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const transport = yield TransportService.createtransport(data);
        res.status(201).json(transport);
    }
    catch (error) {
        next(error);
    }
});
export const getTransports = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transports = yield TransportService.gettransports();
        res.status(200).json(transports);
    }
    catch (error) {
        next(error);
    }
});
export const updateTransport = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transport_id = parseInt(req.params.transportId);
        const data = req.body;
        const transport = yield TransportService.updatetransport(transport_id, data);
        res.status(200).json(transport);
    }
    catch (error) {
        next(error);
    }
});
export const getTransportsByProximity = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const latitude = parseInt(req.query.latitude);
        const longitude = parseInt(req.query.longitude);
        const radius = parseInt(req.query.radius);
        const data = yield TransportService.gettransportsByProximity(latitude, longitude, radius);
        res.status(200).json(data);
    }
    catch (error) {
        next(error);
    }
});
