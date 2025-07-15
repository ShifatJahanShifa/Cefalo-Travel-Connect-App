import { validateWishlistCreationData } from '../../../src/validations/validationMiddlewares/notification.validation.ts';
import { notificationSchema } from '../../../src/validations/schemas/notifcation.schema.ts';

describe('Notification Validation Middleware', () => {
    const mockNext = jest.fn();

    const mockRes = () => {
        const res: any = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should pass with valid notification data', () => {
        const req: any = {
        body: {
            user_id: '123e4567-e89b-12d3-a456-426614174000',
            type: 'like',
            reference_id: '123e4567-e89b-12d3-a456-426614174001',
            created_at: new Date().toISOString(),
        }
        };
        const res = mockRes();

        validateWishlistCreationData(req, res, mockNext);

        expect(mockNext).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
    });

    it('should return 400 if required field is invalid (invalid UUID)', () => {
        const req: any = {
        body: {
            user_id: 'invalid-uuid',
            type: 'like',
        }
        };
        const res = mockRes();

        validateWishlistCreationData(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.stringContaining('Invalid'),
        }));
        expect(mockNext).not.toHaveBeenCalled();
    });

    it('should return 400 with fallback message if thrown error lacks .errors', () => {
        const req: any = {
        body: {
            user_id: '123e4567-e89b-12d3-a456-426614174000',
            type: 'like',
        }
        };
        const res = mockRes();


        const originalParse = notificationSchema.parse;
        notificationSchema.parse = () => {
        throw new Error('Something went wrong');
        };

        validateWishlistCreationData(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
        message: 'Invalid input for post creation',
        });

    
        notificationSchema.parse = originalParse;
    });
});
