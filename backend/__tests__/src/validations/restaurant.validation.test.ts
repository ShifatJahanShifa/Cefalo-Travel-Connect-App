import {
  validateRestaurantCreationData,
  validateUpdateRestaurantData,
} from '../../../src/validations/validationMiddlewares/restaurant.validation.ts';

describe('Restaurant Validation Middleware', () => {
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


    describe('validateRestaurantCreationData', () => {
        it('passes with valid data', () => {
            const req: any = {
                body: {
                restaurant_name: 'Test Restaurant',
                popular_food: 'Pizza',
                latitude: 40.7128,
                longitude: -74.0060,
                },
            };
            const res = mockRes();

            validateRestaurantCreationData(req, res, mockNext);

            expect(mockNext).toHaveBeenCalled();
            expect(res.status).not.toHaveBeenCalled();
        });

        it('fails with missing restaurant_name', () => {
            const req: any = {
                body: {
                popular_food: 'Pizza',
                latitude: 40.7128,
                longitude: -74.0060,
                },
            };
            const res = mockRes();

            validateRestaurantCreationData(req, res, mockNext);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                message: 'Required',
                })
            );
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('handles generic errors with fallback message', () => {
            const req: any = {
                body: {
                restaurant_name: 'Test',
                popular_food: 'Pizza',
                latitude: 40.7128,
                longitude: -74.0060,
                },
            };
            const res = mockRes();

            const { createRestaurantSchema } = require('../../../src/validations/schemas/restaurant.schema.ts');
            const originalParse = createRestaurantSchema.parse;
            createRestaurantSchema.parse = jest.fn(() => {
                throw new Error('Unexpected error');
            });

            validateRestaurantCreationData(req, res, mockNext);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Invalid input for Restaurant creation',
            });
            expect(mockNext).not.toHaveBeenCalled();

            createRestaurantSchema.parse = originalParse;
        });
    });

    describe('validateUpdateRestaurantData', () => {
        it('passes with valid partial data', () => {
            const req: any = {
                body: {
                popular_food: 'Sushi',
                },
            };
            const res = mockRes();

            validateUpdateRestaurantData(req, res, mockNext);

            expect(mockNext).toHaveBeenCalled();
            expect(res.status).not.toHaveBeenCalled();
        });

        it('fails with invalid latitude', () => {
            const req: any = {
                body: {
                latitude: -100,
                },
            };
            const res = mockRes();

            validateUpdateRestaurantData(req, res, mockNext);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                message: expect.stringContaining('Number must be greater than or equal to -90'),
                })
            );
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('handles generic errors with fallback message', () => {
            const req: any = {
                body: {
                popular_food: 'Sushi',
                },
            };
            const res = mockRes();

            const { updateRestaurantSchema } = require('../../../src/validations/schemas/restaurant.schema.ts');
            const originalParse = updateRestaurantSchema.parse;
            updateRestaurantSchema.parse = jest.fn(() => {
                throw new Error('Unexpected error');
            });

            validateUpdateRestaurantData(req, res, mockNext);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Invalid input for Restaurant creation',
            });
            expect(mockNext).not.toHaveBeenCalled();

            updateRestaurantSchema.parse = originalParse;
        });
    });
});
