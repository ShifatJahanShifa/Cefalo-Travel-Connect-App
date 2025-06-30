import * as authService from '../../../src/services/auth.service.ts';
import authDAO from '../../../src/repositories/dao/auth.repository.ts';
import userDAO from '../../../src/repositories/dao/user.respository.ts';
import * as jwtUtils from '../../../src/utils/jwt.ts';
import { signupUser, signinUser, createdUser } from '../../../src/types/auth.type.ts';
import { Role } from '../../../src/enums/role.ts';
import { AuthDTO } from '../../../src/DTOs/auth.dto.ts';
import { AppError } from '../../../src/utils/appError.ts';
import { mockCreatedUser } from '../../__mocks__/user.mock.ts';
import { Response } from 'express';

jest.mock('../../../src/repositories/dao/auth.repository');
jest.mock('../../../src/repositories/dao/user.respository');
jest.mock('../../../src/utils/jwt');



describe('Auth Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('signup', () => {
        it('should create a new user and return AuthDTO', async () => {
            (authDAO.findUserByEmail as jest.Mock).mockResolvedValue(null);
            (authDAO.findUserByUsername as jest.Mock).mockResolvedValue(null);
            (authDAO.insertUser as jest.Mock).mockResolvedValue(mockCreatedUser);
            (authDAO.insertRefreshToken as jest.Mock).mockResolvedValue(undefined);
            (jwtUtils.generateAccessToken as jest.Mock).mockReturnValue('access.token');
            (jwtUtils.generateRefreshToken as jest.Mock).mockReturnValue('refresh.token');

            const result = await authService.signup({
                username: mockCreatedUser.username,
                email: mockCreatedUser.email,
                password: 'plaintext'
            });

            expect(result).toBeInstanceOf(AuthDTO);
            expect(result.accessToken).toBe('access.token');
            expect(result.refreshToken).toBe('refresh.token');
        });

        it('should throw error if email exists', async () => {
            (authDAO.findUserByEmail as jest.Mock).mockResolvedValue(mockCreatedUser);

            await expect(authService.signup({
                username: 'newuser',
                email: mockCreatedUser.email,
                password: '123'
            })).rejects.toThrow('email is already taken');
        });

        
        it('should throw error if username exists', async () => {
            (authDAO.findUserByEmail as jest.Mock).mockResolvedValue(null);
            (authDAO.findUserByUsername as jest.Mock).mockResolvedValue(mockCreatedUser); 

            await expect(authService.signup({
                username: 'test-id-123',
                email: 'abc@gmail.com',
                password: '123'
            })).rejects.toThrow('username is already taken')
        })
    });

    describe('signin', () => {
        it('should return AuthDTO for valid credentials', async () => {
            (authDAO.findUserByEmail as jest.Mock).mockResolvedValue(mockCreatedUser);
            jest.spyOn(require('bcrypt'), 'compare').mockResolvedValue(true);
            (jwtUtils.generateAccessToken as jest.Mock).mockReturnValue('access.token');
            (jwtUtils.generateRefreshToken as jest.Mock).mockReturnValue('refresh.token');
            (authDAO.findRefreshToken as jest.Mock).mockResolvedValue(null);
            (authDAO.insertRefreshToken as jest.Mock).mockResolvedValue(undefined);

            const result = await authService.signin({
                email: mockCreatedUser.email,
                password: 'plaintext'
            });

            expect(result).toBeInstanceOf(AuthDTO);
        });


        it('should update refresh token if it already exists', async () => {
            (authDAO.findUserByEmail as jest.Mock).mockResolvedValue(mockCreatedUser);
            jest.spyOn(require('bcrypt'), 'compare').mockResolvedValue(true);
            (jwtUtils.generateAccessToken as jest.Mock).mockReturnValue('access.token');
            (jwtUtils.generateRefreshToken as jest.Mock).mockReturnValue('refresh.token');
            (authDAO.findRefreshToken as jest.Mock).mockResolvedValue('existing-refresh-token');
            (authDAO.updateRefreshToken as jest.Mock).mockResolvedValue(undefined);

            const result = await authService.signin({
                email: mockCreatedUser.email,
                password: 'plaintext'
            });

            expect(result).toBeInstanceOf(AuthDTO);
            expect(authDAO.updateRefreshToken).toHaveBeenCalledWith(
                mockCreatedUser.user_id,
                'refresh.token',
                expect.any(Date)
            );
        });


        it('should throw error for invalid password', async () => {
            (authDAO.findUserByEmail as jest.Mock).mockResolvedValue(null);

            await expect(authService.signin({
                email: mockCreatedUser.email,
                password: 'wrong'
            })).rejects.toThrow('invalid credential');
        });


        it('should throw error for invalid password', async () => {
            (authDAO.findUserByEmail as jest.Mock).mockResolvedValue(mockCreatedUser);
            jest.spyOn(require('bcrypt'), 'compare').mockResolvedValue(false);

            await expect(authService.signin({
                email: mockCreatedUser.email,
                password: 'wrong'
            })).rejects.toThrow('invalid credential');
        });
    });


    describe('signout', () => {
        it('should clear refresh token and respond', async () => {
            const mockReq = { username: mockCreatedUser.username } as any;
            const mockRes = {
                clearCookie: jest.fn(),
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            (userDAO.getUserByUsername as jest.Mock).mockResolvedValue(mockCreatedUser);
            (authDAO.deleteRefreshToken as jest.Mock).mockResolvedValue(undefined);

            await authService.signout(mockReq, mockRes as unknown as Response);

            expect(mockRes.clearCookie).toHaveBeenCalledWith('refreshToken');
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({ message: 'signed out successfully' });
        });
    });

    describe('refreshAccessToken', () => {
        it('should return new access token if refresh token valid', async () => {
            (jwtUtils.verifyRefreshToken as jest.Mock).mockReturnValue({ email: mockCreatedUser.email });
            (authDAO.findUserByEmail as jest.Mock).mockResolvedValue(mockCreatedUser);
            (authDAO.findRefreshToken as jest.Mock).mockResolvedValue('refresh.token');
            (jwtUtils.generateAccessToken as jest.Mock).mockReturnValue('new.access.token');

            const token = await authService.refreshAccessToken('refresh.token');

            expect(token).toBe('new.access.token');
        });

        it('hould throw error if user not found', async () => {
            (jwtUtils.verifyRefreshToken as jest.Mock).mockReturnValue({ email: mockCreatedUser.email });
            (authDAO.findUserByEmail as jest.Mock).mockResolvedValue(null);

            await expect(authService.refreshAccessToken('token')).rejects.toThrow('Invalid refresh token');
        });


        it('should throw error if token not found', async () => {
            (jwtUtils.verifyRefreshToken as jest.Mock).mockReturnValue({ email: mockCreatedUser.email });
            (authDAO.findUserByEmail as jest.Mock).mockResolvedValue(mockCreatedUser);
            (authDAO.findRefreshToken as jest.Mock).mockResolvedValue(null);

            await expect(authService.refreshAccessToken('token')).rejects.toThrow('Invalid refresh token');
        });
    });
});
