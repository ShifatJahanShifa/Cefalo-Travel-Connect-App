import { validateSignup, validateSignin } from '../../../src/validations/validationMiddlewares/auth.validation.ts';
import { signupSchema, signinSchema } from '../../../src/validations/schemas/auth.schema.ts';

describe('Auth Validation Middleware', () => {
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

    describe('validateSignup', () => {
        it('passes with valid data', () => {
            const req: any = {
                body: {
                username: 'validuser',
                email: 'valid@example.com',
                password: 'validpassword123',
                },
            };
            const res = mockRes();

            validateSignup(req, res, mockNext);

            expect(mockNext).toHaveBeenCalled();
            expect(res.status).not.toHaveBeenCalled();
        });

        it('fails with invalid email', () => {
            const req: any = {
                body: {
                username: 'user',
                email: 'invalid-email',
                password: 'password',
                },
            };
            const res = mockRes();

            validateSignup(req, res, mockNext);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                success: false,
                errors: expect.arrayContaining([
                expect.objectContaining({ message: 'Invalid email address' }),
                ]),
            }));
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('fails with too long username', () => {
            const req: any = {
                body: {
                username: 'a'.repeat(51),
                email: 'valid@example.com',
                password: 'password',
                },
            };
            const res = mockRes();

            validateSignup(req, res, mockNext);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                success: false,
                errors: expect.arrayContaining([
                expect.objectContaining({ message: 'Username must be at most 50 characters' }),
                ]),
            }));
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('fails with too long password', () => {
            const req: any = {
                body: {
                username: 'user',
                email: 'valid@example.com',
                password: 'a'.repeat(71),
                },
            };
            const res = mockRes();

            validateSignup(req, res, mockNext);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                success: false,
                errors: expect.arrayContaining([
                expect.objectContaining({ message: 'Password must be at most 70 characters' }),
                ]),
            }));
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should forward non-Zod errors to next in validateSignup', () => {
            const req: any = {
                body: {
                username: 'test',
                email: 'test@example.com',
                password: 'test123',
                },
            };
            const res = mockRes();

            const originalParse = signupSchema.parse;
            signupSchema.parse = () => {
                throw new Error('Something unexpected');
            };

            validateSignup(req, res, mockNext);

            expect(mockNext).toHaveBeenCalledWith(expect.any(Error));

            signupSchema.parse = originalParse;
        });
    });

    describe('validateSignin', () => {
        it('passes with valid data', () => {
            const req: any = {
                body: {
                email: 'valid@example.com',
                password: 'validpassword123',
                },
            };
            const res = mockRes();

            validateSignin(req, res, mockNext);

            expect(mockNext).toHaveBeenCalled();
            expect(res.status).not.toHaveBeenCalled();
        });

        it('fails with invalid email', () => {
            const req: any = {
                body: {
                email: 'invalid-email',
                password: 'password',
                },
            };
            const res = mockRes();

            validateSignin(req, res, mockNext);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                success: false,
                errors: expect.arrayContaining([
                expect.objectContaining({ message: 'Invalid email address' }),
                ]),
            }));
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('fails with too long password', () => {
            const req: any = {
                body: {
                email: 'valid@example.com',
                password: 'a'.repeat(71),
                },
            };
            const res = mockRes();

            validateSignin(req, res, mockNext);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                success: false,
                errors: expect.arrayContaining([
                expect.objectContaining({ message: 'Password must be at most 70 characters' }),
                ]),
            }));
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should forward non-Zod errors to next in validateSignin', () => {
            const req: any = {
                body: {
                email: 'test@example.com',
                password: 'test123',
                },
            };
            const res = mockRes();

            const originalParse = signinSchema.parse;
            signinSchema.parse = () => {
                throw new Error('Unexpected error');
            };

            validateSignin(req, res, mockNext);

            expect(mockNext).toHaveBeenCalledWith(expect.any(Error));

            signinSchema.parse = originalParse;
        });
    });
});
