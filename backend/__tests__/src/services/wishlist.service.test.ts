import * as wishlistService from '../../../src/services/wishlist.service.ts';
import wishlistDao from '../../../src/repositories/dao/wishlist.repository.ts';
import placeDao from '../../../src/repositories/dao/place.repository.ts';
import { AppError } from '../../../src/utils/appError.ts';
import { WishlistDTO } from '../../../src/DTOs/wishlist.dto.ts';
import { getWishlistType } from '../../../src/types/wishlist.type.ts';
import { getPlace } from '../../../src/types/place.type.ts';
import { mockWishlist, mockGroup } from '../../__mocks__/wishlist.mock.ts';
import { mockPlace } from '../../__mocks__/place.mock.ts';

jest.mock('../../../src/repositories/dao/wishlist.repository.ts');
jest.mock('../../../src/repositories/dao/place.repository.ts');


describe('Wishlist Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createWishlist', () => {
        it('should create wishlist and return WishlistDTO', async () => {
            (wishlistDao.createWishlist as jest.Mock).mockResolvedValue(mockWishlist);

            const result = await wishlistService.createWishlist({
                user_id: 'user1',
                title: "wishlist",
                type: 'place',
                reference_id: 'place1',
                place_name: "Cox's Bazar",
                latitude: 21.43,
                longitude: 91.98,
                theme: 'Travel',
                region: 'asia',
                is_public: true,
                note: "my wishlist"
            });

            expect(result).toBeInstanceOf(WishlistDTO); 
            expect(result.wishlist_id).toBe('wish1')
        });
    });

    describe('getWishlists', () => {
        it('should return wishlist with enriched place data', async () => {
            (wishlistDao.getWishlists as jest.Mock).mockResolvedValue([mockWishlist]);
            (placeDao.getById as jest.Mock).mockResolvedValue([mockPlace]);

            const result = await wishlistService.getWishlists(1, 10);

            expect(Array.isArray(result)).toBe(true);
            expect(result[0]).toBeInstanceOf(WishlistDTO);
        });

        it('should throw error if no wishlist found', async () => {
            (wishlistDao.getWishlists as jest.Mock).mockResolvedValue([]);

            await expect(wishlistService.getWishlists(1, 10)).rejects.toThrow('wishlist not found');
        });

        it('should throw AppError if no wishlists found', async () => {
            (wishlistDao.getWishlists as jest.Mock).mockResolvedValue([]);

            await expect(wishlistService.getWishlists(1, 10)).rejects.toThrow(AppError);
        });

    });

    describe('getWishlistById', () => {
        it('should return wishlist with place info', async () => {
            (wishlistDao.getWishlistById as jest.Mock).mockResolvedValue(mockWishlist);
            (placeDao.getById as jest.Mock).mockResolvedValue([mockPlace]);

            const result = await wishlistService.getWishlistById('wish1');

            expect(result).toBeInstanceOf(WishlistDTO);
            expect(result.wishlist_id).toBe('wish1')
            expect(result.reference_id).toBe('place-123')
        });

        it('should throw if wishlist is not found', async () => {
            (wishlistDao.getWishlistById as jest.Mock).mockResolvedValue(undefined);

            await expect(wishlistService.getWishlistById('wish1')).rejects.toThrow('wishlist not found');
        });

        it('should throw if wishlist is not public', async () => {
            const privateWishlist = { ...mockWishlist, is_public: false };
            (wishlistDao.getWishlistById as jest.Mock).mockResolvedValue(privateWishlist);

            await expect(wishlistService.getWishlistById('wish1')).rejects.toThrow('wishlist is not public');
        });
    });

    describe('updateWishlist', () => {
        it('should update and return confirmation string', async () => {
            (wishlistDao.getWishlistById as jest.Mock).mockResolvedValue(mockWishlist);
            (wishlistDao.updateWishlist as jest.Mock).mockResolvedValue('Wishlist updated');

            const result = await wishlistService.updateWishlist('wish1', { ...mockWishlist });

            expect(result).toBe('Wishlist updated');
        });

        it('should throw if user not authorized', async () => {
            const otherUserWishlist = { ...mockWishlist, user_id: 'otherUser' };
            (wishlistDao.getWishlistById as jest.Mock).mockResolvedValue(otherUserWishlist);

            await expect(wishlistService.updateWishlist('wish1', { ...mockWishlist }))
                .rejects.toThrow('You are not authorized to update wishlist');
        });
    });

    describe('deleteWishlist', () => {
        it('should delete wishlist and return message', async () => {
            (wishlistDao.getWishlistById as jest.Mock).mockResolvedValue(mockWishlist);
            (wishlistDao.deleteWishlist as jest.Mock).mockResolvedValue('Deleted');

            const result = await wishlistService.deleteWishlist('wish1', 'user1');

            expect(result).toBe('Deleted');
        });

        it('should throw if user not authorized to delete', async () => {
            const otherUserWishlist = { ...mockWishlist, user_id: 'otherUser' };
            (wishlistDao.getWishlistById as jest.Mock).mockResolvedValue(otherUserWishlist);

            await expect(wishlistService.deleteWishlist('wish1', 'user1')).rejects.toThrow('You are not authorized to update wishlist');
        });
    });

    describe('getWishlistByUserid', () => {
        it('should return user’s wishlist list', async () => {
            (wishlistDao.getWishlistByUserid as jest.Mock).mockResolvedValue([mockWishlist]);

            const result = await wishlistService.getWishlistByUserid('user1', 1, 10);

            expect(Array.isArray(result)).toBe(true);
            expect(result[0]).toBeInstanceOf(WishlistDTO);
        });

        it('should throw if wishlist not found', async () => {
            (wishlistDao.getWishlistByUserid as jest.Mock).mockResolvedValue([]);

            await expect(wishlistService.getWishlistByUserid('user1', 1, 10)).rejects.toThrow('wishlist not found');
        });
    });

    describe('toggleVisibility', () => {
        it('should toggle and return confirmation', async () => {
            (wishlistDao.toggleVisibility as jest.Mock).mockResolvedValue('visibility toggled');

            const result = await wishlistService.toggleVisibility('wish1');

            expect(result).toBe('visibility toggled');
        });
    });

    describe('groupUsersByWishlistTheme', () => {
        it('should return grouped users list', async () => {
            (wishlistDao.groupUsersByWishlistTheme as jest.Mock).mockResolvedValue(mockGroup);

            const result = await wishlistService.groupUsersByWishlistTheme('Travel');

            expect(result).toEqual(mockGroup);
        });

        it('should throw if no results found', async () => {
            (wishlistDao.groupUsersByWishlistTheme as jest.Mock).mockResolvedValue(null);

            await expect(wishlistService.groupUsersByWishlistTheme('Theme')).rejects.toThrow('no user matchted found');
        });
    });
});
