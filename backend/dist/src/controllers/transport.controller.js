import * as TransportService from "../services/transport.service.js";
export const createTransport = async (req, res, next) => {
    try {
        const data = req.body;
        const transport = await TransportService.createtransport(data);
        res.status(201).json(transport);
    }
    catch (error) {
        next(error);
    }
};
export const getTransports = async (req, res, next) => {
    try {
        const transports = await TransportService.gettransports();
        res.status(200).json(transports);
    }
    catch (error) {
        next(error);
    }
};
export const updateTransport = async (req, res, next) => {
    try {
        const transport_id = (req.params.transportId);
        const data = req.body;
        const transport = await TransportService.updatetransport(transport_id, data);
        res.status(200).json(transport);
    }
    catch (error) {
        next(error);
    }
};
export const getTransportsByProximity = async (req, res, next) => {
    try {
        const latitude = parseInt(req.query.latitude);
        const longitude = parseInt(req.query.longitude);
        const radius = parseInt(req.query.radius);
        const data = await TransportService.gettransportsByProximity(latitude, longitude, radius);
        res.status(200).json(data);
    }
    catch (error) {
        next(error);
    }
};
