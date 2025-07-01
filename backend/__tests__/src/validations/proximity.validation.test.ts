import { proximityVaidation } from '../../../src/validations/validationMiddlewares/proximity.validation.ts';
import { proximityCheckSchema } from '../../../src/validations/schemas/proximity.schema.ts';


describe('Proximity Validation Middleware', () => {
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

    it('passes with valid latitude and longitude', () => {
        const req: any = {
        body: {
            latitude: 45,
            longitude: 90,
        },
        };
        const res = mockRes();

        proximityVaidation(req, res, mockNext);

        expect(mockNext).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
    });

    it('fails with latitude less than -90', () => {
        const req: any = {
        body: {
            latitude: -100,
            longitude: 90,
        },
        };
        const res = mockRes();

        proximityVaidation(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.stringContaining('Number must be greater than or equal to -90'),
        }));
        expect(mockNext).not.toHaveBeenCalled();
    });

    it('fails with longitude greater than 180', () => {
        const req: any = {
        body: {
            latitude: 45,
            longitude: 200,
        },
        };
        const res = mockRes();

        proximityVaidation(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.stringContaining('Number must be less than or equal to 180'),
        }));
        expect(mockNext).not.toHaveBeenCalled();
    });

    it('handles error without zod errors and sends fallback message', () => {
        const req: any = {
        body: {
            latitude: 45,
            longitude: 90,
        },
        };
        const res = mockRes();

        const originalParse = proximityCheckSchema.parse;
        proximityCheckSchema.parse = jest.fn(() => { throw new Error('Unexpected error'); });

        proximityVaidation(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Invalid input for user update' });
        expect(mockNext).not.toHaveBeenCalled();

        proximityCheckSchema.parse = originalParse;
    });
});
