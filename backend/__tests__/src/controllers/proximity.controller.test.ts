import {
  createProximity,
  findUserProximity,
  updateProximity,
  deleteProximity,
  checkProximities
} from '../../../src/controllers/proximity.controller.ts';

import * as ProximityService from '../../../src/services/proximity.service.ts';
import * as UserService from '../../../src/services/user.service.ts';
import * as WishlistService from '../../../src/services/wishlist.service.ts';
import { getDistanceInKm } from '../../../src/utils/getDistance.ts';

jest.mock('../../../src/services/proximity.service');
jest.mock('../../../src/services/user.service');
jest.mock('../../../src/services/wishlist.service');
jest.mock('../../../src/utils/getDistance');

// for simplicity, i am writing mocks for this testfile in this file 

const mockUser = { user_id: 'u001', username: 'john_doe' };
const mockProximity = {
    user_id: 'u001',
    type: 'wishlist',
    reference_id: 'w123',
    radius: 5,
};
const mockProximityDTO = { ...mockProximity, proximity_id: 'p001' };
const mockWishlist = {
    wishlist_id: 'w123',
    title: 'Beautiful Beach',
    place_name: 'Bondi',
    place_latitude: 10,
    place_longitude: 20,
};


describe('Proximity Controller', () => {
    let req: any, res: any, next: any;
    
    beforeEach(() => {
        req = {
            body: {},
            params: {},
            username: 'john_doe'
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
        
    });

    afterEach(() => jest.clearAllMocks())

    describe('createProximity', () => {
        it('should create and return a proximity', async () => {
            req.body = mockProximity;

            (UserService.getUserByUsername as jest.Mock).mockResolvedValue(mockUser);
            (ProximityService.createProximity as jest.Mock).mockResolvedValue(mockProximityDTO);

            await createProximity(req, res, next);

            expect(UserService.getUserByUsername).toHaveBeenCalledWith('john_doe');
            expect(ProximityService.createProximity).toHaveBeenCalledWith(expect.objectContaining(mockProximity));
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockProximityDTO);
        });

        it('should call next on error', async () => {
            const error = new Error('Create error');
            (UserService.getUserByUsername as jest.Mock).mockRejectedValue(error);

            await createProximity(req, res, next);
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('findUserProximity', () => {
        it('should return all proximities for the user', async () => {
            (UserService.getUserByUsername as jest.Mock).mockResolvedValue(mockUser);
            (ProximityService.findUserProximity as jest.Mock).mockResolvedValue([mockProximityDTO]);

            await findUserProximity(req, res, next);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith([mockProximityDTO]);
        });

        it('should call next on error', async () => {
            const error = new Error('Find error');
            (UserService.getUserByUsername as jest.Mock).mockRejectedValue(error);

            await findUserProximity(req, res, next);
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('updateProximity', () => {
        it('should update and return proximity', async () => {
            req.body = mockProximity;

            (UserService.getUserByUsername as jest.Mock).mockResolvedValue(mockUser);
            (ProximityService.updateProximity as jest.Mock).mockResolvedValue(mockProximityDTO);

            await updateProximity(req, res, next);

            expect(ProximityService.updateProximity).toHaveBeenCalledWith(expect.objectContaining(mockProximity));
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockProximityDTO);
        });

        it('should call next on error', async () => {
            const error = new Error('Update error');
            (UserService.getUserByUsername as jest.Mock).mockRejectedValue(error);

            await updateProximity(req, res, next);
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('deleteProximity', () => {
        it('should delete proximity and return true', async () => {
            req.body = mockProximity;

            (UserService.getUserByUsername as jest.Mock).mockResolvedValue(mockUser);
            (ProximityService.deleteProximity as jest.Mock).mockResolvedValue(true);

            await deleteProximity(req, res, next);

            expect(ProximityService.deleteProximity).toHaveBeenCalledWith(expect.objectContaining(mockProximity));
            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.json).toHaveBeenCalledWith(true);
        });

        it('should call next on error', async () => {
            const error = new Error('Delete error');
            (UserService.getUserByUsername as jest.Mock).mockRejectedValue(error);

            await deleteProximity(req, res, next);
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('checkProximities', () => {
        it('should return alerts and delete matched proximities', async () => {
            req.body = { userLat: 10, userLong: 20 };

            (UserService.getUserByUsername as jest.Mock).mockResolvedValue(mockUser);
            (ProximityService.findUserProximity as jest.Mock).mockResolvedValue([{ ...mockProximityDTO }]);
            (WishlistService.getWishlistById as jest.Mock).mockResolvedValue(mockWishlist);
            (getDistanceInKm as jest.Mock).mockReturnValue(3);
            (ProximityService.deleteProximityById as jest.Mock).mockResolvedValue(true);

            await checkProximities(req, res, next);

            expect(getDistanceInKm).toHaveBeenCalledWith(10, 20, 10, 20);
            expect(ProximityService.deleteProximityById).toHaveBeenCalledWith('p001');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([{
                wishlist_id: 'w123',
                title: 'Beautiful Beach',
                place: 'Bondi',
                distance: 3,
                threshold: 5,
            }]);
        });

        it('should skip proximity if distance is greater than radius (no alert)', async () => {
            req.body = { userLat: 10, userLong: 20 };

            (UserService.getUserByUsername as jest.Mock).mockResolvedValue(mockUser);
            (ProximityService.findUserProximity as jest.Mock).mockResolvedValue([{ ...mockProximityDTO }]);
            (WishlistService.getWishlistById as jest.Mock).mockResolvedValue(mockWishlist);
            (getDistanceInKm as jest.Mock).mockReturnValue(10); 

            await checkProximities(req, res, next);

            expect(getDistanceInKm).toHaveBeenCalledWith(10, 20, 10, 20);
            expect(ProximityService.deleteProximityById).not.toHaveBeenCalled(); 
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([]); 
        });


        it('should call next on error', async () => {
            const error = new Error('Check error');
            (UserService.getUserByUsername as jest.Mock).mockRejectedValue(error);

            await checkProximities(req, res, next);
            expect(next).toHaveBeenCalledWith(error);
        });
    });
});
