import { validateUpdateUser } from '../../../src/validations/validationMiddlewares/user.validation.ts';
import { updateUserSchema } from '../../../src/validations/schemas/user.schema.ts';

describe('User Validation Middleware', () => {
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

    it('should pass with valid optional data', () => {
        const req: any = {
        body: {
            profile_picture_url: 'https://example.com/image.png',
            bio: 'This is a short bio.',
            role: 'explorer',
            hashed_password: 'securePassword123',
        },
        };
        const res = mockRes();

        validateUpdateUser(req, res, mockNext);

        expect(mockNext).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
    });

    it('should fail with invalid profile_picture_url', () => {
        const req: any = {
        body: {
            profile_picture_url: 'not-a-valid-url',
        },
        };
        const res = mockRes();

        validateUpdateUser(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
            message: 'Invalid URL format',
        })
        );
        expect(mockNext).not.toHaveBeenCalled();
    });

    it('should fail with too long bio', () => {
        const req: any = {
        body: {
            bio: 'a'.repeat(10001),
        },
        };
        const res = mockRes();

        validateUpdateUser(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
            message: 'Bio is too long',
        })
        );
        expect(mockNext).not.toHaveBeenCalled();
    });

    it('should fail with invalid role', () => {
        const req: any = {
        body: {
            role: 'superuser',
        },
        };
        const res = mockRes();

        validateUpdateUser(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
            message: 'Role must be either explorer, traveller, or admin',
        })
        );
        expect(mockNext).not.toHaveBeenCalled();
    });

    it('should fail with too long hashed_password', () => {
        const req: any = {
        body: {
            hashed_password: 'a'.repeat(71),
        },
        };
        const res = mockRes();

        validateUpdateUser(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
            message: 'Password length at most 70 characters',
        })
        );
        expect(mockNext).not.toHaveBeenCalled();
    });

    it('should forward unexpected errors', () => {
        const req: any = {
        body: {
            role: 'explorer',
        },
        };
        const res = mockRes();

    
        const originalParse = updateUserSchema.parse;
        updateUserSchema.parse = () => {
        throw new Error('Unexpected error');
        };

        validateUpdateUser(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
            message: 'Invalid input for user update',
        })
        );

        updateUserSchema.parse = originalParse; 
    });
});
