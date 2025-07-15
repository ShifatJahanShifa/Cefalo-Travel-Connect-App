import * as accommodationService from '../../../src/services/accommodation.service.ts';
import accommodationDao from '../../../src/repositories/dao/accommodation.repository.ts';
import { AccommodationDTO } from '../../../src/DTOs/accommodation.dto.ts';
import { mockAccommodation, mockUpdatedAccommodation } from '../../__mocks__/accommodation.mock.ts';

jest.mock('../../../src/repositories/dao/accommodation.repository.ts');


describe('Accommodation Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createAccommodation', () => {
      it('should create and return AccommodationDTO', async () => {
        (accommodationDao.createAccommodation as jest.Mock).mockResolvedValue(mockAccommodation);

        const result = await accommodationService.createAccommodation({
          accommodation_name: 'Test Hotel',
          accommodation_type: 'hotel',
          latitude: 23.8103,
          longitude: 90.4125
        });

        expect(result).toBeInstanceOf(AccommodationDTO);
        expect(result.accommodation_id).toBe('acc-123');
      });
    });

    describe('getAccommodations', () => {
      it('should return an array of AccommodationDTOs', async () => {
        (accommodationDao.getAccommodations as jest.Mock).mockResolvedValue([mockAccommodation]);

        const result = await accommodationService.getAccommodations();

        expect(Array.isArray(result)).toBe(true);
        expect(result[0]).toBeInstanceOf(AccommodationDTO);
      });

      it('should return an array of AccommodationDTOs', async () => {
        (accommodationDao.getAccommodations as jest.Mock).mockResolvedValue([]);

        const result = await accommodationService.getAccommodations();

        expect(result).toEqual([]);
      });
    });

    describe('getAccommodationByTypeAndName', () => {
      it('should return an AccommodationDTO based on type and name', async () => {
        (accommodationDao.getAccommodationByTypeAndName as jest.Mock).mockResolvedValue(mockAccommodation);

        const result = await accommodationService.getAccommodationByTypeAndName('hotel', 'Test Hotel');

        expect(result).toBeInstanceOf(AccommodationDTO);
        expect(result.accommodation_type).toBe('hotel');
        expect(result.accommodation_name).toBe('Test Hotel');
      });
    });

    describe('updateAccommodation', () => {
      it('should update and return the AccommodationDTO', async () => {
        (accommodationDao.updateAccommodation as jest.Mock).mockResolvedValue(mockUpdatedAccommodation);

        const result = await accommodationService.updateAccommodation('acc-123', {
          accommodation_name: 'Updated Hotel',
          accommodation_type: 'hotel',
          latitude: 23.8103,
          longitude: 90.4125
        });

        expect(result).toBeInstanceOf(AccommodationDTO);
        expect(result.accommodation_name).toBe('Updated Hotel')
        expect(result.accommodation_id).toBe('acc-123')
      });
    });

    describe('getAccommodationsByProximity', () => {
      it('should return nearby accommodations as AccommodationDTO[]', async () => {
        (accommodationDao.getAccommodationsByProximity as jest.Mock).mockResolvedValue([mockAccommodation]);

        const result = await accommodationService.getAccommodationsByProximity(23.8103, 90.4125, 10);

        expect(Array.isArray(result)).toBe(true);
        expect(result[0]).toBeInstanceOf(AccommodationDTO);
      });

      it('should return nearby accommodations as AccommodationDTO[]', async () => {
        (accommodationDao.getAccommodationsByProximity as jest.Mock).mockResolvedValue([]);

        const result = await accommodationService.getAccommodationsByProximity(23.8103, 99.4125, 10);

        expect(Array.isArray(result)).toBe(true);
        expect(result).toEqual([]);
      });
    });
});
