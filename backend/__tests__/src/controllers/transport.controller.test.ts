import {
  createTransport,
  getTransports,
  updateTransport,
  getTransportsByProximity
} from '../../../src/controllers/transport.controller.ts';

import * as TransportService from '../../../src/services/transport.service.ts';
import { Request, Response, NextFunction } from 'express';
import { transportDTO } from '../../../src/DTOs/transport.dto.ts';
import { transportCreation, transportUpdation } from '../../../src/types/transport.type.ts';
import { mockTransportDTO } from '../../__mocks__/transport.dto.mock.ts'
import { ExpressRequest } from '../../../src/middlewares/auth.middleware.ts';

jest.mock('../../../src/services/transport.service.ts');


describe('Transport Controller', () => {
    let req: Partial<ExpressRequest>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createTransport', () => {
        it('should create and return a transport', async () => {
            req.body = {
                transport_name: 'Bus',
                transport_type: 'Road'
            } as transportCreation;

            (TransportService.createtransport as jest.Mock).mockResolvedValue(mockTransportDTO);

            await createTransport(req as Request, res as Response, next);

            expect(TransportService.createtransport).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockTransportDTO);
        });

        it('should call next on error', async () => {
            const error = new Error('Create error');
            (TransportService.createtransport as jest.Mock).mockRejectedValue(error);

            await createTransport(req as Request, res as Response, next);
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('getTransports', () => {
        it('should return all transports', async () => {
            (TransportService.gettransports as jest.Mock).mockResolvedValue([mockTransportDTO]);

            await getTransports(req as Request, res as Response, next);

            expect(TransportService.gettransports).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([mockTransportDTO]);
        });

        it('should call next on error', async () => {
            const error = new Error('Fetch error');
            (TransportService.gettransports as jest.Mock).mockRejectedValue(error);

            await getTransports(req as Request, res as Response, next);
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('updateTransport', () => {
        it('should update and return a transport', async () => {
            req.params = { transportId: 't001' };
            req.body = {
                transport_name: 'Updated Bus',
                transport_type: 'Road'
            } as transportUpdation;

            const updatedTransport = { ...mockTransportDTO, ...req.body };

            (TransportService.updatetransport as jest.Mock).mockResolvedValue(updatedTransport);

            await updateTransport(req as Request, res as Response, next);

            expect(TransportService.updatetransport).toHaveBeenCalledWith('t001', req.body);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(updatedTransport);
        });

        it('should call next on error', async () => {
            req.params = { transportId: 't001' };
            req.body = {} as transportUpdation;

            const error = new Error('Update error');
            (TransportService.updatetransport as jest.Mock).mockRejectedValue(error);

            await updateTransport(req as Request, res as Response, next);
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('getTransportsByProximity', () => {
        it('should return transports by proximity', async () => {
            req.query = {
                latitude: '23',
                longitude: '90',
                radius: '10'
            };

            (TransportService.gettransportsByProximity as jest.Mock).mockResolvedValue([mockTransportDTO]);

            await getTransportsByProximity(req as Request, res as Response, next);

            expect(TransportService.gettransportsByProximity).toHaveBeenCalledWith(23, 90, 10);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([mockTransportDTO]);
        });

        it('should call next on error', async () => {
            req.query = {
                latitude: '23',
                longitude: '90',
                radius: '10'
            };

            const error = new Error('Proximity error');
            (TransportService.gettransportsByProximity as jest.Mock).mockRejectedValue(error);

            await getTransportsByProximity(req as Request, res as Response, next);
            expect(next).toHaveBeenCalledWith(error);
        });
    });
});
