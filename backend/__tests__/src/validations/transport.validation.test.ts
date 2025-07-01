import {
  validatetransportCreationData,
  validatetransportUpdationData,
} from '../../../src/validations/validationMiddlewares/transport.validation.ts';

describe('Transport Validation Middleware', () => {
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

    describe('validatetransportCreationData', () => {
        it('passes with valid data', () => {
            const req: any = {
                body: {
                transport_type: 'Bus',
                transport_name: 'City Bus',
                cost_per_person: 15.5,
                starting_location_name: 'Station A',
                starting_location_latitude: 40.7,
                starting_location_longitude: -74.0,
                ending_location_name: 'Station B',
                ending_location_latitude: 40.8,
                ending_location_longitude: -73.9,
                },
            };
            const res = mockRes();

            validatetransportCreationData(req, res, mockNext);

            expect(mockNext).toHaveBeenCalled();
            expect(req.body.cost_per_person).toBeCloseTo(15.50); 
            expect(res.status).not.toHaveBeenCalled();
        });

        it('fails when required transport_type missing', () => {
            const req: any = {
                body: {
                transport_name: 'City Bus',
                },
            };
            const res = mockRes();

            validatetransportCreationData(req, res, mockNext);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                message: 'Transport type is required',
                })
            );
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('handles generic error fallback', () => {
            const req: any = {
                body: {
                transport_type: 'Bus',
                transport_name: 'City Bus',
                },
            };
            const res = mockRes();

            const { transportCreationSchema } = require('../../../src/validations/schemas/transport.schema.ts');
            const originalParse = transportCreationSchema.parse;
            transportCreationSchema.parse = jest.fn(() => {
                throw new Error('Unexpected error');
            });

            validatetransportCreationData(req, res, mockNext);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Invalid input for post creation',
            });
            expect(mockNext).not.toHaveBeenCalled();

            transportCreationSchema.parse = originalParse;
        });
    });

    describe('validatetransportUpdationData', () => {
        it('passes with valid partial data', () => {
            const req: any = {
                body: {
                transport_name: 'Express Train',
                },
            };
            const res = mockRes();

            validatetransportUpdationData(req, res, mockNext);

            expect(mockNext).toHaveBeenCalled();
            expect(res.status).not.toHaveBeenCalled();
        });

        it('fails when cost_per_person is negative', () => {
            const req: any = {
                body: {
                cost_per_person: -5,
                },
            };
            const res = mockRes();

            validatetransportUpdationData(req, res, mockNext);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                message: expect.stringContaining('Cost must be a non-negative number'),
                })
            );
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('handles generic error fallback', () => {
            const req: any = {
                body: {
                transport_name: 'Express Train',
                },
            };
            const res = mockRes();

            const { transportUpdationSchema } = require('../../../src/validations/schemas/transport.schema.ts');
            const originalParse = transportUpdationSchema.parse;
            transportUpdationSchema.parse = jest.fn(() => {
                throw new Error('Unexpected error');
            });

            validatetransportUpdationData(req, res, mockNext);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Invalid input for post creation',
            });
            expect(mockNext).not.toHaveBeenCalled();

            transportUpdationSchema.parse = originalParse;
        });
    });
});
