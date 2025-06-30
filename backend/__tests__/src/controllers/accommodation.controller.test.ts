import {
  createAccommodation,
  getAccommodations,
  updateAccommodation,
  getAccommodationsByProximity
} from '../../../src/controllers/accommodation.controller.ts';

import * as AccommodationService from '../../../src/services/accommodation.service.ts';
import { AccommodationDTO } from '../../../src/DTOs/accommodation.dto.ts';
import { accommodationCreation, accommodationUpdation } from '../../../src/types/accommodation.type.ts';
import { Request, Response, NextFunction } from 'express';
import { mockAccommodationDTO } from '../../__mocks__/accommodation.dto.mock.ts'
import { ExpressRequest } from '../../../src/middlewares/auth.middleware.ts';

jest.mock('../../../src/services/accommodation.service.ts');


describe('Accommodation Controller', () => {
    let req: Partial<ExpressRequest>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createAccommodation', () => {
        it('should create and return an accommodation', async () => {
            req.body = {
                accommodation_name: 'Hotel Sunshine',
                accommodation_type: 'hotel',
                latitude: 23.8103,
                longitude: 90.4125
            } as accommodationCreation;

            (AccommodationService.createAccommodation as jest.Mock).mockResolvedValue(mockAccommodationDTO);

            await createAccommodation(req as Request, res as Response, next);

            expect(AccommodationService.createAccommodation).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockAccommodationDTO);
        });

        it('should call next on error', async () => {
            const error = new Error('Creation failed');
            (AccommodationService.createAccommodation as jest.Mock).mockRejectedValue(error);

            req.body = {} as accommodationCreation;
            await createAccommodation(req as Request, res as Response, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('getAccommodations', () => {
        it('should return list of accommodations', async () => {
            (AccommodationService.getAccommodations as jest.Mock).mockResolvedValue([mockAccommodationDTO]);

            await getAccommodations(req as Request, res as Response, next);

            expect(AccommodationService.getAccommodations).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([mockAccommodationDTO]);
        });

        it('should call next on error', async () => {
            const error = new Error('Fetch failed');
            (AccommodationService.getAccommodations as jest.Mock).mockRejectedValue(error);

            await getAccommodations(req as Request, res as Response, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('updateAccommodation', () => {
        it('should update and return accommodation', async () => {
            req.params = { accommodationId: 'acc123' };
            req.body = {
                accommodation_name: 'Updated Hotel',
                accommodation_type: 'resort'
            } as accommodationUpdation;

            const updatedAccommodation = { ...mockAccommodationDTO, ...req.body };

            (AccommodationService.updateAccommodation as jest.Mock).mockResolvedValue(updatedAccommodation);

            await updateAccommodation(req as Request, res as Response, next);

            expect(AccommodationService.updateAccommodation).toHaveBeenCalledWith('acc123', req.body);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(updatedAccommodation);
        });

        it('should call next on error', async () => {
        const error = new Error('Update failed');
            req.params = { accommodationId: 'acc123' };
            req.body = {} as accommodationUpdation;

            (AccommodationService.updateAccommodation as jest.Mock).mockRejectedValue(error);

            await updateAccommodation(req as Request, res as Response, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('getAccommodationsByProximity', () => {
        it('should return accommodations by proximity', async () => {
            req.query = {
                latitude: '23.8103',
                longitude: '90.4125',
                radius: '10'
            };

            (AccommodationService.getAccommodationsByProximity as jest.Mock).mockResolvedValue([mockAccommodationDTO]);

            await getAccommodationsByProximity(req as Request, res as Response, next);

            expect(AccommodationService.getAccommodationsByProximity).toHaveBeenCalledWith(23, 90, 10); // Note: parseInt behavior
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([mockAccommodationDTO]);
        });

        it('should call next on error', async () => {
            const error = new Error('Proximity error');
            req.query = {
                latitude: '23.8103',
                longitude: '90.4125',
                radius: '10'
            };

            (AccommodationService.getAccommodationsByProximity as jest.Mock).mockRejectedValue(error);

            await getAccommodationsByProximity(req as Request, res as Response, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });
});
