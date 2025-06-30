import {
  createWishlist,
  getWishlists,
  getWishlistById,
  updateWishlist,
  deleteWishlist,
  getWishlistByUserid,
  shareWishlist,
  toggleVisibility,
  groupUsersByWishlistTheme
} from '../../../src/controllers/wishlist.controller.ts';

import * as WishlistService from '../../../src/services/wishlist.service.ts';
import * as UserService from '../../../src/services/user.service.ts';
import * as PlaceService from '../../../src/services/place.service.ts';
import { WishlistDTO } from '../../../src/DTOs/wishlist.dto.ts';
import { UserDTO } from '../../../src/DTOs/user.dto.ts';
import { placeDTO } from '../../../src/DTOs/place.dto.ts';

jest.mock('../../../src/services/wishlist.service.ts');
jest.mock('../../../src/services/user.service.ts');
jest.mock('../../../src/services/place.service.ts');


// for testing fast, i am writing the mock data here instead of placing it into separte file 

const mockUser: UserDTO = {
  user_id: 'u001',
  username: 'john',
  email: 'john@example.com',
  role: 'traveller',
  profile_picture_url: null,
  bio: null
};

const mockPlace: placeDTO = {
  place_id: 'p001',
  place_name: 'Test Place',
  location: {
      latitude: 10,
      longitude: 20,
  }
};

const mockWishlist: WishlistDTO = {
  wishlist_id: 'w001',
  user_id: 'u001',
  reference_id: 'p001',
  title: 'My Wishlist',
  type: 'place',
  theme: 'travel',
  region: 'asia',
  note: 'my wishlist',
  is_public: false,
};


