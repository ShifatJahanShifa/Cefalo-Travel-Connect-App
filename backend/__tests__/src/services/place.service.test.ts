import * as PlaceService from '../../../src/services/place.service.ts';
import placeDao from '../../../src/repositories/dao/place.repository.ts';
import { placeDTO } from '../../../src/DTOs/place.dto.ts';
import { AppError } from '../../../src/utils/appError.ts';
import { mockPlace, mockUpdatedPlace } from '../../__mocks__/place.mock.ts';

jest.mock('../../../src/repositories/dao/place.repository.ts'); 

describe('Place Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createPlace', () => {
        it('should create and return a placeDTO', async () => {
            (placeDao.createPlace as jest.Mock).mockResolvedValue(mockPlace);
            
            const result = await PlaceService.createPlace({
                place_name: 'place 1',
                latitude: 21.9802,
                longitude: 90.1267
            });

            expect(result).toBeInstanceOf(placeDTO);
            expect(result.place_id).toBe('place-123');
        });
    });

    describe('getPlaces', () => {
        it('should return an array of placeDTOs', async () => {
            (placeDao.getPlaces as jest.Mock).mockResolvedValue([mockPlace]);

            const result = await PlaceService.getPlaces();

            expect(Array.isArray(result)).toBe(true);
            expect(result[0]).toBeInstanceOf(placeDTO);
        });

        it('should return an empty array if no places are found', async () => {
            (placeDao.getPlaces as jest.Mock).mockResolvedValue([]);

            const result = await PlaceService.getPlaces();

            expect(placeDao.getPlaces).toHaveBeenCalled();
            expect(result).toEqual([]);
        });
    });

    describe('getPlaceByName', () => {
        it('should return placeDTO if found', async () => {
            (placeDao.getPlaceByName as jest.Mock).mockResolvedValue(mockPlace);

            const result = await PlaceService.getPlaceByName('Test Place');

            expect(result).toBeInstanceOf(placeDTO);
        });

        it('should return undefined if not found', async () => {
            (placeDao.getPlaceByName as jest.Mock).mockResolvedValue(undefined);

            const result = await PlaceService.getPlaceByName('Unknown Place');

            expect(result).toBeUndefined();
        });
    });

    describe('updatePlace', () => {
        it('should update and return placeDTO', async () => {
            (placeDao.updatePlace as jest.Mock).mockResolvedValue(mockUpdatedPlace);

            const result = await PlaceService.updatePlace('place-123', {
                place_name: 'place 1',
                latitude: 20.9802,
                longitude: 91.1267
            });

            expect(result).toBeInstanceOf(placeDTO);
            expect(result.location.latitude).toBe(20.9802)
            expect(result.location.longitude).toBe(91.1267)
            expect(result.place_id).toBe('place-123')
        });
    });

    describe('getPlacesByProximity', () => {
        it('should return nearby places as placeDTOs', async () => {
            (placeDao.getPlacesByProximity as jest.Mock).mockResolvedValue([mockPlace]);

            const result = await PlaceService.getPlacesByProximity(21.9802, 90.1267, 5);

            expect(Array.isArray(result)).toBe(true);
            expect(result[0]).toBeInstanceOf(placeDTO);
        });

        it('should return nearby places as placeDTOs', async () => {
            (placeDao.getPlacesByProximity as jest.Mock).mockResolvedValue([]);

            const result = await PlaceService.getPlacesByProximity(11.9802, 99.1267, 5);

            expect(Array.isArray(result)).toBe(true);
            expect(result).toEqual([])
        });

    });
});
