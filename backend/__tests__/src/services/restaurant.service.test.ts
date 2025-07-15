import * as RestaurantService from '../../../src/services/restaurant.service.ts';
import restaurantDao from '../../../src/repositories/dao/restaurant.repository.ts';
import { restaurantDTO } from '../../../src/DTOs/restaurant.dto.ts';
import { restaurantCreation, getRestaurant } from '../../../src/types/restaurant.type.ts';
import { mockRestaurant, mockUpdatedRestaurant } from '../../__mocks__/restaurant.mock.ts';

jest.mock('../../../src/repositories/dao/restaurant.repository.ts');

describe('Restaurant Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createRestaurant', () => {
        it('should create a restaurant and return restaurantDTO', async () => {
            (restaurantDao.createRestaurant as jest.Mock).mockResolvedValue(mockRestaurant);

            const result = await RestaurantService.createRestaurant({
                restaurant_name: 'restaurant 1',
                latitude: 21.9802,
                longitude: 90.1267
            });

            expect(result).toBeInstanceOf(restaurantDTO);
            expect(result.restaurant_id).toBe('restaurant-123')
            expect(restaurantDao.createRestaurant).toHaveBeenCalled();
        });
    });

    describe('getRestaurants', () => {
        it('should return list of restaurantDTOs', async () => {
            (restaurantDao.getRestaurants as jest.Mock).mockResolvedValue([mockRestaurant]);

            const result = await RestaurantService.getRestaurants();

            expect(Array.isArray(result)).toBe(true);
            expect(result[0]).toBeInstanceOf(restaurantDTO);
        });

        
         it('should return list of restaurantDTOs', async () => {
            (restaurantDao.getRestaurants as jest.Mock).mockResolvedValue([]);

            const result = await RestaurantService.getRestaurants();

            expect(Array.isArray(result)).toBe(true);
            expect(result).toEqual([])
        });

    });

    describe('getRestaurantByTypeAndName', () => {
        it('should return a restaurantDTO by name', async () => {
            (restaurantDao.getRestaurantByName as jest.Mock).mockResolvedValue(mockRestaurant);

            const result = await RestaurantService.getRestaurantByTypeAndName('restaurant 1');

            expect(result).toBeInstanceOf(restaurantDTO);
        });
    });

    describe('updateRestaurant', () => {
        it('should update restaurant and return updated DTO', async () => {
            (restaurantDao.updateRestaurant as jest.Mock).mockResolvedValue(mockUpdatedRestaurant);

            const result = await RestaurantService.updateRestaurant('restaurant-123', {
                restaurant_name: 'restaurant 1',
                latitude: 20.9802,
                longitude: 91.1267
            });

            expect(result).toBeInstanceOf(restaurantDTO);
            expect(result.restaurant_id).toBe('restaurant-123')
            expect(result.location.latitude).toBe(20.9802)
            expect(result.location.longitude).toBe(91.1267)
        });
    });

    describe('getRestaurantsByProximity', () => {
        it('should return nearby restaurants as DTOs', async () => {
            (restaurantDao.getRestaurantsByProximity as jest.Mock).mockResolvedValue([mockRestaurant]);

            const result = await RestaurantService.getRestaurantsByProximity(20.9809, 90.1267, 50);

            expect(Array.isArray(result)).toBe(true);
            expect(result[0]).toBeInstanceOf(restaurantDTO);
        });

        it('should return nearby restaurants as DTOs', async () => {
            (restaurantDao.getRestaurantsByProximity as jest.Mock).mockResolvedValue([]);

            const result = await RestaurantService.getRestaurantsByProximity(23.78, 90.41, 5);

            expect(result.length).toBe(0);
            expect(result).toEqual([])
        });
    });
});