describe('Wishlist Controller', () => {
    let req: any;
    let res: any;
    let next: jest.Mock;
    
    beforeEach(() => {
        req = { body: {}, params: {}, query: {}, username: 'john' };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
        jest.clearAllMocks();
    });

    describe('createWishlist', () => {
        it('should create a wishlist when place exists', async () => {
            req.body = { place_name: 'Test Place', latitude: 10, longitude: 20, title: 'My Wishlist' };
            (UserService.getUserByUsername as jest.Mock).mockResolvedValue(mockUser);
            (PlaceService.getPlaceByName as jest.Mock).mockResolvedValue(mockPlace);
            (WishlistService.createWishlist as jest.Mock).mockResolvedValue(mockWishlist);

            await createWishlist(req, res, next);

            expect(UserService.getUserByUsername).toHaveBeenCalledWith('john');
            expect(PlaceService.getPlaceByName).toHaveBeenCalledWith('Test Place');
            expect(WishlistService.createWishlist).toHaveBeenCalledWith(expect.objectContaining({
                user_id: 'u001',
                reference_id: 'p001',
                title: 'My Wishlist'
            }));
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockWishlist);
        });

        it('should create a wishlist when place does not exist', async () => {
            req.body = { place_name: 'New Place', latitude: 10, longitude: 20, title: 'My Wish' };
            (UserService.getUserByUsername as jest.Mock).mockResolvedValue(mockUser);
            (PlaceService.getPlaceByName as jest.Mock).mockResolvedValue(undefined);
            (PlaceService.createPlace as jest.Mock).mockResolvedValue(mockPlace);
            (WishlistService.createWishlist as jest.Mock).mockResolvedValue(mockWishlist);

            await createWishlist(req, res, next);

            expect(PlaceService.createPlace).toHaveBeenCalledWith({
                place_name: 'New Place',
                latitude: 10,
                longitude: 20
            });
            expect(WishlistService.createWishlist).toHaveBeenCalledWith(expect.objectContaining({
                reference_id: 'p001',
            }));
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockWishlist);
        });

        it('should call next on error', async () => {
            const err = new Error('Create error');
            (UserService.getUserByUsername as jest.Mock).mockRejectedValue(err);

            await createWishlist(req, res, next);
            expect(next).toHaveBeenCalledWith(err);
        });
    });

    describe('getWishlists', () => {
        it('should return list of wishlists', async () => {
            req.query = { page: '1', limit: '10' };
            (WishlistService.getWishlists as jest.Mock).mockResolvedValue([mockWishlist]);

            await getWishlists(req, res, next);

            expect(WishlistService.getWishlists).toHaveBeenCalledWith(1, 10);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([mockWishlist]);
        });

        it('should call next on error', async () => {
            const err = new Error('Fetch error');
            (WishlistService.getWishlists as jest.Mock).mockRejectedValue(err);

            await getWishlists(req, res, next);
            expect(next).toHaveBeenCalledWith(err);
        });
    });

    describe('getWishlistById', () => {
        it('should return one wishlist', async () => {
            req.params = { wishlist_id: 'w001' };
            (WishlistService.getWishlistById as jest.Mock).mockResolvedValue(mockWishlist);

            await getWishlistById(req, res, next);

            expect(WishlistService.getWishlistById).toHaveBeenCalledWith('w001');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockWishlist);
        });

        it('should call next on error', async () => {
            const err = new Error('Fetch error');
            (WishlistService.getWishlistById as jest.Mock).mockRejectedValue(err);

            await getWishlistById(req, res, next);
            expect(next).toHaveBeenCalledWith(err);
        });
    });

    describe('updateWishlist', () => {
        it('should update wishlist', async () => {
            req.params = { wishlist_id: 'w001' };
            req.body = { place_name: 'Test Place', title: 'Updated' };
            (UserService.getUserByUsername as jest.Mock).mockResolvedValue(mockUser);
            (PlaceService.getPlaceByName as jest.Mock).mockResolvedValue(mockPlace);
            (WishlistService.updateWishlist as jest.Mock).mockResolvedValue(mockWishlist);

            await updateWishlist(req, res, next);

            expect(WishlistService.updateWishlist).toHaveBeenCalledWith('w001', expect.objectContaining({
                user_id: 'u001',
                reference_id: 'p001',
                place_name: 'Test Place'
            }));
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockWishlist);
        });

        it('should call next on error', async () => {
            const err = new Error('Update error');
            (UserService.getUserByUsername as jest.Mock).mockRejectedValue(err);

            await updateWishlist(req, res, next);
            expect(next).toHaveBeenCalledWith(err);
        });
    });

    describe('deleteWishlist', () => {
        it('should delete wishlist', async () => {
            req.params = { wishlist_id: 'w001' };
            (UserService.getUserByUsername as jest.Mock).mockResolvedValue(mockUser);
            (WishlistService.deleteWishlist as jest.Mock).mockResolvedValue('deleted');

            await deleteWishlist(req, res, next);

            expect(WishlistService.deleteWishlist).toHaveBeenCalledWith('w001', 'u001');
            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.json).toHaveBeenCalledWith('deleted');
        });

        it('should call next on error', async () => {
            const err = new Error('Delete error');
            (UserService.getUserByUsername as jest.Mock).mockRejectedValue(err);

            await deleteWishlist(req, res, next);
            expect(next).toHaveBeenCalledWith(err);
        });
    });

    describe('getWishlistByUserid', () => {
        it('should fetch wishlists for a username', async () => {
            req.params = { username: 'john' };
            req.query = { page: '2', limit: '5' };
            (UserService.getUserByUsername as jest.Mock).mockResolvedValue(mockUser);
            (WishlistService.getWishlistByUserid as jest.Mock).mockResolvedValue([mockWishlist]);

            await getWishlistByUserid(req, res, next);

            expect(WishlistService.getWishlistByUserid).toHaveBeenCalledWith('u001', 2, 5);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([mockWishlist]);
        });

        it('should call next on error', async () => {
            const err = new Error('Fetch error');
            (UserService.getUserByUsername as jest.Mock).mockRejectedValue(err);

            await getWishlistByUserid(req, res, next);
            expect(next).toHaveBeenCalledWith(err);
        });
    });

    describe('shareWishlist', () => {
        it('should return share URL', async () => {
            process.env.BASE_URL = 'http://localhost';
            req.params = { wishlist_id: 'w123' };

            await shareWishlist(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith('http://localhost/shared/w123');
        });
    });

    describe('toggleVisibility', () => {
        it('should toggle and send status', async () => {
            req.params = { wishlist_id: 'w001' };
            (WishlistService.toggleVisibility as jest.Mock).mockResolvedValue('public');

            await toggleVisibility(req, res, next);

            expect(WishlistService.toggleVisibility).toHaveBeenCalledWith('w001');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith('public');
        });

        it('should call next on error', async () => {
            const err = new Error('Toggle err');
            (WishlistService.toggleVisibility as jest.Mock).mockRejectedValue(err);

            await toggleVisibility(req, res, next);
            expect(next).toHaveBeenCalledWith(err);
        });
    });

    describe('groupUsersByWishlistTheme', () => {
        it('should group users by theme', async () => {
            req.body = { theme: 'adventure' };
            (WishlistService.groupUsersByWishlistTheme as jest.Mock).mockResolvedValue([{ user_id: 'u001', username: 'john' }]);

            await groupUsersByWishlistTheme(req, res, next);

            expect(WishlistService.groupUsersByWishlistTheme).toHaveBeenCalledWith('adventure');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([{ user_id: 'u001', username: 'john' }]);
        });

        it('should call next on error', async () => {
            const err = new Error('Group err');
            (WishlistService.groupUsersByWishlistTheme as jest.Mock).mockRejectedValue(err);

            await groupUsersByWishlistTheme(req, res, next);
            expect(next).toHaveBeenCalledWith(err);
        });
    });
});
