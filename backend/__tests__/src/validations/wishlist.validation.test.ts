import { validateWishlistCreationData } from '../../../src/validations/validationMiddlewares/wishlist.validation.ts';

describe('Wishlist Validation Middleware', () => {
    const mockNext = jest.fn();
    const mockRes = () => {
        const res: any = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };

    beforeEach(() => {
        mockNext.mockClear();
    });

    it('passes with valid data', () => {
        const req: any = {
        body: {
            place_name: 'Central Park',
            type: 'park',
            title: 'My Favorite Park',
            theme: 'Nature',
            region: 'NYC',
            note: 'Great place to relax',
            is_public: true,
            latitude: 40.785091,
            longitude: -73.968285,
        },
        };
        const res = mockRes();

        validateWishlistCreationData(req, res, mockNext);

        expect(mockNext).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
    });

    it('fails when place_name is missing', () => {
        const req: any = {
        body: {
            type: 'park',
            title: 'My Favorite Park',
            is_public: true,
        },
        };
        const res = mockRes();

        validateWishlistCreationData(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
            message: 'Required',
        })
        );
        expect(mockNext).not.toHaveBeenCalled();
    });

    it('fails when is_public is missing', () => {
        const req: any = {
        body: {
            place_name: 'Central Park',
            type: 'park',
            title: 'My Favorite Park',
        },
        };
        const res = mockRes();

        validateWishlistCreationData(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
            message: expect.any(String),
        })
        );
        expect(mockNext).not.toHaveBeenCalled();
    });

    it('handles generic error fallback', () => {
        const req: any = {
        body: {
            place_name: 'Central Park',
            type: 'park',
            title: 'My Favorite Park',
            is_public: true,
        },
        };
        const res = mockRes();

        const { wishlistSchema } = require('../../../src/validations/schemas/wishlist.schema.ts');
        const originalParse = wishlistSchema.parse;
        wishlistSchema.parse = jest.fn(() => {
        throw new Error('Unexpected error');
        });

        validateWishlistCreationData(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
        message: 'Invalid input for post creation',
        });
        expect(mockNext).not.toHaveBeenCalled();

        wishlistSchema.parse = originalParse;
    });
});
