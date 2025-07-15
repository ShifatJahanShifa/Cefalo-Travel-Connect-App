import { validatePostCreationData, validateUpdatePostData } from '../../../src/validations/validationMiddlewares/post.validation.ts';

describe('Post Validation Middleware', () => {
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

    const validPostBody = {
        user_id: 'user-123',
        title: 'Amazing Trip',
        description: 'Had a wonderful experience!',
        total_cost: 1500,
        duration: '5 days',
        effort: 'Medium',
        categories: ['Adventure', 'Nature'],
        accommodations: [
        {
            accommodation_type: 'hotel',
            accommodation_name: 'Seaside Hotel',
            cost_per_night: 120,
            latitude: 12.34,
            longitude: 56.78,
            cost: 120,
            rating: 5,
            review: 'Great place!',
        },
        ],
        transports: [
        {
            transport_type: 'bus',
            transport_name: 'City Bus',
            cost_per_person: 15,
            cost: 15,
            rating: 4,
            review: 'Comfortable ride',
        },
        ],
        places: [
        {
            place_name: 'Central Park',
            cost: 0,
            rating: 5,
            review: 'Beautiful',
        },
        ],
        foods: [
        {
            food_name: 'Pizza',
            cost: 10,
            rating: 4,
            review: 'Delicious',
        },
        ],
        images: [
        {
            image_url: 'https://example.com/image.jpg',
            caption: 'Sunset view',
        },
        ],
    };

    describe('validatePostCreationData', () => {
        it('passes with valid data', () => {
            const req: any = { body: validPostBody };
            const res = mockRes();

            validatePostCreationData(req, res, mockNext);

            expect(mockNext).toHaveBeenCalled();
            expect(res.status).not.toHaveBeenCalled();
        });

        it('fails if required field missing', () => {
            const req: any = { body: { ...validPostBody, title: '' } };
            const res = mockRes();

            validatePostCreationData(req, res, mockNext);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                message: expect.stringContaining('String must contain at least 1 character'),
                })
            );
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('fails if category is invalid', () => {
            const req: any = { body: { ...validPostBody, categories: ['InvalidCategory'] } };
            const res = mockRes();

            validatePostCreationData(req, res, mockNext);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                message: expect.stringContaining('Invalid enum value'),
                })
            );
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('handles generic error fallback', () => {
            const req: any = { body: validPostBody };
            const res = mockRes();

            const { createPostSchema } = require('../../../src/validations/schemas/post.schema.ts');
            const originalParse = createPostSchema.parse;
            createPostSchema.parse = jest.fn(() => {
                throw new Error('Unexpected error');
            });

            validatePostCreationData(req, res, mockNext);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Invalid input for post creation',
            });
            expect(mockNext).not.toHaveBeenCalled();

            createPostSchema.parse = originalParse;
        });
    });

    describe('validateUpdatePost', () => {
        it('passes with valid data', () => {
            const req: any = { body: { ...validPostBody, user_id: undefined } }; // update does not expect user_id
            const res = mockRes();

            validateUpdatePostData(req, res, mockNext);

            expect(mockNext).toHaveBeenCalled();
            expect(res.status).not.toHaveBeenCalled();
        });

        it('fails if required update field missing', () => {
            const req: any = { body: { ...validPostBody, title: '' } };
            const res = mockRes();

            validateUpdatePostData(req, res, mockNext);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                message: expect.stringContaining('String must contain at least 1 character'),
                })
            );
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('handles generic error fallback', () => {
            const req: any = { body: validPostBody };
            const res = mockRes();

            const { updatePostSchema } = require('../../../src/validations/schemas/post.schema.ts');
            const originalParse = updatePostSchema.parse;
            updatePostSchema.parse = jest.fn(() => {
                throw new Error('Unexpected error');
            });

            validateUpdatePostData(req, res, mockNext);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Invalid input for post creation',
            });
            expect(mockNext).not.toHaveBeenCalled();

            updatePostSchema.parse = originalParse;
        });
    });
});
