import { signup, signin, signout, refreshAccessToken } from '../../../src/controllers/auth.controller.ts';
import * as authService from '../../../src/services/auth.service.ts';
import { Request, Response, NextFunction } from 'express';
import { AuthDTO } from '../../../src/DTOs/auth.dto.ts';
import { mockAuthDTO } from '../../__mocks__/auth.dto.mock.ts'

jest.mock('../../../src/services/auth.service.ts');

describe('Auth Controller', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;


    beforeEach(() => {
        req = {
            body: { email: 'test@example.com', password: 'testpass' },
            cookies: { refreshToken: 'mockRefreshToken' }
        };

        res = {
            cookie: jest.fn().mockReturnThis(),
            header: jest.fn().mockReturnThis(),
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('signup', () => {
        it('should sign up user and set tokens in response', async () => {
            (authService.signup as jest.Mock).mockResolvedValue(mockAuthDTO);

            await signup(req as Request, res as Response, next);

            expect(authService.signup).toHaveBeenCalledWith(req.body);
            expect(res.cookie).toHaveBeenCalledWith('refreshToken', mockAuthDTO.refreshToken, {
            httpOnly: true,
            sameSite: 'none',
            maxAge: expect.any(Number)
            });
            expect(res.header).toHaveBeenCalledWith('Authorization', `Bearer ${mockAuthDTO.accessToken}`);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockAuthDTO);
        });

        it('should call next on error', async () => {
            const error = new Error('signup failed');
            (authService.signup as jest.Mock).mockRejectedValue(error);

            await signup(req as Request, res as Response, next);
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('signin', () => {
        it('should sign in user and set tokens in response', async () => {
            (authService.signin as jest.Mock).mockResolvedValue(mockAuthDTO);

            await signin(req as Request, res as Response, next);

            expect(authService.signin).toHaveBeenCalledWith(req.body);
            expect(res.cookie).toHaveBeenCalledWith('refreshToken', mockAuthDTO.refreshToken, {
            httpOnly: true,
            sameSite: 'none',
            maxAge: expect.any(Number)
            });
            expect(res.header).toHaveBeenCalledWith('Authorization', `Bearer ${mockAuthDTO.accessToken}`);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockAuthDTO);
        });

        it('should call next on error', async () => {
            const error = new Error('signin failed');
            (authService.signin as jest.Mock).mockRejectedValue(error);

            await signin(req as Request, res as Response, next);
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('signout', () => {
        it('should call signout service method', async () => {
            (authService.signout as jest.Mock).mockResolvedValue(undefined);

            await signout(req as any, res as Response, next);

            expect(authService.signout).toHaveBeenCalledWith(req, res);
        });

        it('should call next on error', async () => {
            const error = new Error('signout failed');
            (authService.signout as jest.Mock).mockRejectedValue(error);

            await signout(req as any, res as Response, next);
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('refreshAccessToken', () => {
        it('should return new access token when refresh token exists', async () => {
            (authService.refreshAccessToken as jest.Mock).mockResolvedValue('newAccessToken');

            await refreshAccessToken(req as any, res as Response, next);

            expect(authService.refreshAccessToken).toHaveBeenCalledWith('mockRefreshToken');
            expect(res.header).toHaveBeenCalledWith('Authorization', `Bearer newAccessToken`);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ accessToken: 'newAccessToken' });
        });

        it('should return 401 if refresh token is missing', async () => {
            req.cookies = {};

            await refreshAccessToken(req as any, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ message: 'Missing refresh token' });
        });

        it('should call next on error', async () => {
            const error = new Error('refresh failed');
            (authService.refreshAccessToken as jest.Mock).mockRejectedValue(error);

            await refreshAccessToken(req as any, res as Response, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });
});
