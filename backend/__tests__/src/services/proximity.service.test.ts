import * as proximityService from '../../../src/services/proximity.service.ts';
import proximityDao from '../../../src/repositories/dao/proximity.repository.ts';
import { proximity } from '../../../src/types/proximity.type.ts';
import { ProximityDTO } from '../../../src/DTOs/proximity.dto.ts';
import { mockProximity } from '../../__mocks__/proximity.mock.ts';

jest.mock('../../../src/repositories/dao/proximity.repository.ts');


describe('Proximity Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createProximity', () => {
        it('should create a proximity and return DTO', async () => {
            (proximityDao.createProximity as jest.Mock).mockResolvedValue(mockProximity);

            const result = await proximityService.createProximity(mockProximity);

            expect(result).toBeInstanceOf(ProximityDTO);
            expect(result.user_id).toBe('user1');
        });
    });

    describe('findUserProximity', () => {
        it('should return list of proximity DTOs', async () => {
            (proximityDao.findUserProximity as jest.Mock).mockResolvedValue([mockProximity]);

            const result = await proximityService.findUserProximity('user1');

            expect(result).toHaveLength(1);
            expect(result[0]).toBeInstanceOf(ProximityDTO);
        });

        it('should return empty array if no records found', async () => {
            (proximityDao.findUserProximity as jest.Mock).mockResolvedValue([]);

            const result = await proximityService.findUserProximity('user1');

            expect(result).toEqual([]);
        });
    });

    describe('updateProximity', () => {
        it('should update proximity and return DTO', async () => {
            (proximityDao.updateProximity as jest.Mock).mockResolvedValue(mockProximity);

            const result = await proximityService.updateProximity(mockProximity);

            expect(result).toBeInstanceOf(ProximityDTO);
            expect(result.proximity_id).toBe(mockProximity.proximity_id);
        });
    });

    describe('deleteProximityById', () => {
        it('should return true on successful deletion by ID', async () => {
            (proximityDao.deleteProximityById as jest.Mock).mockResolvedValue(true);

            const result = await proximityService.deleteProximityById('prox-123');

            expect(result).toBe(true);
        });

        it('should return false if deletion fails', async () => {
            (proximityDao.deleteProximityById as jest.Mock).mockResolvedValue(false);

            const result = await proximityService.deleteProximityById('prox-123');

            expect(result).toBe(false);
        });
    });

    describe('deleteProximity', () => {
        it('should return true on successful deletion using input', async () => {
            (proximityDao.deleteProximity as jest.Mock).mockResolvedValue(true);

            const result = await proximityService.deleteProximity(mockProximity);

            expect(result).toBe(true);
        });

        it('should return false if deletion fails using input', async () => {
            (proximityDao.deleteProximity as jest.Mock).mockResolvedValue(false);

            const result = await proximityService.deleteProximity(mockProximity);

            expect(result).toBe(false);
        });
    });
});
