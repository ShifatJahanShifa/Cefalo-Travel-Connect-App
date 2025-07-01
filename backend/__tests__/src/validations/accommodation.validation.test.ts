import {
  validateAccommodationCreationData,
  validateAccommodationUpdationData,
} from '../../../src/validations/validationMiddlewares/accommodation.validation.ts';

describe('Accommodation Validation Middleware', () => {
    const mockRes = () => {
        const res: any = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };

    let mockNext: jest.Mock;

    beforeEach(() => {
        mockNext = jest.fn();
    });

    describe('validateAccommodationCreationData', () => {
        it('should pass with valid data and correct cost transformation', () => {
            const req: any = {
                body: {
                accommodation_type: 'hotel',
                accommodation_name: 'Ocean View',
                latitude: 23.5,
                longitude: 90.4,
                cost_per_night: 99.4567,
                },
            };
            const res = mockRes();

            validateAccommodationCreationData(req, res, mockNext);

            expect(mockNext).toHaveBeenCalled();
            expect(req.body.cost_per_night).toBe(99.46); 
        });

        it('should fail when accommodation_name is missing', () => {
            const req: any = {
                body: {
                accommodation_type: 'resort',
                latitude: 23.5,
                longitude: 90.4,
                },
            };
            const res = mockRes();

            validateAccommodationCreationData(req, res, mockNext);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: 'Required',
                }));

            expect(res.status).toHaveBeenCalledWith(400);
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should fail when latitude is out of range', () => {
            const req: any = {
                body: {
                accommodation_type: 'villa',
                accommodation_name: 'Test Villa',
                latitude: -100, 
                longitude: 80,
                },
            };
            const res = mockRes();

            validateAccommodationCreationData(req, res, mockNext);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(mockNext).not.toHaveBeenCalled();
        });

    });

    describe('validateAccommodationUpdationData', () => {
        it('should pass with valid partial update data', () => {
            const req: any = {
                body: {
                accommodation_id: 'acc123',
                accommodation_name: 'Updated Name',
                cost_per_night: 50.5678,
                },
            };
            const res = mockRes();

            validateAccommodationUpdationData(req, res, mockNext);

            expect(mockNext).toHaveBeenCalled();
            expect(req.body.cost_per_night).toBe(50.57);
        });

        it('should fail with invalid enum value for accommodation_type', () => {
            const req: any = {
                body: {
                accommodation_type: 'castle', 
                },
            };
            const res = mockRes();

            validateAccommodationUpdationData(req, res, mockNext);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: "Invalid enum value. Expected 'hotel' | 'motel' | 'resort' | 'villa' | 'cottage', received 'castle'",
                }));
            expect(res.status).toHaveBeenCalledWith(400);
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should fail with invalid longitude', () => {
            const req: any = {
                body: {
                longitude: -300,
                },
            };
            const res = mockRes();

            validateAccommodationUpdationData(req, res, mockNext);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(mockNext).not.toHaveBeenCalled();
        });
    });
});
