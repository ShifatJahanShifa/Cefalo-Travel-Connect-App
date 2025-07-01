import { validatePlaceCreationData, validatePlaceUpdationData } from '../../../src/validations/validationMiddlewares/place.validation.ts';
import { placeCreationSchema, placeUpdationSchema } from '../../../src/validations/schemas/place.schema.ts';

describe('Place Validation Middleware', () => {
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

    describe('validatePlaceCreationData', () => {
        it('passes with valid data', () => {
            const req: any = {
                body: {
                place_name: 'Valid Place',
                latitude: 12.34,
                longitude: 56.78,
                }
            };
            const res = mockRes();

            validatePlaceCreationData(req, res, mockNext);

            expect(mockNext).toHaveBeenCalled();
            expect(res.status).not.toHaveBeenCalled();
        });

        it('fails with missing place_name', () => {
            const req: any = {
                body: {
                place_name: '',
                latitude: 12.34,
                longitude: 56.78,
                }
            };
            const res = mockRes();

            validatePlaceCreationData(req, res, mockNext);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: 'place name is required',
            }));
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('fails with invalid latitude', () => {
            const req: any = {
                body: {
                place_name: 'Valid Place',
                latitude: 200, 
                longitude: 56.78,
                }
            };
            const res = mockRes();

            validatePlaceCreationData(req, res, mockNext);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalled();
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should handle error without zod errors and fallback message', () => {
            const req: any = {
                body: {
                place_name: 'Valid Place',
                latitude: 12.34,
                longitude: 56.78,
                }
            };
            const res = mockRes();
            const originalParse = placeCreationSchema.parse;

            placeCreationSchema.parse = jest.fn(() => { throw new Error('Unexpected error') });

            validatePlaceCreationData(req, res, mockNext);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid input for post creation' });
            expect(mockNext).not.toHaveBeenCalled();

            placeCreationSchema.parse = originalParse;
        });
    });

    describe('validatePlaceUpdationData', () => {
        it('passes with valid partial data', () => {
            const req: any = {
                body: {
                place_name: 'New Name',
                latitude: 45,
                }
            };
            const res = mockRes();

            validatePlaceUpdationData(req, res, mockNext);

            expect(mockNext).toHaveBeenCalled();
            expect(res.status).not.toHaveBeenCalled();
        });

        it('fails with empty place_name', () => {
            const req: any = {
                body: {
                place_name: '',
                }
            };
            const res = mockRes();

            validatePlaceUpdationData(req, res, mockNext);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: 'place name is required',
            }));
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('fails with invalid longitude', () => {
            const req: any = {
                body: {
                longitude: -200,
                }
            };
            const res = mockRes();

            validatePlaceUpdationData(req, res, mockNext);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalled();
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should handle error without zod errors and fallback message', () => {
            const req: any = {
                body: {
                place_name: 'Valid Place',
                latitude: 12.34,
                longitude: 56.78,
                }
            };
            const res = mockRes();
            const originalParse = placeUpdationSchema.parse;

            placeUpdationSchema.parse = jest.fn(() => { throw new Error('Unexpected error') });

            validatePlaceUpdationData(req, res, mockNext);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid input for post creation' });
            expect(mockNext).not.toHaveBeenCalled();

            placeUpdationSchema.parse = originalParse;
        });
    });
});
