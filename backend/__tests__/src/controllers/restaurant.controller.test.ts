import {
  createRestaurant,
  getRestaurants,
  updateRestaurant,
  getRestaurantsByProximity
} from '../../../src/controllers/restaurant.controller.ts';

import * as RestaurantService from '../../../src/services/restaurant.service.ts';
import { restaurantDTO } from '../../../src/DTOs/restaurant.dto.ts';
import { restaurantCreation, restaurantUpdation } from '../../../src/types/restaurant.type.ts';
import { Request, Response, NextFunction } from 'express';
import { mockRestaurantDTO } from '../../__mocks__/restaurant.dto.mock.ts'
import { ExpressRequest } from '../../../src/middlewares/auth.middleware.ts';

jest.mock('../../../src/services/restaurant.service.ts');

describe('Restaurant Controller', () => {
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

    describe('createRestaurant', () => {
        it('should create and return a restaurant', async () => {
            req.body = {
                restaurant_name: 'BFC',
                latitude: 23.8103,
                longitude: 90.4125
            } as restaurantCreation;

            (RestaurantService.createRestaurant as jest.Mock).mockResolvedValue(mockRestaurantDTO);

            await createRestaurant(req as Request, res as Response, next);

            expect(RestaurantService.createRestaurant).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockRestaurantDTO);
        });

        it('should call next on error', async () => {
            const error = new Error('Create error');
            (RestaurantService.createRestaurant as jest.Mock).mockRejectedValue(error);

            await createRestaurant(req as Request, res as Response, next);
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('getRestaurants', () => {
        it('should return all restaurants', async () => {
            (RestaurantService.getRestaurants as jest.Mock).mockResolvedValue([mockRestaurantDTO]);

            await getRestaurants(req as Request, res as Response, next);

            expect(RestaurantService.getRestaurants).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([mockRestaurantDTO]);
        });

        it('should call next on error', async () => {
            const error = new Error('Fetch error');
            (RestaurantService.getRestaurants as jest.Mock).mockRejectedValue(error);

            await getRestaurants(req as Request, res as Response, next);
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('updateRestaurant', () => {
        it('should update and return a restaurant', async () => {
            req.params = { restaurantId: 'r001' };
            req.body = {
                restaurant_name: 'Updated BFC',
                latitude: 24,
                longitude: 91
            } as restaurantUpdation;

            const updatedRestaurant = { ...mockRestaurantDTO, ...req.body };

            (RestaurantService.updateRestaurant as jest.Mock).mockResolvedValue(updatedRestaurant);

            await updateRestaurant(req as Request, res as Response, next);

            expect(RestaurantService.updateRestaurant).toHaveBeenCalledWith('r001', req.body);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(updatedRestaurant);
        });

        it('should call next on error', async () => {
            req.params = { restaurantId: 'r001' };
            req.body = {} as restaurantUpdation;

            const error = new Error('Update error');
            (RestaurantService.updateRestaurant as jest.Mock).mockRejectedValue(error);

            await updateRestaurant(req as Request, res as Response, next);
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('getRestaurantsByProximity', () => {
        it('should return restaurants by proximity', async () => {
            req.query = {
                latitude: '23.8103',
                longitude: '90.4125',
                radius: '5'
            };

            (RestaurantService.getRestaurantsByProximity as jest.Mock).mockResolvedValue([mockRestaurantDTO]);

            await getRestaurantsByProximity(req as Request, res as Response, next);

            expect(RestaurantService.getRestaurantsByProximity).toHaveBeenCalledWith(23, 90, 5);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([mockRestaurantDTO]);
        });

        it('should call next on error', async () => {
            req.query = {
                latitude: '23.8103',
                longitude: '90.4125',
                radius: '5'
            };

            const error = new Error('Proximity error');
            (RestaurantService.getRestaurantsByProximity as jest.Mock).mockRejectedValue(error);

            await getRestaurantsByProximity(req as Request, res as Response, next);
            expect(next).toHaveBeenCalledWith(error);
        });
    });
});
