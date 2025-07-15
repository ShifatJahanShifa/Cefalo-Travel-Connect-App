import * as transportService from '../../../src/services/transport.service.ts';
import transportDao from '../../../src/repositories/dao/transport.repository.ts';
import { transportDTO } from '../../../src/DTOs/transport.dto.ts';
import { getTransport } from '../../../src/types/transport.type.ts';
import { mockTransport, mockUpdatedTransport } from '../../__mocks__/transport.mock.ts';

jest.mock('../../../src/repositories/dao/transport.repository.ts');


describe('Transport Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createtransport', () => {
        it('should create a transport and return transportDTO', async () => {
            (transportDao.createTransport as jest.Mock).mockResolvedValue(mockTransport);

            const result = await transportService.createtransport({
                transport_type: 'bus',
                transport_name: 'Hanif Poribohon'
            });

            expect(result).toBeInstanceOf(transportDTO);
            expect(transportDao.createTransport).toHaveBeenCalled();
            expect(result.transport_id).toBe('trans-123')
        });
    });

    describe('gettransports', () => {
        it('should return list of transportDTOs', async () => {
            (transportDao.getTransports as jest.Mock).mockResolvedValue([mockTransport]);

            const result = await transportService.gettransports();

            expect(Array.isArray(result)).toBe(true);
            expect(result[0]).toBeInstanceOf(transportDTO);
        });

        it('should return list of transportDTOs', async () => {
            (transportDao.getTransports as jest.Mock).mockResolvedValue([]);

            const result = await transportService.gettransports();

            expect(Array.isArray(result)).toBe(true);
            expect(result).toEqual([])
        });
    });

    describe('gettransportByTypeAndName', () => {
        it('should return transportDTO based on type and name', async () => {
            (transportDao.getTransportByTypeAndName as jest.Mock).mockResolvedValue(mockTransport);

            const result = await transportService.gettransportByTypeAndName('bus', 'Hanif Poribohon');

            expect(result).toBeInstanceOf(transportDTO);
        });
    });

    describe('updatetransport', () => {
        it('should update and return transportDTO', async () => {
            (transportDao.updateTransport as jest.Mock).mockResolvedValue(mockUpdatedTransport);

            const result = await transportService.updatetransport('trans-123', {
                transport_type: 'train',
                transport_name: 'Hanif Poribohon'
            });

            expect(result).toBeInstanceOf(transportDTO);
            expect(result.transport_id).toBe('trans-123')
            expect(result.transport_type).toBe('train')
        });
    });

    describe('gettransportsByProximity', () => {
        it('should return nearby transportDTOs', async () => {
            (transportDao.getTransportsByProximity as jest.Mock).mockResolvedValue([mockTransport]);

            const result = await transportService.gettransportsByProximity(23.78, 90.41, 5);

            expect(result.length).toBeGreaterThan(0);
            expect(result[0]).toBeInstanceOf(transportDTO);
        });
    });
});
