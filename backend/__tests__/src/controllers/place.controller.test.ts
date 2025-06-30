import {
  createPlace,
  getPlaces,
  updatePlace,
  getPlacesByProximity
} from '../../../src/controllers/place.controller.ts';

import * as PlaceService from '../../../src/services/place.service.ts';
import { placeDTO } from '../../../src/DTOs/place.dto.ts';
import { placeCreation, placeUpdation } from '../../../src/types/place.type.ts';
import { Request, Response, NextFunction } from 'express';
import { ExpressRequest } from '../../../src/middlewares/auth.middleware.ts';
import { mockPlaceDTO } from '../../__mocks__/place.dto.mock.ts'

jest.mock('../../../src/services/place.service.ts');


describe('Place Controller', () => {
    let req: Partial<Request>;
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

    describe('createPlace', () => {
        it('should create and return a place', async () => {
            req.body = {
                place_name: "Cox's Bazar",
                latitude: 21.4272,
                longitude: 92.0058
            } as placeCreation;

            (PlaceService.createPlace as jest.Mock).mockResolvedValue(mockPlaceDTO);

            await createPlace(req as Request, res as Response, next);

            expect(PlaceService.createPlace).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockPlaceDTO);
        });

        it('should call next on error', async () => {
            const error = new Error('Create failed');
            (PlaceService.createPlace as jest.Mock).mockRejectedValue(error);

            await createPlace(req as Request, res as Response, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('getPlaces', () => {
        it('should return list of places', async () => {
            (PlaceService.getPlaces as jest.Mock).mockResolvedValue([mockPlaceDTO]);

            await getPlaces(req as Request, res as Response, next);

            expect(PlaceService.getPlaces).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([mockPlaceDTO]);
        });

        it('should call next on error', async () => {
            const error = new Error('Fetch failed');
            (PlaceService.getPlaces as jest.Mock).mockRejectedValue(error);

            await getPlaces(req as Request, res as Response, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('updatePlace', () => {
        it('should update and return a place', async () => {
            req.params = { placeId: 'p001' };
            req.body = {
                place_name: 'Updated Place',
                latitude: 22.0,
                longitude: 91.0
            } as placeUpdation;

            const updatedPlace = { ...mockPlaceDTO, ...req.body };

            (PlaceService.updatePlace as jest.Mock).mockResolvedValue(updatedPlace);

            await updatePlace(req as Request, res as Response, next);

            expect(PlaceService.updatePlace).toHaveBeenCalledWith('p001', req.body);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(updatedPlace);
        });

        it('should call next on error', async () => {
            const error = new Error('Update failed');
            req.params = { placeId: 'p001' };
            req.body = {} as placeUpdation;

            (PlaceService.updatePlace as jest.Mock).mockRejectedValue(error);

            await updatePlace(req as Request, res as Response, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('getPlacesByProximity', () => {
        it('should return places based on proximity', async () => {
            req.query = {
                latitude: '21.4272',
                longitude: '92.0058',
                radius: '10'
            };

            (PlaceService.getPlacesByProximity as jest.Mock).mockResolvedValue([mockPlaceDTO]);

            await getPlacesByProximity(req as Request, res as Response, next);

            expect(PlaceService.getPlacesByProximity).toHaveBeenCalledWith(21, 92, 10); 
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([mockPlaceDTO]);
        });

        it('should call next on error', async () => {
            const error = new Error('Proximity fetch failed');
            req.query = {
                latitude: '21.4272',
                longitude: '92.0058',
                radius: '10'
            };

            (PlaceService.getPlacesByProximity as jest.Mock).mockRejectedValue(error);

            await getPlacesByProximity(req as Request, res as Response, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });
});
